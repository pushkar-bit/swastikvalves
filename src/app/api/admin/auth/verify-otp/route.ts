import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { verifyOtpToken, generateAdminSessionToken } from "@/lib/tokens";
import { isAdminEmail, appConfig } from "@/config/appConfig";
import { ADMIN_OTP_COOKIE, ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

const schema = z.object({ code: z.string().length(6) });

export async function POST(request: NextRequest) {
  try {
    const { code } = schema.parse(await request.json());
    const otpToken = request.cookies.get(ADMIN_OTP_COOKIE)?.value;

    if (!otpToken) {
      return NextResponse.json(
        { error: "No login code was requested, or it has expired. Request a new one." },
        { status: 400 }
      );
    }

    const payload = verifyOtpToken(otpToken);
    if (!payload || payload.code !== code || !isAdminEmail(payload.email)) {
      return NextResponse.json({ error: "Incorrect or expired code." }, { status: 401 });
    }

    const sessionToken = generateAdminSessionToken(payload.email);
    const response = NextResponse.json({ success: true, email: payload.email });

    response.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: appConfig.adminSessionHours * 60 * 60,
      path: "/",
    });
    response.cookies.delete(ADMIN_OTP_COOKIE);

    return response;
  } catch (error) {
    console.error("Admin OTP verify error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Enter the 6-digit code" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 });
  }
}
