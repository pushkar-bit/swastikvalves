import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import { getProductFamilies } from "@/lib/productStore";
import AdminProductsClient from "@/components/admin/AdminProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const email = getAdminSession();
  if (!email) {
    redirect("/admin/login");
  }

  const families = await getProductFamilies();

  return <AdminProductsClient initialFamilies={families} />;
}
