import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { findFamily } from "@/lib/catalog";
import SectionHeader from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "Products | Ball Valves & Gun Metal Valves — Swastik Valves India",
  description:
    "Explore our precision-engineered industrial valves range including 3 Piece Ball Valves, Three Piece Ball Valves, Gun Metal Foot Valves, and Gun Metal Valves.",
};

export default function ProductsPage() {
  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-brand-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb006_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb006_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-brand-steel text-sm mb-4 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>{" "}
            <span className="mx-2">›</span> <span className="text-white">Products</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Our Products Range
          </h1>
          <div className="w-20 h-1 bg-brand-orange rounded mt-4 mb-4" />
          <p className="text-brand-steel text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
            Precision-engineered industrial valves for every critical process.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Valves Portfolio"
            heading="Explore Our Industrial Valves"
            subheading="Click on any product to view comprehensive technical specifications, dimensions, features, and materials."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((prod) => (
              <Link
                key={prod.id}
                href={prod.slug}
                className="group border border-gray-100 bg-white rounded-2xl overflow-hidden hover:border-brand-orange hover:shadow-2xl transition-all duration-300 flex flex-col h-[360px] cursor-pointer"
              >
                {/* Top Half - Product Image */}
                <div className="h-44 bg-white relative flex items-center justify-center border-b border-gray-100 overflow-hidden p-4">
                  <Image
                    src={findFamily(prod.id)?.image || ""}
                    alt={findFamily(prod.id)?.imageAlt || prod.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Bottom Half - Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-brand-steel text-sm mt-2 line-clamp-2 leading-relaxed font-semibold">
                      {prod.shortDesc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold px-2.5 py-1 rounded-md">
                        Sizes: {prod.sizes}
                      </span>
                      <span className="inline-block bg-brand-offwhite border border-brand-steel/20 text-brand-steel text-xs font-bold px-2.5 py-1 rounded-md">
                        {prod.material.split(",")[0]}
                      </span>
                    </div>
                    <span className="text-brand-orange font-bold text-sm group-hover:underline">
                      View Full Specifications →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Manufacturing Callout */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-navy text-white rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(231,111,0,0.06)_0%,transparent_50%)] pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-start space-x-6 max-w-3xl">
                <div className="w-16 h-16 rounded-xl bg-brand-orange/15 border border-brand-orange/25 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <Wrench className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black">
                    Custom Valve Manufacturing
                  </h3>
                  <p className="text-brand-steel text-sm sm:text-base leading-relaxed font-semibold">
                    We also manufacture custom made valves sizes as per customer&apos;s drawing
                    and specifications. Send us your engineering drawings and process
                    tolerances, and our specialized design division will deliver exact solutions.
                  </p>
                </div>
              </div>
              <Link
                href="/enquiry"
                className="w-full lg:w-auto inline-flex items-center justify-center bg-brand-orange text-white hover:bg-orange-600 px-8 py-4 rounded-md font-bold text-base transition-all duration-300 whitespace-nowrap shadow-lg shadow-orange-500/20"
              >
                Send Your Requirements
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
