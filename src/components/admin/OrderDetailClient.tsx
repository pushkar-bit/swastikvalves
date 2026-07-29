"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Loader2,
  Download,
  Save,
} from "lucide-react";
import { RFQRecord } from "@/lib/sheets";
import { appConfig, formatINR } from "@/config/appConfig";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  ORDER_PLACED: "bg-green-100 text-green-800 border-green-200",
  GRANTED: "bg-green-100 text-green-800 border-green-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
  EXPIRED: "bg-gray-200 text-gray-700 border-gray-300",
};

function isOverdue(record: RFQRecord) {
  return (
    record.status === "PENDING" &&
    record.responseDeadline &&
    new Date(record.responseDeadline).getTime() < Date.now()
  );
}

export default function OrderDetailClient({ record: initial }: { record: RFQRecord }) {
  const [record, setRecord] = useState(initial);
  const [adminNotes, setAdminNotes] = useState(initial.adminNotes);
  const [rejectionReason, setRejectionReason] = useState(initial.rejectionReason);
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [deciding, setDeciding] = useState<"accept" | "reject" | null>(null);
  const [confirmingReject, setConfirmingReject] = useState(false);
  const [error, setError] = useState("");

  const displayStatus = isOverdue(record) ? "EXPIRED" : record.status;
  const fullAddress = `${record.address}, ${record.city}, ${record.state} - ${record.pincode}`;

  const saveNotes = async () => {
    setSavingNotes(true);
    setNotesSaved(false);
    try {
      const res = await fetch(`/api/admin/orders/${record.orderId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes, rejectionReason }),
      });
      if (res.ok) {
        setRecord((prev) => ({ ...prev, adminNotes, rejectionReason }));
        setNotesSaved(true);
        window.setTimeout(() => setNotesSaved(false), 2000);
      }
    } finally {
      setSavingNotes(false);
    }
  };

  const decide = async (decision: "accept" | "reject") => {
    setError("");
    setDeciding(decision);
    try {
      const res = await fetch(`/api/admin/orders/${record.orderId}/decide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, rejectionReason: decision === "reject" ? rejectionReason : undefined }),
      });
      const data = await res.json();
      if (res.ok && data.record) {
        setRecord(data.record);
        setConfirmingReject(false);
      } else {
        setError(data.error || "Failed to apply decision.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setDeciding(null);
    }
  };

  const markAdvance = async (status: string) => {
    const res = await fetch(`/api/admin/orders/${record.orderId}/advance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ advancePaymentStatus: status }),
    });
    if (res.ok) {
      setRecord((prev) => ({ ...prev, advancePaymentStatus: status as RFQRecord["advancePaymentStatus"] }));
    }
  };

  const timelineSteps = [
    { label: "Submitted", done: true, at: record.timestamp },
    {
      label: displayStatus === "REJECTED" ? "Rejected" : displayStatus === "EXPIRED" ? "Expired" : "Under Review",
      done: record.status !== "PENDING" || displayStatus === "EXPIRED",
      at: displayStatus === "PENDING" ? "" : record.decidedAt,
    },
    {
      label: record.status === "ORDER_PLACED" || record.status === "GRANTED" ? "Order Placed" : "Decision",
      done: record.status === "ORDER_PLACED" || record.status === "GRANTED" || record.status === "REJECTED",
      at: record.decidedAt,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-offwhite">
      <header className="bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center text-brand-steel hover:text-white text-xs font-bold mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Dashboard
            </Link>
            <h1 className="font-black text-xl leading-none">{record.orderNumber}</h1>
            <p className="text-brand-steel text-xs font-semibold mt-1">{record.firmName}</p>
          </div>
          <span
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
              STATUS_STYLES[displayStatus] || "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {displayStatus}
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg font-bold">
            {error}
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            {timelineSteps.map((step, idx) => (
              <div key={step.label} className="flex-1 flex items-center">
                <div className="flex flex-col items-center text-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      step.done
                        ? "bg-brand-navy border-brand-navy text-white"
                        : "bg-white border-gray-300 text-gray-300"
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-bold text-brand-navy mt-2 uppercase tracking-wider">
                    {step.label}
                  </span>
                  {step.at && (
                    <span className="text-[9px] text-brand-steel font-semibold mt-0.5">
                      {new Date(step.at).toLocaleDateString("en-IN")}
                    </span>
                  )}
                </div>
                {idx < timelineSteps.length - 1 && (
                  <div className={`h-0.5 flex-1 -mt-6 ${step.done ? "bg-brand-navy" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Accept / Reject actions */}
        {record.status === "PENDING" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider">Decision</h3>
            {!confirmingReject ? (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => decide("accept")}
                  disabled={deciding !== null}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-60"
                >
                  {deciding === "accept" ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Accept Order
                </button>
                <button
                  onClick={() => setConfirmingReject(true)}
                  disabled={deciding !== null}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-60"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Order
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-xs font-bold text-brand-navy block uppercase tracking-wider">
                  Rejection Reason (optional, included in the buyer&apos;s email)
                </label>
                <textarea
                  rows={2}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange"
                  placeholder="e.g. Quantities below our minimum order value for this material grade"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => decide("reject")}
                    disabled={deciding !== null}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-60"
                  >
                    {deciding === "reject" ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                    Confirm Rejection
                  </button>
                  <button
                    onClick={() => setConfirmingReject(false)}
                    className="text-xs font-bold text-brand-steel hover:text-brand-navy px-3"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Buyer details */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">Contact Name</span>
            <span className="font-bold text-brand-navy">{record.contactName}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">Firm Name</span>
            <span className="font-bold text-brand-navy">{record.firmName}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">GST Number</span>
            <span className="font-mono font-bold text-brand-navy">{record.gstNumber}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">Phone</span>
            <span className="font-bold text-brand-navy">{record.phoneNumber}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">Email</span>
            <span className="font-bold text-brand-navy">{record.email}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">Delivery Address</span>
            <span className="font-bold text-brand-navy">{fullAddress}</span>
          </div>
        </div>

        {/* Order items */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="p-6 pb-0 flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-orange" />
            <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider">Order Items</h3>
          </div>
          <table className="w-full border-collapse text-left mt-4">
            <thead>
              <tr className="bg-brand-offwhite text-brand-navy text-[10px] font-bold uppercase tracking-wider">
                <th className="p-3">SKU</th>
                <th className="p-3">Item</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Rate</th>
                <th className="p-3 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {record.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-mono text-[10px] text-brand-steel">{item.sku}</td>
                  <td className="p-3 font-semibold text-brand-navy">{item.partName}</td>
                  <td className="p-3 text-right font-bold">{item.quantity}</td>
                  <td className="p-3 text-right">{formatINR(item.rate || 0)}</td>
                  <td className="p-3 text-right font-bold">{formatINR((item.rate || 0) * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-brand-offwhite flex justify-between text-sm font-black text-brand-navy">
            <span>Estimated Order Value</span>
            <span>{formatINR(record.estimatedValue)}</span>
          </div>
        </div>

        {/* Purchase / payment / advance */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">Mode of Purchase</span>
            <span className="font-bold text-brand-navy">{appConfig.purchaseModes[record.purchaseMode]}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">Payment Mode</span>
            <span className="font-bold text-brand-navy">{appConfig.paymentModes[record.paymentMode]}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">Advance</span>
            {record.advanceOptIn ? (
              <span className="font-bold text-brand-navy">
                {formatINR(record.advanceAmount)} ({record.advancePercentage}%)
              </span>
            ) : (
              <span className="font-bold text-brand-steel">Not Offered</span>
            )}
          </div>
          {record.advanceOptIn && (
            <div>
              <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">
                Advance Payment Status
              </span>
              <select
                value={record.advancePaymentStatus}
                onChange={(e) => markAdvance(e.target.value)}
                className="text-xs font-bold border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-1 focus:ring-brand-orange bg-white"
              >
                {Object.keys(appConfig.advanceStatusEnums).map((key) => (
                  <option key={key} value={key}>
                    {key.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
          )}
          {record.specialInstructions && (
            <div className="md:col-span-2">
              <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1">
                Special Instructions
              </span>
              <p className="text-brand-navy font-medium">{record.specialInstructions}</p>
            </div>
          )}
        </div>

        {/* Admin notes */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider">Internal Admin Notes</h3>
          <textarea
            rows={4}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange"
            placeholder="Internal notes — not visible to the buyer."
          />
          <div className="flex items-center gap-3">
            <button
              onClick={saveNotes}
              disabled={savingNotes}
              className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-charcoal text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors disabled:opacity-60"
            >
              {savingNotes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Notes
            </button>
            {notesSaved && <span className="text-green-600 text-xs font-bold">Saved</span>}
          </div>
        </div>

        {(record.status === "ORDER_PLACED" || record.status === "GRANTED") && (
          <a
            href={`/api/admin/orders/${record.orderId}/bill`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-bold text-sm shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF Bill
          </a>
        )}
      </div>
    </div>
  );
}
