"use client";


export default function TrustStrip() {
  const items = [
    "Est. 1988",
    "ISO 9001:2008 Certified",
    "35+ Years Experience",
    "Export Ready",
    "Custom Manufacturing",
    "Third Party Inspection Available",
  ];

  return (
    <div className="bg-brand-orange text-white py-3 overflow-hidden select-none border-y border-brand-orange/20 relative z-20">
      {/* Desktop view: Centered flex row */}
      <div className="hidden md:flex justify-center items-center gap-8 text-sm font-bold uppercase tracking-wider max-w-7xl mx-auto px-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-white mr-2">✓</span>
            <span>{item}</span>
            {index < items.length - 1 && (
              <span className="ml-8 text-white/40 font-light">|</span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile view: Seamless marquee */}
      <div className="md:hidden flex relative w-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex py-1">
          {/* First loop */}
          {items.map((item, index) => (
            <span
              key={`marquee-1-${index}`}
              className="inline-flex items-center mx-4 text-xs font-bold uppercase tracking-wider"
            >
              <span className="text-white mr-1.5">✓</span>
              <span>{item}</span>
              <span className="ml-4 text-white/30 font-light">|</span>
            </span>
          ))}
          {/* Duplicate loop */}
          {items.map((item, index) => (
            <span
              key={`marquee-2-${index}`}
              className="inline-flex items-center mx-4 text-xs font-bold uppercase tracking-wider"
            >
              <span className="text-white mr-1.5">✓</span>
              <span>{item}</span>
              <span className="ml-4 text-white/30 font-light">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
