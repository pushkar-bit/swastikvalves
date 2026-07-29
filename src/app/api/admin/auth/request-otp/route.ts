import { NextResponse } from "next/server";
import * as z from "zod";
import { generateOtpCode, generateOtpToken } from "@/lib/tokens";
import { sendMail } from "@/lib/email";
import { isAdminEmail, appConfig } from "@/config/appConfig";
import { ADMIN_OTP_COOKIE } from "@/lib/adminAuth";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  try {
    const { email } = schema.parse(await request.json());
    const normalized = email.trim().toLowerCase();

    // Always respond the same way whether or not the address is allowlisted,
    // so this endpoint can't be used to enumerate admin emails.
    if (isAdminEmail(normalized)) {
      const code = generateOtpCode();
      const otpToken = generateOtpToken(normalized, code);

      await sendMail({
        to: normalized,
        subject: "Your Swastik Valves Admin Login Code",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#111;">
            <h2 style="color:#0D1B2A;">Admin Login Code</h2>
            <p>Use this code to sign in to the Swastik Valves admin portal. It expires in
            ${appConfig.otpTtlMinutes} minutes.</p>
            <div style="font-size:32px;font-weight:bold;letter-spacing:8px;background:#F8F9FA;padding:16px 24px;border-radius:8px;text-align:center;color:#0D1B2A;">
              ${code}
            </div>
            <p style="font-size:12px;color:#666;margin-top:24px;">
              If you did not request this, you can safely ignore this email.
            </p>
          </div>`,
      });

      const response = NextResponse.json({ success: true });
      response.cookies.set(ADMIN_OTP_COOKIE, otpToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: appConfig.otpTtlMinutes * 60,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin OTP request error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
