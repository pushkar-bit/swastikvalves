import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2, FlaskConical, Target } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "Quality Policy & ISO Certifications | Swastik Valves India",
  description:
    "Swastik Valves is ISO 9001:2008 certified by JAZ ANZ. Pressure testing, cryogenic testing, third party inspection available. Quality industrial valve manufacturer in Ludhiana, Punjab, India.",
};

export default function QualityPage() {
  const testingCaps = [
    {
      title: "Pressure Testing",
      desc: "Comprehensive pressure test benches to verify valve integrity under high design ratings.",
    },
    {
      title: "Cryogenic Testing",
      desc: "Specialized low-temperature testing facilities for cryogenic applications.",
    },
    {
      title: "Hydraulic Testing",
      desc: "High-pressure hydraulic and pneumatic testing systems for absolute leak-proof assurance.",
    },
    {
      title: "Positive Material ID",
      desc: "PMI testing equipment to verify alloy and metal casting composition specifications.",
    },
  ];

  const policyPoints = [
    "Commit ourselves for manufacturing and supplying products that would give complete satisfaction to customer.",
    "We will strive to achieve growth and leading position in the market by supplying consistent quality products.",
    "Continually improve the effectiveness of quality management system.",
    "Creating an environment of teamwork and innovative approach.",
    "Provide time bound delivery of products with very competitive prices.",
  ];

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="bg-brand-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb006_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb006_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-brand-steel text-sm mb-4 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>{" "}
            <span className="mx-2">›</span> <span className="text-white">Quality Policy</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Quality Policy & Certifications
          </h1>
          <div className="w-20 h-1 bg-brand-orange rounded mt-4 mb-4" />
          <p className="text-brand-steel text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
            ISO 9001:2008 Certified. Every valve built to international standards.
          </p>
        </div>
      </section>

      {/* Quality Control Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Body Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full">
                Strict Auditing
              </span>
              <h2 className="text-3xl font-black text-brand-navy leading-tight">
                Quality Control
              </h2>
              <div className="space-y-4 text-brand-steel text-sm sm:text-base font-semibold leading-relaxed">
                <p>
                  Swastik Valves are well equipped with testing equipments for quality
                  control. All material test reports like Pressure Testing and Cryogenic
                  testing facilities are permanently maintained and available for general
                  reference.
                </p>
                <p>
                  Swastik Valves has infrastructure to design and develop variety of valve
                  products. we offer Innovative Products Design with best possible quality
                  and very competitive price. We assure quality assurance for the
                  manufacturing of all valves products to ensure they comply with contractual
                  requirements. All our raw material suppliers are totally committed to
                  provide us high quality raw materials which is inspected for conformity on
                  receipt and after assembly.
                </p>
                <p>
                  Swastik Valves has build and enviable reputation for producing high quality
                  three piece valves and gun metal foot valves. Our Quality control team
                  ensure that each valve is constructed in accordance with the international
                  codes. All finished valves are audited and inspected by major inspecting
                  quality team. In addition to their normal application, the valves must
                  prove their safe and reliable operation even under adverse and extreme
                  conditions.
                </p>
              </div>
            </div>

            {/* Right Testing Capabilities Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testingCaps.map((cap, idx) => (
                <div
                  key={idx}
                  className="bg-brand-offwhite border border-brand-steel/15 rounded-2xl p-5 shadow-sm space-y-2 hover:border-brand-orange hover:shadow-md transition-all"
                >
                  <CheckCircle2 className="w-6 h-6 text-brand-orange stroke-[1.8]" />
                  <h4 className="font-bold text-brand-navy text-sm sm:text-base">
                    {cap.title}
                  </h4>
                  <p className="text-brand-steel text-xs leading-relaxed font-semibold">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ISO Certification Highlight Block */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-orange/10 border-2 border-brand-orange rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="w-24 h-24 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center text-brand-orange flex-shrink-0">
              <Award className="w-12 h-12 stroke-[1.5]" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-brand-orange leading-none">
                ISO 9001:2008 Certified
              </h3>
              <p className="text-brand-navy text-sm font-extrabold tracking-wide uppercase bg-brand-navy/5 inline-block px-3 py-1 rounded">
                Accredited by JAZ ANZ
              </p>
              <p className="text-brand-steel text-sm sm:text-base font-semibold leading-relaxed">
                Swastik Valves is an ISO 9001:2008 certified company which provides third
                party inspection also as per clients need. Continuous development &
                products improvement is our motto. Swastik Valves has continually worked to
                develop innovative and quality Ball Valves and Gun Metal Foot Valves
                products and has earned a reputation for technical excellence in the
                industrial valve industry and accredited with ISO 9001:2008 Certification by
                JAZ ANZ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Policy Statement */}
      <section className="py-20 bg-brand-charcoal text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full">
              Mission Statement
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white">
              Our Quality Policy
            </h2>
            <div className="w-16 h-1 bg-brand-orange rounded mx-auto" />
          </div>

          <div className="space-y-4">
            {policyPoints.map((point, index) => (
              <div
                key={index}
                className="bg-brand-navy border border-brand-steel/15 rounded-xl p-6 flex items-start space-x-6 hover:border-brand-orange transition-colors"
              >
                <span className="text-brand-orange font-black text-3xl md:text-4xl leading-none flex-shrink-0">
                  0{index + 1}
                </span>
                <p className="text-brand-steel font-bold text-sm sm:text-base leading-relaxed pt-1.5">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full">
                Engineering R&D
              </span>
              <h2 className="text-3xl font-black text-brand-navy leading-tight">
                Research & Development
              </h2>
              <div className="w-16 h-1 bg-brand-orange rounded" />
              <p className="text-brand-steel text-sm sm:text-base font-semibold leading-relaxed">
                Through continuous efforts in research and development, we could bring our
                various types of Valves for High Pressure, High Temperature and Highly
                Corrosive Fluids. We also offers Valves with the third party inspection
                agencies. We can offer other inspection agency as per your need.
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-brand-offwhite border-2 border-dashed border-brand-steel/20 flex items-center justify-center text-brand-orange">
                <FlaskConical className="w-20 h-20 stroke-[1.2]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Display Grid */}
      <section className="py-20 bg-brand-offwhite border-t border-brand-steel/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Credentials"
            heading="Our Official Certifications"
            subheading="Swastik Valves operates under legal government clearances and registered trademarks."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white border-2 border-brand-steel/10 hover:border-brand-orange rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-3">
              <Award className="w-12 h-12 text-brand-orange stroke-[1.2]" />
              <h4 className="text-lg font-bold text-brand-navy">ISO 9001:2008</h4>
              <p className="text-brand-steel text-xs font-bold uppercase">Certified by JAZ ANZ</p>
              <p className="text-brand-steel/70 text-xs leading-relaxed font-semibold">
                International Quality Management System
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-2 border-brand-steel/10 hover:border-brand-orange rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-brand-orange stroke-[1.2]" />
              <h4 className="text-lg font-bold text-brand-navy">Trademark Certificate</h4>
              <p className="text-brand-steel text-xs font-bold uppercase">Certificate of Registration</p>
              <p className="text-brand-steel/70 text-xs leading-relaxed font-semibold">
                Registered Brand — Swastik Valves
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-2 border-brand-steel/10 hover:border-brand-orange rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-3">
              <Target className="w-12 h-12 text-brand-orange stroke-[1.2]" />
              <h4 className="text-lg font-bold text-brand-navy">Company Registration</h4>
              <p className="text-brand-steel text-xs font-bold uppercase">Registered Company</p>
              <p className="text-brand-steel/70 text-xs leading-relaxed font-semibold">
                Government of India Registration
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border-2 border-brand-steel/10 hover:border-brand-orange rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-3">
              <ShieldCheck className="w-12 h-12 text-brand-orange stroke-[1.2]" />
              <h4 className="text-lg font-bold text-brand-navy">MSME Certificate</h4>
              <p className="text-brand-steel text-xs font-bold uppercase">Micro Small & Medium Enterprise</p>
              <p className="text-brand-steel/70 text-xs leading-relaxed font-semibold">
                Ministry of MSME, India
              </p>
            </div>

          </div>

          <p className="text-center text-brand-steel text-xs font-bold mt-8 italic">
            (Certificate scan images will be displayed here — please provide high resolution scans)
          </p>
        </div>
      </section>
    </div>
  );
}
