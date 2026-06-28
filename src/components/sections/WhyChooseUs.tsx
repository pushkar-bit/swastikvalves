"use client";

import { motion } from "framer-motion";
import { Factory, Award, Settings, PencilRuler, Globe, Eye, LucideIcon } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import { WHY_CHOOSE_US } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  factory: Factory,
  award: Award,
  settings: Settings,
  "pencil-ruler": PencilRuler,
  globe: Globe,
  eye: Eye,
};

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section className="bg-brand-offwhite py-20 relative border-b border-brand-steel/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          eyebrow="Our Edge"
          heading="Why Choose Swastik Valves"
          subheading="Decades of precision engineering combined with state-of-the-art facilities"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Settings;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, borderColor: "rgba(231,111,0,0.3)" }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6">
                  <IconComponent className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-brand-steel text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
