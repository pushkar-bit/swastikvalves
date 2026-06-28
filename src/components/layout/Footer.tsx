import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail, Landmark } from "lucide-react";
import { COMPANY, PRODUCTS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const marqueeTags = [
    "Solvent Extraction",
    "Ball Valves",
    "Gun Metal",
    "Ludhiana",
    "Punjab",
    "ISO Certified",
    "3 Piece Ball Valves",
    "Foot Valves",
    "Industrial Valves",
    "Custom Valves",
  ];

  return (
    <footer className="bg-brand-navy text-white border-t border-brand-steel/20 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black tracking-wider text-white uppercase">
                SWASTIK VALVES INDIA
              </h3>
              <div className="w-12 h-1 bg-brand-orange mt-2 rounded-full" />
            </div>
            <p className="text-brand-steel text-sm leading-relaxed">
              Precision Industrial Valves from the Heart of Punjab. Trusted partner since 1988.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-semibold bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                Est. 1988
              </span>
              <span className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-semibold bg-brand-charcoal text-white border border-brand-steel/20">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-orange mr-1" />
                ISO 9001:2008 Certified
              </span>
              <span className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-semibold bg-brand-charcoal text-white border border-brand-steel/20">
                <Landmark className="w-3.5 h-3.5 text-brand-orange mr-1" />
                MSME Registered
              </span>
            </div>
          </div>

          {/* Column 2 - Products */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                Our Products
              </h4>
              <div className="w-8 h-0.5 bg-brand-orange mt-2 rounded-full" />
            </div>
            <ul className="space-y-3 text-sm text-brand-steel">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link href={prod.slug} className="hover:text-brand-orange transition-colors duration-200">
                    {prod.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company Links */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                Company
              </h4>
              <div className="w-8 h-0.5 bg-brand-orange mt-2 rounded-full" />
            </div>
            <ul className="space-y-3 text-sm text-brand-steel">
              <li>
                <Link href="/about" className="hover:text-brand-orange transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-brand-orange transition-colors duration-200">
                  Quality Policy
                </Link>
              </li>
              <li>
                <Link href="/infrastructure" className="hover:text-brand-orange transition-colors duration-200">
                  Manufacturing Facilities
                </Link>
              </li>
              <li>
                <Link href="/enquiry" className="hover:text-brand-orange transition-colors duration-200">
                  Send Enquiry
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                Contact Us
              </h4>
              <div className="w-8 h-0.5 bg-brand-orange mt-2 rounded-full" />
            </div>
            <div className="space-y-4 text-sm text-brand-steel">
              <p className="font-bold text-white leading-tight">
                {COMPANY.legalName}
              </p>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                <span>{COMPANY.address.full}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href={`tel:${COMPANY.phone}`} className="hover:text-brand-orange transition-colors duration-200">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href={`tel:${COMPANY.mobile}`} className="hover:text-brand-orange transition-colors duration-200">
                  {COMPANY.mobile}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-brand-orange transition-colors duration-200">
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee tag strip above bottom footer */}
        <div className="relative mt-12 py-4 border-t border-b border-brand-steel/10 overflow-hidden w-full">
          <div className="flex md:justify-center flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider text-brand-steel/80">
            {marqueeTags.map((tag, idx) => (
              <span key={idx} className="flex items-center">
                {tag}
                {idx < marqueeTags.length - 1 && (
                  <span className="ml-6 text-brand-steel/30 font-light">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="py-8 text-center md:flex md:justify-between md:items-center text-xs text-brand-steel/80">
          <p>© {currentYear} Swastik Valves India. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-medium">
            Manufacturers of Industrial Valves in India
          </p>
        </div>
      </div>
    </footer>
  );
}
