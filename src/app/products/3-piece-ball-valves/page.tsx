import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductHero from "@/components/product/ProductHero";
import KeyFeatures from "@/components/product/KeyFeatures";
import SpecsTable from "@/components/product/SpecsTable";
import ProductCTA from "@/components/product/ProductCTA";
import AddToCartPanel from "@/components/product/AddToCartPanel";
import { findFamily } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "3 Piece Ball Valves Manufacturer India | Swastik Valves Ludhiana",
  description:
    "Swastik Valves are manufacturers of 3 Piece Ball Valves, three piece ball valves suppliers, cast iron valves, gun metal valves exporters in india, punjab, ludhiana",
};

export default function ThreePieceBallValvesPage() {
  const name = "3 Piece Ball Valves";
  const tagline = "Swing-out Design — Built for Demanding Industrial Operations";

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "3 Piece Ball Valves" },
  ];

  const features = [
    "3-PIECE BALL VALVES DESIGN / 2-WAY",
    "3-Piece swing-Out Design, Easy In-line Maintenance",
    "Maintenance free live loaded double sealing stem packing ensures high cycles life and positive sealing",
    "Blow-Out Proof Stem",
    "Fire safe design",
    "Bolted / Screwed gland",
    "Solid ball",
  ];

  const specs = [
    {
      parameter: "Material",
      value: "Carbon Steel, Alloy Steel, Stainless Steel, any other special material",
    },
    { parameter: "Valve type", value: "Floating design ball valve" },
    { parameter: "Body type", value: "3 pc" },
    { parameter: "Seat type", value: "PTFE/CFT" },
    { parameter: "End Connection", value: "Screwed, socket & butt weld ends./Sw Extn." },
    { parameter: "Size range", value: "15 NB to 50 NB" },
    { parameter: "Pressure rating", value: "Class 800" },
    { parameter: "Operation", value: "Hand lever" },
  ];

  const sizes = ["15mm", "20mm", "25mm", "32mm", "40mm", "50mm"];

  return (
    <div className="bg-white pb-20">
      <ProductHero name={name} tagline={tagline} breadcrumbs={breadcrumbs} />

      {/* Description & Image Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Description */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-black text-brand-navy border-b pb-4 border-gray-100">
                Product Overview
              </h2>
              <div className="space-y-4 text-brand-steel text-sm sm:text-base font-semibold leading-relaxed">
                <p>
                  The 3-piece design is available for various schedule pipes. This type of
                  construction is of swing-out design and easy inline maintenance. By
                  removing body bolts & nuts the complete valve may be lifted out of the
                  line or swing-out by keeping one bolt. The valve can easily swing out
                  of the line providing complete entry and fast disassembly or
                  maintenance. The swing away feature also maintains pipe alignment during
                  inline maintenance.
                </p>
                <p>
                  The 3-piece design offers the function of both valve as well as a union.
                  It can be used in screw pipe ends, socket weld pipe ends, butt weld ends,
                  extended butt weld pipe ends. These ball valves can be easily used for
                  automation by using pneumatic and electric actuators.
                </p>
                <p>
                  The three piece ball valve screwed ends that we design and fabricate
                  have gained huge appreciation for their excellent resistant to the
                  pressure. The entire range is available in various specifications and
                  can also be customized as specified by the clients.
                </p>
              </div>
            </div>

            {/* Right Product Image + Buy Box */}
            <div className="lg:col-span-5 pt-4 space-y-6">
              <div className="h-72 sm:h-80 rounded-2xl bg-white border border-brand-steel/20 flex items-center justify-center p-4 shadow-lg overflow-hidden">
                <Image
                  src={findFamily("3-piece-ball-valves")?.image || ""}
                  alt={findFamily("3-piece-ball-valves")?.imageAlt || name}
                  width={640}
                  height={480}
                  className="w-full h-full object-contain"
                />
              </div>
              <AddToCartPanel familySlug="3-piece-ball-valves" />
            </div>

          </div>
        </div>
      </section>

      {/* Features & Specs Grid */}
      <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <KeyFeatures features={features} />
            <SpecsTable specs={specs} />
          </div>
        </div>
      </section>

      {/* Sizes Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-xl font-black text-brand-navy">Available Size Range</h3>
          <div className="w-10 h-0.5 bg-brand-orange rounded mx-auto" />
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {sizes.map((size) => (
              <span
                key={size}
                className="bg-brand-orange/10 border border-brand-orange text-brand-navy font-bold rounded-lg px-6 py-3 text-center shadow-sm hover:scale-105 transition-transform"
              >
                {size}
              </span>
            ))}
          </div>

          <p className="italic text-brand-steel text-xs pt-4 border-l-4 border-brand-steel/30 pl-4 max-w-2xl mx-auto text-left font-medium">
            Note: Specifications & Dimensions are subject to change without notice. We
            can also manufacture ball valves as per customer&apos;s drawing and requirement.
          </p>
        </div>
      </section>

      {/* Dynamic CTA */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductCTA productName={name} />
      </section>

      {/* Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between border-t border-gray-100 pt-8 font-bold text-sm text-brand-steel">
          <Link
            href="/products/gun-metal-valves"
            className="flex items-center hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Gun Metal Valves
          </Link>
          <Link href="/products" className="hover:text-brand-orange transition-colors">
            All Products
          </Link>
          <Link
            href="/products/three-piece-ball-valves"
            className="flex items-center hover:text-brand-orange transition-colors"
          >
            Three Piece Ball Valves
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
