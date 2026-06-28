"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";

export default function QualitySnapshot() {
  const points = [
    "Pressure Testing Facility",
    "Cryogenic Testing Facility",
    "ISO 9001:2008 by JAZ ANZ",
    "Third Party Inspection Available",
  ];

  const stats = [
    { value: "ISO 9001:2008", label: "International Quality Certification" },
    { value: "35+ Years", label: "Manufacturing Excellence" },
    { value: "100%", label: "Quality Audited Products" },
    { value: "Custom", label: "Third Party Inspection Options" },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section className="bg-brand-navy py-20 relative text-white border-b border-brand-steel/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full">
              Quality Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
              Precision at Every Stage <br />
              of Production
            </h2>
            <div className="w-16 h-1 bg-brand-orange rounded" />
            <p className="text-brand-steel text-base leading-relaxed">
              Swastik Valves are well equipped with testing equipments for quality
              control. All material test reports like Pressure Testing and Cryogenic
              testing facilities are permanently maintained and available for general
              reference. ISO 9001:2008 certified, providing third party inspection as
              per client need.
            </p>

            <ul className="space-y-3 pt-2">
              {points.map((point, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center space-x-3 text-sm font-semibold"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/quality"
                className="inline-flex items-center text-brand-orange font-bold text-base hover:text-orange-400 transition-colors"
              >
                See Full Quality Policy <span className="ml-2">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Side Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, borderColor: "rgba(231,111,0,0.4)" }}
                className="bg-brand-charcoal border border-brand-steel/20 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="text-3xl font-black text-brand-orange mb-2">
                  {stat.value}
                </div>
                <div className="text-brand-steel text-sm font-semibold leading-relaxed">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
