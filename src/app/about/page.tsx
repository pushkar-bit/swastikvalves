import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Users, Package, PencilRuler, ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import SectionHeader from "@/components/common/SectionHeader";
import ParadigmShift from "@/components/sections/ParadigmShift";

export const metadata: Metadata = {
  title: "About Us | Swastik Valves India — Ball Valve Manufacturer Since 1988",
  description:
    "Learn about Swastik Valves India, established in 1988 by Sh. Varinder Kumar Jain and Sh. Nitin Jain. ISO 9001:2008 certified manufacturer of 3 piece ball valves and gun metal foot valves in Ludhiana, Punjab, India.",
};

export default function AboutPage() {
  const stats = [
    { label: "Founded", value: "1988" },
    { label: "Location", value: "Ludhiana, Punjab" },
    { label: "Certification", value: "ISO 9001:2008 by JAZ ANZ" },
    { label: "Scope", value: "India & International Export" },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Unmatched Quality Control",
      desc: "The unmatched quality of our products is a major factor which has always kept us in the forefront. We follow strict quality control measures and our quality ISO certifications substantiate this claim. Various Process parameters are well controlled. All material test reports like Pressure Testing and Cryogenic testing facilities are permanently maintained and available for general reference.",
    },
    {
      icon: Users,
      title: "Valued Clientele",
      desc: "Through our efforts we have been able to develop a huge client base. We have shown extreme commitment to our clients and always satisfied them with our qualitative service. We value our clients the most.",
    },
    {
      icon: Package,
      title: "Complete Products Range",
      desc: "Our valves products range includes 3 Piece Ball Valves, Three Piece Ball Valves, Screwed End Ball Valves, Gun Metal Ball Valves, Cast Iron 3 Piece Ball Valves, Gun Metal Foot Valves, Gun Metal Valves and customized valves as per customer specifications and requirements. Our strength is quality products at affordable prices, prompt delivery and the unflinching commitment.",
    },
    {
      icon: PencilRuler,
      title: "Custom Manufacturing",
      desc: "We also manufacture custom made valves sizes as per customer's drawing and specifications. We appreciate your online enquiry / feedback / interest for our products. For more information please mail us at: mahavirvalves@gmail.com",
    },
  ];

  const targetIndustries = [
    "Solvent Extraction Plant",
    "Tyre Machinery Making Plants",
    "Essential Oil Extraction Plant",
    "Herbal Extraction Plant",
    "Oleoresin Extraction Plant",
    "Bio-Diesel Plant",
    "Oil Expellers",
    "Vegetable Oil Refinery",
    "Turnkey Projects",
    "Chemical Industry",
    "Refineries",
    "Fertilizers",
    "Pharmaceuticals, Foods and beverages",
    "Water treatment",
    "Petrol Pumps",
    "CNG Plants / Gas Plants",
  ];

  return (
    <div className="bg-white">
      {/* 1. Page Hero Banner */}
      <section className="bg-brand-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb006_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb006_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-brand-steel text-sm mb-4 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>{" "}
            <span className="mx-2">›</span> <span className="text-white">About Us</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
            About Swastik Valves
          </h1>
          <div className="w-20 h-1 bg-brand-orange rounded mt-4 mb-4" />
          <p className="text-brand-steel text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
            Built on Precision. Driven by Trust. Delivered with Commitment.
          </p>
        </div>
      </section>

      {/* 2. Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-brand-orange text-xs font-extrabold uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full">
                Company Introduction
              </span>
              <h2 className="text-3xl font-black text-brand-navy leading-tight">
                35+ Years of Industrial Valve Manufacturing
              </h2>
              <div className="space-y-4 text-brand-steel leading-relaxed font-medium">
                <p>
                  Swastik Valves is situated at Ludhiana Punjab. The company established
                  in the year of 1988, with the able guidance Sh. Varinder Kumar Jain
                  and Sh. Nitin Jain. Our manufacturing unit is having modernized
                  machineries like CNC Lathes & all Facilities for measuring at every
                  stages of inspection of valves.
                </p>
                <p>
                  We are among the leading Manufacturer and Exporters of different
                  types of Industrial Valves in India and abroad. We have created an
                  envious position for ourselves in the market through our constant
                  efforts and endless dedication of our team of experts.
                </p>
              </div>
            </div>

            {/* Right Stats Info Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 lg:pt-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-brand-offwhite border-l-4 border-brand-orange p-5 rounded-r-xl shadow-sm space-y-1"
                >
                  <span className="text-brand-steel text-xs font-bold uppercase tracking-wider block">
                    {stat.label}
                  </span>
                  <span className="text-brand-navy text-lg font-black block leading-snug">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Next Era: Engineering a Digital Paradigm Shift */}
      <ParadigmShift />

      {/* 4. Four Pillars Section */}
      <section className="py-20 bg-brand-offwhite border-t border-b border-brand-steel/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Core Strengths"
            heading="The Pillars of Swastik Valves"
            subheading="Over three decades of core values guiding our daily operations, design standards, and client relationships."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-brand-steel text-sm leading-relaxed font-medium">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Industries Badges/Pills */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Applications"
            heading="Industries & Applications We Serve"
            subheading="Supplying certified valves for plants and engineering systems globally."
          />

          <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
            {targetIndustries.map((ind, index) => (
              <span
                key={index}
                className="bg-brand-offwhite border border-brand-steel/20 rounded-full px-5 py-2.5 text-sm font-bold text-brand-navy hover:border-brand-orange hover:bg-brand-orange/5 hover:text-brand-orange transition-all duration-300 cursor-pointer shadow-sm"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Enquiry CTA Box */}
      <section className="py-16 bg-white border-t border-brand-steel/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-2xl p-8 md:p-12 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Interested in Partnering with Swastik Valves?
            </h3>
            <p className="text-brand-steel text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              We appreciate your online enquiry, feedback, and interest in our products.
              For more information about our company, capabilities, and detailed product
              specifications, please reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <Link
                href="/enquiry"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-orange text-white hover:bg-orange-600 px-8 py-4 font-bold rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Send an Enquiry
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a
                href={`tel:${COMPANY.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center border border-brand-navy/20 hover:bg-brand-navy hover:text-white text-brand-navy px-8 py-4 font-bold rounded-md transition-all duration-300"
              >
                Or call us: {COMPANY.phone}
              </a>
            </div>
            <p className="text-brand-steel/70 text-xs font-semibold">
              Corporate Email: {COMPANY.email}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
