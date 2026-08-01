"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, CheckCircle2 } from "lucide-react";
import type { ProductFamily } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/config/appConfig";

interface AddToCartPanelProps {
  family: ProductFamily;
}

export default function AddToCartPanel({ family }: AddToCartPanelProps) {
  const { addToCart } = useCart();

  const sizes = useMemo(
    () => Array.from(new Set(family?.variants.map((v) => v.size) ?? [])),
    [family]
  );
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");

  const materials = useMemo(
    () =>
      family?.variants.filter((v) => v.size === selectedSize).map((v) => v.material) ?? [],
    [family, selectedSize]
  );
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0] || "");

  const activeVariant = family?.variants.find(
    (v) => v.size === selectedSize && v.material === selectedMaterial
  );

  const [quantity, setQuantity] = useState(50);
  const [justAdded, setJustAdded] = useState(false);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const firstMaterialForSize = family.variants.find((v) => v.size === size)?.material;
    if (firstMaterialForSize) setSelectedMaterial(firstMaterialForSize);
  };

  const handleAdd = () => {
    if (!activeVariant || quantity < 1) return;
    addToCart(activeVariant.sku, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <div className="bg-brand-offwhite border border-gray-100 rounded-2xl p-6 space-y-5">
      <div>
        <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider">Size / Bore</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSizeChange(size)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                size === selectedSize
                  ? "bg-brand-navy text-white border-brand-navy"
                  : "bg-white text-brand-navy border-gray-200 hover:border-brand-orange"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider">Material Grade</span>
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-semibold bg-white outline-none focus:ring-1 focus:ring-brand-orange"
        >
          {materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-2">
            Quantity
          </span>
          <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 10))}
              className="p-2.5 text-brand-navy hover:text-brand-orange"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-16 text-center text-sm font-bold outline-none py-2"
            />
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 10)}
              className="p-2.5 text-brand-navy hover:text-brand-orange"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {activeVariant && (
          <div className="text-right">
            <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block">
              Est. Line Value
            </span>
            <span className="text-lg font-black text-brand-navy">
              {formatINR(activeVariant.indicativeRate * quantity)}
            </span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!activeVariant}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white py-3 rounded-lg font-bold text-sm tracking-wide shadow-md transition-colors disabled:opacity-60"
      >
        {justAdded ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </>
        )}
      </button>

      {justAdded && (
        <Link
          href="/cart"
          className="block text-center text-xs font-bold text-brand-orange hover:underline"
        >
          View Cart & Request Quote →
        </Link>
      )}

      <p className="text-[10px] text-brand-steel font-medium leading-relaxed">
        Rates shown are indicative budgetary figures. Final commercial pricing is confirmed by
        our team after reviewing your RFQ.
      </p>
    </div>
  );
}
