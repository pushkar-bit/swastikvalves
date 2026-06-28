"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, Plus, Trash2, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";

import { appConfig } from "@/config/appConfig";

const rfqSchema = z.object({
  contactName: z.string().min(2, "Contact name is required"),
  firmName: z.string().min(2, "Firm name is required"),
  gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Enter a valid 15-character GST Number (e.g. 07AAAAA1111A1Z1)"),
  location: z.string().min(10, "Full shipping/freight address is required"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Enter phone with country code (e.g. +919815652779)"),
  email: z.string().email("Invalid email address").refine(
    (val) => {
      const domain = val.split("@")[1]?.toLowerCase();
      return !appConfig.genericDomains.includes(domain);
    },
    { message: "Corporate domain required (e.g., name@company.com)" }
  ),
  items: z.array(
    z.object({
      sku: z.string().min(1, "SKU required"),
      partName: z.string().min(1, "Part name required"),
      quantity: z.number().int().min(1, "Min quantity is 1"),
    })
  ).min(1, "Please add at least one item to quote"),
});

type RFQFormData = z.infer<typeof rfqSchema>;

export default function RFQPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [orderId, setOrderId] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RFQFormData>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      items: [{ sku: "", partName: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: RFQFormData) => {
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/rfq/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus("success");
        setOrderId(result.orderId);
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
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
            Thank you! Your quote request has been entered into our ledger system. 
            An admin notification with your secure action link has been triggered.
          </p>
        </div>
        <div className="bg-brand-offwhite border border-gray-100 p-5 rounded-xl max-w-md mx-auto space-y-2 text-left text-xs font-mono text-brand-navy">
          <div><span className="text-brand-steel">ORDER ID:</span> {orderId}</div>
          <div><span className="text-brand-steel">STATUS:</span> <span className="text-amber-600 font-bold">PENDING APPROVAL</span></div>
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

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb006_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb006_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-brand-steel text-xs mb-3 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>{" "}
            <span className="mx-1.5">›</span> <span className="text-white">B2B RFQ Portal</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-none">
            B2B Industrial Request for Quote
          </h1>
          <div className="w-16 h-1 bg-brand-orange rounded mt-4 mb-3" />
          <p className="text-brand-steel text-sm sm:text-base font-semibold max-w-xl leading-relaxed">
            Submit your materials list below. Our automated pricing ledger will route quotes for instant admin approval.
          </p>
        </div>
      </section>

      {/* Main Content Form */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-brand-offwhite border border-gray-100 p-6 sm:p-10 rounded-2xl shadow-sm">
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg flex items-start space-x-3 font-bold shadow-sm">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>Failed to submit RFQ. Please check validations or contact support.</span>
            </div>
          )}

          {/* Customer Metadata Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Contact Name */}
            <div>
              <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Contact Name *</label>
              <input
                type="text"
                {...register("contactName")}
                className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none bg-white transition ${
                  errors.contactName ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Full Name"
              />
              {errors.contactName && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.contactName.message}</p>}
            </div>

            {/* Firm Name */}
            <div>
              <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Firm Name *</label>
              <input
                type="text"
                {...register("firmName")}
                className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none bg-white transition ${
                  errors.firmName ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Company Legal Name"
              />
              {errors.firmName && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.firmName.message}</p>}
            </div>

            {/* GST Number */}
            <div>
              <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">GST Number *</label>
              <input
                type="text"
                {...register("gstNumber")}
                className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none bg-white transition ${
                  errors.gstNumber ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="15-character GSTIN (e.g. 07AAAAA1111A1Z1)"
              />
              {errors.gstNumber && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.gstNumber.message}</p>}
            </div>

            {/* Corporate Email */}
            <div>
              <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Corporate Email *</label>
              <input
                type="email"
                {...register("email")}
                className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none bg-white transition ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="name@firmdomain.com"
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.email.message}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Phone Number *</label>
              <input
                type="text"
                {...register("phoneNumber")}
                className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none bg-white transition ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="+919815652779"
              />
              {errors.phoneNumber && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.phoneNumber.message}</p>}
            </div>

            {/* Shipping Address */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-brand-navy mb-2 block uppercase tracking-wider">Shipping / Freight Address *</label>
              <textarea
                rows={3}
                {...register("location")}
                className={`border rounded-lg px-4 py-2.5 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange focus:border-brand-orange outline-none bg-white resize-y transition ${
                  errors.location ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Full Shipping Destination, State, Pincode & Country"
              />
              {errors.location && <p className="text-red-500 text-[10px] mt-1.5 font-bold">{errors.location.message}</p>}
            </div>

          </div>

          <div className="border-t border-gray-200/80 my-8" />

          {/* Dynamic Item Builder Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-brand-navy">RFQ Items List</h3>
                <p className="text-brand-steel text-xs font-semibold mt-0.5">Add parts, SKUs and quantities needed.</p>
              </div>
              <button
                type="button"
                onClick={() => append({ sku: "", partName: "", quantity: 1 })}
                className="inline-flex items-center text-xs font-bold bg-brand-orange hover:bg-orange-600 text-white px-3.5 py-2 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Item
              </button>
            </div>

            {errors.items && typeof errors.items.message === "string" && (
              <p className="text-red-500 text-xs font-bold">{errors.items.message}</p>
            )}

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end bg-white border border-gray-150 p-4 rounded-xl shadow-xs">
                  
                  {/* SKU */}
                  <div className="sm:col-span-4">
                    <label className="text-[10px] font-bold text-brand-navy mb-1.5 block uppercase tracking-wider">SKU Code *</label>
                    <input
                      type="text"
                      {...register(`items.${index}.sku` as const)}
                      className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange bg-brand-offwhite/50"
                      placeholder="e.g. SWA-3P-CF8M-15"
                    />
                    {errors.items?.[index]?.sku && (
                      <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.items[index]?.sku?.message}</p>
                    )}
                  </div>

                  {/* Part Name */}
                  <div className="sm:col-span-5">
                    <label className="text-[10px] font-bold text-brand-navy mb-1.5 block uppercase tracking-wider">Part / Product Name *</label>
                    <input
                      type="text"
                      {...register(`items.${index}.partName` as const)}
                      className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange bg-brand-offwhite/50"
                      placeholder="e.g. 15mm SS 3-Piece Ball Valve"
                    />
                    {errors.items?.[index]?.partName && (
                      <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.items[index]?.partName?.message}</p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-brand-navy mb-1.5 block uppercase tracking-wider">Quantity *</label>
                    <input
                      type="number"
                      {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                      className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange bg-brand-offwhite/50"
                      placeholder="100"
                    />
                    {errors.items?.[index]?.quantity && (
                      <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.items[index]?.quantity?.message}</p>
                    )}
                  </div>

                  {/* Action delete */}
                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                      className="p-2 border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center bg-brand-navy hover:bg-brand-charcoal text-white py-4 rounded-xl font-bold text-base tracking-wide shadow-md transition-all duration-300 disabled:bg-brand-navy/70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2.5 animate-spin" />
                  Generating Quote Request Ledger...
                </>
              ) : (
                "Submit Request for Quote"
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
