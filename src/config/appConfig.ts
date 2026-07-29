export const appConfig = {
  // B2B Pricing Parameters
  pricePerUnit: 10000, // Fallback estimate per line item when a SKU has no indicative rate (INR)
  gstRate: 0.18,

  // Number of days the buyer is asked to wait for an accept / reject decision.
  responseWindowDays: 5,

  // Mailbox that receives the accept / reject decision mail.
  // Overridden by RFQ_NOTIFY_EMAIL.
  notifyEmail: "mahavirvalves@gmail.com",

  // Only these addresses may hold an admin session.
  // Overridden by ADMIN_EMAILS (comma separated).
  adminEmails: ["pushkarj32@gmail.com", "mahavirvalves@gmail.com"],

  // Minutes an emailed admin login code stays valid.
  otpTtlMinutes: 10,
  // Hours an admin session cookie stays valid.
  adminSessionHours: 12,

  // Generic mailbox domains. Kept for reference / soft warnings — buyer email is
  // no longer hard-blocked on these, since most Indian trading firms use them.
  genericDomains: [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "aol.com",
    "mail.com",
    "zoho.com",
    "yandex.com",
    "icloud.com",
  ],

  // Fallback defaults for missing environment variables
  defaults: {
    jwtSecret: "swastik-secret-key-1988",
    emailFrom: "mahavirvalves@gmail.com",
    emailTo: "mahavirvalves@gmail.com",
  },

  // Order Status Enums
  statusEnums: {
    PENDING: "PENDING",
    ORDER_PLACED: "ORDER_PLACED",
    REJECTED: "REJECTED",
    EXPIRED: "EXPIRED",
    IN_PRODUCTION: "IN_PRODUCTION",
    COMPLETED: "COMPLETED",
    // Retained so historic rows written by the earlier checkout flow still parse.
    GRANTED: "GRANTED",
  } as const,

  // Advance Payment Status Enums
  advanceStatusEnums: {
    NOT_APPLICABLE: "NOT_APPLICABLE",
    UNPAID: "UNPAID",
    PARTIAL_PAID: "PARTIAL_PAID",
    FULLY_PAID: "FULLY_PAID",
    // Legacy value from the previous 40/60 milestone flow.
    PARTIAL_40_PAID: "PARTIAL_40_PAID",
  } as const,

  // How the buyer is sourcing the order — separate from how they intend to pay.
  purchaseModes: {
    DIRECT: "Direct Purchase",
    DISTRIBUTOR: "Through Distributor",
    IMPORT_EXPORT: "Import / Export",
  } as const,

  // How the buyer intends to settle payment.
  paymentModes: {
    FULL_ON_DELIVERY: "Full Payment on Delivery",
    ADVANCE_BALANCE: "Advance + Balance on Delivery",
    CREDIT: "Credit (subject to approval)",
  } as const,

  indianStates: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Lakshadweep", "Puducherry",
  ] as const,
};

export type OrderStatus = keyof typeof appConfig.statusEnums;
export type AdvancePaymentStatus = keyof typeof appConfig.advanceStatusEnums;
export type PurchaseMode = keyof typeof appConfig.purchaseModes;
export type PaymentMode = keyof typeof appConfig.paymentModes;

/** Mailbox that receives new RFQ decision mails. */
export function getNotifyEmail(): string {
  return process.env.RFQ_NOTIFY_EMAIL || appConfig.notifyEmail;
}

/** Envelope sender for all outbound mail. */
export function getMailFrom(): string {
  const address = process.env.SMTP_FROM || process.env.SMTP_USER || appConfig.defaults.emailFrom;
  return address.includes("<") ? address : `Swastik Valves India <${address}>`;
}

/** Lowercased allowlist of addresses permitted to open an admin session. */
export function getAdminEmails(): string[] {
  const fromEnv = process.env.ADMIN_EMAILS;
  const list = fromEnv ? fromEnv.split(",") : appConfig.adminEmails;
  return list.map((entry) => entry.trim().toLowerCase()).filter(Boolean);
}

export function isAdminEmail(email: string): boolean {
  return getAdminEmails().includes(email.trim().toLowerCase());
}

/** True once SMTP credentials are present; otherwise links are logged to the server console. */
export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Human-facing order number, e.g. SV-2026-4Q7K. The UUID orderId remains the internal key. */
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I — avoids misreads
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `SV-${year}-${suffix}`;
}

/** Rounded advance-as-percentage-of-order-value, or 0 when there's nothing to divide by. */
export function computeAdvancePercentage(advanceAmount: number, orderValue: number): number {
  if (!orderValue || orderValue <= 0) return 0;
  return Math.round((advanceAmount / orderValue) * 100);
}
