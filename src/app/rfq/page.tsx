"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { Loader2, CheckCircle2, AlertTriangle, ArrowLeft, ShoppingCart, Clock } from "lucide-react";

import { rfqSchema, RFQFormData } from "@/lib/rfqSchema";
import { appConfig, formatINR } from "@/config/appConfig";
import { useCart } from "@/lib/cart";

export default function RFQPage() {
  const { enrichedLines, itemCount, subtotal, clearCart, isHydrated } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [responseDeadline, setResponseDeadline] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RFQFormData>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      purchaseMode: "DIRECT",
      paymentMode: "FULL_ON_DELIVERY",
      advanceOptIn: false,
      advanceAmount: 0,
      specialInstructions: "",
      items: [],
    },
  });

  // Cart lives client-side only; sync it into the form once localStorage has hydrated.
  useEffect(() => {
    if (isHydrated) {
      setValue(
        "items",
        enrichedLines.map((l) => ({ sku: l.sku, quantity: l.quantity }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, enrichedLines]);

  const advanceOptIn = watch("advanceOptIn");
  const advanceAmountWatch = watch("advanceAmount") || 0;
  const advancePercentageLive =
    subtotal > 0 ? Math.round((advanceAmountWatch / subtotal) * 100) : 0;

  const onSubmit = async (data: RFQFormData) => {
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/rfq/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus("success");
        setOrderNumber(result.orderNumber);
        setResponseDeadline(result.responseDeadline);
        clearCart();
      } else {
        setStatus("error");
        setErrorMessage(
          Array.isArray(result.error)
            ? result.error.map((e: { message: string }) => e.message).join(", ")
            : result.error || "Failed to submit RFQ."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-brand-navy">RFQ Submitted Successfully</h1>
          <p className="text-brand-steel text-sm font-semibold max-w-lg mx-auto leading-relaxed">
            Thank you! Your quote request has been sent for review. Our team will respond within{" "}
            <strong>{appConfig.responseWindowDays} days</strong> — you&apos;ll receive an email the
            moment a decision is made.
          </p>
        </div>
        <div className="bg-brand-offwhite border border-gray-100 p-5 rounded-xl max-w-md mx-auto space-y-2 text-left text-xs font-mono text-brand-navy">
          <div><span className="text-brand-steel">ORDER NUMBER:</span> {orderNumber}</div>
          <div><span className="text-brand-steel">STATUS:</span> <span className="text-amber-600 font-bold">PENDING REVIEW</span></div>
          {responseDeadline && (
            <div>
              <span className="text-brand-steel">EXPECT A REPLY BY:</span>{" "}
              {new Date(responseDeadline).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
          )}
        </div>
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center text-brand-orange hover:text-orange-600 font-bold text-sm tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (isHydrated && itemCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-brand-offwhite border border-gray-100 text-brand-steel rounded-full flex items-center justify-center mx-auto">
          <ShoppingCart className="w-9 h-9" />
        </div>
        <h1 className="text-2xl font-black text-brand-navy">Your Cart is Empty</h1>
        <p className="text-brand-steel text-sm font-semibold max-w-md mx-auto">
          Add products to your cart before submitting a Request for Quote.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-brand-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wide shadow-md transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-brand-navy text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb006_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb006_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-brand-steel text-xs mb-3 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>{" "}
            <span className="mx-1.5">›</span> <span className="text-white">Request a Quote</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-none">
            Request for Quote
          </h1>
          <div className="w-16 h-1 bg-brand-orange rounded mt-4 mb-3" />
          <p className="text-brand-steel text-sm sm:text-base font-semibold max-w-xl leading-relaxed flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-orange flex-shrink-0" />
            We respond within {appConfig.responseWindowDays} days — accepted or rejected, by email.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart summary (read-only here — edit quantities from /cart) */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-brand-offwhite border border-gray-100 rounded-2xl p-5 space-y-4 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider">Your Order</h3>
                <Link href="/cart" className="text-[11px] font-bold text-brand-orange hover:underline">
                  Edit Cart
                </Link>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {enrichedLines.map((line) => (
                  <div key={line.sku} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 p-1.5 flex-shrink-0">
                      <Image
                        src={line.image}
                        alt={line.familyName}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-brand-navy truncate">{line.familyName}</div>
                      <div className="text-[10px] text-brand-steel font-semibold">
                        {line.size} · Qty {line.quantity}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-navy whitespace-nowrap">
                      {formatINR(line.lineTotal)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-sm font-black text-brand-navy">
                <span>Est. Total</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {errors.items && (
                <p className="text-red-500 text-[10px] font-bold">{errors.items.message as string}</p>
              )}
            </div>
          </div>

          {/* Buyer detail form */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 bg-white border border-gray-100 p-6 sm:p-10 rounded-2xl shadow-sm"
            >
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg flex items-start space-x-3 font-bold shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    {...register("contactName")}
                    className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.contactName ? "border-red-500" : "border-gray-200"}`}
                    placeholder="Full Name"
                  />
                  {errors.contactName && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.contactName.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Firm Name *</label>
                  <input
                    type="text"
                    {...register("firmName")}
                    className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.firmName ? "border-red-500" : "border-gray-200"}`}
                    placeholder="Company Legal Name"
                  />
                  {errors.firmName && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.firmName.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">GST Number *</label>
                  <input
                    type="text"
                    {...register("gstNumber")}
                    className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.gstNumber ? "border-red-500" : "border-gray-200"}`}
                    placeholder="15-character GSTIN (e.g. 07AAAAA1111A1Z1)"
                  />
                  {errors.gstNumber && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.gstNumber.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Email *</label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.email ? "border-red-500" : "border-gray-200"}`}
                    placeholder="you@firm.com"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="text"
                    {...register("phoneNumber")}
                    className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.phoneNumber ? "border-red-500" : "border-gray-200"}`}
                    placeholder="+919815652779"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.phoneNumber.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Street Address *</label>
                  <input
                    type="text"
                    {...register("address")}
                    className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.address ? "border-red-500" : "border-gray-200"}`}
                    placeholder="Plot / Street / Area"
                  />
                  {errors.address && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.address.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">City *</label>
                  <input
                    type="text"
                    {...register("city")}
                    className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.city ? "border-red-500" : "border-gray-200"}`}
                    placeholder="City"
                  />
                  {errors.city && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.city.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">State *</label>
                  <select
                    {...register("state")}
                    className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.state ? "border-red-500" : "border-gray-200"}`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select State</option>
                    {appConfig.indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.state.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Pincode *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    {...register("pincode")}
                    className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.pincode ? "border-red-500" : "border-gray-200"}`}
                    placeholder="141003"
                  />
                  {errors.pincode && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.pincode.message}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Mode of Purchase *</label>
                  <select
                    {...register("purchaseMode")}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition"
                  >
                    {Object.entries(appConfig.purchaseModes).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Payment Mode *</label>
                  <select
                    {...register("paymentMode")}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition"
                  >
                    {Object.entries(appConfig.paymentModes).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Special Instructions (Optional)</label>
                  <textarea
                    rows={3}
                    {...register("specialInstructions")}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white resize-y transition"
                    placeholder="Drawing references, packaging preferences, delivery timeline, etc."
                  />
                </div>
              </div>

              <div className="border-t border-gray-200/80 my-2" />

              {/* Advance payment */}
              <div className="bg-brand-offwhite border border-gray-100 rounded-xl p-5 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" {...register("advanceOptIn")} className="w-4 h-4 accent-brand-orange" />
                  <span className="text-sm font-bold text-brand-navy">I want to pay an advance against this order</span>
                </label>

                {advanceOptIn && (
                  <div>
                    <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Advance Amount (INR) *</label>
                    <input
                      type="number"
                      min={1}
                      {...register("advanceAmount", { valueAsNumber: true })}
                      className={`border rounded-lg px-4 py-2.5 w-full max-w-xs text-xs font-medium focus:ring-1 focus:ring-brand-orange outline-none bg-white transition ${errors.advanceAmount ? "border-red-500" : "border-gray-200"}`}
                      placeholder="e.g. 50000"
                    />
                    {errors.advanceAmount && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.advanceAmount.message}</p>}
                    {subtotal > 0 && advanceAmountWatch > 0 && (
                      <p className="text-[11px] text-brand-steel font-bold mt-1.5">
                        ≈ {advancePercentageLive}% of the estimated order value ({formatINR(subtotal)})
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center bg-brand-navy hover:bg-brand-charcoal text-white py-4 rounded-xl font-bold text-base tracking-wide shadow-md transition-all duration-300 disabled:bg-brand-navy/70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2.5 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    "Submit Request for Quote"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
