export const appConfig = {
  // B2B Pricing Parameters
  pricePerUnit: 10000, // Base estimate price per valve item (INR)

  // Blocked generic email domains for RFQ domain check
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
    GRANTED: "GRANTED",
    EXPIRED: "EXPIRED",
    REJECTED: "REJECTED",
    IN_PRODUCTION: "IN_PRODUCTION",
    COMPLETED: "COMPLETED",
  } as const,

  // Advance Payment Status Enums
  advanceStatusEnums: {
    UNPAID: "UNPAID",
    PARTIAL_40_PAID: "PARTIAL_40_PAID",
  } as const,
};

export type OrderStatus = keyof typeof appConfig.statusEnums;
export type AdvancePaymentStatus = keyof typeof appConfig.advanceStatusEnums;
