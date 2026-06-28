"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Wrench,
  Flower,
  Leaf,
  Flame,
  Fuel,
  TrendingUp,
  Cpu,
  FolderLock,
  FlaskConical,
  Factory,
  Sprout,
  Pill,
  CupSoda,
  Waves,
  Gauge,
  Wind,
  Database,
  Utensils,
  Paintbrush,
  LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { INDUSTRIES } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  "Solvent Extraction Plant": Droplets,
  "Tyre Machinery Making Plants": Wrench,
  "Essential Oil Extraction Plant": Flower,
  "Herbal Extraction Plant": Leaf,
  "Oleoresin Extraction Plant": Flame,
  "Bio-Diesel Plant": Fuel,
  "Oil Expellers": TrendingUp,
  "Vegetable Oil Refinery": Cpu,
  "Turnkey Projects": FolderLock,
  "Chemical Industry": FlaskConical,
  "Refineries": Factory,
  "Fertilizers": Sprout,
  "Pharmaceuticals": Pill,
  "Foods & Beverages": CupSoda,
  "Water Treatment": Waves,
  "Petrol Pumps": Gauge,
  "CNG / Gas Plants": Wind,
  "Petroleum Industry": Database,
  "Food Processing Industry": Utensils,
  "Dyeing Industry": Paintbrush,
};

export default function IndustriesGrid() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const tileVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <section className="bg-brand-offwhite py-20 relative border-b border-brand-steel/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="Industries We Serve"
          heading="Valve Solutions for Every Critical Process"
          subheading="Swastik Valves are built to withstand high pressures, temperatures, and corrosive environments across various industry segments."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {INDUSTRIES.map((industry, index) => {
            const IconComponent = iconMap[industry] || Factory;
            return (
              <motion.div
                key={index}
                variants={tileVariants}
                whileHover={{ scale: 1.05, borderColor: "#E76F00" }}
                className="bg-white border border-gray-100 rounded-xl p-5 text-center flex flex-col items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="text-brand-orange mb-3 transition-transform duration-300 hover:rotate-12">
                  <IconComponent className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-sm font-bold text-brand-navy leading-snug">
                  {industry}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-brand-steel text-sm font-semibold">
            ...and many more industrial applications.{" "}
            <a href="/contact" className="text-brand-orange hover:underline">
              Contact us with your specific requirements.
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
