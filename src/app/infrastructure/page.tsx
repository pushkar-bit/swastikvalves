import { Metadata } from "next";
import Link from "next/link";
import MachineList from "@/components/common/MachineList";
import PhotoGallery from "@/components/common/PhotoGallery";

export const metadata: Metadata = {
  title: "Manufacturing Facilities | Swastik Valves Ludhiana, Punjab",
  description:
    "Swastik Valves operates a modern manufacturing facility in Ludhiana, Punjab with CNC machines, gun metal casting unit, hydraulic testing and more. ISO 9001:2008 certified ball valve manufacturer.",
};

export default function InfrastructurePage() {
  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-brand-charcoal text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb004_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb004_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-brand-steel text-sm mb-4 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>{" "}
            <span className="mx-2">›</span> <span className="text-white">Infrastructure</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Manufacturing Facilities & Infrastructure
          </h1>
          <div className="w-20 h-1 bg-brand-orange rounded mt-4 mb-4" />
          <p className="text-brand-steel text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
            Modern machinery. Experienced teams. Precision at every stage.
          </p>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full">
            Our Facility
          </span>
          <h2 className="text-3xl font-black text-brand-navy leading-tight">
            Valves Field Expertise
          </h2>
          <div className="w-10 h-0.5 bg-brand-orange rounded mx-auto" />
          <div className="space-y-4 text-brand-steel text-sm sm:text-base font-semibold leading-relaxed">
            <p>
              Swastik Valves all engineering staff, casting staff, quality staff, assembly
              staff, packaging and dispatch staff are highly qualified having vast
              practical & valves field experience. Our products are sale all over India and
              abroad.
            </p>
            <p>
              Swastik Valves objectives is the development of valves designed to maximise
              performance according to customer&apos;s own parameter and tolerances. Our
              products are known for reliability, efficiency and productivity, adaption to
              new technology. Our modernized machinery helps us in meeting our client&apos;s
              demands efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Machinery List Section */}
      <section className="py-20 bg-brand-offwhite border-t border-b border-brand-steel/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MachineList />
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PhotoGallery />
        </div>
      </section>
    </div>
  );
}
