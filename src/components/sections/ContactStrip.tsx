import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function ContactStrip() {
  return (
    <section className="bg-brand-charcoal text-white py-8 border-t border-brand-steel/20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 md:divide-x md:divide-brand-steel/20 text-center md:text-left">
          
          {/* Item 1: Phone & Mobile */}
          <div className="flex flex-col items-center md:items-start md:px-6 space-y-2">
            <span className="text-brand-steel text-xs font-bold uppercase tracking-widest flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
              Contact Numbers
            </span>
            <div className="flex flex-col space-y-1 font-semibold text-sm">
              <a href={`tel:${COMPANY.phone}`} className="hover:text-brand-orange transition-colors">
                Landline: {COMPANY.phone}
              </a>
              <a href={`tel:${COMPANY.mobile}`} className="hover:text-brand-orange transition-colors">
                Mobile: {COMPANY.mobile}
              </a>
            </div>
          </div>

          {/* Item 2: Email */}
          <div className="flex flex-col items-center md:items-start md:px-8 space-y-2">
            <span className="text-brand-steel text-xs font-bold uppercase tracking-widest flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
              Email Inquiry
            </span>
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-sm font-semibold hover:text-brand-orange transition-colors"
            >
              {COMPANY.email}
            </a>
          </div>

          {/* Item 3: Address */}
          <div className="flex flex-col items-center md:items-start md:px-8 space-y-2">
            <span className="text-brand-steel text-xs font-bold uppercase tracking-widest flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
              Works & Office
            </span>
            <p className="text-sm font-semibold leading-relaxed max-w-sm">
              {COMPANY.address.full}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
