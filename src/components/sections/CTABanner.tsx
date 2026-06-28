"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Send } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section
      className="relative bg-brand-orange py-16 text-white overflow-hidden"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 2px, transparent 2px, transparent 10px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Need Valves for Your Plant?
          </h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Send us your technical drawings or process specifications, and get a detailed commercial quote within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/enquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-brand-orange hover:bg-brand-offwhite px-8 py-4 rounded-md font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="w-5 h-5 mr-2 stroke-[2.5]" />
              Send Your Requirements
            </Link>
            <a
              href={`tel:${COMPANY.mobile}`}
              className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-md font-bold text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: {COMPANY.mobile}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
