import { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Check, HelpCircle } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Send Enquiry | Get a Quote — Swastik Valves India",
  description:
    "Send your valve requirements to Swastik Valves India. We manufacture 3 piece ball valves, gun metal foot valves for industrial applications. Get a fast quote.",
};

export default function EnquiryPage() {
  const directContacts = [
    { label: "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
    { label: "Mobile", value: COMPANY.mobile, href: `tel:${COMPANY.mobile}` },
    { label: "Email ID", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  ];

  const detailsChecklist = [
    "Type of valve required",
    "Size / dimension needed",
    "Material preference",
    "Quantity required",
    "Application / industry",
    "Any custom specifications",
  ];

  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    "Hello Swastik Valves, I would like to make a business enquiry."
  )}`;

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-brand-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8a9bb006_1px,transparent_1px),linear-gradient(to_bottom,#8a9bb006_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="text-brand-steel text-sm mb-4 font-semibold uppercase tracking-wider">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>{" "}
            <span className="mx-2">›</span> <span className="text-white">Send Enquiry</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
            Send Enquiry / Get Quote
          </h1>
          <div className="w-20 h-1 bg-brand-orange rounded mt-4 mb-4" />
          <p className="text-brand-steel text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
            {"Questions / Feedback — We'd Love to Hear From You"}
          </p>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-brand-offwhite p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-brand-navy">Requirement Details</h2>
                <p className="text-brand-steel text-sm font-semibold mt-1">
                  Fill in the details below to receive a detailed quote.
                </p>
              </div>
              <EnquiryForm />
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Box 1: Direct Contact */}
              <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-black tracking-wide border-b border-white/10 pb-3">
                  Prefer to reach us directly?
                </h3>
                <div className="space-y-3">
                  {directContacts.map((contact, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-brand-steel">{contact.label}:</span>
                      <a href={contact.href} className="text-brand-orange hover:underline font-bold">
                        {contact.value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 2: WhatsApp CTA */}
              <div className="bg-green-600 text-white rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h4 className="font-black text-base">Chat with us on WhatsApp</h4>
                    <p className="text-white/80 text-xs font-semibold">Send requirements directly</p>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-white text-green-600 hover:bg-green-50 py-3 rounded-lg font-bold text-sm tracking-wide transition-colors shadow-md"
                >
                  Open WhatsApp
                </a>
              </div>

              {/* Box 3: What to Include */}
              <div className="bg-brand-offwhite rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4 text-brand-navy">
                <h4 className="font-black text-base flex items-center">
                  <HelpCircle className="w-5 h-5 text-brand-orange mr-2" />
                  What to include in your enquiry:
                </h4>
                <ul className="space-y-2.5">
                  {detailsChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm font-semibold text-brand-navy">
                      <Check className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
