import { NextResponse } from "next/server";
import { listRFQRows } from "@/lib/sheets";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  const email = getAdminSession();
  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const orders = await listRFQRows();

  const now = Date.now();
  const withComputedStatus = orders.map((order) => {
    const isOverdue =
      order.status === "PENDING" &&
      order.responseDeadline &&
      new Date(order.responseDeadline).getTime() < now;
    return { ...order, displayStatus: isOverdue ? "EXPIRED" : order.status };
  });

  return NextResponse.json({ orders: withComputedStatus });
}
