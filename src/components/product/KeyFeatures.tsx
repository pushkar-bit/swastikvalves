import { Check } from "lucide-react";

interface KeyFeaturesProps {
  features: string[];
  heading?: string;
}

export default function KeyFeatures({ features, heading = "Key Features" }: KeyFeaturesProps) {
  return (
    <div className="bg-brand-offwhite rounded-2xl p-8 border border-brand-steel/15 shadow-sm space-y-6">
      <h3 className="text-xl font-black text-brand-navy">
        {heading}
      </h3>
      <div className="w-10 h-0.5 bg-brand-orange rounded" />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start space-x-3 text-sm font-semibold text-brand-navy">
            <div className="w-5 h-5 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
