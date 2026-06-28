"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Eye, Radio, Sparkles } from "lucide-react";

export default function ParadigmShift() {
  const [activeSystem, setActiveSystem] = useState<string>("modern");

  return (
    <section className="py-20 bg-[#0A0F1D] text-white relative overflow-hidden border-t border-slate-900 border-b border-slate-900">
      {/* Tech grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-500 text-xs font-mono tracking-widest uppercase bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Strategic Evolution
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 tracking-tight">
            The Next Era: Engineering a Digital Paradigm Shift
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-semibold mt-4 leading-relaxed">
            Transitioning from a traditional print catalog foundation into a tactile, high-performance digital B2B specification matrix.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Block 1: Brand Modernization */}
          <div className="bg-[#111A2E]/60 border border-slate-800/80 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300 group shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)] flex flex-col justify-between">
            <div>
              <div className="text-orange-500 text-xs font-mono mb-4 block">01 / BRAND SYSTEM</div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                Brand Modernization
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                We documented the strategic decision to transition a legacy manufacturing foundation (Est. 1988) into a top-tier international digital catalog. By standardizing high-contrast typography and clear layout parameters, our catalog meets the scannability standards required by global procurement agents.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>ESTABLISHED 1988</span>
              <span className="text-orange-500/70">→ MODERNIZED CATALOG</span>
            </div>
          </div>

          {/* Block 2: The Fluid Manifold Identity */}
          <div className="bg-[#111A2E]/60 border border-slate-800/80 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300 group shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)] flex flex-col justify-between">
            <div>
              <div className="text-orange-500 text-xs font-mono mb-4 block">02 / VISUAL IDENTITY</div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                The Fluid Manifold Identity
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                The updated branding abstractions represent mechanical fluid vectors converging on a central ball-valve core axis. This design symbolizes absolute balance, multi-port velocity control, and CNC machinery precision that define Swastik Valves&apos; industrial output.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>FLOW MECHANICS</span>
              <span className="text-orange-500/70">→ KINETIC VECTORS</span>
            </div>
          </div>

          {/* Block 3: Blueprint Scannability Canvas */}
          <div className="bg-[#111A2E]/60 border border-slate-800/80 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300 group shadow-[inset_0_1px_2px_rgba(255,255,255,0.02)] flex flex-col justify-between">
            <div>
              <div className="text-orange-500 text-xs font-mono mb-4 block">03 / PROCUREMENT ADVANTAGE</div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                Blueprint Scannability Canvas
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                We engineered a dark blueprint canvas matrix designed to reduce visual clutter. By optimizing text contrast and structural hierarchies, international procurement agents can instantly scan material specifications, pressure classes (Class 800), and custom dimensions.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>ZERO VISUAL CLUTTER</span>
              <span className="text-orange-500/70">→ INSTANT MATRICES</span>
            </div>
          </div>

        </div>

        {/* Interactive Comparison Canvas */}
        <div className="mt-16 bg-[#111A2E]/30 border border-slate-800/60 rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Interactive Toggle Control Side */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h4 className="text-xl font-bold text-white flex items-center">
                  <Sparkles className="w-5 h-5 text-orange-500 mr-2" />
                  Interactive Blueprint Schema
                </h4>
                <p className="text-slate-400 text-sm font-semibold mt-2 leading-relaxed">
                  Click through the comparative system matrix to witness the design shift from legacy print layouts to our modern high-contrast digital cockpit.
                </p>
              </div>

              {/* System Selector buttons */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-slate-950 border border-slate-800/80 rounded-xl">
                <button
                  onClick={() => setActiveSystem("legacy")}
                  className={`py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider font-mono transition-all duration-300 ${
                    activeSystem === "legacy"
                      ? "bg-slate-800 text-slate-300 border border-slate-700"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Legacy System
                </button>
                <button
                  onClick={() => setActiveSystem("modern")}
                  className={`py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider font-mono transition-all duration-300 ${
                    activeSystem === "modern"
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  Modern Digital
                </button>
              </div>

              {/* Explanation of chosen state */}
              <div className="min-h-[100px] border-l-2 border-orange-500/40 pl-4 py-1 text-xs leading-relaxed font-semibold text-slate-400">
                <AnimatePresence mode="wait">
                  {activeSystem === "legacy" ? (
                    <motion.div
                      key="legacy-desc"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <span className="text-slate-400 font-bold block text-sm">Static Page Architecture</span>
                      <p>
                        Legacy catalogs suffered from visual clutter, poor color contrast, and static dimensional maps that print-limited buyers in scanning configurations dynamically.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="modern-desc"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <span className="text-orange-400 font-bold block text-sm">Dark Blueprint Specification Matrix</span>
                      <p>
                        Our web platform optimizes scannability for international agents, organizing material specifications, sizes, and pressure ratings in high-contrast grid layouts.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Interactive Screen Display Side */}
            <div className="lg:col-span-7">
              <div className="relative bg-[#0A0F1D] border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[260px] flex flex-col justify-between font-mono text-[11px] text-slate-500 overflow-hidden shadow-inner select-none transition-colors duration-500">
                {/* Tech grid inside */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {activeSystem === "legacy" ? (
                    <motion.div
                      key="legacy-view"
                      initial={{ opacity: 0, filter: "blur(5px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(5px)" }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col justify-between flex-1 space-y-4"
                    >
                      <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                        <span className="text-slate-600 font-bold">LEGACY CATALOG INDEX (1988)</span>
                        <span className="text-red-500/80 blink font-bold">● CLUTTERED</span>
                      </div>
                      
                      <div className="space-y-3 my-auto">
                        <div className="border border-slate-800 bg-slate-900/10 p-3 rounded-lg space-y-1 opacity-70">
                          <span className="text-slate-400 block font-bold">STATIC PRINT LAYOUTS</span>
                          <span className="text-[10px]">Unstructured information blocks, scanning restricted by page resolution boundaries.</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="border border-slate-800 p-2 rounded text-center">PAGE_124: BALL VALVES</div>
                          <div className="border border-slate-800 p-2 rounded text-center">PAGE_125: GM FOOT VALVES</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-slate-850 pt-3 text-[10px] text-slate-600">
                        <span>PAGE_INDEX: 40+ PAGES</span>
                        <span>UPDATE CYCLE: ANNUAL</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="modern-view"
                      initial={{ opacity: 0, filter: "blur(5px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(5px)" }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col justify-between flex-1 space-y-4"
                    >
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <span className="text-orange-500 font-bold flex items-center">
                          <Radio className="w-3.5 h-3.5 mr-1.5 text-orange-500 animate-pulse" />
                          SCHEMATIC MATRIX // CNC.V1
                        </span>
                        <span className="text-emerald-400 font-bold">ACTIVE SYSTEM</span>
                      </div>
                      
                      <div className="space-y-2.5 my-auto">
                        <div className="flex justify-between border-b border-slate-800/30 pb-1">
                          <span className="text-slate-400">SECTOR_01 // STAINLESS STEEL</span>
                          <span className="text-white font-bold">PTFE SEATED</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/30 pb-1">
                          <span className="text-slate-400">PRESSURE RATING</span>
                          <span className="text-white font-bold">CLASS 800 / HYD 1500 PSI</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800/30 pb-1">
                          <span className="text-slate-400">AVAILABLE SIZES</span>
                          <span className="text-white font-bold">15MM - 50MM RANGE</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-slate-800 pt-3 text-[10px]">
                        <span className="flex items-center text-slate-500">
                          <LayoutGrid className="w-3.5 h-3.5 mr-1" />
                          SCALE: 1:1.2
                        </span>
                        <span className="text-orange-500 font-bold flex items-center">
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          HIGH-SCANNABILITY RENDER
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
