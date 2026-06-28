"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

const miniSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type MiniFormData = z.infer<typeof miniSchema>;

export default function MiniEnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MiniFormData>({
    resolver: zodResolver(miniSchema),
  });

  const onSubmit = async (data: MiniFormData) => {
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          company: "Not Provided (Quick Contact)",
          country: "India",
          query: data.message,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus("success");
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
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center space-y-4">
        <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
        <h4 className="font-bold text-brand-navy">Message Sent!</h4>
        <p className="text-brand-steel text-xs font-semibold">
          Thank you. We have received your query and will reply within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-brand-orange font-bold text-xs hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-start space-x-2 font-bold">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>Error sending message. Please email directly.</span>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="text-xs font-bold text-brand-navy mb-1.5 block">Your Name *</label>
        <input
          type="text"
          {...register("name")}
          className={`border rounded-lg px-3 py-2 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition ${
            errors.name ? "border-red-500" : "border-gray-200"
          }`}
          placeholder="Name"
        />
        {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="text-xs font-bold text-brand-navy mb-1.5 block">Email ID *</label>
        <input
          type="email"
          {...register("email")}
          className={`border rounded-lg px-3 py-2 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          placeholder="email@company.com"
        />
        {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="text-xs font-bold text-brand-navy mb-1.5 block">Phone Number *</label>
        <input
          type="text"
          {...register("phone")}
          className={`border rounded-lg px-3 py-2 w-full text-xs font-medium focus:ring-1 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition ${
            errors.phone ? "border-red-500" : "border-gray-200"
          }`}
          placeholder="Phone"
        />
        {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="text-xs font-bold text-brand-navy mb-1.5 block">Your Message *</label>
        <textarea
          {...register("message")}
          rows={4}
          className={`border rounded-lg px-3 py-2 w-full text-xs font-medium resize-y focus:ring-1 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition ${
            errors.message ? "border-red-500" : "border-gray-200"
          }`}
          placeholder="Query description..."
        />
        {errors.message && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center bg-brand-orange text-white hover:bg-orange-600 py-3 rounded-lg font-bold text-sm tracking-wide shadow-md transition-all duration-300 disabled:bg-brand-orange/70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
