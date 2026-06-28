"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Outer Pulse Ring */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-green-500 -z-10"
      />

      {/* Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl transition-colors hover:bg-green-600 focus:outline-none"
        aria-label="Chat with us on WhatsApp"
      >
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.395 9.86-9.782.002-2.61-1.01-5.063-2.852-6.906C16.638 2.073 14.19 1.06 11.603 1.06 6.167 1.06 1.745 5.46 1.743 10.85c-.001 1.679.444 3.317 1.29 4.757L2.046 20.35l4.601-1.196zm10.978-5.466c-.299-.149-1.762-.868-2.036-.967-.273-.099-.471-.148-.669.149-.197.297-.766.966-.94 1.164-.173.199-.347.223-.646.074-.299-.149-1.262-.465-2.403-1.485-.888-.793-1.487-1.771-1.661-2.07-.174-.298-.019-.46.13-.608.135-.133.298-.347.447-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.762-.719 2.01-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
        </svg>
      </motion.a>

      {/* Tooltip */}
      <div className="absolute right-16 bottom-4 bg-brand-navy text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-xl border border-brand-steel/20 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us on WhatsApp
      </div>
    </div>
  );
}
