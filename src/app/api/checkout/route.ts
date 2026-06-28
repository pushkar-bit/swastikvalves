import { NextResponse } from "next/server";
import { getRFQRow, updateRFQRowStatus } from "@/lib/sheets";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { appConfig } from "@/config/appConfig";

const JWT_SECRET = process.env.JWT_SECRET || appConfig.defaults.jwtSecret;

export async function POST(request: Request) {
  try {
    const { token, createIntent } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    let orderId: string | null = null;
    let isExpired = false;

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { orderId: string };
      orderId = decoded.orderId;
    } catch (err) {
      if (err instanceof Error && err.name === "TokenExpiredError") {
        isExpired = true;
        const decoded = jwt.decode(token) as { orderId: string };
        orderId = decoded?.orderId || null;
      }
    }

    if (!orderId) {
      return NextResponse.json({ error: "Invalid token structure" }, { status: 400 });
    }

    const record = await getRFQRow(orderId);
    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const now = new Date();
    const dbExpiry = record.expiryDate ? new Date(record.expiryDate) : null;
    const isDbExpired = dbExpiry ? now > dbExpiry : false;

    if (isExpired || isDbExpired || record.status === appConfig.statusEnums.EXPIRED) {
      if (record.status !== appConfig.statusEnums.EXPIRED) {
        await updateRFQRowStatus(orderId, appConfig.statusEnums.EXPIRED);
      }
      return NextResponse.json({ 
        expired: true, 
        record: { ...record, status: appConfig.statusEnums.EXPIRED } 
      });
    }

    if (createIntent) {
      const totalQty = record.items.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = totalQty * appConfig.pricePerUnit;
      const advanceAmount = Math.round(totalAmount * 0.4); 

      if (process.env.STRIPE_SECRET_KEY) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const paymentIntent = await stripe.paymentIntents.create({
          amount: advanceAmount * 100, 
          currency: "inr",
          metadata: { orderId },
        });
        return NextResponse.json({ 
          success: true, 
          clientSecret: paymentIntent.client_secret,
          advanceAmount,
          totalAmount
        });
      } else {
        return NextResponse.json({ 
          success: true, 
          simulated: true,
          advanceAmount,
          totalAmount
        });
      }
    }

    return NextResponse.json({ success: true, record });
  } catch (error: unknown) {
    console.error("Checkout API error:", error);
    const message = error instanceof Error ? error.message : "Failed to process checkout validation";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
