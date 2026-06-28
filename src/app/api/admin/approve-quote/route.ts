import { NextRequest, NextResponse } from "next/server";
import { getRFQRow, updateRFQRowStatus } from "@/lib/sheets";
import { verifyAdminToken, generateCustomerToken } from "@/lib/tokens";
import { transporter } from "@/lib/email";
import { appConfig } from "@/config/appConfig";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse(
      "<html><body><h2>Invalid Request</h2><p>Missing required action token.</p></body></html>",
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const payload = verifyAdminToken(token);
  if (!payload || payload.action !== "approve") {
    return new NextResponse(
      "<html><body><h2>Access Denied</h2><p>The admin token is invalid, tampered, or expired.</p></body></html>",
      { status: 403, headers: { "Content-Type": "text/html" } }
    );
  }

  const { orderId } = payload;

  const record = await getRFQRow(orderId);
  if (!record) {
    return new NextResponse(
      "<html><body><h2>Not Found</h2><p>Quote record not found in system database.</p></body></html>",
      { status: 404, headers: { "Content-Type": "text/html" } }
    );
  }

  if (record.status !== appConfig.statusEnums.PENDING) {
    return new NextResponse(
      `<html><body><h2>Quote Processed</h2><p>This quote is currently in status: <strong>${record.status}</strong> and cannot be re-approved.</p></body></html>`,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 5);
  const expiryString = expiryDate.toISOString();

  const customerToken = generateCustomerToken(orderId);

  await updateRFQRowStatus(orderId, appConfig.statusEnums.GRANTED, {
    expiryDate: expiryString,
    adminToken: customerToken,
  });

  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const checkoutUrl = `${protocol}://${host}/checkout?token=${customerToken}`;

  const customerMailOptions = {
    from: process.env.SMTP_USER || appConfig.defaults.emailFrom,
    to: record.email,
    subject: `Swastik Valves Quote Granted — Ref: ${orderId.slice(0, 8)}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <h2 style="color: #0D1B2A; border-bottom: 2px solid #E76F00; padding-bottom: 10px;">Your Quote Request is Approved</h2>
        
        <p>Dear ${record.contactName},</p>
        
        <p>We are pleased to inform you that your Request for Quote at <strong>Swastik Valves India</strong> has been processed and approved by our engineering division.</p>
        
        <p>Please note that this quote has a strict validation window and will expire on:</p>
        <div style="background-color: #fff8f0; border-left: 4px solid #E76F00; padding: 12px; margin: 20px 0; font-weight: bold; color: #b25300;">
          Quote Expiry: ${expiryDate.toLocaleString()} (5 Days)
        </div>

        <p>To view your quote items, review the milestone payment details (40% Advance / 60% Balance), and make the payment to trigger production, click the secure checkout link below:</p>

        <div style="text-align: center; margin: 35px 0;">
          <a href="${checkoutUrl}" style="background-color: #0D1B2A; color: #fff; text-decoration: none; padding: 12px 30px; font-weight: bold; border-radius: 6px; display: inline-block;">
            Open Secure Checkout Portal
          </a>
        </div>

        <p style="font-size: 12px; color: #666; margin-top: 40px; border-top: 1px solid #eee; padding-top: 15px;">
          Swastik Valves India | Corporate Office: Plot. 1240, St. No: 41, Janta Nagar, Ludhiana - 141003, Punjab
        </p>
      </div>
    `,
  };

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    await transporter.sendMail(customerMailOptions);
  } else {
    console.warn("SMTP credentials not configured. Customer checkout link is:", checkoutUrl);
  }

  return new NextResponse(
    `<html>
      <head>
        <title>Quote Approved</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: sans-serif; text-align: center; padding: 50px 20px; background-color: #F8F9FA; color: #0D1B2A; }
          .card { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; border: 1px solid #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          h2 { color: #E76F00; margin-top: 0; }
          p { color: #555; font-size: 14px; line-height: 1.6; }
          .btn { background: #0D1B2A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: bold; display: inline-block; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Quote Approved Successfully</h2>
          <p>Order Reference: <strong>${orderId}</strong></p>
          <p>The quote status has been updated to <strong>GRANTED</strong>. A secure 5-day checkout link has been generated and dispatched to the customer's email (<strong>${record.email}</strong>).</p>
          <a href="${checkoutUrl}" target="_blank" class="btn">View Customer Checkout View</a>
        </div>
      </body>
    </html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
