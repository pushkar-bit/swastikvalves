import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { getAdminSession } from "@/lib/adminAuth";
import { getRFQRow, updateRFQRowStatus } from "@/lib/sheets";

const schema = z.object({
  adminNotes: z.string().max(4000).optional(),
  rejectionReason: z.string().max(2000).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const email = getAdminSession();
  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const updates = schema.parse(await request.json());
    const record = await getRFQRow(params.orderId);
    if (!record) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const merged = await updateRFQRowStatus(params.orderId, record.status, {
      adminNotes: updates.adminNotes ?? record.adminNotes,
      rejectionReason: updates.rejectionReason ?? record.rejectionReason,
    });

    return NextResponse.json({ success: true, record: merged });
  } catch (error) {
    console.error("Order notes update error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to save notes" }, { status: 500 });
  }
}
