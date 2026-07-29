import * as z from "zod";
import { appConfig } from "@/config/appConfig";

const purchaseModeKeys = Object.keys(appConfig.purchaseModes) as [
  keyof typeof appConfig.purchaseModes,
  ...(keyof typeof appConfig.purchaseModes)[]
];

const paymentModeKeys = Object.keys(appConfig.paymentModes) as [
  keyof typeof appConfig.paymentModes,
  ...(keyof typeof appConfig.paymentModes)[]
];

const stateValues = appConfig.indianStates as unknown as [string, ...string[]];

/**
 * Shared between the buyer-facing RFQ form and the submit API route, so the
 * two never drift apart on what "required detail" actually means.
 */
export const rfqSchema = z
  .object({
    contactName: z.string().min(2, "Name is required"),
    firmName: z.string().min(2, "Firm name is required"),
    gstNumber: z
      .string()
      .regex(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Enter a valid 15-character GST Number (e.g. 07AAAAA1111A1Z1)"
      ),
    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{7,14}$/, "Enter phone with country code (e.g. +919815652779)"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.enum(stateValues, { error: "Select a state" }),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
    purchaseMode: z.enum(purchaseModeKeys, {
      error: "Select a mode of purchase",
    }),
    paymentMode: z.enum(paymentModeKeys, {
      error: "Select a payment mode",
    }),
    advanceOptIn: z.boolean(),
    advanceAmount: z.number().min(0),
    specialInstructions: z.string().max(2000).optional(),
    items: z
      .array(
        z.object({
          sku: z.string().min(1),
          quantity: z.number().int().min(1, "Minimum quantity is 1"),
        })
      )
      .min(1, "Your cart is empty — add at least one item before requesting a quote"),
  })
  .superRefine((data, ctx) => {
    if (data.advanceOptIn && data.advanceAmount <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["advanceAmount"],
        message: "Enter the advance amount you intend to pay",
      });
    }
  });

export type RFQFormData = z.infer<typeof rfqSchema>;
