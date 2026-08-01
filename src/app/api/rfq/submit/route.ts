import { NextResponse } from "next/server";
import crypto from "crypto";
import * as z from "zod";
import { rfqSchema } from "@/lib/rfqSchema";
import { appendRFQRow, listRFQRows, RFQItem } from "@/lib/sheets";
import { generateDecisionToken } from "@/lib/tokens";
import { sendMail } from "@/lib/email";
import {
  appConfig,
  formatINR,
  getNotifyEmail,
  generateOrderNumber,
  computeAdvancePercentage,
} from "@/config/appConfig";
import { describeSkuAsync, rateForSkuAsync } from "@/lib/productStore";

function requestOrigin(request: Request): string {
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

/** Retries a handful of times on the (very unlikely) chance of a random collision. */
async function uniqueOrderNumber(): Promise<string> {
  const existingNumbers = new Set(
    (await listRFQRows().catch(() => [])).map((r) => r.orderNumber)
  );
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = generateOrderNumber();
    if (!existingNumbers.has(candidate)) return candidate;
  }
  return generateOrderNumber();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = rfqSchema.parse(body);

    const items: RFQItem[] = await Promise.all(
      data.items.map(async (line) => ({
        sku: line.sku,
        partName: await describeSkuAsync(line.sku),
        quantity: line.quantity,
        rate: await rateForSkuAsync(line.sku, appConfig.pricePerUnit),
      }))
    );

    const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
    const estimatedValue = items.reduce((sum, i) => sum + (i.rate || 0) * i.quantity, 0);

    const orderId = crypto.randomUUID();
    const orderNumber = await uniqueOrderNumber();
    const timestamp = new Date().toISOString();
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + appConfig.responseWindowDays);

    const advanceAmount = data.advanceOptIn ? data.advanceAmount : 0;
    const advancePercentage = data.advanceOptIn
      ? computeAdvancePercentage(advanceAmount, estimatedValue)
      : 0;

    await appendRFQRow({
      orderId,
      orderNumber,
      timestamp,
      firmName: data.firmName,
      gstNumber: data.gstNumber,
      contactName: data.contactName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      items,
      totalQuantity,
      estimatedValue,
      purchaseMode: data.purchaseMode,
      paymentMode: data.paymentMode,
      advanceOptIn: data.advanceOptIn,
      advanceAmount,
      advancePercentage,
      advancePaymentStatus: data.advanceOptIn ? "UNPAID" : "NOT_APPLICABLE",
      specialInstructions: data.specialInstructions || "",
      status: "PENDING",
      responseDeadline: deadline.toISOString(),
      decidedAt: "",
      rejectionReason: "",
      adminNotes: "",
    });

    const origin = requestOrigin(request);
    const acceptToken = generateDecisionToken(orderId, "accept");
    const rejectToken = generateDecisionToken(orderId, "reject");
    const acceptUrl = `${origin}/api/rfq/decision?token=${acceptToken}`;
    const rejectUrl = `${origin}/api/rfq/decision?token=${rejectToken}`;

    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="padding:8px;border:1px solid #ddd;font-family:monospace;font-size:12px;">${item.sku}</td>
          <td style="padding:8px;border:1px solid #ddd;">${item.partName}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:right;font-weight:bold;">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatINR(item.rate || 0)}</td>
        </tr>`
      )
      .join("");

    const advanceLine = data.advanceOptIn
      ? `<strong>${formatINR(advanceAmount)}</strong> (${advancePercentage}% of order value) advance offered by buyer`
      : "No advance offered";

    const fullAddress = `${data.address}, ${data.city}, ${data.state} - ${data.pincode}`;

    await sendMail({
      to: getNotifyEmail(),
      subject: `New Quote Request [${orderNumber}] — ${data.firmName} — Action Required`,
      replyTo: data.email,
      html: `
        <div style="font-family:sans-serif;max-width:640px;margin:0 auto;color:#111;">
          <h2 style="color:#0D1B2A;border-bottom:2px solid #E76F00;padding-bottom:10px;">New B2B RFQ Submitted</h2>

          <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:13px;">
            <tr><td style="padding:6px 0;font-weight:bold;width:160px;">Order Number:</td><td>${orderNumber}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Firm Name:</td><td>${data.firmName}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">GST Number:</td><td style="font-family:monospace;">${data.gstNumber}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Contact Name:</td><td>${data.contactName}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Phone:</td><td><a href="tel:${data.phoneNumber}">${data.phoneNumber}</a></td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Delivery Address:</td><td>${fullAddress}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Mode of Purchase:</td><td>${appConfig.purchaseModes[data.purchaseMode]}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Payment Mode:</td><td>${appConfig.paymentModes[data.paymentMode]}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Advance:</td><td>${advanceLine}</td></tr>
            ${
              data.specialInstructions
                ? `<tr><td style="padding:6px 0;font-weight:bold;">Special Instructions:</td><td>${data.specialInstructions}</td></tr>`
                : ""
            }
          </table>

          <h3 style="color:#0D1B2A;margin-top:24px;">Order Requested:</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:13px;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:8px;border:1px solid #ddd;text-align:left;">SKU</th>
                <th style="padding:8px;border:1px solid #ddd;text-align:left;">Item</th>
                <th style="padding:8px;border:1px solid #ddd;text-align:right;">Qty</th>
                <th style="padding:8px;border:1px solid #ddd;text-align:right;">Rate (Indicative)</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <p style="text-align:right;font-weight:bold;font-size:15px;color:#0D1B2A;">
            Estimated Order Value: ${formatINR(estimatedValue)}
          </p>

          <div style="background:#fff8f0;border-left:4px solid #E76F00;padding:12px;margin:20px 0;font-size:13px;">
            The buyer has been told to expect a decision within <strong>${appConfig.responseWindowDays} days</strong>
            (by ${deadline.toLocaleDateString("en-IN")}). Click one button below to respond — the buyer is emailed
            automatically the moment you decide.
          </div>

          <div style="text-align:center;margin-top:30px;">
            <a href="${acceptUrl}" style="background:#16a34a;color:#fff;text-decoration:none;padding:12px 28px;font-weight:bold;border-radius:6px;margin:0 8px;display:inline-block;">
              ✓ Accept Quote
            </a>
            <a href="${rejectUrl}" style="background:#dc2626;color:#fff;text-decoration:none;padding:12px 28px;font-weight:bold;border-radius:6px;margin:0 8px;display:inline-block;">
              ✕ Reject Quote
            </a>
          </div>

          <p style="font-size:11px;color:#666;margin-top:40px;text-align:center;border-top:1px solid #eee;padding-top:15px;">
            Order Number: ${orderNumber} — Swastik Valves India RFQ Ledger
          </p>
        </div>
      `,
    });

    await sendMail({
      to: data.email,
      subject: `Quote Received — Order ${orderNumber} | Swastik Valves India`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111;">
          <h2 style="color:#0D1B2A;border-bottom:2px solid #E76F00;padding-bottom:10px;">Thank You for Your RFQ</h2>
          <p>Dear ${data.contactName},</p>
          <p>We've received your Request for Quote at <strong>Swastik Valves India</strong>. Here's a summary:</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:13px;">
            <tr><td style="padding:6px 0;font-weight:bold;width:160px;">Order Number:</td><td>${orderNumber}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Items:</td><td>${totalQuantity} unit(s) across ${items.length} line item(s)</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Estimated Value:</td><td>${formatINR(estimatedValue)}</td></tr>
          </table>
          <p>Your quote is under review. You will receive a response within <strong>${appConfig.responseWindowDays} business days</strong>
          — by <strong>${deadline.toLocaleString("en-IN")}</strong>.</p>
          <p style="font-size:12px;color:#666;margin-top:30px;">
            Questions in the meantime? Contact us at ${appConfig.notifyEmail} or +91-98156-52779.
          </p>
          <p style="font-size:12px;color:#666;margin-top:20px;border-top:1px solid #eee;padding-top:15px;">
            Swastik Valves India | Plot. 1240, St. No: 41, Janta Nagar, Ludhiana - 141003, Punjab
          </p>
        </div>`,
    });

    return NextResponse.json({ success: true, orderId, orderNumber, estimatedValue, responseDeadline: deadline.toISOString() });
  } catch (error) {
    console.error("RFQ submission API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Failed to process RFQ submission";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
