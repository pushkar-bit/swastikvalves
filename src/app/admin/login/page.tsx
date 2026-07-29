"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, AlertTriangle, ArrowLeft, Mail, KeyRound } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [stage, setStage] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submittedEmail = useRef("");

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send login code");
      }
      submittedEmail.current = email;
      setStage("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send login code");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Incorrect or expired code");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect or expired code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-offwhite px-4 py-16">
      <div className="w-full max-w-sm bg-white border border-gray-100 rounded-2xl shadow-sm p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-brand-navy rounded-xl flex items-center justify-center mx-auto text-brand-orange">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-black text-brand-navy">Admin Portal</h1>
          <p className="text-brand-steel text-xs font-semibold">
            Restricted to authorized Swastik Valves administrators.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-start gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {stage === "email" ? (
          <form onSubmit={requestOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-brand-navy mb-1.5 block uppercase tracking-wider">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-steel absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 w-full text-sm font-medium outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center bg-brand-navy hover:bg-brand-charcoal text-white py-3 rounded-lg font-bold text-sm transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Send Login Code
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <p className="text-xs text-brand-steel font-semibold text-center">
              A 6-digit code was sent to <strong className="text-brand-navy">{submittedEmail.current}</strong> if
              it is an authorized admin address.
            </p>
            <div>
              <label className="text-xs font-bold text-brand-navy mb-1.5 block uppercase tracking-wider">
                Login Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-brand-steel absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 w-full text-sm font-bold tracking-[0.3em] outline-none focus:ring-1 focus:ring-brand-orange"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full inline-flex items-center justify-center bg-brand-orange hover:bg-orange-600 text-white py-3 rounded-lg font-bold text-sm transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Verify &amp; Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setStage("email");
                setCode("");
                setError("");
              }}
              className="w-full text-center text-xs font-bold text-brand-steel hover:text-brand-orange"
            >
              Use a different email
            </button>
          </form>
        )}

        <div className="pt-2 text-center">
          <Link href="/" className="inline-flex items-center text-xs font-bold text-brand-steel hover:text-brand-orange">
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
