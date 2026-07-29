import { google } from "googleapis";
import fs from "fs";
import path from "path";
import {
  OrderStatus,
  AdvancePaymentStatus,
  PurchaseMode,
  PaymentMode,
  appConfig,
} from "@/config/appConfig";

export interface RFQItem {
  sku: string;
  partName: string;
  quantity: number;
  /** Per-unit indicative rate captured at submission time (INR). */
  rate?: number;
}

export interface RFQRecord {
  /** Internal stable key (UUID) — used for JWT payloads and row lookups. */
  orderId: string;
  /** Human-facing reference shown to buyer and admin, e.g. SV-2026-4Q7K. */
  orderNumber: string;
  timestamp: string;
  firmName: string;
  gstNumber: string;
  contactName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: RFQItem[];
  totalQuantity: number;
  estimatedValue: number;
  purchaseMode: PurchaseMode;
  paymentMode: PaymentMode;
  advanceOptIn: boolean;
  advanceAmount: number;
  advancePercentage: number;
  advancePaymentStatus: AdvancePaymentStatus;
  specialInstructions: string;
  status: OrderStatus;
  responseDeadline: string;
  decidedAt: string;
  rejectionReason: string;
  adminNotes: string;
}

/**
 * Sheet column matrix. Order here is the contract with the spreadsheet — append
 * new fields at the end rather than inserting, or existing rows shift.
 */
export const SHEET_HEADERS = [
  "Timestamp",
  "Order Number",
  "Order ID",
  "Status",
  "Firm Name",
  "GST Number",
  "Contact Name",
  "Phone Number",
  "Email",
  "Address",
  "City",
  "State",
  "Pincode",
  "Order Details",
  "Total Quantity",
  "Estimated Value (INR)",
  "Mode of Purchase",
  "Payment Mode",
  "Advance Opted",
  "Advance Amount (INR)",
  "Advance Percentage",
  "Advance Payment Status",
  "Special Instructions",
  "Response Deadline",
  "Decided At",
  "Rejection Reason",
  "Admin Notes",
  "Items (JSON)",
] as const;

const RFQ_SHEET = "Sheet1";
const RFQ_RANGE = `${RFQ_SHEET}!A:AB`;
/** Confirmed-orders ledger, written only when a quote is accepted. */
const ORDERS_SHEET = "Orders";
const ORDERS_RANGE = `${ORDERS_SHEET}!A:AB`;

// Column indices (0-based).
const COL = {
  timestamp: 0,
  orderNumber: 1,
  orderId: 2,
  status: 3,
  firmName: 4,
  gstNumber: 5,
  contactName: 6,
  phoneNumber: 7,
  email: 8,
  address: 9,
  city: 10,
  state: 11,
  pincode: 12,
  items: 13,
  totalQuantity: 14,
  estimatedValue: 15,
  purchaseMode: 16,
  paymentMode: 17,
  advanceOptIn: 18,
  advanceAmount: 19,
  advancePercentage: 20,
  advancePaymentStatus: 21,
  specialInstructions: 22,
  responseDeadline: 23,
  decidedAt: 24,
  rejectionReason: 25,
  adminNotes: 26,
  itemsJson: 27,
} as const;

const fallbackDbPath =
  process.env.LOCAL_DB_PATH || path.join(process.cwd(), "scratch", "db.json");

/* ------------------------------------------------------------------ *
 * Local JSON fallback
 * ------------------------------------------------------------------ */

function readLocalDb(): Record<string, RFQRecord> {
  try {
    if (!fs.existsSync(fallbackDbPath)) return {};
    return JSON.parse(fs.readFileSync(fallbackDbPath, "utf-8"));
  } catch (error) {
    console.error("Local ledger read failed:", error);
    return {};
  }
}

function writeLocalRecord(orderId: string, record: RFQRecord) {
  try {
    const dir = path.dirname(fallbackDbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const db = readLocalDb();
    db[orderId] = record;
    fs.writeFileSync(fallbackDbPath, JSON.stringify(db, null, 2));
  } catch (error) {
    // Read-only filesystems (serverless) are expected — Sheets is the system of record there.
    console.warn("Local ledger write skipped:", error);
  }
}

function getLocalRecord(orderId: string): RFQRecord | null {
  return readLocalDb()[orderId] || null;
}

/* ------------------------------------------------------------------ *
 * Google Sheets client
 * ------------------------------------------------------------------ */

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

/** Creates the tab if absent and writes the header row when row 1 is empty. */
async function ensureSheet(
  client: NonNullable<Awaited<ReturnType<typeof getSheetsClient>>>,
  title: string
) {
  const { sheets, spreadsheetId } = client;

  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = meta.data.sheets?.some((s) => s.properties?.title === title);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title } } }],
      },
    });
  }

  const firstRow = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${title}!A1:AB1`,
  });

  if (!firstRow.data.values || firstRow.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${title}!A1:AB1`,
      valueInputOption: "RAW",
      requestBody: { values: [[...SHEET_HEADERS]] },
    });
  }
}

/* ------------------------------------------------------------------ *
 * Row <-> record mapping
 * ------------------------------------------------------------------ */

function recordToRow(record: RFQRecord): (string | number)[] {
  return [
    record.timestamp,
    record.orderNumber,
    record.orderId,
    record.status,
    record.firmName,
    record.gstNumber,
    record.contactName,
    record.phoneNumber,
    record.email,
    record.address,
    record.city,
    record.state,
    record.pincode,
    record.items
      .map((i) => `${i.sku} | ${i.partName} | Qty ${i.quantity}`)
      .join("\n"),
    record.totalQuantity,
    record.estimatedValue,
    appConfig.purchaseModes[record.purchaseMode] || record.purchaseMode,
    appConfig.paymentModes[record.paymentMode] || record.paymentMode,
    record.advanceOptIn ? "YES" : "NO",
    record.advanceAmount,
    record.advancePercentage,
    record.advancePaymentStatus,
    record.specialInstructions,
    record.responseDeadline,
    record.decidedAt,
    record.rejectionReason,
    record.adminNotes,
    JSON.stringify(record.items),
  ];
}

function parseItems(detailsCell: string, itemsJsonCell: string): RFQItem[] {
  try {
    const parsed = JSON.parse(itemsJsonCell || "");
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Fall through to the human-readable column below.
  }

  return (detailsCell || "")
    .split("\n")
    .map((line) => line.split("|").map((p) => p.trim()))
    .filter((parts) => parts.length >= 3)
    .map((parts) => ({
      sku: parts[0],
      partName: parts[1],
      quantity: parseInt(parts[2].replace(/\D/g, ""), 10) || 0,
    }));
}

function rowToRecord(row: string[]): RFQRecord {
  const purchaseModeCell = row[COL.purchaseMode] || "";
  const purchaseModeKey =
    (Object.keys(appConfig.purchaseModes) as PurchaseMode[]).find(
      (key) => appConfig.purchaseModes[key] === purchaseModeCell || key === purchaseModeCell
    ) || ("DIRECT" as PurchaseMode);

  const paymentModeCell = row[COL.paymentMode] || "";
  const paymentModeKey =
    (Object.keys(appConfig.paymentModes) as PaymentMode[]).find(
      (key) => appConfig.paymentModes[key] === paymentModeCell || key === paymentModeCell
    ) || ("FULL_ON_DELIVERY" as PaymentMode);

  return {
    timestamp: row[COL.timestamp] || "",
    orderNumber: row[COL.orderNumber] || "",
    orderId: row[COL.orderId] || "",
    status: (row[COL.status] || "PENDING") as OrderStatus,
    firmName: row[COL.firmName] || "",
    gstNumber: row[COL.gstNumber] || "",
    contactName: row[COL.contactName] || "",
    phoneNumber: row[COL.phoneNumber] || "",
    email: row[COL.email] || "",
    address: row[COL.address] || "",
    city: row[COL.city] || "",
    state: row[COL.state] || "",
    pincode: row[COL.pincode] || "",
    items: parseItems(row[COL.items], row[COL.itemsJson]),
    totalQuantity: Number(row[COL.totalQuantity]) || 0,
    estimatedValue: Number(row[COL.estimatedValue]) || 0,
    purchaseMode: purchaseModeKey,
    paymentMode: paymentModeKey,
    advanceOptIn: (row[COL.advanceOptIn] || "").toUpperCase() === "YES",
    advanceAmount: Number(row[COL.advanceAmount]) || 0,
    advancePercentage: Number(row[COL.advancePercentage]) || 0,
    advancePaymentStatus: (row[COL.advancePaymentStatus] ||
      "NOT_APPLICABLE") as AdvancePaymentStatus,
    specialInstructions: row[COL.specialInstructions] || "",
    responseDeadline: row[COL.responseDeadline] || "",
    decidedAt: row[COL.decidedAt] || "",
    rejectionReason: row[COL.rejectionReason] || "",
    adminNotes: row[COL.adminNotes] || "",
  };
}

/* ------------------------------------------------------------------ *
 * Public API
 * ------------------------------------------------------------------ */

export async function appendRFQRow(record: RFQRecord): Promise<void> {
  // Always keep the local copy — it backs the admin portal when Sheets is offline.
  writeLocalRecord(record.orderId, record);

  const client = await getSheetsClient();
  if (!client) {
    console.warn("Google Sheets not configured. RFQ stored in local ledger only.");
    return;
  }

  try {
    await ensureSheet(client, RFQ_SHEET);
    await client.sheets.spreadsheets.values.append({
      spreadsheetId: client.spreadsheetId,
      range: RFQ_RANGE,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [recordToRow(record)] },
    });
  } catch (error) {
    console.error("Google Sheets append failed; local ledger retains the record:", error);
  }
}

export async function getRFQRow(orderId: string): Promise<RFQRecord | null> {
  const client = await getSheetsClient();
  if (!client) return getLocalRecord(orderId);

  try {
    const res = await client.sheets.spreadsheets.values.get({
      spreadsheetId: client.spreadsheetId,
      range: RFQ_RANGE,
    });

    const rows = (res.data.values || []) as string[][];
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][COL.orderId] === orderId) return rowToRecord(rows[i]);
    }
    return getLocalRecord(orderId);
  } catch (error) {
    console.error("Google Sheets fetch failed; falling back to local ledger:", error);
    return getLocalRecord(orderId);
  }
}

/** Every RFQ, newest first. Backs the admin order history and billing views. */
export async function listRFQRows(): Promise<RFQRecord[]> {
  const client = await getSheetsClient();

  if (client) {
    try {
      const res = await client.sheets.spreadsheets.values.get({
        spreadsheetId: client.spreadsheetId,
        range: RFQ_RANGE,
      });
      const rows = (res.data.values || []) as string[][];
      const records = rows
        .slice(1)
        .filter((row) => row[COL.orderId])
        .map(rowToRecord);
      if (records.length > 0) {
        return records.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
      }
    } catch (error) {
      console.error("Google Sheets list failed; falling back to local ledger:", error);
    }
  }

  return Object.values(readLocalDb()).sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp)
  );
}

export async function updateRFQRowStatus(
  orderId: string,
  status: OrderStatus,
  updates?: Partial<Omit<RFQRecord, "orderId" | "status">>
): Promise<RFQRecord | null> {
  const local = getLocalRecord(orderId);
  let merged: RFQRecord | null = local
    ? { ...local, status, ...updates }
    : null;
  if (merged) writeLocalRecord(orderId, merged);

  const client = await getSheetsClient();
  if (!client) return merged;

  try {
    const res = await client.sheets.spreadsheets.values.get({
      spreadsheetId: client.spreadsheetId,
      range: RFQ_RANGE,
    });

    const rows = (res.data.values || []) as string[][];
    let rowNumber = -1;
    let existing: RFQRecord | null = null;

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][COL.orderId] === orderId) {
        rowNumber = i + 1; // 1-based, header occupies row 1
        existing = rowToRecord(rows[i]);
        break;
      }
    }

    if (!existing) {
      console.warn(`Order ${orderId} not present in Sheets; local ledger updated only.`);
      return merged;
    }

    merged = { ...existing, ...merged, status, ...updates };

    await client.sheets.spreadsheets.values.update({
      spreadsheetId: client.spreadsheetId,
      range: `${RFQ_SHEET}!A${rowNumber}:AB${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: { values: [recordToRow(merged)] },
    });

    writeLocalRecord(orderId, merged);
    return merged;
  } catch (error) {
    console.error("Google Sheets update failed; status changed locally:", error);
    return merged;
  }
}

/**
 * Mirrors an accepted order into the confirmed-orders ledger so the sheet has a
 * clean tab containing only real orders, separate from the full RFQ audit trail.
 */
export async function appendConfirmedOrder(record: RFQRecord): Promise<void> {
  const client = await getSheetsClient();
  if (!client) return;

  try {
    await ensureSheet(client, ORDERS_SHEET);
    await client.sheets.spreadsheets.values.append({
      spreadsheetId: client.spreadsheetId,
      range: ORDERS_RANGE,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [recordToRow(record)] },
    });
  } catch (error) {
    console.error("Confirmed order ledger append failed:", error);
  }
}
