import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { getAdminSession } from "@/lib/adminAuth";
import { getRFQRow, updateRFQRowStatus } from "@/lib/sheets";
import { appConfig } from "@/config/appConfig";

const schema = z.object({
  advancePaymentStatus: z.enum(
    Object.keys(appConfig.advanceStatusEnums) as [string, ...string[]]
  ),
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
    const { advancePaymentStatus } = schema.parse(await request.json());
    const record = await getRFQRow(params.orderId);
    if (!record) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    await updateRFQRowStatus(params.orderId, record.status, {
      advancePaymentStatus: advancePaymentStatus as typeof record.advancePaymentStatus,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Advance payment update error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payment status" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update payment status" }, { status: 500 });
  }
}
