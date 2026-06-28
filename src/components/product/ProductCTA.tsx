import Link from "next/link";
import { MessageSquare, Mail } from "lucide-react";
import { COMPANY } from "@/lib/constants";

interface ProductCTAProps {
  productName: string;
}

export default function ProductCTA({ productName }: ProductCTAProps) {
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Hello Swastik Valves, I am interested in getting a quote for ${productName}.`
  )}`;

  return (
    <div className="bg-brand-navy rounded-2xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl border border-brand-steel/15">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(231,111,0,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-black">
            Interested in {productName}?
          </h3>
          <p className="text-brand-steel text-sm sm:text-base leading-relaxed font-semibold">
            Get in touch with our engineering team for sizing support, material grade advice, and a fast commercial quote.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Link
            href="/enquiry"
            className="inline-flex items-center justify-center bg-brand-orange text-white hover:bg-orange-600 px-6 py-3.5 rounded-md font-bold text-sm tracking-wide shadow-md transition-all duration-300 w-full sm:w-auto text-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Request a Quote
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-md font-bold text-sm tracking-wide transition-all duration-300 w-full sm:w-auto text-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
