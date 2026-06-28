import { NextResponse } from "next/server";
import { updateRFQRowStatus, getRFQRow } from "@/lib/sheets";
import { appConfig } from "@/config/appConfig";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    const sig = request.headers.get("stripe-signature");
    let orderId: string | null = null;
    let paymentSucceeded = false;

    if (sig && process.env.STRIPE_WEBHOOK_SECRET && process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const rawBody = await request.text();
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          rawBody,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err: unknown) {
        console.error("Stripe Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }

      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        orderId = paymentIntent.metadata?.orderId || null;
        paymentSucceeded = true;
      }
    } else {
      const body = await request.json();
      orderId = body.orderId || null;
      paymentSucceeded = body.paymentStatus === "succeeded";
    }

    if (!orderId || !paymentSucceeded) {
      return NextResponse.json(
        { error: "Invalid payment status or missing order reference." }, 
        { status: 400 }
      );
    }

    const record = await getRFQRow(orderId);
    if (!record) {
      return NextResponse.json({ error: "Quote record not found." }, { status: 404 });
    }

    await updateRFQRowStatus(orderId, appConfig.statusEnums.IN_PRODUCTION, {
      advancePaymentStatus: appConfig.advanceStatusEnums.PARTIAL_40_PAID,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Payment webhook route error:", error);
    const message = error instanceof Error ? error.message : "Failed to process payment status update";
    return NextResponse.json(
      { error: message }, 
      { status: 500 }
    );
  }
}
