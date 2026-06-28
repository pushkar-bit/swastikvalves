"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, FileText } from "lucide-react";
import { COMPANY } from "@/lib/constants";

interface ProductHeroProps {
  name: string;
  tagline: string;
  breadcrumbs: { name: string; href?: string }[];
}

export default function ProductHero({ name, tagline, breadcrumbs }: ProductHeroProps) {
  return (
    <section
      className="relative bg-brand-charcoal text-white py-20 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 80% 20%, rgba(138, 155, 176, 0.05) 0%, transparent 50%)`,
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb004_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb004_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <nav className="text-brand-steel text-sm mb-4 font-semibold uppercase tracking-wider">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx}>
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-brand-orange transition-colors">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-white">{crumb.name}</span>
              )}
              {idx < breadcrumbs.length - 1 && <span className="mx-2">›</span>}
            </span>
          ))}
        </nav>

        {/* Headline */}
        <div className="max-w-3xl space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight"
          >
            {name}
          </motion.h1>
          <div className="w-16 h-1 bg-brand-orange rounded" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-brand-steel text-lg sm:text-xl font-medium leading-relaxed"
          >
            {tagline}
          </motion.p>
        </div>

        {/* Action Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <Link
            href="/enquiry"
            className="inline-flex items-center justify-center bg-brand-orange text-white hover:bg-orange-600 px-6 py-3 rounded font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FileText className="w-4 h-4 mr-2" />
            Request a Quote
          </Link>
          <a
            href={`tel:${COMPANY.mobile}`}
            className="inline-flex items-center justify-center border border-white/20 hover:bg-white/5 text-white px-6 py-3 rounded font-bold text-sm tracking-wide transition-all duration-300"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Us: {COMPANY.mobile}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
