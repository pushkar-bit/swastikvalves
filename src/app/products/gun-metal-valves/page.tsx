import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";
import ProductHero from "@/components/product/ProductHero";
import KeyFeatures from "@/components/product/KeyFeatures";
import SpecsTable from "@/components/product/SpecsTable";
import ProductCTA from "@/components/product/ProductCTA";

export const metadata: Metadata = {
  title: "Gun Metal Valves Manufacturer India | Swastik Valves Punjab",
  description:
    "Swastik Valves manufactures Gun Metal Valves — ISO standard, dimensionally accurate, corrosion resistant. Suppliers and exporters in India, Punjab, Ludhiana.",
};

export default function GunMetalValvesPage() {
  const name = "Gun Metal Valves";
  const tagline = "Industrial Grade Gun Metal Valves — Corrosion Resistant, High Tensile Strength";

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Gun Metal Valves" },
  ];

  const features = [
    "Screwed female ends to IS:554 BSP",
    "Metal to Metal lift type valve",
    "Operates even at low pressure",
    "Valve also Available with rubber ring, spring loaded",
    "Filter water efficiently",
    "Trouble free performance",
    "Size Range from 15mm to 150mm",
    "High tensile strength",
    "Durability",
    "Optimum efficiency",
  ];

  const specs = [
    { parameter: "Body Material", value: "Gun Metal IS:318 Gr.LTB2" },
    { parameter: "Gasket", value: "Synthetic Rubber IS:5192" },
    { parameter: "Disc", value: "Gun Metal IS:318 Gr.LTB2" },
    { parameter: "Strainer", value: "Gun Metal IS:318 Gr.LTB2" },
  ];

  const applications = [
    "Petroleum industry",
    "Food processing industry",
    "Chemical industry",
    "Gas Plants",
    "Dyeing Industry",
  ];

  const sizes = ["15mm", "20mm", "25mm", "32mm", "40mm", "50mm", "65mm", "80mm", "100mm", "125mm", "150mm"];

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
                  Swastik Valves tends to manufacture, supply and export distinguished Gun
                  Metal Valve highly performing and durable by nature. Our gun metal
                  valve has established a respected full position in the market, which is
                  reflected by their large scale placed orders. As these industrial valves
                  made up of superior quality raw materials and designed in accordance
                  with internationally set standards.
                </p>
                <p>
                  Our pressure valves are manufactured strictly in accordance to the ISO
                  quality standards. These industrial valves are widely acknowledged due to
                  the features like dimensionally accurate, corrosion resistance and smooth
                  performance. We have engaged highly proficient team members, who make metal
                  and alloy valves as per the specific demands of the customers. Our pressure
                  valves are offered in different categories such as check, gate, butterfly,
                  safety valves and others.
                </p>
              </div>

              {/* Applications block */}
              <div className="pt-4 space-y-3">
                <h4 className="text-base font-bold text-brand-navy">Main Applications</h4>
                <div className="flex flex-wrap gap-2">
                  {applications.map((app) => (
                    <span
                      key={app}
                      className="bg-brand-offwhite border border-brand-steel/15 text-brand-navy text-xs font-bold px-3 py-1.5 rounded-full"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Product Mock */}
            <div className="lg:col-span-5 pt-4">
              <div className="h-72 sm:h-96 rounded-2xl bg-gradient-to-br from-brand-steel/10 to-brand-navy/95 border border-brand-steel/20 flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden shadow-lg">
                <Layers className="w-24 h-24 text-brand-orange animate-[pulse-slow_3s_ease-in-out_infinite]" />
                <span className="text-brand-orange font-black text-lg mt-6">
                  {name}
                </span>
                <span className="text-brand-steel text-xs font-bold mt-2">
                  Corrosion Resistant & High Tensile Strength
                </span>
              </div>
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
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {sizes.map((size) => (
              <span
                key={size}
                className="bg-brand-orange/10 border border-brand-orange text-brand-navy font-bold rounded-lg px-5 py-2.5 text-sm shadow-sm hover:scale-105 transition-transform"
              >
                {size}
              </span>
            ))}
          </div>

          <p className="italic text-brand-steel text-xs pt-4 border-l-4 border-brand-steel/30 pl-4 max-w-2xl mx-auto text-left font-medium">
            Note: Specifications & Dimensions are subject to change without notice.
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
            href="/products/gun-metal-foot-valves"
            className="flex items-center hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Gun Metal Foot Valves
          </Link>
          <Link href="/products" className="hover:text-brand-orange transition-colors">
            All Products
          </Link>
          <Link
            href="/products/3-piece-ball-valves"
            className="flex items-center hover:text-brand-orange transition-colors"
          >
            3 Piece Ball Valves
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
