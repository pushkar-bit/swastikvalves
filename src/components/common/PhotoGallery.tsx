"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface GalleryImage {
  id: number;
  group: 1 | 2;
  caption: string;
  placeholderText: string;
}

export default function PhotoGallery() {
  const [activeImg, setActiveImg] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    // Group 1: 4 casting unit images
    ...Array.from({ length: 4 }).map((_, i) => ({
      id: i + 1,
      group: 1 as const,
      caption: "Ball Valves Gun Metal Casting Unit — Swastik Valves Ludhiana Punjab India",
      placeholderText: `Casting Unit Setup ${i + 1}`,
    })),
    // Group 2: 16 manufacturing unit images
    ...Array.from({ length: 16 }).map((_, i) => ({
      id: i + 5,
      group: 2 as const,
      caption: "Ball Valves - 3 Piece Ball Valves - Gun Metal Foot Valves manufacturing unit — Swastik Valves Ludhiana Punjab India",
      placeholderText: `Manufacturing Floor View ${i + 1}`,
    })),
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">Our Infrastructure</h2>
        <div className="w-10 h-0.5 bg-brand-orange rounded mx-auto" />
        <p className="text-brand-steel text-sm sm:text-base font-semibold max-w-xl mx-auto">
          Manufacturing floor, casting unit, and finished valve products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="flex flex-col space-y-3 group">
            {/* Visual Placeholder Card */}
            <div
              onClick={() => setActiveImg(img)}
              className="relative aspect-video bg-gradient-to-br from-brand-steel/15 to-brand-navy/85 border border-brand-steel/20 rounded-xl overflow-hidden cursor-pointer flex flex-col items-center justify-center p-4 text-center hover:border-brand-orange hover:shadow-lg transition-all duration-300"
            >
              <span className="text-brand-orange font-bold text-xs uppercase tracking-wider mb-2 bg-brand-navy/40 px-2 py-0.5 rounded">
                Group {img.group}
              </span>
              <span className="text-white font-extrabold text-sm leading-snug">
                {img.placeholderText}
              </span>
              
              {/* Zoom Overlay */}
              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <ZoomIn className="w-8 h-8 text-brand-orange stroke-[1.8]" />
              </div>
            </div>
            {/* Caption */}
            <p className="text-brand-steel text-xs leading-relaxed font-semibold italic text-center px-1">
              {img.caption}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-brand-steel text-xs font-bold mt-8 italic">
        Contact us to visit our manufacturing facility in Ludhiana, Punjab.
      </p>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImg && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImg(null)}
              className="fixed inset-0 bg-black z-[100] cursor-zoom-out"
            />
            {/* Lightbox Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-[10%] bottom-[10%] max-w-4xl mx-auto z-[101] bg-brand-navy border border-brand-steel/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-between text-white pointer-events-none"
            >
              <div className="flex justify-between items-center border-b border-brand-steel/20 pb-4 pointer-events-auto">
                <h4 className="font-black text-lg">{activeImg.placeholderText}</h4>
                <button
                  onClick={() => setActiveImg(null)}
                  className="p-2 rounded-full hover:bg-brand-charcoal text-brand-orange"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Central representation */}
              <div className="flex-grow flex items-center justify-center py-10">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-brand-charcoal flex items-center justify-center border border-brand-orange/20">
                    <svg
                      className="w-12 h-12 text-brand-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-brand-steel font-bold text-sm tracking-wide">
                    Factory Photo Placeholder — Full Resolution Scan
                  </span>
                </div>
              </div>

              <div className="border-t border-brand-steel/20 pt-4 text-center">
                <p className="text-brand-steel text-sm font-semibold italic">
                  {activeImg.caption}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
