interface SpecsTableProps {
  specs: { parameter: string; value: string }[];
  heading?: string;
}

export default function SpecsTable({ specs, heading = "Technical Specifications" }: SpecsTableProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black text-brand-navy">
        {heading}
      </h3>
      <div className="w-10 h-0.5 bg-brand-orange rounded" />
      <div className="overflow-hidden border border-brand-steel/20 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-brand-steel/20">
          <thead className="bg-brand-navy text-white text-left text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Parameter</th>
              <th className="px-6 py-4">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-sm font-medium text-brand-navy">
            {specs.map((spec, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 1 ? "bg-brand-offwhite" : "bg-white"}
              >
                <td className="px-6 py-4 font-bold border-r border-gray-100">{spec.parameter}</td>
                <td className="px-6 py-4 font-medium text-brand-steel">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
