import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { getAdminSession } from "@/lib/adminAuth";
import { applyDecision } from "@/lib/decisionEngine";

const schema = z.object({
  decision: z.enum(["accept", "reject"]),
  rejectionReason: z.string().max(2000).optional(),
});

/** Lets a signed-in admin accept/reject directly from the dashboard, without needing the emailed link. */
export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const email = getAdminSession();
  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { decision, rejectionReason } = schema.parse(await request.json());
    const result = await applyDecision(params.orderId, decision, rejectionReason);

    if (result.code === "NOT_FOUND") {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (result.code === "ALREADY_DECIDED") {
      return NextResponse.json(
        { error: `Order already ${result.record?.status}`, record: result.record },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true, record: result.record });
  } catch (error) {
    console.error("Admin decide error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to apply decision" }, { status: 500 });
  }
}
