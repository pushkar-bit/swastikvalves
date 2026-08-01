import { NextResponse } from "next/server";
import { getProductFamilies } from "@/lib/productStore";

export const revalidate = 60;

export async function GET() {
  const families = await getProductFamilies();
  return NextResponse.json(
    { families },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
  );
}
