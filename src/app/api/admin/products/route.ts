import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { getAdminSession } from "@/lib/adminAuth";
import {
  getProductFamilies,
  saveProductFamilyAdmin,
  deleteProductVariantAdmin,
  deleteProductFamilyAdmin,
} from "@/lib/productStore";

const variantSchema = z.object({
  sku: z.string().min(1),
  size: z.string().min(1),
  bore: z.number().nonnegative(),
  material: z.string().min(1),
  materialCode: z.string().min(1),
  indicativeRate: z.number().nonnegative(),
});

const familySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  detailHref: z.string().optional(),
  image: z.string(),
  imageAlt: z.string(),
  tagline: z.string(),
  description: z.string(),
  pressureClass: z.string(),
  endConnection: z.string(),
  standards: z.array(z.string()),
  applications: z.array(z.string()),
  highlights: z.array(z.string()),
  variants: z.array(variantSchema),
});

export async function GET() {
  const email = getAdminSession();
  if (!email) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const families = await getProductFamilies();
  return NextResponse.json({ families });
}

export async function POST(request: NextRequest) {
  const email = getAdminSession();
  if (!email) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const family = familySchema.parse(await request.json());
    const ok = await saveProductFamilyAdmin(family);
    if (!ok) {
      return NextResponse.json(
        { error: "Google Sheets isn't configured — nothing to save to." },
        { status: 503 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to save product family." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const email = getAdminSession();
  if (!email) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const sku = request.nextUrl.searchParams.get("sku");
  const familyId = request.nextUrl.searchParams.get("familyId");

  if (sku) {
    const ok = await deleteProductVariantAdmin(sku);
    return NextResponse.json({ success: ok });
  }
  if (familyId) {
    const ok = await deleteProductFamilyAdmin(familyId);
    return NextResponse.json({ success: ok });
  }
  return NextResponse.json({ error: "Provide sku or familyId" }, { status: 400 });
}
