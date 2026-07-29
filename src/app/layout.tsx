import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BackToTop from "@/components/layout/BackToTop";
import SchemaMarkup from "@/components/common/SchemaMarkup";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.swastikvalvesindia.com"),
  title: {
    template: "%s | Swastik Valves India",
    default: "Swastik Valves India — Ball Valve Manufacturer Since 1988 | Ludhiana, Punjab",
  },
  description:
    "Swastik Valves India is an ISO 9001:2008 certified manufacturer of 3 Piece Ball Valves, Three Piece Ball Valves, Gun Metal Foot Valves and Gun Metal Valves in Ludhiana, Punjab, India. Established 1988. Exporters and suppliers worldwide.",
  keywords: [
    "ball valves manufacturers india",
    "3 piece ball valves manufacturer",
    "three piece ball valves india",
    "gun metal foot valves manufacturer",
    "industrial valves ludhiana",
    "valve manufacturer punjab",
    "swastik valves india",
    "steam ball valves india",
    "energy miser ball valves",
    "cast iron ball valves manufacturer",
    "gun metal valves exporters india",
    "screwed end ball valves",
    "iso 9001 valve manufacturer india",
    "valve manufacturer ludhiana punjab",
  ],
  authors: [{ name: "Swastik Valves India" }],
  creator: "Swastik Valves India",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.swastikvalvesindia.com",
    siteName: "Swastik Valves India",
    title: "Swastik Valves India — Precision Valve Manufacturer Since 1988",
    description:
      "ISO 9001:2008 certified manufacturer of 3 piece ball valves and gun metal foot valves. Located in Ludhiana, Punjab, India.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swastik Valves India",
    description: "ISO certified ball valve manufacturer in Ludhiana, India",
  },
  alternates: { canonical: "https://www.swastikvalvesindia.com" },
  verification: { google: "YOUR_GOOGLE_VERIFICATION_CODE" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-brand-offwhite text-text-primary antialiased font-sans flex flex-col min-h-screen">
        <SchemaMarkup />
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
        <WhatsAppButton />
        <BackToTop />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
