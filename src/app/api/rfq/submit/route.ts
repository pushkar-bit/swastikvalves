import { NextResponse } from "next/server";
import crypto from "crypto";
import { appendRFQRow } from "@/lib/sheets";
import { generateAdminToken } from "@/lib/tokens";
import { transporter } from "@/lib/email";
import { appConfig } from "@/config/appConfig";
import * as z from "zod";

const rfqSchema = z.object({
  contactName: z.string().min(2),
  firmName: z.string().min(2),
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
  location: z.string().min(10),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{7,14}$/),
  email: z.string().email().refine(
    (val) => {
      const domain = val.split("@")[1]?.toLowerCase();
      return !appConfig.genericDomains.includes(domain);
    },
    { message: "Corporate email required" }
  ),
  items: z.array(
    z.object({
      sku: z.string().min(1),
      partName: z.string().min(1),
      quantity: z.number().int().min(1),
    })
  ).min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = rfqSchema.parse(body);

    const orderId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const adminToken = generateAdminToken(orderId);

    await appendRFQRow({
      orderId,
      timestamp,
      firmName: validatedData.firmName,
      gstNumber: validatedData.gstNumber,
      contactName: validatedData.contactName,
      email: validatedData.email,
      phoneNumber: validatedData.phoneNumber,
      location: validatedData.location,
      items: validatedData.items,
      status: appConfig.statusEnums.PENDING,
      adminToken,
      expiryDate: "",
      advancePaymentStatus: appConfig.advanceStatusEnums.UNPAID,
    });

    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const approveUrl = `${protocol}://${host}/api/admin/approve-quote?token=${adminToken}`;

    const itemsHtml = validatedData.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-family: monospace;">${item.sku}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.partName}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${item.quantity}</td>
      </tr>
    `
      )
      .join("");

    const mailOptions = {
      from: process.env.SMTP_USER || appConfig.defaults.emailFrom,
      to: process.env.SMTP_TO || appConfig.defaults.emailTo,
      subject: `[RFQ PENDING] New Quote Request from ${validatedData.firmName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #0D1B2A; border-bottom: 2px solid #E76F00; padding-bottom: 10px;">New B2B RFQ Submitted</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 140px;">Firm Name:</td>
              <td style="padding: 6px 0;">${validatedData.firmName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Contact Name:</td>
              <td style="padding: 6px 0;">${validatedData.contactName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Corporate Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 6px 0;"><a href="tel:${validatedData.phoneNumber}">${validatedData.phoneNumber}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Shipping Destination:</td>
              <td style="padding: 6px 0;">${validatedData.location}</td>
            </tr>
          </table>

          <h3 style="color: #0D1B2A; margin-top: 30px;">Items Requested:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">SKU</th>
                <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Part Name</th>
                <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="text-align: center; margin-top: 40px;">
            <a href="${approveUrl}" style="background-color: #E76F00; color: #fff; text-decoration: none; padding: 12px 30px; font-weight: bold; border-radius: 6px; box-shadow: 0 4px 6px rgba(231,111,0,0.15);">
              Approve RFQ & Generate Customer Link
            </a>
          </div>

          <p style="font-size: 11px; color: #666; margin-top: 45px; text-align: center; border-t: 1px solid #eee; padding-top: 15px;">
            This order link is securely signed. Clicking approves the quote and calculations natively.
          </p>
        </div>
      `,
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("SMTP credentials not configured. Admin approval link is:", approveUrl);
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("RFQ submission API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Failed to process RFQ submission";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
