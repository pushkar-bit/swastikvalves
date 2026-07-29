import { NextRequest, NextResponse } from "next/server";
import { listRFQRows, updateRFQRowStatus } from "@/lib/sheets";
import { sendMail } from "@/lib/email";
import { appConfig } from "@/config/appConfig";

export const dynamic = "force-dynamic";

/**
 * Hourly sweep (see vercel.json) that flips overdue PENDING quotes to EXPIRED
 * and lets the buyer know, since a missed 5-day deadline shouldn't just sit
 * silently — the buyer was told to expect one of three outcomes, not none.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const authHeader = request.headers.get("authorization");
    const provided = authHeader?.replace(/^Bearer\s+/i, "") || request.nextUrl.searchParams.get("secret");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const orders = await listRFQRows();
  const now = Date.now();
  const overdue = orders.filter(
    (o) => o.status === "PENDING" && o.responseDeadline && new Date(o.responseDeadline).getTime() < now
  );

  const results: { orderNumber: string; ok: boolean }[] = [];

  for (const order of overdue) {
    try {
      await updateRFQRowStatus(order.orderId, "EXPIRED", { decidedAt: new Date().toISOString() });

      await sendMail({
        to: order.email,
        subject: `Quote Expired — ${order.orderNumber} | Swastik Valves India`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111;">
            <h2 style="color:#6b7280;border-bottom:2px solid #6b7280;padding-bottom:10px;">Quote Expired</h2>
            <p>Dear ${order.contactName},</p>
            <p>Your Request for Quote <strong>${order.orderNumber}</strong> at Swastik Valves India has expired
            after the ${appConfig.responseWindowDays}-day review window without a decision being recorded.</p>
            <p>We'd still like to work with ${order.firmName} — please feel free to submit a fresh RFQ, or
            contact us directly at ${appConfig.notifyEmail} / +91-98156-52779 and we'll pick it up personally.</p>
            <p style="font-size:12px;color:#666;margin-top:30px;border-top:1px solid #eee;padding-top:15px;">
              Swastik Valves India | Plot. 1240, St. No: 41, Janta Nagar, Ludhiana - 141003, Punjab
            </p>
          </div>`,
      });

      results.push({ orderNumber: order.orderNumber, ok: true });
    } catch (error) {
      console.error(`Failed to expire order ${order.orderNumber}:`, error);
      results.push({ orderNumber: order.orderNumber, ok: false });
    }
  }

  return NextResponse.json({ checked: orders.length, expired: results.length, results });
}
