import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import TrustStrip from "@/components/sections/TrustStrip";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import ProductsGrid from "@/components/sections/ProductsGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import QualitySnapshot from "@/components/sections/QualitySnapshot";
import CTABanner from "@/components/sections/CTABanner";
import ContactStrip from "@/components/sections/ContactStrip";

export const metadata: Metadata = {
  title: "Precision Industrial Valve Manufacturer India | Swastik Valves",
  description:
    "ISO 9001:2008 certified manufacturer of 3 Piece Ball Valves and Gun Metal Foot Valves in Ludhiana, Punjab. Supplying industrial valve solutions worldwide.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <IndustriesGrid />
      <ProductsGrid />
      <WhyChooseUs />
      <QualitySnapshot />
      <CTABanner />
      <ContactStrip />
    </>
  );
}
