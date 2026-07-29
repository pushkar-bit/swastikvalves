import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import { getRFQRow } from "@/lib/sheets";
import OrderDetailClient from "@/components/admin/OrderDetailClient";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const email = getAdminSession();
  if (!email) {
    redirect("/admin/login");
  }

  const record = await getRFQRow(params.orderId);
  if (!record) {
    notFound();
  }

  return <OrderDetailClient record={record} />;
}
