"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function SchemaMarkup() {
  const pathname = usePathname();

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "name": "Swastik Valves India",
    "alternateName": "Mahavir Valves",
    "url": "https://www.swastikvalvesindia.com",
    "logo": "https://www.swastikvalvesindia.com/logo.png",
    "image": "https://www.swastikvalvesindia.com/og-image.jpg",
    "description": "ISO 9001:2008 certified manufacturer of 3 Piece Ball Valves, Gun Metal Foot Valves and industrial valve solutions in Ludhiana, Punjab, India. Established 1988.",
    "foundingDate": "1988",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot. 1240, St. No: 41, Janta Nagar, Jaimal Road",
      "addressLocality": "Ludhiana",
      "addressRegion": "Punjab",
      "postalCode": "141003",
      "addressCountry": "IN"
    },
    "telephone": "+91-161-2503914",
    "email": "mahavirvalves@gmail.com",
    "hasMap": "https://maps.google.com/?q=Ludhiana+Punjab+India",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.9010",
      "longitude": "75.8573"
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }],
    "sameAs": ["https://www.swastikvalvesindia.com"],
    "priceRange": "₹₹",
    "paymentAccepted": "Cash, Bank Transfer, Cheque",
    "currenciesAccepted": "INR",
    "areaServed": ["India", "Worldwide"]
  };

  // Generate dynamic breadcrumb schema if not on home page
  const getBreadcrumbSchema = () => {
    if (pathname === "/") return null;
    const parts = pathname.split("/").filter(Boolean);
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.swastikvalvesindia.com"
      }
    ];

    let currentPath = "";
    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      // Clean up title
      const name = part
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `https://www.swastikvalvesindia.com${currentPath}`
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    };
  };

  const breadcrumb = getBreadcrumbSchema();

  return (
    <>
      <Script
        id="schema-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        strategy="lazyOnload"
      />
      {breadcrumb && (
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
export function generateProductSchema(product: {
  name: string;
  description: string;
  material: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": { "@type": "Brand", "name": "Swastik Valves India" },
    "manufacturer": {
      "@type": "Organization",
      "name": "Swastik Valves India",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ludhiana",
        "addressRegion": "Punjab",
        "addressCountry": "IN"
      }
    },
    "material": product.material,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "INR",
      "seller": { "@type": "Organization", "name": "Swastik Valves India" }
    }
  };
}
