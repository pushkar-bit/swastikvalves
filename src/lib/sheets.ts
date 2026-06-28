import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { OrderStatus, AdvancePaymentStatus } from "@/config/appConfig";

export interface RFQItem {
  sku: string;
  partName: string;
  quantity: number;
}

export interface RFQRecord {
  orderId: string;
  timestamp: string;
  firmName: string;
  contactName: string;
  location: string;
  phoneNumber: string;
  email: string;
  items: RFQItem[];
  status: OrderStatus;
  adminToken: string;
  expiryDate: string;
  advancePaymentStatus: AdvancePaymentStatus;
}

const fallbackDbPath = path.join(process.cwd(), "scratch", "db.json");

function ensureFallbackDb() {
  const dir = path.dirname(fallbackDbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(fallbackDbPath)) {
    fs.writeFileSync(fallbackDbPath, JSON.stringify({}, null, 2));
  }
}

async function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

  if (!email || !privateKey || !spreadsheetId) {
    return null;
  }

  try {
    const auth = new google.auth.JWT({
      email,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    return {
      sheets: google.sheets({ version: "v4", auth }),
      spreadsheetId,
    };
  } catch (error) {
    console.error("Failed to initialize Google Sheets client:", error);
    return null;
  }
}

function writeLocalRecord(orderId: string, record: RFQRecord) {
  ensureFallbackDb();
  const fileData = fs.readFileSync(fallbackDbPath, "utf-8");
  const db = JSON.parse(fileData);
  db[orderId] = record;
  fs.writeFileSync(fallbackDbPath, JSON.stringify(db, null, 2));
}

function getLocalRecord(orderId: string): RFQRecord | null {
  ensureFallbackDb();
  const fileData = fs.readFileSync(fallbackDbPath, "utf-8");
  const db = JSON.parse(fileData);
  return db[orderId] || null;
}

export async function appendRFQRow(record: RFQRecord): Promise<void> {
  const client = await getSheetsClient();
  
  if (!client) {
    console.warn("Google Sheets Auth config missing. Saving to local fallback db.");
    writeLocalRecord(record.orderId, record);
    return;
  }

  try {
    const { sheets, spreadsheetId } = client;
    
    // Matrix: A:Timestamp, B:OrderId, C:Firm, D:Contact, E:Location, F:Phone, G:Email, H:Details, I:Status, J:AdminToken, K:Expiry, L:AdvanceStatus
    const values = [
      [
        record.timestamp,
        record.orderId,
        record.firmName,
        record.contactName,
        record.location,
        record.phoneNumber,
        record.email,
        JSON.stringify(record.items),
        record.status,
        record.adminToken,
        record.expiryDate,
        record.advancePaymentStatus,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:L",
      valueInputOption: "RAW",
      requestBody: { values },
    });
  } catch (error) {
    console.error("Google Sheets append failed, falling back to local database:", error);
    writeLocalRecord(record.orderId, record);
  }
}

export async function getRFQRow(orderId: string): Promise<RFQRecord | null> {
  const client = await getSheetsClient();

  if (!client) {
    return getLocalRecord(orderId);
  }

  try {
    const { sheets, spreadsheetId } = client;
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:L",
    });

    const rows = res.data.values || [];
    
    for (let i = 1; i < rows.length; i++) {
      const colB = rows[i][1]; // Order ID
      if (colB === orderId) {
        let items: RFQItem[] = [];
        try {
          items = JSON.parse(rows[i][7] || "[]");
        } catch {
          // ignore
        }

        return {
          orderId,
          timestamp: rows[i][0] || "",
          firmName: rows[i][2] || "",
          contactName: rows[i][3] || "",
          location: rows[i][4] || "",
          phoneNumber: rows[i][5] || "",
          email: rows[i][6] || "",
          items,
          status: (rows[i][8] || "PENDING") as OrderStatus,
          adminToken: rows[i][9] || "",
          expiryDate: rows[i][10] || "",
          advancePaymentStatus: (rows[i][11] || "UNPAID") as AdvancePaymentStatus,
        };
      }
    }

    return getLocalRecord(orderId);
  } catch (error) {
    console.error("Google Sheets fetch failed, checking local database:", error);
    return getLocalRecord(orderId);
  }
}

export async function updateRFQRowStatus(
  orderId: string,
  status: OrderStatus,
  updates?: Partial<Omit<RFQRecord, "orderId" | "status">>
): Promise<void> {
  const localRecord = getLocalRecord(orderId);
  if (localRecord) {
    const updated = {
      ...localRecord,
      status,
      ...updates,
    };
    writeLocalRecord(orderId, updated);
  }

  const client = await getSheetsClient();
  if (!client) {
    return;
  }

  try {
    const { sheets, spreadsheetId } = client;
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:L",
    });

    const rows = res.data.values || [];
    let rowIndex = -1;

    for (let i = 1; i < rows.length; i++) {
      const colB = rows[i][1];
      if (colB === orderId) {
        rowIndex = i + 1;
        break;
      }
    }

    if (rowIndex === -1) {
      console.warn(`Record with orderId ${orderId} not found in Google Sheets. Local DB updated.`);
      return;
    }

    const currentStatus = status;
    const currentAdminToken = updates?.adminToken !== undefined ? updates.adminToken : rows[rowIndex - 1][9] || "";
    const currentExpiryDate = updates?.expiryDate !== undefined ? updates.expiryDate : rows[rowIndex - 1][10] || "";
    const currentAdvanceStatus =
      updates?.advancePaymentStatus !== undefined ? updates.advancePaymentStatus : rows[rowIndex - 1][11] || "UNPAID";

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!I${rowIndex}:L${rowIndex}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[currentStatus, currentAdminToken, currentExpiryDate, currentAdvanceStatus]],
      },
    });
  } catch (error) {
    console.error("Google Sheets update failed. Check status locally.", error);
  }
}
