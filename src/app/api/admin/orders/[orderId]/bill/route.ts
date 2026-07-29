import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getAdminSession } from "@/lib/adminAuth";
import { getRFQRow } from "@/lib/sheets";
import { InvoiceDocument } from "@/lib/invoicePdf";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const email = getAdminSession();
  if (!email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const record = await getRFQRow(params.orderId);
  if (!record) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const buffer = await renderToBuffer(InvoiceDocument({ record }));

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${record.orderNumber || record.orderId}-bill.pdf"`,
    },
  });
}
