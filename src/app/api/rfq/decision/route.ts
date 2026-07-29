import { NextRequest, NextResponse } from "next/server";
import { verifyDecisionToken } from "@/lib/tokens";
import { applyDecision } from "@/lib/decisionEngine";
import { appConfig } from "@/config/appConfig";

function htmlPage(title: string, accent: string, body: string, status = 200) {
  return new NextResponse(
    `<html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: sans-serif; text-align: center; padding: 50px 20px; background: #F8F9FA; color: #0D1B2A; }
          .card { max-width: 520px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; border: 1px solid #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          h2 { color: ${accent}; margin-top: 0; }
          p { color: #555; font-size: 14px; line-height: 1.6; }
          .mono { font-family: monospace; font-size: 12px; color: #8A9BB0; }
        </style>
      </head>
      <body><div class="card">${body}</div></body>
    </html>`,
    { status, headers: { "Content-Type": "text/html" } }
  );
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return htmlPage(
      "Invalid Link",
      "#dc2626",
      "<h2>Invalid Request</h2><p>This link is missing its action token.</p>",
      400
    );
  }

  const payload = verifyDecisionToken(token);
  if (!payload) {
    return htmlPage(
      "Link Expired",
      "#dc2626",
      `<h2>Link Expired or Invalid</h2><p>This decision link is no longer valid — it may be older than the
       ${appConfig.responseWindowDays}-day response window, or has already been used.</p>`,
      403
    );
  }

  const { orderId, decision } = payload;
  const result = await applyDecision(orderId, decision);

  if (result.code === "NOT_FOUND") {
    return htmlPage(
      "Not Found",
      "#dc2626",
      "<h2>Order Not Found</h2><p>This RFQ record could not be located in the ledger.</p>",
      404
    );
  }

  if (result.code === "ALREADY_DECIDED" && result.record) {
    return htmlPage(
      "Already Decided",
      "#b45309",
      `<h2>Already Processed</h2>
       <p>This quote was already moved to status <strong>${result.record.status}</strong>${
        result.record.decidedAt ? ` on ${new Date(result.record.decidedAt).toLocaleString("en-IN")}` : ""
      }. No further action is needed.</p>
       <p class="mono">Order: ${result.record.orderNumber}</p>`,
      409
    );
  }

  const record = result.record!;

  if (decision === "accept") {
    return htmlPage(
      "Order Accepted",
      "#16a34a",
      `<h2>Order Accepted</h2>
       <p>Status updated to <strong>ORDER_PLACED</strong> and mirrored into the confirmed-orders ledger.
       The buyer has been emailed at <strong>${record.email}</strong> with an "Order Placed Successfully" notice.</p>
       <p class="mono">Order: ${record.orderNumber}</p>`
    );
  }

  return htmlPage(
    "Order Rejected",
    "#dc2626",
    `<h2>Quote Rejected</h2>
     <p>Status updated to <strong>REJECTED</strong>. The buyer has been emailed at <strong>${record.email}</strong>
     with a "Quote Rejected" notice. You can add an internal rejection reason from the admin dashboard order detail page.</p>
     <p class="mono">Order: ${record.orderNumber}</p>`
  );
}
