import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import { listRFQRows } from "@/lib/sheets";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const email = getAdminSession();
  if (!email) {
    redirect("/admin/login");
  }

  const orders = await listRFQRows();

  return <AdminDashboardClient adminEmail={email as string} initialOrders={orders} />;
}
