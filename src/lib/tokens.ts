import jwt from "jsonwebtoken";
import { appConfig } from "@/config/appConfig";

const JWT_SECRET = process.env.JWT_SECRET || appConfig.defaults.jwtSecret;

/* ------------------------------------------------------------------ *
 * RFQ decision links — the accept / reject buttons in the mail sent to
 * mahavirvalves@gmail.com. Each link is single-purpose and expires with the
 * same window the buyer was told to expect a reply within.
 * ------------------------------------------------------------------ */

export interface DecisionPayload {
  orderId: string;
  decision: "accept" | "reject";
}

export function generateDecisionToken(orderId: string, decision: "accept" | "reject"): string {
  const payload: DecisionPayload = { orderId, decision };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${appConfig.responseWindowDays}d` });
}

export function verifyDecisionToken(token: string): DecisionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecisionPayload;
  } catch (error) {
    console.error("Decision token verification failed:", error);
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Admin session — a one-time code emailed to the requesting address, which
 * must be on the admin allowlist. Verifying the code issues a short-lived
 * session token stored in an httpOnly cookie.
 * ------------------------------------------------------------------ */

export interface AdminOtpPayload {
  email: string;
  code: string;
  purpose: "admin-otp";
}

export interface AdminSessionPayload {
  email: string;
  purpose: "admin-session";
}

export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateOtpToken(email: string, code: string): string {
  const payload: AdminOtpPayload = { email, code, purpose: "admin-otp" };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${appConfig.otpTtlMinutes}m` });
}

export function verifyOtpToken(token: string): AdminOtpPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AdminOtpPayload;
    return payload.purpose === "admin-otp" ? payload : null;
  } catch (error) {
    console.error("Admin OTP token verification failed:", error);
    return null;
  }
}

export function generateAdminSessionToken(email: string): string {
  const payload: AdminSessionPayload = { email, purpose: "admin-session" };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${appConfig.adminSessionHours}h` });
}

export function verifyAdminSessionToken(token: string): AdminSessionPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AdminSessionPayload;
    return payload.purpose === "admin-session" ? payload : null;
  } catch {
    return null;
  }
}
