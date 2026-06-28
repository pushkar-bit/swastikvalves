"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, ShieldCheck, Factory, Globe } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useState, useRef } from "react";

export default function HeroSection() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const yearsCount = useCountUp(35, 2000, inView);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-brand-charcoal overflow-hidden pt-20"
      style={{
        backgroundImage: `radial-gradient(circle at 70% 30%, rgba(138, 155, 176, 0.08) 0%, transparent 60%),
                          radial-gradient(circle at 10% 80%, rgba(231, 111, 0, 0.05) 0%, transparent 55%)`,
      }}
    >
      {/* Visual background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb00a_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb00a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="inline-flex items-center space-x-2 border border-brand-orange/40 text-brand-orange bg-brand-orange/10 rounded-full px-4 py-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider"
            >
              <span className="animate-pulse">🏭</span>
              <span>ISO 9001:2008 Certified · Est. 1988</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight"
            >
              Precision Industrial <br />
              <span className="text-brand-orange inline-block my-1 filter drop-shadow-[0_2px_10px_rgba(231,111,0,0.15)]">
                Valve Solutions
              </span>{" "}
              <br />
              Trusted Since 1988
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="text-brand-steel text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
            >
              ISO 9001:2008 Certified Manufacturer of 3 Piece Ball Valves, Gun Metal
              Foot Valves & Industrial Valve Solutions from Ludhiana, Punjab, India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="/enquiry"
                className="inline-flex items-center justify-center bg-brand-orange text-white px-8 py-4 font-bold rounded-md hover:bg-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Request a Quote
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center border-2 border-white/30 hover:border-brand-orange text-white hover:text-brand-orange px-8 py-4 font-bold rounded-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                View Products
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side Visual & Floating Cards */}
          <div className="hidden lg:flex lg:col-span-5 relative h-[500px] items-center justify-center">
            
            {/* Center concentric SVG/CSS valve graphic */}
            <div className="absolute w-80 h-80 rounded-full border border-brand-steel/10 flex items-center justify-center animate-[spin_40s_linear_infinite]">
              <div className="w-64 h-64 rounded-full border-2 border-dashed border-brand-steel/15 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-brand-orange/20 flex items-center justify-center">
                  {/* Stylized Valve Core */}
                  <svg
                    className="w-32 h-32 text-brand-orange/35"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v18M3 12h18M12 8a4 4 0 100 8 4 4 0 000-8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 1 - Experience (Top Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              className="absolute top-10 left-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-44 hover:border-brand-orange/50 transition-colors shadow-2xl"
              style={{ y: "-10px" }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-brand-orange/15 rounded-lg text-brand-orange">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white leading-none">
                    {inView ? `${yearsCount}+` : "0+"}
                  </div>
                  <div className="text-brand-steel text-xs font-semibold mt-1">
                    Years Experience
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Certification (Top Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="absolute top-20 right-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-48 hover:border-brand-orange/50 transition-colors shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-brand-orange/15 rounded-lg text-brand-orange">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-black text-white leading-none">
                    ISO 9001:2008
                  </div>
                  <div className="text-brand-steel text-xs font-semibold mt-1">
                    Certified Quality
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Custom Manufacturing (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.0, type: "spring", stiffness: 100 }}
              className="absolute bottom-16 left-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-44 hover:border-brand-orange/50 transition-colors shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-brand-orange/15 rounded-lg text-brand-orange">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-lg font-black text-white leading-none">
                    Custom
                  </div>
                  <div className="text-brand-steel text-xs font-semibold mt-1">
                    Manufacturing
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4 - Export (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
              className="absolute bottom-8 right-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-44 hover:border-brand-orange/50 transition-colors shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-brand-orange/15 rounded-lg text-brand-orange">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-lg font-black text-white leading-none">
                    Export
                  </div>
                  <div className="text-brand-steel text-xs font-semibold mt-1">
                    India & Abroad
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
