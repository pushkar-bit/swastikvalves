import {
  PRODUCT_FAMILIES as SEED_FAMILIES,
  type ProductFamily,
  type ProductVariant,
} from "@/lib/catalog";
import {
  listProductFamilies,
  saveProductFamily,
  deleteProductVariant as deleteVariantRow,
  deleteProductFamily as deleteFamilyRows,
  type ProductFamilyData,
} from "@/lib/sheets";

const CACHE_TTL_MS = 60_000;
let cache: { families: ProductFamily[]; fetchedAt: number } | null = null;

function toProductFamily(data: ProductFamilyData): ProductFamily {
  return {
    id: data.familyId,
    name: data.name,
    slug: data.slug,
    detailHref: data.detailHref || undefined,
    image: data.image,
    imageAlt: data.imageAlt,
    tagline: data.tagline,
    description: data.description,
    pressureClass: data.pressureClass,
    endConnection: data.endConnection,
    standards: data.standards,
    applications: data.applications,
    highlights: data.highlights,
    variants: data.variants,
  };
}

function toProductFamilyData(family: ProductFamily): ProductFamilyData {
  return {
    familyId: family.id,
    name: family.name,
    slug: family.slug,
    detailHref: family.detailHref || "",
    image: family.image,
    imageAlt: family.imageAlt,
    tagline: family.tagline,
    description: family.description,
    pressureClass: family.pressureClass,
    endConnection: family.endConnection,
    standards: family.standards,
    applications: family.applications,
    highlights: family.highlights,
    variants: family.variants,
  };
}

/** Live catalog: Google Sheets when configured and non-empty, otherwise the static seed in catalog.ts. Cached briefly so page loads and cart lookups don't hit the Sheets API on every request. */
export async function getProductFamilies(): Promise<ProductFamily[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.families;
  }

  const rows = await listProductFamilies();
  const families = rows && rows.length > 0 ? rows.map(toProductFamily) : SEED_FAMILIES;

  cache = { families, fetchedAt: Date.now() };
  return families;
}

export function invalidateProductCache() {
  cache = null;
}

export async function getProductFamily(slug: string): Promise<ProductFamily | null> {
  const families = await getProductFamilies();
  return families.find((f) => f.slug === slug) ?? null;
}

export async function findProductVariant(
  sku: string
): Promise<{ family: ProductFamily; variant: ProductVariant } | null> {
  const families = await getProductFamilies();
  for (const family of families) {
    const variant = family.variants.find((v) => v.sku === sku);
    if (variant) return { family, variant };
  }
  return null;
}

export async function describeSkuAsync(sku: string): Promise<string> {
  const hit = await findProductVariant(sku);
  if (!hit) return sku;
  return `${hit.family.name} — ${hit.variant.size} — ${hit.variant.material}`;
}

export async function rateForSkuAsync(sku: string, fallback: number): Promise<number> {
  const hit = await findProductVariant(sku);
  return hit?.variant.indicativeRate ?? fallback;
}

/** Admin write path — persists to Sheets and drops the cache so the next read is fresh. Returns false when Sheets isn't configured (nothing to persist). */
export async function saveProductFamilyAdmin(family: ProductFamily): Promise<boolean> {
  const ok = await saveProductFamily(toProductFamilyData(family));
  if (ok) invalidateProductCache();
  return ok;
}

export async function deleteProductVariantAdmin(sku: string): Promise<boolean> {
  const ok = await deleteVariantRow(sku);
  if (ok) invalidateProductCache();
  return ok;
}

export async function deleteProductFamilyAdmin(familyId: string): Promise<boolean> {
  const ok = await deleteFamilyRows(familyId);
  if (ok) invalidateProductCache();
  return ok;
}
