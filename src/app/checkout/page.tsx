"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CreditCard, ShieldCheck, CheckCircle2, AlertTriangle, FileText, ArrowLeft } from "lucide-react";
import { RFQRecord } from "@/lib/sheets";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState<RFQRecord | null>(null);
  const [expired, setExpired] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Payment States
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  
  // Form input states (Simulated Card)
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [formError, setFormError] = useState("");

  // Price calculations
  const [totalPrice, setTotalPrice] = useState(0);
  const [advancePrice, setAdvancePrice] = useState(0);
  const [balancePrice, setBalancePrice] = useState(0);

  useEffect(() => {
    if (!token) {
      setErrorMsg("Checkout validation token is missing from the query path.");
      setLoading(false);
      return;
    }

    const validateToken = async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, createIntent: true }),
        });

        const data = await res.json();
        if (res.ok) {
          if (data.expired) {
            setExpired(true);
            setRecord(data.record);
          } else {
            setRecord(data.record);
            // Calculate pricing based on item quantities
            const qty = data.record.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
            const unitPrice = 10000; // INR 10,000 per valve
            const total = qty * unitPrice;
            setTotalPrice(total);
            setAdvancePrice(Math.round(total * 0.4));
            setBalancePrice(Math.round(total * 0.6));
          }
        } else {
          setErrorMsg(data.error || "Failed to validate secure token.");
        }
      } catch {
        setErrorMsg("Failed to connect to checkout verification server.");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSimulatedPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!cardName.trim()) {
      setFormError("Cardholder name is required.");
      return;
    }
    const cleanNum = cardNumber.replace(/\s+/g, "");
    if (cleanNum.length !== 16 || isNaN(Number(cleanNum))) {
      setFormError("Please enter a valid 16-digit card number.");
      return;
    }
    if (!cardExpiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      setFormError("Please enter expiry in MM/YY format.");
      return;
    }
    if (cardCvv.length !== 3 || isNaN(Number(cardCvv))) {
      setFormError("Please enter a valid 3-digit CVV.");
      return;
    }

    setIsPaying(true);
    
    try {
      // Trigger payment webhook update on the backend
      const res = await fetch("/api/payments/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: record?.orderId,
          paymentStatus: "succeeded",
          amountPaid: advancePrice,
        }),
      });

      if (res.ok) {
        setPaySuccess(true);
        if (record) {
          setRecord({
            ...record,
            status: "IN_PRODUCTION",
            advancePaymentStatus: "PARTIAL_40_PAID",
          });
        }
      } else {
        setFormError("Payment gateway rejected authorization. Try another card.");
      }
    } catch {
      setFormError("Failed to verify payment with Swastik ledger servers.");
    } finally {
      setIsPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 border-4 border-slate-200 border-t-brand-orange rounded-full animate-spin" />
        <p className="text-brand-steel text-sm font-semibold tracking-wider uppercase">
          Verifying secure checkout token...
        </p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-brand-navy">Invalid Secure Token</h1>
          <p className="text-brand-steel text-sm font-semibold leading-relaxed max-w-md mx-auto">
            {errorMsg}
          </p>
        </div>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-brand-navy hover:bg-brand-charcoal text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wide transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (expired) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-brand-navy">Quote Expired</h1>
          <p className="text-brand-steel text-sm font-semibold leading-relaxed max-w-md mx-auto">
            The approval token has expired after the 5-day constraint window. This quote has been flagged as expired in our database.
          </p>
        </div>
        <div className="bg-brand-offwhite border border-gray-150 p-4 rounded-xl max-w-sm mx-auto space-y-1.5 text-left text-xs font-mono">
          <div><span className="text-brand-steel">ORDER ID:</span> {record?.orderId}</div>
          <div><span className="text-brand-steel">STATUS:</span> <span className="text-red-600 font-bold">EXPIRED</span></div>
        </div>
        <div className="pt-4">
          <Link
            href="/rfq"
            className="inline-flex items-center justify-center bg-brand-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wide transition-colors shadow-md"
          >
            Submit New Quote Request
          </Link>
        </div>
      </div>
    );
  }

  if (paySuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-brand-navy">Advance Payment Captured!</h1>
          <p className="text-brand-steel text-sm font-semibold leading-relaxed max-w-lg mx-auto">
            Thank you! Your 40% milestone payment has been processed. The order status has been updated to <strong>IN_PRODUCTION</strong>. Production scheduled immediately.
          </p>
        </div>

        <div className="bg-brand-offwhite border border-gray-150 p-6 rounded-xl max-w-md mx-auto text-left text-xs font-mono space-y-2.5">
          <div className="border-b border-gray-200 pb-2 text-brand-navy font-bold flex justify-between items-center text-sm">
            <span>TRANSACTION SUCCESS</span>
            <span className="text-green-600">PARTIAL_40_PAID</span>
          </div>
          <div><span className="text-brand-steel">ORDER ID:</span> {record?.orderId}</div>
          <div><span className="text-brand-steel">FIRM NAME:</span> {record?.firmName}</div>
          <div><span className="text-brand-steel">ADVANCE PAID:</span> INR {advancePrice.toLocaleString()}</div>
          <div><span className="text-brand-steel">DELIVERY BALANCE:</span> INR {balancePrice.toLocaleString()} (60%)</div>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center text-brand-navy hover:text-brand-orange font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-brand-navy text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb006_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb006_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-brand-orange text-xs font-mono tracking-widest uppercase bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
            Secure B2B Ordering Matrix
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-4 tracking-tight leading-none">
            Checkout & Milestone Allocation
          </h1>
          <div className="w-16 h-1 bg-brand-orange rounded mt-4" />
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Order details & breakdown */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Record metadata card */}
            <div className="bg-brand-offwhite border border-gray-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-black text-brand-navy flex items-center">
                <FileText className="w-5 h-5 mr-2 text-brand-orange" />
                Quote Summary
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-brand-navy">
                <div>
                  <span className="text-brand-steel block uppercase tracking-wider text-[9px] mb-1">Company / Firm</span>
                  <span className="text-sm font-extrabold">{record?.firmName}</span>
                </div>
                <div>
                  <span className="text-brand-steel block uppercase tracking-wider text-[9px] mb-1">Contact Officer</span>
                  <span className="text-sm font-extrabold">{record?.contactName}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-brand-steel block uppercase tracking-wider text-[9px] mb-1">Shipping & Freight Location</span>
                  <span className="text-sm font-extrabold">{record?.location}</span>
                </div>
                <div>
                  <span className="text-brand-steel block uppercase tracking-wider text-[9px] mb-1">Order Ref ID</span>
                  <span className="font-mono text-xs text-brand-steel font-bold">{record?.orderId}</span>
                </div>
                <div>
                  <span className="text-brand-steel block uppercase tracking-wider text-[9px] mb-1">Order Status</span>
                  <span className="text-brand-orange uppercase font-black tracking-wide text-xs">{record?.status}</span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-brand-navy text-white text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">SKU</th>
                    <th className="p-4">Part / Product Name</th>
                    <th className="p-4 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 text-xs font-semibold text-brand-navy">
                  {record?.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-brand-offwhite/50">
                      <td className="p-4 font-mono text-[10px] text-brand-steel">{item.sku}</td>
                      <td className="p-4">{item.partName}</td>
                      <td className="p-4 text-right font-bold">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Milestone payment info box */}
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-amber-800 space-y-3">
              <h4 className="font-black text-sm flex items-center text-amber-900">
                <ShieldCheck className="w-5 h-5 mr-2 text-brand-orange" />
                B2B Milestone Payment Split Agreement
              </h4>
              <p className="text-xs font-semibold leading-relaxed">
                Industrial production requires sourcing heavy material castings. Exactly <strong>40% of the total amount</strong> is due as a production advance. The remaining <strong>60% balance</strong> will be billed upon freight dispatch/delivery.
              </p>
            </div>

          </div>

          {/* Right Column: Calculations & Stripe Collector */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Invoice Breakdown */}
            <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-md space-y-5">
              <h3 className="text-base font-black tracking-wide border-b border-white/10 pb-3 uppercase">Milestone Allocation</h3>
              
              <div className="space-y-3 font-semibold text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-steel">Total Quotation:</span>
                  <span className="font-bold">INR {totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-white/5 my-2" />
                
                <div className="flex justify-between text-orange-400 font-bold bg-white/5 p-3 rounded-lg border border-orange-500/10">
                  <span>Advance Payment (40%):</span>
                  <span>INR {advancePrice.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-brand-steel text-xs">
                  <span>Balance Due (60%):</span>
                  <span>INR {balancePrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Simulated Payment Form */}
            <div className="bg-brand-offwhite border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-brand-orange" />
                <h4 className="text-sm font-black text-brand-navy uppercase tracking-wider">Milestone Advance Payment</h4>
              </div>

              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-start space-x-2 font-bold">
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSimulatedPayment} className="space-y-4">
                {/* Cardholder */}
                <div>
                  <label className="text-[10px] font-bold text-brand-navy mb-1.5 block uppercase tracking-wider">Cardholder Name *</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-semibold focus:ring-1 focus:ring-brand-orange bg-white outline-none"
                    placeholder="Enter Cardholder Name"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="text-[10px] font-bold text-brand-navy mb-1.5 block uppercase tracking-wider">Card Number *</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-semibold focus:ring-1 focus:ring-brand-orange bg-white outline-none"
                    placeholder="16-digit credit card number"
                  />
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-brand-navy mb-1.5 block uppercase tracking-wider">Expiry (MM/YY) *</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-semibold focus:ring-1 focus:ring-brand-orange bg-white outline-none"
                      placeholder="12/28"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-brand-navy mb-1.5 block uppercase tracking-wider">CVV / CVC *</label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-semibold focus:ring-1 focus:ring-brand-orange bg-white outline-none"
                      placeholder="123"
                    />
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="flex items-center space-x-2 text-[10px] text-brand-steel font-bold pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Payments encrypted securely via AES-256 SSL algorithms</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isPaying}
                  className="w-full inline-flex items-center justify-center bg-brand-orange text-white hover:bg-orange-600 py-3.5 rounded-lg font-bold text-sm tracking-wide shadow-md transition-colors disabled:bg-brand-orange/60"
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Authorizing Advance (40%)...
                    </>
                  ) : (
                    `Pay Advance Payment (INR ${advancePrice.toLocaleString()})`
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
