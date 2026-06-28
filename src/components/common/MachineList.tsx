import { MACHINERY } from "@/lib/constants";

export default function MachineList() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">
          Our Sophisticated Infrastructure Machinery Includes:
        </h2>
        <div className="w-16 h-1 bg-brand-orange rounded mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MACHINERY.map((machine, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-5 border border-gray-100 hover:border-brand-orange hover:shadow-md transition-all duration-300 flex items-center space-x-5 cursor-pointer shadow-sm"
          >
            <span className="text-brand-orange font-black text-3xl md:text-4xl leading-none flex-shrink-0">
              {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            <span className="text-brand-navy font-bold text-sm sm:text-base leading-snug">
              {machine}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
