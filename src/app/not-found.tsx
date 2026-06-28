import Link from "next/link";
import { AlertCircle, Home, Settings } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-20 h-20 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
        <AlertCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl font-black text-brand-orange leading-none">404</h1>
        <h2 className="text-2xl font-black text-brand-navy">Page Not Found</h2>
        <p className="text-brand-steel text-sm sm:text-base font-semibold max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a new address.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-brand-navy hover:bg-brand-charcoal text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide transition-colors shadow-sm"
        >
          <Home className="w-4 h-4 mr-2" />
          Go Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center justify-center border border-brand-navy/20 hover:bg-brand-offwhite text-brand-navy px-6 py-3 rounded-md font-bold text-sm tracking-wide transition-colors"
        >
          <Settings className="w-4 h-4 mr-2" />
          View Products
        </Link>
      </div>
    </div>
  );
}
