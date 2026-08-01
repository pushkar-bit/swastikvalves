import nodemailer from "nodemailer";
import { getMailFrom, isMailConfigured } from "@/config/appConfig";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

interface SendMailArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Sends mail when SMTP is configured; otherwise logs the subject/recipient so
 * local development still shows what would have gone out, without failing the
 * request that triggered it.
 */
export async function sendMail({ to, subject, html, replyTo }: SendMailArgs) {
  if (!isMailConfigured()) {
    console.warn(`[email] SMTP not configured — would have sent "${subject}" to ${to}`);
    return null;
  }

  return transporter.sendMail({
    from: getMailFrom(),
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}
