"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  theme?: "light" | "dark";
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  theme = "light",
  align = "center",
}: SectionHeaderProps) {
  const isDark = theme === "dark";
  const isLeft = align === "left";

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const lineVariants = {
    hidden: { width: 0 },
    show: { width: 64, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`max-w-3xl mb-12 flex flex-col ${
        isLeft ? "items-start text-left" : "items-center text-center mx-auto"
      }`}
    >
      {eyebrow && (
        <motion.span
          variants={itemVariants}
          className="text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-3 bg-brand-orange/10 px-3 py-1 rounded-full"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        variants={itemVariants}
        className={`text-3xl md:text-4xl font-black tracking-tight leading-tight ${
          isDark ? "text-white" : "text-brand-navy"
        }`}
      >
        {heading}
      </motion.h2>

      <motion.div
        variants={lineVariants}
        className="h-1 bg-brand-orange rounded mt-4 mb-4"
      />

      {subheading && (
        <motion.p
          variants={itemVariants}
          className={`text-base md:text-lg leading-relaxed ${
            isDark ? "text-brand-steel/80" : "text-brand-steel"
          }`}
        >
          {subheading}
        </motion.p>
      )}
    </motion.div>
  );
}
