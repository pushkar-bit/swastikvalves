"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";
import { PRODUCTS } from "@/lib/constants";
import type { ProductFamily } from "@/lib/catalog";

interface ProductsGridProps {
  families: ProductFamily[];
}

export default function ProductsGrid({ families }: ProductsGridProps) {
  const familyMap = new Map(families.map((f) => [f.id, f]));
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section className="bg-brand-charcoal py-20 relative border-b border-brand-steel/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="Precision Range"
          heading="Our Featured Products"
          subheading="Click to explore specifications, materials, and available size options"
          theme="dark"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(231, 111, 0, 0.15)" }}
              className="bg-brand-navy border border-brand-steel/20 rounded-2xl overflow-hidden hover:border-brand-orange/60 transition-all duration-300 flex flex-col justify-between"
            >
              <Link href={product.slug} className="flex-grow flex flex-col">
                {/* Top Section / Product Image */}
                <div className="h-48 bg-white relative flex items-center justify-center border-b border-brand-steel/10 group p-4 overflow-hidden">
                  <Image
                    src={familyMap.get(product.id)?.image || ""}
                    alt={familyMap.get(product.id)?.imageAlt || product.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-brand-steel text-sm mt-3 line-clamp-2 leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold px-2.5 py-1 rounded">
                        Sizes: {product.sizes}
                      </span>
                      <span className="inline-block bg-white/5 border border-white/10 text-brand-steel text-xs font-semibold px-2.5 py-1 rounded">
                        {product.material.split(",")[0]}
                      </span>
                    </div>

                    <span className="inline-flex items-center text-brand-orange font-bold text-sm hover:underline mt-2">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
