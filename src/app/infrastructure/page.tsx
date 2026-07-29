import { Metadata } from "next";
import { Instrument_Serif, Barlow } from "next/font/google";
import Link from "next/link";
import MachineList from "@/components/common/MachineList";
import PhotoGallery from "@/components/common/PhotoGallery";
import InfrastructureShowcase from "@/components/infrastructure/InfrastructureShowcase";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-showcase-heading",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-showcase-body",
});

export const metadata: Metadata = {
  title: "Manufacturing Facilities | Swastik Valves Ludhiana, Punjab",
  description:
    "Swastik Valves operates a modern manufacturing facility in Ludhiana, Punjab with CNC machines, gun metal casting unit, hydraulic testing and more. ISO 9001:2008 certified ball valve manufacturer.",
};

export default function InfrastructurePage() {
  return (
    <div className="bg-white">
      <InfrastructureShowcase
        headingClass={`${instrumentSerif.className} font-heading`}
        bodyClass={`${barlow.className} font-body`}
      />

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
      <section id="gallery" className="py-20 bg-brand-offwhite border-t border-b border-brand-steel/10">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <Link
          href="/"
          className="text-brand-steel hover:text-brand-orange text-xs font-semibold uppercase tracking-wider"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
