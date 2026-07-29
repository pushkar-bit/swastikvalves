/**
 * Product catalogue used by the showcase, cart and RFQ pipeline.
 *
 * `indicativeRate` is a per-unit budgetary figure only — the binding price is the
 * one the admin confirms when accepting the quote. It exists so the buyer sees an
 * order value in the cart and so the admin mail carries a ballpark total.
 */

export interface ProductVariant {
  sku: string;
  size: string;
  /** Nominal bore in mm, used for sorting and filtering. */
  bore: number;
  material: string;
  materialCode: string;
  indicativeRate: number;
}

export interface ProductFamily {
  id: string;
  name: string;
  slug: string;
  /** Marketing page for the family, where one exists. */
  detailHref?: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  pressureClass: string;
  endConnection: string;
  standards: string[];
  applications: string[];
  highlights: string[];
  variants: ProductVariant[];
}

interface MaterialGrade {
  code: string;
  label: string;
  /** Multiplier applied to the size-derived base rate. */
  factor: number;
}

const BALL_VALVE_GRADES: MaterialGrade[] = [
  { code: "WCB", label: "Carbon Steel (ASTM A216 WCB)", factor: 1 },
  { code: "CF8", label: "Stainless Steel 304 (ASTM A351 CF8)", factor: 1.35 },
  { code: "CF8M", label: "Stainless Steel 316 (ASTM A351 CF8M)", factor: 1.6 },
  { code: "WC6", label: "Alloy Steel (ASTM A217 WC6)", factor: 1.45 },
];

const GUN_METAL_GRADES: MaterialGrade[] = [
  { code: "LTB2", label: "Gun Metal (IS:318 Gr. LTB2)", factor: 1 },
];

function buildVariants(
  prefix: string,
  sizesMm: number[],
  grades: MaterialGrade[],
  baseRate: number
): ProductVariant[] {
  const variants: ProductVariant[] = [];
  for (const bore of sizesMm) {
    // Valve cost scales faster than bore; the 1.35 exponent tracks the published
    // price ladder closely enough for a budgetary figure.
    const sizeRate = baseRate * Math.pow(bore / 15, 1.35);
    for (const grade of grades) {
      variants.push({
        sku: `${prefix}-${grade.code}-${bore}`,
        size: `${bore} mm`,
        bore,
        material: grade.label,
        materialCode: grade.code,
        indicativeRate: Math.round((sizeRate * grade.factor) / 10) * 10,
      });
    }
  }
  return variants;
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    id: "3-piece-ball-valves",
    name: "3 Piece Ball Valves",
    slug: "3-piece-ball-valves",
    detailHref: "/products/3-piece-ball-valves",
    image: "/products/3-piece-ball-valve.svg",
    imageAlt:
      "Technical elevation of a three piece flanged ball valve showing the swing-out centre body and lever handle",
    tagline: "Swing-out body · Class 800",
    description:
      "Three piece construction lets the centre body swing out for seat and seal replacement without breaking the line. Fire safe seating with a blow-out proof stem.",
    pressureClass: "Class 800 (PN 100)",
    endConnection: "Screwed BSP / NPT, Socket Weld, Flanged",
    standards: ["ASME B16.34", "API 608", "ISO 9001:2008"],
    applications: ["Solvent extraction", "Chemical process lines", "Steam service", "Refineries"],
    highlights: [
      "Centre body removable for inline maintenance",
      "Anti-static device across ball, stem and body",
      "Blow-out proof stem with double stem seal",
      "Fire safe secondary metal seating",
    ],
    variants: buildVariants("SWA-3P", [15, 20, 25, 32, 40, 50], BALL_VALVE_GRADES, 1850),
  },
  {
    id: "three-piece-ball-valves",
    name: "Three Piece Ball Valves — Screwed End",
    slug: "three-piece-ball-valves",
    detailHref: "/products/three-piece-ball-valves",
    image: "/products/three-piece-screwed-ball-valve.svg",
    imageAlt:
      "Technical elevation of a screwed end three piece ball valve with tie-rod body bolting and lever handle",
    tagline: "Screwed end · Fire safe",
    description:
      "Tie-rod bolted screwed end design for compact skid and package plant piping. Full bore flow path with a reinforced PTFE seat.",
    pressureClass: "Class 800 (PN 100)",
    endConnection: "Screwed BSP / NPT",
    standards: ["ASME B16.34", "BS 5351", "ISO 9001:2008"],
    applications: ["Package plants", "Oil expellers", "Bio-diesel plants", "Utility headers"],
    highlights: [
      "Full bore, unobstructed flow path",
      "Reinforced PTFE seats and body seals",
      "Tie-rod bolting for uniform gasket load",
      "Locking device on handle as standard",
    ],
    variants: buildVariants("SWA-TP", [15, 20, 25, 32, 40, 50], BALL_VALVE_GRADES, 1650),
  },
  {
    id: "gun-metal-foot-valves",
    name: "Gun Metal Foot Valves",
    slug: "gun-metal-foot-valves",
    detailHref: "/products/gun-metal-foot-valves",
    image: "/products/gun-metal-foot-valve.svg",
    imageAlt:
      "Technical elevation of a gun metal foot valve with integral strainer skirt and hinged disc",
    tagline: "Integral strainer · IS:318 LTB2",
    description:
      "Cast gun metal foot valve with an integral strainer skirt, used at pump suction to hold prime and keep debris out of the impeller.",
    pressureClass: "PN 16",
    endConnection: "Screwed BSP, Flanged",
    standards: ["IS:318 Gr. LTB2", "IS 778", "ISO 9001:2008"],
    applications: ["Pump suction lines", "Water treatment", "Petrol pumps", "Irrigation"],
    highlights: [
      "Integral strainer skirt with generous open area",
      "Corrosion resistant gun metal casting",
      "Renewable disc and seat faces",
      "Hydraulically tested to twice working pressure",
    ],
    variants: buildVariants("SWA-GMF", [15, 20, 25, 32, 40, 50, 65, 80, 100, 150], GUN_METAL_GRADES, 900),
  },
  {
    id: "gun-metal-valves",
    name: "Gun Metal Valves",
    slug: "gun-metal-valves",
    detailHref: "/products/gun-metal-valves",
    image: "/products/gun-metal-valve.svg",
    imageAlt:
      "Technical elevation of a gun metal globe pattern valve with hand wheel and union bonnet",
    tagline: "High tensile · Union bonnet",
    description:
      "High tensile gun metal valves for petroleum, chemical and gas duty. Union bonnet construction allows the trim to be serviced without cutting the line.",
    pressureClass: "PN 16 / PN 20",
    endConnection: "Screwed BSP, Flanged",
    standards: ["IS:318 Gr. LTB2", "IS 778", "ISO 9001:2008"],
    applications: ["Petroleum handling", "CNG and gas plants", "Dyeing industry", "Food processing"],
    highlights: [
      "Union bonnet for quick trim access",
      "High tensile gun metal, dimensionally accurate",
      "Renewable seat and disc",
      "Third party inspection available on request",
    ],
    variants: buildVariants("SWA-GMV", [15, 20, 25, 32, 40, 50, 65, 80, 100, 150], GUN_METAL_GRADES, 1050),
  },
];

const VARIANT_INDEX: Map<string, { family: ProductFamily; variant: ProductVariant }> = new Map();
for (const family of PRODUCT_FAMILIES) {
  for (const variant of family.variants) {
    VARIANT_INDEX.set(variant.sku, { family, variant });
  }
}

export function findVariant(sku: string) {
  return VARIANT_INDEX.get(sku) || null;
}

export function findFamily(slug: string) {
  return PRODUCT_FAMILIES.find((family) => family.slug === slug) || null;
}

/** Human readable line description used in mails, sheets and invoices. */
export function describeSku(sku: string): string {
  const hit = findVariant(sku);
  if (!hit) return sku;
  return `${hit.family.name} — ${hit.variant.size} — ${hit.variant.material}`;
}

export function rateForSku(sku: string, fallback: number): number {
  return findVariant(sku)?.variant.indicativeRate ?? fallback;
}

export const ALL_MATERIAL_LABELS = Array.from(
  new Set(PRODUCT_FAMILIES.flatMap((f) => f.variants.map((v) => v.material)))
);

export const ALL_SIZES_MM = Array.from(
  new Set(PRODUCT_FAMILIES.flatMap((f) => f.variants.map((v) => v.bore)))
).sort((a, b) => a - b);
