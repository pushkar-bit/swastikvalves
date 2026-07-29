import { getRFQRow, updateRFQRowStatus, appendConfirmedOrder, RFQRecord } from "@/lib/sheets";
import { sendMail } from "@/lib/email";
import { appConfig, formatINR } from "@/config/appConfig";

export type Decision = "accept" | "reject";

export interface DecisionResult {
  ok: boolean;
  code: "APPLIED" | "NOT_FOUND" | "ALREADY_DECIDED";
  record: RFQRecord | null;
}

/**
 * Shared by the emailed accept/reject links (token-authenticated, anonymous
 * admin) and the admin-dashboard Accept/Reject buttons (session-authenticated)
 * so both paths update the ledger and notify the buyer identically.
 */
export async function applyDecision(
  orderId: string,
  decision: Decision,
  rejectionReason?: string
): Promise<DecisionResult> {
  const record = await getRFQRow(orderId);
  if (!record) {
    return { ok: false, code: "NOT_FOUND", record: null };
  }

  if (record.status !== "PENDING") {
    return { ok: false, code: "ALREADY_DECIDED", record };
  }

  const decidedAt = new Date().toISOString();
  const fullAddress = `${record.address}, ${record.city}, ${record.state} - ${record.pincode}`;

  if (decision === "accept") {
    const updated = await updateRFQRowStatus(orderId, "ORDER_PLACED", { decidedAt });
    if (updated) await appendConfirmedOrder(updated);

    await sendMail({
      to: record.email,
      subject: `✅ Order Accepted — ${record.orderNumber} — Swastik Valves India`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111;">
          <h2 style="color:#16a34a;border-bottom:2px solid #16a34a;padding-bottom:10px;">Order Placed Successfully</h2>
          <p>Dear ${record.contactName},</p>
          <p>Good news — your Request for Quote at <strong>Swastik Valves India</strong> has been reviewed and accepted.
          Your order is now confirmed and has been entered into production scheduling.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:13px;">
            <tr><td style="padding:6px 0;font-weight:bold;width:160px;">Order Number:</td><td>${record.orderNumber}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Firm:</td><td>${record.firmName}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Estimated Value:</td><td>${formatINR(record.estimatedValue)}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Mode of Purchase:</td><td>${appConfig.purchaseModes[record.purchaseMode]}</td></tr>
            <tr><td style="padding:6px 0;font-weight:bold;">Payment Mode:</td><td>${appConfig.paymentModes[record.paymentMode]}</td></tr>
            ${
              record.advanceOptIn
                ? `<tr><td style="padding:6px 0;font-weight:bold;">Advance Due:</td><td>${formatINR(record.advanceAmount)} (${record.advancePercentage}%)</td></tr>`
                : ""
            }
          </table>
          <p>Next steps: our team will reach out shortly to coordinate ${
            record.advanceOptIn ? "advance payment and " : ""
          }dispatch logistics to <strong>${fullAddress}</strong>.</p>
          <p style="font-size:12px;color:#666;margin-top:30px;">
            Questions? Contact us at ${appConfig.notifyEmail} or +91-98156-52779.
          </p>
          <p style="font-size:12px;color:#666;margin-top:20px;border-top:1px solid #eee;padding-top:15px;">
            Swastik Valves India | Plot. 1240, St. No: 41, Janta Nagar, Ludhiana - 141003, Punjab
          </p>
        </div>`,
    });

    return { ok: true, code: "APPLIED", record: updated };
  }

  // decision === "reject"
  const updated = await updateRFQRowStatus(orderId, "REJECTED", {
    decidedAt,
    rejectionReason: rejectionReason || record.rejectionReason,
  });

  await sendMail({
    to: record.email,
    subject: `Quote Update — ${record.orderNumber} | Swastik Valves India`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111;">
        <h2 style="color:#dc2626;border-bottom:2px solid #dc2626;padding-bottom:10px;">Quote Update</h2>
        <p>Dear ${record.contactName},</p>
        <p>Thank you for your interest in <strong>Swastik Valves India</strong>. We are unable to fulfill this
        specific Request for Quote (${record.orderNumber}) at this time.</p>
        ${
          rejectionReason
            ? `<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:12px;margin:16px 0;font-size:13px;"><strong>Reason:</strong> ${rejectionReason}</div>`
            : ""
        }
        <p>Please feel free to reach out to our team directly or submit a revised RFQ with adjusted quantities,
        specifications or timelines — we would welcome the opportunity to work with ${record.firmName}.</p>
        <p style="font-size:12px;color:#666;margin-top:30px;">
          Contact us at ${appConfig.notifyEmail} or +91-98156-52779.
        </p>
        <p style="font-size:12px;color:#666;margin-top:20px;border-top:1px solid #eee;padding-top:15px;">
          Swastik Valves India | Plot. 1240, St. No: 41, Janta Nagar, Ludhiana - 141003, Punjab
        </p>
      </div>`,
  });

  return { ok: true, code: "APPLIED", record: updated };
}
