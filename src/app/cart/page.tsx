"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/config/appConfig";

export default function CartPage() {
  const { enrichedLines, itemCount, subtotal, updateQuantity, removeFromCart, isHydrated } =
    useCart();

  if (isHydrated && enrichedLines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-brand-offwhite border border-gray-100 text-brand-steel rounded-full flex items-center justify-center mx-auto">
          <ShoppingCart className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-brand-navy">Your Cart is Empty</h1>
          <p className="text-brand-steel text-sm font-semibold max-w-md mx-auto">
            Browse our valve range and add items before submitting a Request for Quote.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-brand-orange hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wide shadow-md transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-brand-navy text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb006_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb006_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-brand-steel text-xs mb-3 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>{" "}
            <span className="mx-1.5">›</span> <span className="text-white">Cart</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-none">
            Your Cart
          </h1>
          <div className="w-16 h-1 bg-brand-orange rounded mt-4 mb-2" />
          <p className="text-brand-steel text-sm font-semibold">
            {itemCount} item{itemCount === 1 ? "" : "s"} ready for your quote request.
          </p>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-4">
            {enrichedLines.map((line) => (
              <div
                key={line.sku}
                className="flex flex-col sm:flex-row gap-4 bg-brand-offwhite border border-gray-100 rounded-2xl p-4 sm:p-5"
              >
                <div className="w-full sm:w-28 h-28 flex-shrink-0 bg-white rounded-xl border border-gray-100 p-2">
                  <Image
                    src={line.image}
                    alt={line.familyName}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${line.familySlug}`}
                    className="font-bold text-brand-navy hover:text-brand-orange transition-colors"
                  >
                    {line.familyName}
                  </Link>
                  <div className="text-xs text-brand-steel font-semibold mt-1">
                    {line.size} · {line.material}
                  </div>
                  <div className="font-mono text-[10px] text-brand-steel mt-1">{line.sku}</div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.sku, line.quantity - 10)}
                        className="p-2 text-brand-navy hover:text-brand-orange"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) =>
                          updateQuantity(line.sku, Math.max(1, parseInt(e.target.value, 10) || 1))
                        }
                        className="w-14 text-center text-sm font-bold outline-none py-1.5"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.sku, line.quantity + 10)}
                        className="p-2 text-brand-navy hover:text-brand-orange"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-black text-brand-navy">{formatINR(line.lineTotal)}</span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(line.sku)}
                      className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/products"
              className="inline-flex items-center text-sm font-bold text-brand-steel hover:text-brand-orange pt-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Browsing
            </Link>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-md space-y-5 sticky top-24">
              <h3 className="text-base font-black tracking-wide border-b border-white/10 pb-3 uppercase">
                Order Summary
              </h3>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-brand-steel">Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-brand-steel">Indicative Subtotal</span>
                <span className="font-bold">{formatINR(subtotal)}</span>
              </div>
              <p className="text-brand-steel text-[11px] leading-relaxed">
                This is a budgetary estimate. Your final commercial quote is confirmed by our
                team once you submit your RFQ with buyer and delivery details.
              </p>
              <Link
                href="/rfq"
                className="w-full inline-flex items-center justify-center bg-brand-orange hover:bg-orange-600 text-white py-3.5 rounded-lg font-bold text-sm tracking-wide shadow-md transition-colors"
              >
                Proceed to Request Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
