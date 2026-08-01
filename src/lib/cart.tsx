"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductFamily } from "@/lib/catalog";

export interface CartLine {
  sku: string;
  quantity: number;
}

export interface EnrichedCartLine extends CartLine {
  familyName: string;
  familySlug: string;
  image: string;
  size: string;
  material: string;
  rate: number;
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  enrichedLines: EnrichedCartLine[];
  itemCount: number;
  subtotal: number;
  addToCart: (sku: string, quantity: number) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  removeFromCart: (sku: string) => void;
  clearCart: () => void;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "swastik-cart-v1";

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        typeof l?.sku === "string" && typeof l?.quantity === "number" && l.quantity > 0
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [families, setFamilies] = useState<ProductFamily[]>([]);

  // Cart lives in localStorage — there's no buyer account, so this is the only
  // place a work-in-progress order persists between visits.
  useEffect(() => {
    setLines(readStoredCart());
    setIsHydrated(true);
  }, []);

  // Live catalog (Sheets-backed) fetched once per session so cart lines can
  // resolve price/name without importing the static seed into client code.
  useEffect(() => {
    fetch("/api/catalog")
      .then((res) => res.json())
      .then((data) => setFamilies(data.families || []))
      .catch(() => setFamilies([]));
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, isHydrated]);

  const addToCart = useCallback((sku: string, quantity: number) => {
    if (quantity <= 0) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.sku === sku);
      if (existing) {
        return prev.map((l) =>
          l.sku === sku ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { sku, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.sku !== sku);
      return prev.map((l) => (l.sku === sku ? { ...l, quantity } : l));
    });
  }, []);

  const removeFromCart = useCallback((sku: string) => {
    setLines((prev) => prev.filter((l) => l.sku !== sku));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const enrichedLines = useMemo<EnrichedCartLine[]>(() => {
    return lines
      .map((line) => {
        let hit: { family: ProductFamily; variant: ProductFamily["variants"][number] } | null = null;
        for (const family of families) {
          const variant = family.variants.find((v) => v.sku === line.sku);
          if (variant) {
            hit = { family, variant };
            break;
          }
        }
        if (!hit) return null;
        const rate = hit.variant.indicativeRate;
        return {
          sku: line.sku,
          quantity: line.quantity,
          familyName: hit.family.name,
          familySlug: hit.family.slug,
          image: hit.family.image,
          size: hit.variant.size,
          material: hit.variant.material,
          rate,
          lineTotal: rate * line.quantity,
        };
      })
      .filter((l): l is EnrichedCartLine => l !== null);
  }, [lines, families]);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );
  const subtotal = useMemo(
    () => enrichedLines.reduce((sum, l) => sum + l.lineTotal, 0),
    [enrichedLines]
  );

  const value: CartContextValue = {
    lines,
    enrichedLines,
    itemCount,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isHydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
