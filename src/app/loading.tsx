export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-brand-steel/20 border-t-brand-orange animate-spin" />
      <p className="text-brand-steel text-sm font-semibold tracking-wider uppercase">
        Loading Swastik Valves...
      </p>
    </div>
  );
}
