"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Loader2,
  ChevronDown,
  ChevronUp,
  Package,
} from "lucide-react";
import type { ProductFamily, ProductVariant } from "@/lib/catalog";
import { formatINR } from "@/config/appConfig";

function emptyVariant(): ProductVariant {
  return { sku: "", size: "", bore: 0, material: "", materialCode: "", indicativeRate: 0 };
}

function emptyFamily(): ProductFamily {
  return {
    id: "",
    name: "",
    slug: "",
    image: "",
    imageAlt: "",
    tagline: "",
    description: "",
    pressureClass: "",
    endConnection: "",
    standards: [],
    applications: [],
    highlights: [],
    variants: [emptyVariant()],
  };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface FamilyCardProps {
  family: ProductFamily;
  onSaved: (updated: ProductFamily) => void;
  onDeleted: (familyId: string) => void;
  isNew?: boolean;
  onDiscardNew?: () => void;
}

function FamilyCard({ family: initial, onSaved, onDeleted, isNew, onDiscardNew }: FamilyCardProps) {
  const [family, setFamily] = useState<ProductFamily>(initial);
  const [expanded, setExpanded] = useState(Boolean(isNew));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof ProductFamily>(key: K, value: ProductFamily[K]) =>
    setFamily((prev) => ({ ...prev, [key]: value }));

  const updateVariant = (index: number, patch: Partial<ProductVariant>) => {
    setFamily((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    }));
  };

  const addVariant = () => setFamily((prev) => ({ ...prev, variants: [...prev.variants, emptyVariant()] }));
  const removeVariant = (index: number) =>
    setFamily((prev) => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));

  const save = async () => {
    setError("");
    setSaving(true);
    try {
      const payload: ProductFamily = {
        ...family,
        id: family.id || slugify(family.name),
        slug: family.slug || slugify(family.name),
      };
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Failed to save.");
        return;
      }
      setFamily(payload);
      onSaved(payload);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setSaving(false);
    }
  };

  const deleteFamily = async () => {
    if (isNew) {
      onDiscardNew?.();
      return;
    }
    if (!window.confirm(`Delete "${family.name}" and all its variants? This can't be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products?familyId=${encodeURIComponent(family.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) onDeleted(family.id);
      else setError("Failed to delete.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-orange/10 border border-brand-orange/20 rounded-lg flex items-center justify-center text-brand-orange flex-shrink-0">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <div className="font-black text-brand-navy text-sm">{family.name || "New Product Family"}</div>
            <div className="text-brand-steel text-xs font-semibold mt-0.5">
              {family.variants.length} variant{family.variants.length !== 1 ? "s" : ""}
              {family.slug && ` · /products/${family.slug}`}
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-brand-steel" /> : <ChevronDown className="w-4 h-4 text-brand-steel" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-gray-100 pt-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg font-bold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1.5">
                Family Name *
              </label>
              <input
                value={family.name}
                onChange={(e) => update("name", e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange"
                placeholder="e.g. 3 Piece Ball Valves"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1.5">
                URL Slug
              </label>
              <input
                value={family.slug}
                onChange={(e) => update("slug", e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-mono outline-none focus:ring-1 focus:ring-brand-orange"
                placeholder={slugify(family.name) || "auto-generated-from-name"}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1.5">
                Tagline
              </label>
              <input
                value={family.tagline}
                onChange={(e) => update("tagline", e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange"
                placeholder="e.g. Swing-out body · Class 800"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1.5">
                Description
              </label>
              <textarea
                rows={2}
                value={family.description}
                onChange={(e) => update("description", e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1.5">
                Pressure Class
              </label>
              <input
                value={family.pressureClass}
                onChange={(e) => update("pressureClass", e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1.5">
                End Connection
              </label>
              <input
                value={family.endConnection}
                onChange={(e) => update("endConnection", e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-medium outline-none focus:ring-1 focus:ring-brand-orange"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-brand-steel uppercase tracking-wider block mb-1.5">
                Image Path (in /public)
              </label>
              <input
                value={family.image}
                onChange={(e) => update("image", e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 w-full text-xs font-mono outline-none focus:ring-1 focus:ring-brand-orange"
                placeholder="/products/example.svg"
              />
            </div>
          </div>

          {/* Variants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-brand-steel uppercase tracking-wider">
                Sizes, Materials &amp; Rates
              </span>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-orange hover:underline"
              >
                <Plus className="w-3 h-3" />
                Add Variant
              </button>
            </div>
            <div className="space-y-2">
              {family.variants.map((v, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center bg-brand-offwhite/60 p-2 rounded-lg">
                  <input
                    value={v.sku}
                    onChange={(e) => updateVariant(i, { sku: e.target.value })}
                    placeholder="SKU"
                    className="col-span-3 border border-gray-200 rounded px-2 py-1.5 text-[11px] font-mono outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                  <input
                    value={v.size}
                    onChange={(e) => updateVariant(i, { size: e.target.value })}
                    placeholder="Size"
                    className="col-span-2 border border-gray-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                  <input
                    type="number"
                    value={v.bore}
                    onChange={(e) => updateVariant(i, { bore: Number(e.target.value) || 0 })}
                    placeholder="Bore mm"
                    className="col-span-1 border border-gray-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                  <input
                    value={v.material}
                    onChange={(e) => updateVariant(i, { material: e.target.value })}
                    placeholder="Material"
                    className="col-span-3 border border-gray-200 rounded px-2 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                  <input
                    type="number"
                    value={v.indicativeRate}
                    onChange={(e) => updateVariant(i, { indicativeRate: Number(e.target.value) || 0 })}
                    placeholder="Rate ₹"
                    className="col-span-2 border border-gray-200 rounded px-2 py-1.5 text-[11px] font-bold outline-none focus:ring-1 focus:ring-brand-orange"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    disabled={family.variants.length === 1}
                    className="col-span-1 flex justify-center text-red-500 hover:bg-red-50 disabled:opacity-30 rounded p-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={deleteFamily}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline disabled:opacity-50"
            >
              {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
              {isNew ? "Discard" : "Delete Family"}
            </button>
            <div className="flex items-center gap-3">
              {saved && <span className="text-green-600 text-xs font-bold">Saved</span>}
              <button
                type="button"
                onClick={save}
                disabled={saving || !family.name}
                className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-charcoal text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Save Family
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProductsClient({ initialFamilies }: { initialFamilies: ProductFamily[] }) {
  const [families, setFamilies] = useState<ProductFamily[]>(initialFamilies);
  const [draft, setDraft] = useState<ProductFamily | null>(null);

  const totalValue = families.reduce(
    (sum, f) => sum + f.variants.reduce((s, v) => s + v.indicativeRate, 0),
    0
  );

  return (
    <div className="min-h-screen bg-brand-offwhite">
      <header className="bg-brand-navy text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center text-brand-steel hover:text-white text-xs font-bold mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Dashboard
            </Link>
            <h1 className="font-black text-xl leading-none">Product Catalog</h1>
            <p className="text-brand-steel text-xs font-semibold mt-1">
              {families.length} families · {families.reduce((s, f) => s + f.variants.length, 0)} variants ·
              {" "}
              {formatINR(totalValue)} combined indicative rate
            </p>
          </div>
          {!draft && (
            <button
              onClick={() => setDraft(emptyFamily())}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 px-4 py-2.5 rounded-lg font-bold text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product Family
            </button>
          )}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        {draft && (
          <FamilyCard
            family={draft}
            isNew
            onDiscardNew={() => setDraft(null)}
            onSaved={(saved) => {
              setFamilies((prev) => [saved, ...prev]);
              setDraft(null);
            }}
            onDeleted={() => setDraft(null)}
          />
        )}
        {families.map((family) => (
          <FamilyCard
            key={family.id}
            family={family}
            onSaved={(updated) =>
              setFamilies((prev) => prev.map((f) => (f.id === family.id ? updated : f)))
            }
            onDeleted={(id) => setFamilies((prev) => prev.filter((f) => f.id !== id))}
          />
        ))}
        {families.length === 0 && !draft && (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-brand-steel font-semibold text-sm">
            No product families yet. Click &quot;Add Product Family&quot; to create the first one.
          </div>
        )}
      </div>
    </div>
  );
}
