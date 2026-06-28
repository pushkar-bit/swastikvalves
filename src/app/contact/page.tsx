import { Metadata } from "next";
import Link from "next/link";
import { Phone, Smartphone, Mail, Globe, MapPin, MessageSquare } from "lucide-react";
import MiniEnquiryForm from "@/components/forms/MiniEnquiryForm";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Swastik Valves India — Ludhiana, Punjab",
  description:
    "Get in touch with Swastik Valves India (Mahavir Valves) in Ludhiana, Punjab. Find our phone numbers, email address, physical works address, and dynamic Google maps directions.",
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    "Hello Swastik Valves, I would like to get in touch with you."
  )}`;

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
            <span className="mx-2">›</span> <span className="text-white">Contact Us</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Contact Us
          </h1>
          <div className="w-20 h-1 bg-brand-orange rounded mt-4 mb-4" />
          <p className="text-brand-steel text-base sm:text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
            Swastik Valves look forward to your Valuable Suggestions, Guidance & Valued Enquiries,
            for a Long Term Warm Business Association...
          </p>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Details & Map */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Landline */}
                <div className="border border-gray-100 bg-brand-offwhite p-5 rounded-xl flex items-start space-x-4 shadow-sm">
                  <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-brand-steel text-xs font-bold uppercase tracking-wider block">
                      Phone
                    </span>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="text-brand-navy font-bold text-sm sm:text-base hover:text-brand-orange transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </div>

                {/* Mobile */}
                <div className="border border-gray-100 bg-brand-offwhite p-5 rounded-xl flex items-start space-x-4 shadow-sm">
                  <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange flex-shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-brand-steel text-xs font-bold uppercase tracking-wider block">
                      Mobile
                    </span>
                    <a
                      href={`tel:${COMPANY.mobile}`}
                      className="text-brand-navy font-bold text-sm sm:text-base hover:text-brand-orange transition-colors"
                    >
                      {COMPANY.mobile}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="border border-gray-100 bg-brand-offwhite p-5 rounded-xl flex items-start space-x-4 shadow-sm">
                  <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-brand-steel text-xs font-bold uppercase tracking-wider block">
                      Email Id
                    </span>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-brand-navy font-bold text-sm sm:text-base hover:text-brand-orange transition-colors break-all"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="border border-gray-100 bg-brand-offwhite p-5 rounded-xl flex items-start space-x-4 shadow-sm">
                  <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-brand-steel text-xs font-bold uppercase tracking-wider block">
                      Website
                    </span>
                    <a
                      href={`https://${COMPANY.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-navy font-bold text-sm sm:text-base hover:text-brand-orange transition-colors"
                    >
                      {COMPANY.website}
                    </a>
                  </div>
                </div>

              </div>

              {/* Address Box */}
              <div className="border border-gray-100 bg-brand-offwhite p-6 rounded-xl flex items-start space-x-4 shadow-sm">
                <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-brand-steel text-xs font-bold uppercase tracking-wider block">
                    Corporate Office & Works
                  </span>
                  <h4 className="font-extrabold text-brand-navy text-base">{COMPANY.legalName}</h4>
                  <p className="text-brand-steel text-sm font-semibold leading-relaxed">
                    {COMPANY.address.plot}, {COMPANY.address.area},<br />
                    {COMPANY.address.city} - {COMPANY.address.pincode},<br />
                    {COMPANY.address.state} ({COMPANY.address.country})
                  </p>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm h-[350px]">
                <iframe
                  src="https://maps.google.com/maps?q=Ludhiana+Punjab+India&output=embed"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Swastik Valves Ludhiana Location Map"
                />
              </div>

            </div>

            {/* Right Column: Mini Enquiry Form */}
            <div className="lg:col-span-5 bg-brand-offwhite p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-black text-brand-navy">Quick Contact Form</h3>
                <p className="text-brand-steel text-xs font-semibold mt-1">
                  Fill in this form to send a quick message directly to our staff.
                </p>
              </div>
              <MiniEnquiryForm />
            </div>

          </div>
        </div>
      </section>

      {/* WhatsApp Strip Section */}
      <section className="bg-green-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
            <MessageSquare className="w-8 h-8 text-white fill-current" />
          </div>
          <h3 className="text-2xl font-black">Prefer WhatsApp? Message Us Directly</h3>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Skip the form entirely and text our sales reps directly for instant support and query replies.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-green-600 hover:bg-green-50 px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-colors shadow-md"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
