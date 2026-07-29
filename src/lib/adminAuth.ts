import { cookies } from "next/headers";
import { verifyAdminSessionToken } from "@/lib/tokens";
import { isAdminEmail } from "@/config/appConfig";

export const ADMIN_SESSION_COOKIE = "swastik_admin_session";
export const ADMIN_OTP_COOKIE = "swastik_admin_otp";

/** Reads and validates the admin session cookie. Returns the signed-in email, or null. */
export function getAdminSession(): string | null {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const payload = verifyAdminSessionToken(token);
  if (!payload || !isAdminEmail(payload.email)) return null;

  return payload.email;
}

export function requireAdminSession(): string | null {
  return getAdminSession();
}
