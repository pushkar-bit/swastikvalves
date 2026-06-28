"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const RedesignedLogo = () => {
  return (
    <div className="flex items-center gap-4 group cursor-pointer select-none">
      {/* Precision Geometric Identity Mark */}
      <div className="relative w-12 h-12 flex items-center justify-center bg-slate-900/60 border border-slate-800 rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.03)] overflow-hidden">
        
        {/* Central Valve Core Pin */}
        <div className="absolute w-2 h-2 bg-orange-500 rounded-full z-10 shadow-[0_0_8px_#f97316]" />

        {/* Traditional Geometry Rendered via Precision Engineering Vectors */}
        <motion.svg 
          className="w-9 h-9 text-orange-500"
          viewBox="0 0 56 56" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Upper Right Axis & Outer Hook */}
          <path d="M 28 10 L 28 28 L 46 28" />
          <path d="M 46 28 L 46 46" className="opacity-80" />
          
          {/* Lower Left Axis & Outer Hook */}
          <path d="M 28 46 L 28 28 L 10 28" />
          <path d="M 10 28 L 10 10" className="opacity-80" />
          
          {/* Return Hooks Completing the Sacred Balance */}
          <path d="M 46 10 L 28 10" className="opacity-60" />
          <path d="M 10 46 L 28 46" className="opacity-60" />
        </motion.svg>

        {/* Technical glare effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Modern High-End Industrial Typography */}
      <div className="flex flex-col">
        <h2 className="text-xl font-black tracking-tight leading-none text-white font-mono">
          SWASTIK<span className="text-orange-500 font-sans font-light tracking-widest text-sm ml-1.5">VALVES</span>
        </h2>
        <span className="text-[9px] uppercase tracking-[0.23em] text-slate-400 font-bold mt-1.5">
          Precision Industrial • Est. 1988
        </span>
      </div>
    </div>
  );
};
