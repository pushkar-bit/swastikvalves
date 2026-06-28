================================================================================
SWASTIK VALVES INDIA — COMPLETE WEBSITE REVAMP
SUPERPROMPTS COLLECTION (ALL-IN-ONE)
Tech Stack: Next.js 14 (App Router) + Tailwind CSS + shadcn/ui + Framer Motion
================================================================================
Use these prompts sequentially. Each prompt is self-contained and builds on
the previous. Feed them one by one to your AI coding assistant (Claude Code,
Cursor, GitHub Copilot, v0.dev, etc.)
================================================================================


════════════════════════════════════════════════════════════════════════════════
PROMPT 1 — PROJECT SCAFFOLDING & DESIGN SYSTEM
════════════════════════════════════════════════════════════════════════════════

You are a senior fullstack developer. Scaffold a complete Next.js 14 project
using the App Router for a B2B industrial valve manufacturer called
"Swastik Valves India" based in Ludhiana, Punjab. This is a conversion-first,
modern premium industrial website. Follow every instruction exactly.

TECH STACK:
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS (configured with custom design tokens)
- shadcn/ui component library
- Framer Motion for animations
- next/font for typography (Inter)
- next/image for optimized images
- react-hook-form + zod for form validation
- nodemailer for contact form email sending
- @react-google-maps/api for maps embed

STEP 1 — Initialize project:
Run: npx create-next-app@latest swastik-valves --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
Then: cd swastik-valves
Then: npx shadcn-ui@latest init (select Default style, Slate base color, CSS variables YES)
Then install: npm install framer-motion react-hook-form @hookform/resolvers zod nodemailer @types/nodemailer

STEP 2 — Configure tailwind.config.ts with this EXACT design system:

colors:
  brand:
    navy: "#0D1B2A"         // primary dark background
    orange: "#E76F00"       // CTA / highlight / accent
    steel: "#8A9BB0"        // secondary text, borders
    charcoal: "#1A1A2E"     // dark section backgrounds
    offwhite: "#F8F9FA"     // light section backgrounds
  text:
    primary: "#111827"
    light: "#FFFFFF"
    muted: "#6B7280"

fontFamily:
  sans: ["Inter", "sans-serif"]

Add custom animation keyframes:
- "float": subtle 3s up-down float loop (for CTA badge)
- "pulse-slow": 4s pulse (for WhatsApp button)
- "shimmer": left-right shimmer on hover for buttons
- "fade-up": opacity 0 y+20 → opacity 1 y0 (for section entries)

STEP 3 — Create global CSS in src/app/globals.css:
- Import Inter from next/font
- Set html { scroll-behavior: smooth }
- Custom scrollbar: thin, navy thumb, steel track
- Selection color: brand-orange text on brand-navy bg
- Base body: bg-offwhite text-primary font-sans antialiased

STEP 4 — Create the following folder structure exactly:
src/
  app/
    layout.tsx              (root layout with Navbar + Footer)
    page.tsx                (home page)
    about/page.tsx
    products/page.tsx
    products/3-piece-ball-valves/page.tsx
    products/three-piece-ball-valves/page.tsx
    products/gun-metal-foot-valves/page.tsx
    products/gun-metal-valves/page.tsx
    quality/page.tsx
    infrastructure/page.tsx
    enquiry/page.tsx
    contact/page.tsx
    api/enquiry/route.ts    (form submission API)
    not-found.tsx
    sitemap.ts
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      WhatsAppButton.tsx
      BackToTop.tsx
    ui/                     (shadcn auto-generated)
    sections/
      HeroSection.tsx
      TrustStrip.tsx
      IndustriesGrid.tsx
      ProductsGrid.tsx
      WhyChooseUs.tsx
      QualitySnapshot.tsx
      CTABanner.tsx
      ContactStrip.tsx
    product/
      ProductHero.tsx
      SpecsTable.tsx
      KeyFeatures.tsx
      ProductCTA.tsx
    forms/
      EnquiryForm.tsx
      MiniEnquiryForm.tsx
    common/
      SectionHeader.tsx
      Badge.tsx
      CertCard.tsx
      MachineList.tsx
      PhotoGallery.tsx
  lib/
    constants.ts            (all site data)
    types.ts
    utils.ts
    email.ts                (nodemailer config)
  hooks/
    useScrollAnimation.ts
    useActiveSection.ts

STEP 5 — Create src/lib/constants.ts with ALL site data:

export const COMPANY = {
  name: "Swastik Valves",
  legalName: "MAHAVIR VALVES",
  tagline: "Precision Industrial Valves — Trusted Since 1988",
  subTagline: "ISO 9001:2008 Certified Manufacturer of 3 Piece Ball Valves, Gun Metal Foot Valves & Industrial Valve Solutions",
  established: 1988,
  founders: ["Sh. Varinder Kumar Jain", "Sh. Nitin Jain"],
  phone: "+91-161-2503914",
  mobile: "+91-98156-52779",
  email: "mahavirvalves@gmail.com",
  website: "www.swastikvalvesindia.com",
  address: {
    plot: "Plot. 1240, St. No: 41",
    area: "Janta Nagar, Jaimal Road",
    city: "Ludhiana",
    pincode: "141003",
    state: "Punjab",
    country: "INDIA",
    full: "Plot. 1240, St. No: 41, Janta Nagar, Jaimal Road, Ludhiana - 141003, Punjab (INDIA)"
  },
  whatsapp: "919815652779",
  certifications: ["ISO 9001:2008 by JAZ ANZ", "Trademark Certificate of Registration", "Company Registration Certificate", "MSME Certificate"],
  iso: "ISO 9001:2008",
  isoBody: "JAZ ANZ",
}

export const TRUST_STATS = [
  { value: "1988", label: "Established" },
  { value: "35+", label: "Years Experience" },
  { value: "ISO 9001:2008", label: "Certified" },
  { value: "100+", label: "Industries Served" },
  { value: "Export", label: "India & Abroad" },
  { value: "Custom", label: "Manufacturing" },
]

export const INDUSTRIES = [
  "Solvent Extraction Plant", "Tyre Machinery Making Plants",
  "Essential Oil Extraction Plant", "Herbal Extraction Plant",
  "Oleoresin Extraction Plant", "Bio-Diesel Plant", "Oil Expellers",
  "Vegetable Oil Refinery", "Turnkey Projects", "Chemical Industry",
  "Refineries", "Fertilizers", "Pharmaceuticals", "Foods & Beverages",
  "Water Treatment", "Petrol Pumps", "CNG / Gas Plants",
  "Petroleum Industry", "Food Processing Industry", "Dyeing Industry"
]

export const PRODUCTS = [
  {
    id: "3-piece-ball-valves",
    name: "3 Piece Ball Valves",
    slug: "/products/3-piece-ball-valves",
    shortDesc: "Swing-out design with easy inline maintenance. Class 800 pressure rating.",
    sizes: "15mm – 50mm",
    material: "Carbon Steel, Alloy Steel, Stainless Steel",
  },
  {
    id: "three-piece-ball-valves",
    name: "Three Piece Ball Valves",
    slug: "/products/three-piece-ball-valves",
    shortDesc: "Screwed end design with fire safe construction and blow-out proof stem.",
    sizes: "15mm – 50mm",
    material: "Carbon Steel, Alloy Steel, Stainless Steel",
  },
  {
    id: "gun-metal-foot-valves",
    name: "Gun Metal Foot Valves",
    slug: "/products/gun-metal-foot-valves",
    shortDesc: "ISO standard, corrosion resistant, dimensionally accurate. Ideal for pumping systems.",
    sizes: "15mm – 150mm",
    material: "Gun Metal IS:318 Gr.LTB2",
  },
  {
    id: "gun-metal-valves",
    name: "Gun Metal Valves",
    slug: "/products/gun-metal-valves",
    shortDesc: "High tensile strength metal valves for petroleum, chemical and gas applications.",
    sizes: "15mm – 150mm",
    material: "Gun Metal IS:318 Gr.LTB2",
  },
]

export const WHY_CHOOSE_US = [
  { icon: "factory", title: "Est. 1988", desc: "Over 35 years of manufacturing precision industrial valves." },
  { icon: "award", title: "ISO 9001:2008 Certified", desc: "Accredited by JAZ ANZ. International quality standards guaranteed." },
  { icon: "settings", title: "CNC Machinery", desc: "Modern CNC lathes and special purpose ball turning machines." },
  { icon: "pencil-ruler", title: "Custom Manufacturing", desc: "We manufacture to your drawings and specifications exactly." },
  { icon: "globe", title: "Export Ready", desc: "Products supplied all over India and exported abroad." },
  { icon: "eye", title: "Third Party Inspection", desc: "Third party inspection available as per client requirements." },
]

export const MACHINERY = [
  "Gun Metal Casting Unit",
  "CNC Machines",
  "Special Purpose Machines for Ball Turning",
  "Surface & Cylindrical Grinding Machine",
  "Vertical Turret Lathes",
  "Horizontal Boring Machines",
  "Multi Station Turret Lathes",
  "Heavy Duty Long Arm Radial Drilling Machines",
  "Multi Spindle Drilling Machine",
  "Shot Blasting",
  "Plasma Welding / Submerged Welding",
  "Latest Hydraulic & Pneumatic Testing Equipments",
  "Positive Material Identification Equipment",
]

Deliver: fully scaffolded project with all files created, tailwind configured,
constants populated, folder structure in place, and project running on
npm run dev without errors.


════════════════════════════════════════════════════════════════════════════════
PROMPT 2 — NAVBAR & FOOTER COMPONENTS
════════════════════════════════════════════════════════════════════════════════

Using the Swastik Valves project you scaffolded, build the Navbar and Footer
components. These appear on every page via the root layout.

NAVBAR (src/components/layout/Navbar.tsx):

Requirements:
- Sticky top-0 z-50, full width
- Background: bg-brand-navy, text white
- On scroll past 80px: add backdrop-blur-md + shadow-lg + slight bg opacity change
  (use useScrollAnimation hook)
- Logo area (left): "SWASTIK VALVES" in white bold uppercase + "Est. 1988" in
  brand-orange text-xs below it. No image logo needed yet — text-based.
- Desktop nav links (center/right):
  Home | About | Products (dropdown) | Quality | Infrastructure | Contact
- Products dropdown on hover: show 4 product links in a dark dropdown panel
  (bg-brand-charcoal, rounded-md, shadow-xl):
    → 3 Piece Ball Valves
    → Three Piece Ball Valves
    → Gun Metal Foot Valves
    → Gun Metal Valves
- Phone number (right of nav, desktop only):
  📞 +91-161-2503914 in brand-orange, small text
- CTA Button (far right): "Get a Quote" — bg-brand-orange text-white rounded-md
  px-5 py-2 font-bold hover:bg-orange-600 transition
- Mobile: hamburger menu (☰ icon) opens a full-screen slide-in drawer from right
  - Drawer bg: bg-brand-charcoal
  - All nav links stacked vertically with animated entrance
  - "Get a Quote" button at bottom of drawer
  - Phone number clickable (tel: link) in drawer
- Active link styling: brand-orange underline or text color
- Use next/link for all navigation
- Smooth close on route change (usePathname hook)
- Full Framer Motion animation on mobile drawer (x: 300 → 0, opacity)

FOOTER (src/components/layout/Footer.tsx):

Requirements:
- Background: bg-brand-navy text-white
- 4-column grid on desktop, 2-col tablet, 1-col mobile
- Top border: 1px solid rgba(138,155,176,0.2)

Column 1 — Brand:
  "SWASTIK VALVES INDIA" bold uppercase + orange accent line below
  "Est. 1988" badge
  "ISO 9001:2008 Certified" badge (with small shield icon)
  "MSME Registered" badge
  Short tagline: "Precision Industrial Valves from the Heart of Punjab"

Column 2 — Products (with heading "Our Products"):
  - 3 Piece Ball Valves → /products/3-piece-ball-valves
  - Three Piece Ball Valves → /products/three-piece-ball-valves
  - Gun Metal Foot Valves → /products/gun-metal-foot-valves
  - Gun Metal Valves → /products/gun-metal-valves
  Each link: hover:text-brand-orange transition

Column 3 — Company (with heading "Company"):
  - About Us → /about
  - Quality Policy → /quality
  - Manufacturing Facilities → /infrastructure
  - Send Enquiry → /enquiry
  - Contact Us → /contact
  Each link: hover:text-brand-orange transition

Column 4 — Contact (with heading "Contact Us"):
  MAHAVIR VALVES
  Plot. 1240, St. No: 41,
  Janta Nagar, Jaimal Road,
  Ludhiana - 141003, Punjab (INDIA)
  📞 +91-161-2503914 (clickable tel:)
  📱 +91-98156-52779 (clickable tel:)
  ✉ mahavirvalves@gmail.com (clickable mailto:)

Bottom strip (full width, bg slightly darker):
  Left: © 2024 Swastik Valves India. All rights reserved.
  Right: "Manufacturers of Industrial Valves in India"
  Center mobile

Industry tags strip above bottom (scrolling marquee on mobile):
  Solvent Extraction | Ball Valves | Gun Metal | Ludhiana | Punjab | ISO Certified
  (subtle text-brand-steel, font-xs, horizontal scroll animation on mobile)

WhatsApp floating button (src/components/layout/WhatsAppButton.tsx):
  - Fixed bottom-6 right-6 z-50
  - Circle button, bg-green-500 hover:bg-green-600
  - WhatsApp icon (white SVG)
  - Gentle pulse-slow animation ring around it
  - href: https://wa.me/919815652779
  - Tooltip on hover: "Chat with us on WhatsApp"
  - target="_blank" rel="noopener noreferrer"

BackToTop button (src/components/layout/BackToTop.tsx):
  - Fixed bottom-6 left-6 z-50
  - Appears only after scroll past 400px
  - Circle button bg-brand-navy border-brand-orange border
  - Arrow up icon, white
  - onClick: window.scrollTo({ top: 0, behavior: 'smooth' })
  - Framer Motion: fade-in/out based on scroll position

Root layout (src/app/layout.tsx):
  - Import and render <Navbar />, {children}, <Footer />, <WhatsAppButton />,
    <BackToTop />
  - Set metadata: title template "Swastik Valves India | %s", description,
    keywords, openGraph
  - viewport meta for mobile


════════════════════════════════════════════════════════════════════════════════
PROMPT 3 — HOME PAGE (ALL SECTIONS)
════════════════════════════════════════════════════════════════════════════════

Build the complete Home page for Swastik Valves India at src/app/page.tsx.
Use Framer Motion for scroll-triggered animations on every section.
Use the COMPANY, TRUST_STATS, INDUSTRIES, PRODUCTS, WHY_CHOOSE_US constants.

BUILD THESE SECTIONS IN ORDER:

──────────────────────────────────────────
SECTION A: HERO (src/components/sections/HeroSection.tsx)
──────────────────────────────────────────
- Full viewport height (min-h-screen)
- Background: bg-brand-charcoal with a dark overlay gradient
  (from-brand-navy/95 via-brand-charcoal/90 to-brand-navy/80)
- Background pattern: subtle diagonal grid or dot grid in CSS
  (use a radial-gradient pattern to simulate metal texture)
- Layout: centered content, text left-aligned on desktop, center on mobile

LEFT SIDE (60% desktop):
  - Small badge above headline (Framer: fade-in from top):
    🏭 "ISO 9001:2008 Certified · Est. 1988" — border border-brand-orange/40
    text-brand-orange bg-brand-orange/10 rounded-full px-4 py-1 text-sm
  - H1 Headline (Framer: fade-up delay 0.2s):
    "Precision Industrial"
    Line 2 in brand-orange: "Valve Solutions"
    "Trusted Since 1988"
    Font: text-5xl md:text-7xl font-black leading-tight tracking-tight
  - Sub-headline (Framer: fade-up delay 0.4s):
    "ISO 9001:2008 Certified Manufacturer of 3 Piece Ball Valves,
     Gun Metal Foot Valves & Industrial Valve Solutions from
     Ludhiana, Punjab, India."
    text-brand-steel text-lg md:text-xl max-w-xl
  - CTA Row (Framer: fade-up delay 0.6s):
    Button 1: "Request a Quote" — bg-brand-orange text-white px-8 py-4
              font-bold rounded-md hover:bg-orange-600 shadow-lg
              shadow-orange-500/25 transition → /enquiry
    Button 2: "View Products" — border-2 border-white/30 text-white px-8 py-4
              rounded-md hover:border-brand-orange hover:text-brand-orange
              transition → /products

RIGHT SIDE (40% desktop, hidden mobile):
  - Abstract industrial graphic: Use CSS/SVG to create a stylized valve diagram
    or concentric circles with brand colors suggesting precision engineering
  - Floating stats cards around it (Framer: staggered pop-in):
    Card 1: "35+" / "Years Experience" — top-left
    Card 2: "ISO 9001:2008" / "Certified" — top-right
    Card 3: "Custom" / "Manufacturing" — bottom-left
    Card 4: "Export" / "India & Abroad" — bottom-right
    Cards: bg-white/10 backdrop-blur border border-white/20 rounded-xl p-3

TRUST STRIP BELOW HERO (src/components/sections/TrustStrip.tsx):
  - Full width, bg-brand-orange text-white
  - Horizontal flex, centered, gap-8, py-3
  - Items: ✓ Est. 1988 | ✓ ISO 9001:2008 | ✓ 35+ Years | ✓ Export Ready
           | ✓ Custom Manufacturing | ✓ Third Party Inspection
  - On mobile: marquee scroll animation
  - Dividers between items: | in white/40

──────────────────────────────────────────
SECTION B: INDUSTRIES GRID (src/components/sections/IndustriesGrid.tsx)
──────────────────────────────────────────
- bg-brand-offwhite py-20
- SectionHeader: "Industries We Serve" / "Valve solutions for every critical
  industrial application"
- 5-column grid desktop, 3-col tablet, 2-col mobile
- 20 industry tiles total (from INDUSTRIES constant)
- Each tile:
  bg-white border border-gray-100 rounded-xl p-4 text-center
  hover:border-brand-orange hover:shadow-md hover:scale-105 transition-all
  - Relevant icon (lucide-react): each industry gets a fitting icon
    (e.g. Droplets for oil, Beaker for chemical, Leaf for herbal, etc.)
  - Icon: text-brand-orange w-8 h-8 mb-2
  - Industry name: text-sm font-semibold text-brand-navy
- Framer Motion: staggered fade-in as section scrolls into view
- Bottom note: "...and many more industrial applications. Contact us with your
  specific requirements."

──────────────────────────────────────────
SECTION C: FEATURED PRODUCTS (src/components/sections/ProductsGrid.tsx)
──────────────────────────────────────────
- bg-brand-charcoal py-20
- SectionHeader (white text): "Our Products Range" / "Click to explore
  specifications, materials and available sizes"
- 4-card grid desktop, 2-col tablet, 1-col mobile
- Each product card:
  bg-brand-navy border border-brand-steel/20 rounded-2xl overflow-hidden
  hover:border-brand-orange/60 hover:shadow-xl hover:shadow-orange-500/10
  transition-all duration-300 cursor-pointer
  - Top section (h-48): bg gradient or placeholder for product image
    bg-gradient-to-br from-brand-steel/20 to-brand-navy/80
    with centered product icon (industrial/valve SVG placeholder)
  - Content section p-6:
    - Product name: text-xl font-bold text-white
    - Short description: text-brand-steel text-sm mt-2
    - Size badge: "Sizes: 15mm – 50mm" in orange badge
    - Material badge: material text, steel-colored
    - "View Details →" link: text-brand-orange font-semibold mt-4 block
      hover:underline
- Framer Motion: staggered slide-up as section enters viewport

──────────────────────────────────────────
SECTION D: WHY CHOOSE US (src/components/sections/WhyChooseUs.tsx)
──────────────────────────────────────────
- bg-brand-offwhite py-20
- SectionHeader: "Why Choose Swastik Valves" / "Decades of precision. A future
  of quality."
- 6-item grid (3x2 desktop, 2x3 tablet, 1-col mobile)
- Each item:
  bg-white rounded-2xl p-8 border border-gray-100
  hover:shadow-lg hover:border-brand-orange/30 transition
  - Icon: large (w-12 h-12) text-brand-orange mb-4 (use lucide-react)
  - Title: text-xl font-bold text-brand-navy
  - Description: text-brand-steel text-sm leading-relaxed
- Framer: fade-up stagger

ITEMS (from WHY_CHOOSE_US constant):
1. Factory icon / "Est. 1988" / 35+ years manufacturing text
2. Award icon / "ISO 9001:2008 Certified" / JAZ ANZ accredited
3. Settings icon / "CNC Machinery" / modern equipment
4. Ruler icon / "Custom Manufacturing" / per your drawings
5. Globe icon / "Export Ready" / India & abroad
6. Eye icon / "Third Party Inspection" / as per client needs

──────────────────────────────────────────
SECTION E: QUALITY SNAPSHOT (src/components/sections/QualitySnapshot.tsx)
──────────────────────────────────────────
- bg-brand-navy py-20
- Two-column layout desktop:
  LEFT (text): 
    - Label: "QUALITY ASSURANCE" — text-brand-orange uppercase tracking-widest
    - Heading: "Precision at Every Stage of Production" — text-white
    - Body text: "Swastik Valves are well equipped with testing equipments for
      quality control. All material test reports like Pressure Testing and
      Cryogenic testing facilities are permanently maintained and available for
      general reference. ISO 9001:2008 certified, providing third party
      inspection as per client need."
    - 4 quality points as checklist:
      ✓ Pressure Testing Facility
      ✓ Cryogenic Testing Facility
      ✓ ISO 9001:2008 by JAZ ANZ
      ✓ Third Party Inspection Available
    - CTA: "See Full Quality Policy →" — text-brand-orange hover:underline
  RIGHT (stats):
    - 2x2 grid of quality stat cards:
      Card 1: "ISO 9001:2008" / "International Quality Certification"
      Card 2: "35+ Years" / "Manufacturing Excellence"
      Card 3: "100%" / "Quality Audited Products"
      Card 4: "Custom" / "Third Party Inspection"
    Each card: bg-brand-charcoal border border-brand-steel/20 rounded-xl p-6
    Number/value: text-3xl font-black text-brand-orange
    Label: text-brand-steel text-sm

──────────────────────────────────────────
SECTION F: CTA BANNER (src/components/sections/CTABanner.tsx)
──────────────────────────────────────────
- Full-width bg-brand-orange py-16
- Pattern overlay: subtle diagonal lines via CSS background-image
- Centered content:
  - Heading (white, bold): "Need Valves for Your Plant?"
  - Sub: "Send us your requirements and get a fast quote from our team."
  - Two buttons:
    Button 1: "Send Your Requirements" — bg-white text-brand-orange px-8 py-4
              font-bold rounded-md hover:bg-gray-100 → /enquiry
    Button 2: "Call Us Now: +91-98156-52779" — border-2 border-white text-white
              px-8 py-4 rounded-md hover:bg-white/10 → tel:+919815652779

──────────────────────────────────────────
SECTION G: CONTACT STRIP (src/components/sections/ContactStrip.tsx)
──────────────────────────────────────────
- bg-brand-charcoal py-8 border-t border-brand-steel/20
- Flex row desktop (3 items), stack mobile:
  Item 1: 📞 Phone — "+91-161-2503914" (clickable)
          📱 Mobile — "+91-98156-52779" (clickable)
  Item 2: ✉ Email — "mahavirvalves@gmail.com" (clickable mailto)
  Item 3: 📍 Address — "Plot. 1240, St. No: 41, Janta Nagar, Jaimal Road,
           Ludhiana - 141003, Punjab (INDIA)"
- Dividers between items (desktop): border-r border-brand-steel/20
- All text: text-white, labels text-brand-steel text-xs uppercase

Assemble all sections in src/app/page.tsx in this exact order:
<HeroSection />
<TrustStrip />
<IndustriesGrid />
<ProductsGrid />
<WhyChooseUs />
<QualitySnapshot />
<CTABanner />
<ContactStrip />


════════════════════════════════════════════════════════════════════════════════
PROMPT 4 — ABOUT PAGE
════════════════════════════════════════════════════════════════════════════════

Build the About Us page at src/app/about/page.tsx for Swastik Valves India.

PAGE METADATA:
title: "About Us | Swastik Valves India — Ball Valve Manufacturer Since 1988"
description: "Learn about Swastik Valves India, established in 1988 by
Sh. Varinder Kumar Jain and Sh. Nitin Jain. ISO 9001:2008 certified
manufacturer of 3 piece ball valves and gun metal foot valves in Ludhiana,
Punjab, India."

PAGE STRUCTURE:

1. PAGE HERO BANNER:
   - bg-brand-navy py-20 relative overflow-hidden
   - Background: subtle grid pattern overlay
   - Breadcrumb: Home › About Us (text-brand-steel small)
   - H1: "About Swastik Valves" — text-white text-5xl font-black
   - Sub: "Built on Precision. Driven by Trust. Delivered with Commitment."
           text-brand-steel text-xl
   - Orange underline accent on H1

2. COMPANY STORY (two-column layout):
   LEFT — Full story text in styled prose:
     Heading: "Company Introduction" (text-brand-orange uppercase)
     H2: "35+ Years of Industrial Valve Manufacturing" (text-brand-navy)
     
     Body paragraph 1:
     "Swastik Valves is situated at Ludhiana Punjab. The company established in
     the year of 1988, with the able guidance Sh. Varinder Kumar Jain and
     Sh. Nitin Jain. Our manufacturing unit is having modernized machineries
     like CNC Lathes & all Facilities for measuring at every stages of
     inspection of valves."
     
     Body paragraph 2:
     "We are among the leading Manufacturer and Exporters of different types of
     Industrial Valves in India and abroad. We have created an envious position
     for ourselves in the market through our constant efforts and endless
     dedication of our team of experts."
   
   RIGHT — Stats/info cards:
     Card: Founded / 1988
     Card: Location / Ludhiana, Punjab
     Card: Certification / ISO 9001:2008
     Card: Scope / India & International Export
     Each: bg-brand-offwhite border-l-4 border-brand-orange p-4 rounded-r-lg

3. FOUR PILLARS GRID (2x2 grid):
   Each pillar: icon + title + body text
   
   Pillar 1 — Quality Control:
   Icon: ShieldCheck (brand-orange)
   Title: "Unmatched Quality Control"
   Body: "The unmatched quality of our products is a major factor which has
   always kept us in the forefront. We follow strict quality control measures
   and our quality ISO certifications substantiate this claim. Various Process
   parameters are well controlled. All material test reports like Pressure
   Testing and Cryogenic testing facilities are permanently maintained and
   available for general reference."

   Pillar 2 — Clientele:
   Icon: Users (brand-orange)
   Title: "Valued Clientele"
   Body: "Through our efforts we have been able to develop a huge client base.
   We have shown extreme commitment to our clients and always satisfied them
   with our qualitative service. We value our clients the most."

   Pillar 3 — Products Range:
   Icon: Package (brand-orange)
   Title: "Complete Products Range"
   Body: "Our valves products range includes 3 Piece Ball Valves, Three Piece
   Ball Valves, Screwed End Ball Valves, Gun Metal Ball Valves, Cast Iron 3
   Piece Ball Valves, Gun Metal Foot Valves, Gun Metal Valves and customized
   valves as per customer specifications and requirements. Our strength is
   quality products at affordable prices, prompt delivery and the unflinching
   commitment."

   Pillar 4 — Custom Solutions:
   Icon: PencilRuler (brand-orange)
   Title: "Custom Manufacturing"
   Body: "We also manufacture custom made valves sizes as per customer's
   drawing and specifications. We appreciate your online enquiry / feedback /
   interest for our products. For more information please mail us at:
   mahavirvalves@gmail.com"

4. INDUSTRIES SERVED (full list from About page — 16 industries):
   Section heading: "Industries & Applications We Serve"
   Styled grid of badges/pills:
   - Solvent Extraction Plant
   - Tyre Machinery Making Plants
   - Essential Oil Extraction Plant
   - Herbal Extraction Plant
   - Oleoresin Extraction Plant
   - Bio-Diesel Plant
   - Oil Expellers
   - Vegetable Oil Refinery
   - Turnkey Projects
   - Chemical Industry
   - Refineries
   - Fertilizers
   - Pharmaceuticals, Foods and beverages
   - Water treatment
   - Petrol Pumps
   - CNG Plants / Gas Plants
   Each pill: bg-brand-offwhite border border-brand-steel/30 rounded-full
   px-4 py-2 text-sm text-brand-navy hover:border-brand-orange
   hover:bg-brand-orange/5 transition

5. ENQUIRY CTA BOX:
   Full-width box: bg-brand-orange/10 border border-brand-orange/30 rounded-2xl p-8
   Text: "We appreciate your online enquiry / feedback / interest for our
   products. For more information about our company, our capabilities and our
   products, please mail us at: mahavirvalves@gmail.com"
   Button: "Send an Enquiry" → /enquiry
   Secondary: "Or call us at: +91-161-2503914"


════════════════════════════════════════════════════════════════════════════════
PROMPT 5 — PRODUCTS OVERVIEW PAGE & ALL 4 PRODUCT DETAIL PAGES
════════════════════════════════════════════════════════════════════════════════

Build the Products Overview page and all 4 product detail pages.

──────────────────────────────────────────
PART A: PRODUCTS OVERVIEW (src/app/products/page.tsx)
──────────────────────────────────────────
Metadata: title: "Products | Ball Valves & Gun Metal Valves — Swastik Valves India"

1. PAGE HERO: Same pattern as About page. H1: "Our Products Range"
   Sub: "Precision-engineered industrial valves for every application."

2. PRODUCTS GRID (large, 2x2):
   Each product card (large format):
   - Full card clickable → product detail page
   - Height: 340px (desktop)
   - Top half: gradient bg with product category icon (large, styled)
   - Bottom half: white bg
     - Product name: text-2xl font-bold text-brand-navy
     - Short desc from PRODUCTS constant
     - Size range badge (brand-orange)
     - Material badge (gray)
     - "View Full Specifications →" link text-brand-orange
   - Border: border-2 border-transparent hover:border-brand-orange transition
   - Shadow: hover:shadow-2xl

3. CUSTOM MANUFACTURING CALLOUT:
   Full-width card: bg-brand-navy text-white rounded-2xl p-10
   - Icon: Wrench large
   - Heading: "Custom Valve Manufacturing"
   - Body: "We also manufacture custom made valves sizes as per customer's
     drawing and specifications. Send us your engineering drawings and
     requirements and we will deliver exactly what you need."
   - Button: "Send Your Requirements" → /enquiry

──────────────────────────────────────────
PART B: PRODUCT DETAIL PAGE TEMPLATE (src/components/product/)
──────────────────────────────────────────
Create a reusable ProductDetailLayout component used by all 4 product pages.

Structure of each product detail page:

1. PRODUCT HERO:
   bg-brand-charcoal text-white py-20
   - Breadcrumb: Home › Products › [Product Name]
   - H1: Product Name (large, white)
   - Sub tagline
   - Two CTAs: "Request a Quote" → /enquiry | "Call Us" → tel:

2. PRODUCT DESCRIPTION:
   Two-column layout:
   LEFT: Full product description text (large body text, brand-navy)
   RIGHT: Product image placeholder (styled div with gradient + icon)
          Caption text below image

3. KEY FEATURES:
   bg-brand-offwhite section
   H2: "Key Features"
   Checklist (green check icons from lucide):
   Each feature as a row: ✓ icon (brand-orange) + feature text

4. TECHNICAL SPECIFICATIONS TABLE:
   White bg, clean table design
   H2: "Technical Specifications"
   Table: alternating row bg (bg-brand-offwhite every other row)
   Header row: bg-brand-navy text-white
   | Parameter | Value |
   Rows from product data

5. AVAILABLE SIZES:
   Size chips in a flex-wrap row
   Each size: bg-brand-orange/10 border border-brand-orange text-brand-navy
   font-bold rounded-lg px-6 py-3 text-center

6. DISCLAIMER NOTE:
   "Note: Specifications & Dimensions are subject to change without notice.
   We can also manufacture valves as per customer's drawing and requirement."
   Styled as: italic, text-brand-steel, border-l-4 border-brand-steel/30 pl-4

7. PRODUCT CTA:
   bg-brand-navy rounded-2xl p-8 text-white
   "Interested in [Product Name]? Get a fast quote from our team."
   Button: "Request a Quote" → /enquiry
   Secondary: WhatsApp link

8. NEXT/PREV PRODUCT NAVIGATION:
   Bottom: ← Previous Product | All Products | Next Product →

──────────────────────────────────────────
PART C: BUILD ALL 4 PRODUCT PAGES
──────────────────────────────────────────

PAGE 1: src/app/products/3-piece-ball-valves/page.tsx
Metadata: "3 Piece Ball Valves Manufacturer India | Swastik Valves Ludhiana"
Description: "swastik valves are manufacturers of 3 Piece Ball Valves,
three piece ball valves suppliers, cast iron valves, gun metal valves
exporters in india, punjab, ludhiana"

Product Description (EXACT TEXT — do not alter):
"The 3-piece design is available for various schedule pipes. This type of
construction is of swing-out design and easy inline maintenance. By removing
body bolts & nuts the complete valve may be lifted out of the line or
swing-out by keeping one bolt. The valve can easily swing out of the line
providing complete entry and fast disassembly or maintenance. The swing away
feature also maintains pipe alignment during inline maintenance. The 3-piece
design offers the function of both valve as well as a union. It can be used
in screw pipe ends, socket weld pipe ends, butt weld ends, extended butt
weld pipe ends. These ball valves can be easily used for automation by using
pneumatic and electric actuators."

Secondary para (EXACT TEXT):
"The three piece ball valve screwed ends that we design and fabricate have
gained huge appreciation for their excellent resistant to the pressure. The
entire range is available in various specifications and can also be
customized as specified by the clients."

Key Features (EXACT):
- 3-PIECE BALL VALVES DESIGN / 2-WAY
- 3-Piece swing-Out Design, Easy In-line Maintenance
- Maintenance free live loaded double sealing stem packing ensures high
  cycles life and positive sealing
- Blow-Out Proof Stem
- Fire safe design
- Bolted / Screwed gland
- Solid ball

Technical Specs Table (EXACT):
Material: Carbon Steel, Alloy Steel, Stainless Steel, any other special material
Valve type: Floating design ball valve
Body type: 3 pc
Seat type: PTFE/CFT
End Connection: Screwed, socket & butt weld ends./Sw Extn.
Size range: 15 NB to 50 NB
Pressure rating: Class 800
Operation: Hand lever

Available Sizes: 15mm | 20mm | 25mm | 32mm | 40mm | 50mm

Note (EXACT): "Specifications & Dimensions are subject to change without notice.
We can also manufacture ball valves as per customer's drawing and requirement."

---

PAGE 2: src/app/products/three-piece-ball-valves/page.tsx
Metadata: "Three Piece Ball Valves Manufacturer Punjab | Swastik Valves India"
Description: "Swastik valves manufactures three piece ball valves, screwed end
ball valves in india, punjab — exporters and suppliers of 3 piece ball valves"

Same descriptions, features, specs, sizes and note as Page 1.
(Identical content per original website. Differentiate with unique hero tagline:
"Screwed End Precision — Built for Demanding Industrial Environments")

---

PAGE 3: src/app/products/gun-metal-foot-valves/page.tsx
Metadata: "Gun Metal Foot Valves Manufacturer India | Swastik Valves Ludhiana"
Description: "Swastik Valves manufactures Gun Metal Foot Valves — ISO standard,
dimensionally accurate, corrosion resistant. Suppliers and exporters in India,
Punjab, Ludhiana."

Product Description (EXACT TEXT):
"Swastik Valves tends to manufacture, supply and export distinguished Gun Metal
Foot Valve highly performing and durable by nature. Our gun metal valve has
established a respected full position in the market, which is reflected by their
large scale placed orders. As these industrial valves made up of superior quality
raw materials and designed in accordance with internationally set standards. Our
pressure valves are manufactured strictly in accordance to the ISO quality
standards. These industrial valves are widely acknowledged due to the features
like dimensionally accurate, corrosion resistance and smooth performance. We have
engaged highly proficient team members, who make metal and alloy valves as per
the specific demands of the customers. Our pressure valves are offered in
different categories such as check, gate, butterfly, safety valves and others."

Main Applications (EXACT):
- Petroleum industry
- Food processing industry
- Chemical industry
- Gas Plants
- Dyeing Industry

Key Features (EXACT):
- Screwed female ends to IS:554 BSP
- Metal to Metal lift type valve
- Operates even at low pressure
- Valve also Available with rubber ring, spring loaded
- Filter water efficiently
- Trouble free performance
- Size Range from 15mm to 150mm
- High tensile strength
- Durability
- Optimum efficiency

Technical Specs (EXACT):
Body Material: Gun Metal IS:318 Gr.LTB2
Gasket: Synthetic Rubber IS:5192
Disc: Gun Metal IS:318 Gr.LTB2
Strainer: Gun Metal IS:318 Gr.LTB2

Available Sizes: 15mm to 150mm (show as range bar or pills)
Note (EXACT): "Specifications & Dimensions are subject to change without notice."

---

PAGE 4: src/app/products/gun-metal-valves/page.tsx
Metadata: "Gun Metal Valves Manufacturer India | Swastik Valves Punjab"
Same content as Gun Metal Foot Valves (original site uses same page).
Hero tagline: "Industrial Grade Gun Metal Valves — Corrosion Resistant,
High Tensile Strength"


════════════════════════════════════════════════════════════════════════════════
PROMPT 6 — QUALITY POLICY PAGE & INFRASTRUCTURE PAGE
════════════════════════════════════════════════════════════════════════════════

Build Quality Policy and Infrastructure pages.

──────────────────────────────────────────
PART A: QUALITY POLICY PAGE (src/app/quality/page.tsx)
──────────────────────────────────────────
Metadata: "Quality Policy & ISO Certifications | Swastik Valves India"
Description: "Swastik Valves is ISO 9001:2008 certified by JAZ ANZ.
Pressure testing, cryogenic testing, third party inspection available.
Quality industrial valve manufacturer in Ludhiana, Punjab, India."

1. PAGE HERO: bg-brand-navy
   H1: "Quality Policy & Certifications"
   Sub: "ISO 9001:2008 Certified. Every valve built to international standards."

2. QUALITY CONTROL SECTION (two-column):
   LEFT — Body text (EXACT from source):
   H2: "Quality Control"
   Para 1: "Swastik Valves are well equipped with testing equipments for
   quality control. All material test reports like Pressure Testing and
   Cryogenic testing facilities are permanently maintained and available for
   general reference."
   
   Para 2: "Swastik Valves has infrastructure to design and develop variety of
   valve products. we offer Innovative Products Design with best possible
   quality and very competitive price. We assure quality assurance for the
   manufacturing of all valves products to ensure they comply with contractual
   requirements. All our raw material suppliers are totally committed to
   provide us high quality raw materials which is inspected for conformity on
   receipt and after assembly."
   
   Para 3: "Swastik Valves has build and enviable reputation for producing high
   quality three piece valves and gun metal foot valves. Our Quality control
   team ensure that each valve is constructed in accordance with the
   international codes. All finished valves are audited and inspected by major
   inspecting quality team. In addition to their normal application, the valves
   must prove their safe and reliable operation even under adverse and extreme
   conditions."
   
   RIGHT — Testing capabilities grid:
   4 cards: Pressure Testing | Cryogenic Testing | Hydraulic Testing |
   Positive Material ID
   Each: Icon + title + small desc. bg-brand-offwhite rounded-xl p-6

3. ISO CERTIFICATION HIGHLIGHTED BLOCK:
   bg-brand-orange/10 border-2 border-brand-orange rounded-2xl p-8 md:p-12
   - Large ISO badge/shield graphic (CSS + SVG)
   - Heading: "ISO 9001:2008 Certified" (brand-orange, large)
   - Accreditation: "Accredited by JAZ ANZ"
   - Body (EXACT TEXT): "Swastik Valves is an ISO 9001:2008 certified company
     which provides third party inspection also as per clients need. Continuous
     development & products improvement is our motto. Swastik Valves has
     continually worked to develop innovative and quality Ball Valves and Gun
     Metal Foot Valves products and has earned a reputation for technical
     excellence in the industrial valve industry and accredited with ISO
     9001:2008 Certification by JAZ ANZ."

4. QUALITY POLICY STATEMENT (5 numbered points):
   bg-brand-charcoal text-white rounded-2xl p-10
   H2: "Our Quality Policy" (white)
   Numbered list styled as large items with orange numbers:
   1. "Commit ourselves for manufacturing and supplying products that would
      give complete satisfaction to customer."
   2. "We will strive to achieve growth and leading position in the market by
      supplying consistent quality products."
   3. "Continually improve the effectiveness of quality management system."
   4. "Creating an environment of teamwork and innovative approach."
   5. "Provide time bound delivery of products with very competitive prices."

5. RESEARCH & DEVELOPMENT SECTION:
   H2: "Research & Development"
   Body (EXACT): "Through continuous efforts in research and development, we
   could bring our various types of Valves for High Pressure, High Temperature
   and Highly Corrosive Fluids. We also offers Valves with the third party
   inspection agencies. We can offer other inspection agency as per your need."

6. CERTIFICATIONS DISPLAY:
   H2: "Our Certifications"
   Grid of 4 certificate cards:
   Card style: bg-white border-2 border-brand-steel/20 rounded-2xl p-6
   hover:border-brand-orange hover:shadow-lg transition
   Center-aligned content:
   
   Card 1: 🏆 "ISO 9001:2008" / "Certified by JAZ ANZ" / "International
            Quality Management System"
   Card 2: ™ "Trademark Certificate" / "Certificate of Registration" /
            "Registered Brand — Swastik Valves"
   Card 3: 🏢 "Company Registration" / "Registered Company" /
            "Government of India"
   Card 4: 🔖 "MSME Certificate" / "Micro Small & Medium Enterprise" /
            "Ministry of MSME, India"
   
   Note below: "(Certificate scan images will be displayed here — please
   provide high resolution scans)"

──────────────────────────────────────────
PART B: INFRASTRUCTURE PAGE (src/app/infrastructure/page.tsx)
──────────────────────────────────────────
Metadata: "Manufacturing Facilities | Swastik Valves Ludhiana, Punjab"
Description: "Swastik Valves operates a modern manufacturing facility in
Ludhiana, Punjab with CNC machines, gun metal casting unit, hydraulic testing
and more. ISO 9001:2008 certified ball valve manufacturer."

1. PAGE HERO: bg-brand-charcoal
   H1: "Manufacturing Facilities & Infrastructure"
   Sub: "Modern machinery. Experienced teams. Precision at every stage."

2. INTRO TEXT SECTION (EXACT from source):
   Para 1: "Swastik Valves all engineering staff, casting staff, quality staff,
   assembly staff, packaging and dispatch staff are highly qualified having vast
   practical & valves field experience. Our products are sale all over India
   and abroad."
   
   Para 2: "Swastik Valves objectives is the development of valves designed to
   maximise performance according to customer's own parameter and tolerances.
   Our products are known for reliability, efficiency and productivity, adaption
   to new technology. Our modernized machinery helps us in meeting our client's
   demands efficiently."

3. MACHINERY LIST (src/components/common/MachineList.tsx):
   H2: "Our Sophisticated Infrastructure Machinery Includes:"
   Styled numbered list — 2-column grid desktop, 1-col mobile:
   Each item: Number (brand-orange, bold, large) + machine name
   bg-white rounded-xl p-4 border border-gray-100 hover:border-brand-orange
   hover:shadow-md transition
   
   ALL 13 MACHINES (EXACT):
   1. Gun Metal Casting Unit
   2. CNC Machines
   3. Special Purpose Machines for Ball Turning
   4. Surface & Cylindrical Grinding Machine
   5. Vertical Turret Lathes
   6. Horizontal Boring Machines
   7. Multi Station Turret Lathes
   8. Heavy Duty Long Arm Radial Drilling Machines
   9. Multi Spindle Drilling Machine
   10. Shot Blasting
   11. Plasma Welding / Submerged Welding
   12. Latest Hydraulic & Pneumatic Testing Equipments
   13. Positive Material Identification Equipment

4. PHOTO GALLERY (src/components/common/PhotoGallery.tsx):
   H2: "Our Infrastructure"
   Sub: "Manufacturing floor, casting unit, and finished products"
   
   Masonry or grid gallery:
   - Placeholder cards for all photos (actual images to be provided by client)
   - Each placeholder: bg-brand-steel/20 rounded-xl aspect-video
     with centered text: "Factory Photo — [description]"
   - Caption text below each image:
     Group 1 (4 images): "Ball Valves Gun Metal Casting Unit —
     Swastik Valves Ludhiana Punjab India"
     Group 2 (16 images): "Ball Valves - 3 Piece Ball Valves - Gun Metal
     Foot Valves manufacturing unit — Swastik Valves Ludhiana Punjab India"
   - Lightbox: clicking any image opens full-screen view
     (use a simple state-based lightbox with Framer Motion)
   - Note below gallery: "Contact us to visit our manufacturing facility
     in Ludhiana, Punjab."


════════════════════════════════════════════════════════════════════════════════
PROMPT 7 — ENQUIRY FORM PAGE & CONTACT PAGE
════════════════════════════════════════════════════════════════════════════════

Build the Enquiry and Contact pages with full form functionality.

──────────────────────────────────────────
PART A: ENQUIRY PAGE (src/app/enquiry/page.tsx)
──────────────────────────────────────────
Metadata: "Send Enquiry | Get a Quote — Swastik Valves India"
Description: "Send your valve requirements to Swastik Valves India. We
manufacture 3 piece ball valves, gun metal foot valves for industrial
applications. Get a fast quote."

PAGE LAYOUT — Two column desktop, single column mobile:
LEFT (60%): Enquiry Form
RIGHT (40%): Contact sidebar + Why enquire callout

1. LEFT — ENQUIRY FORM (src/components/forms/EnquiryForm.tsx):

   Use react-hook-form + zod validation.
   
   Zod schema:
   - name: string min(2) — "Your Name" [Required]
   - designation: string optional — "Designation"
   - company: string min(2) — "Company Name" [Required]
   - email: string email() — "Email ID" [Required]
   - address: string optional — "Address"
   - city: string optional — "City"
   - country: string — "Country" [dropdown]
   - phone: string min(7) — "Contact Numbers" [Required]
   - query: string min(10) — "Specific Query / Enquiry" [Required]
   
   Country Dropdown — full list (EXACT from original site):
   Afghanistan, Albania, Algeria, American Samoa, Andorra, Angola, Anguilla,
   Antarctica, Antigua and Barbuda, Argentina, Armenia, Aruba, Australia,
   Austria, Azerbaijan, Bahamas, Bahrain, Bangladesh, Barbados, Belarus,
   Belgium, Belize, Benin, Bermuda, Bhutan, Bolivia, Bosnia and Herzegowina,
   Botswana, Bouvet Island, Brazil, Brunei Darussalam, Bulgaria, Burkina Faso,
   Burundi, Cambodia, Cameroon, Canada, Cape Verde, Cayman Islands, Central
   African Republic, Chad, Chile, China, Christmas Island, Colombia, Comoros,
   Congo, Cook Islands, Costa Rica, Cote D'Ivoire, Croatia, Cuba, Cyprus,
   Czech Republic, Denmark, Djibouti, Dominica, Dominican Republic, East Timor,
   Ecuador, Egypt, El Salvador, Equatorial Guinea, Eritrea, Estonia, Ethiopia,
   Falkland Islands, Faroe Islands, Fiji, Finland, France, France Metropolitan,
   French Guiana, French Polynesia, Gabon, Gambia, Georgia, Germany, Ghana,
   Gibraltar, Greece, Greenland, Grenada, Guadeloupe, Guam, Guatemala, Guinea,
   Guinea-Bissau, Guyana, Haiti, Honduras, Hong Kong, Hungary, Iceland, India,
   Indonesia, Iran, Iraq, Ireland, Israel, Italy, Jamaica, Japan, Jordan,
   Kazakhstan, Kenya, Kiribati, Kuwait, Kyrgyzstan, Latvia, Lebanon, Lesotho,
   Liberia, Liechtenstein, Lithuania, Luxembourg, Macau, Macedonia, Madagascar,
   Malawi, Malaysia, Maldives, Mali, Malta, Marshall Islands, Martinique,
   Mauritania, Mauritius, Mayotte, Mexico, Micronesia, Moldova, Monaco,
   Mongolia, Montserrat, Morocco, Mozambique, Myanmar, Namibia, Nauru, Nepal,
   Netherlands, New Caledonia, New Zealand, Nicaragua, Niger, Nigeria, Niue,
   Norfolk Island, Norway, Oman, Pakistan, Palau, Panama, Paraguay, Peru,
   Philippines, Pitcairn, Poland, Portugal, Puerto Rico, Qatar, Reunion,
   Romania, Russian Federation, Rwanda, Saint Lucia, Samoa, San Marino,
   Saudi Arabia, Senegal, Seychelles, Sierra Leone, Singapore, Slovakia,
   Slovenia, Solomon Islands, Somalia, South Africa, Spain, Sri Lanka,
   St Helena, Sudan, Suriname, Swaziland, Sweden, Switzerland, Taiwan,
   Tajikistan, Tanzania, Thailand, Togo, Tokelau, Tonga, Trinidad and Tobago,
   Tunisia, Turkey, Turkmenistan, Tuvalu, Uganda, Ukraine, United Arab Emirates,
   United Kingdom, United States, Uruguay, Uzbekistan, Vanuatu, Vatican City
   State, Venezuela, Viet Nam, Virgin Islands (British), Virgin Islands (US),
   Western Sahara, Yemen, Zaire, Zambia, Zimbabwe, Other-Not Shown
   
   Form field styling:
   - All inputs: border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand-orange
     focus:ring-2 focus:ring-brand-orange/20 outline-none transition w-full
   - Labels: text-sm font-semibold text-brand-navy mb-1 block
   - Required marker: text-brand-orange after label
   - Error messages: text-red-500 text-xs mt-1
   - Select: same styling, custom arrow icon
   - Textarea (query): min-h-[120px] resize-y
   
   Submit Button:
   - Full width, bg-brand-orange text-white py-4 rounded-lg font-bold text-lg
   - Loading state: spinner + "Sending..." text
   - hover: bg-orange-600 shadow-lg shadow-orange-500/25
   
   Success State:
   - Replace form with success message:
     Green checkmark icon (large)
     "Enquiry Sent Successfully!"
     "Thank you [name], we have received your enquiry and will get back to
      you within 24 hours."
     "Our team will contact you at: [email]"
     Button: "Send Another Enquiry" (resets form)
   
   Error State:
   - Red error banner at top of form:
     "Something went wrong. Please try again or contact us directly at
      mahavirvalves@gmail.com"
   
   Note: "* fields are required"

2. RIGHT SIDEBAR:
   
   Box 1 — Direct Contact (bg-brand-navy text-white rounded-2xl p-6):
   "Prefer to reach us directly?"
   📞 +91-161-2503914
   📱 +91-98156-52779
   ✉ mahavirvalves@gmail.com
   
   Box 2 — WhatsApp CTA:
   bg-green-600 text-white rounded-2xl p-6
   WhatsApp icon
   "Chat with us on WhatsApp"
   "Send your requirements directly via WhatsApp"
   Button: "Open WhatsApp" → wa.me/919815652779
   
   Box 3 — What to include in your enquiry:
   bg-brand-offwhite rounded-2xl p-6
   Heading: "What to include in your enquiry:"
   Checklist:
   ✓ Type of valve required
   ✓ Size / dimension needed
   ✓ Material preference
   ✓ Quantity required
   ✓ Application / industry
   ✓ Any custom specifications

3. API ROUTE (src/app/api/enquiry/route.ts):
   POST handler:
   - Validate body with zod schema
   - Use nodemailer to send email to mahavirvalves@gmail.com
   - Email subject: "New Enquiry from [company] — [name] — Swastik Valves"
   - Email body: All form fields formatted cleanly
   - Send auto-reply to the enquirer's email:
     Subject: "We received your enquiry — Swastik Valves India"
     Body: "Dear [name], Thank you for your enquiry. We have received your
     message and our team will get back to you within 24 hours.
     Swastik Valves India | Tel: +91-161-2503914 | mahavirvalves@gmail.com"
   - Return { success: true } on success, { error: message } on failure

Environment variables needed (.env.local):
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mahavirvalves@gmail.com
SMTP_PASS=[app password]
SMTP_TO=mahavirvalves@gmail.com

──────────────────────────────────────────
PART B: CONTACT PAGE (src/app/contact/page.tsx)
──────────────────────────────────────────
Metadata: "Contact Us | Swastik Valves India — Ludhiana, Punjab"

1. PAGE HERO:
   H1: "Contact Us"
   Sub (EXACT from source): "Swastik Valves look forward to your Valuable
   Suggestions, Guidance & Valued Enquiries, for a Long Term Warm Business
   Association..."

2. TWO-COLUMN LAYOUT:
   LEFT (Contact Details + Map):
   
   Contact cards:
   Card 1 — Phone:
     Icon: Phone
     Label: "Phone"
     Value: +91-161-2503914 (tel: link)
   
   Card 2 — Mobile:
     Icon: Smartphone
     Label: "Mobile"
     Value: +91-98156-52779 (tel: link)
   
   Card 3 — Email:
     Icon: Mail
     Label: "Email Id"
     Value: mahavirvalves@gmail.com (mailto: link)
   
   Card 4 — Website:
     Icon: Globe
     Label: "Website"
     Value: www.swastikvalvesindia.com
   
   Card 5 — Address:
     Icon: MapPin
     Label: "Corporate Office & Works"
     Value: MAHAVIR VALVES
            Plot. 1240, St. No: 41,
            Janta Nagar, Jaimal Road,
            Ludhiana - 141003
            Punjab (INDIA)
   
   Google Maps embed below cards:
   <iframe src="https://maps.google.com/maps?q=Ludhiana+Punjab+India&output=embed"
   width="100%" height="350" rounded-xl overflow-hidden border-0 />
   
   RIGHT (Quick Contact Form):
   Mini version of enquiry form:
   - Name [Required]
   - Email [Required]
   - Phone [Required]
   - Message [Required, textarea]
   - "Send Message" button → same API route

3. WHATSAPP SECTION (full-width strip below):
   bg-green-600 text-white py-10
   Icon: WhatsApp SVG large
   "Prefer WhatsApp? Message us directly"
   Button: "Chat on WhatsApp" → wa.me/919815652779


════════════════════════════════════════════════════════════════════════════════
PROMPT 8 — SEO, SITEMAP, SCHEMA MARKUP & PERFORMANCE OPTIMIZATION
════════════════════════════════════════════════════════════════════════════════

Complete all SEO, schema markup, sitemap, and performance optimizations for
the Swastik Valves India Next.js website.

──────────────────────────────────────────
PART A: METADATA (src/app/layout.tsx — root level)
──────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.swastikvalvesindia.com'),
  title: {
    template: '%s | Swastik Valves India',
    default: 'Swastik Valves India — Ball Valve Manufacturer Since 1988 | Ludhiana, Punjab'
  },
  description: 'Swastik Valves India is an ISO 9001:2008 certified manufacturer of 3 Piece Ball Valves, Three Piece Ball Valves, Gun Metal Foot Valves and Gun Metal Valves in Ludhiana, Punjab, India. Established 1988. Exporters and suppliers worldwide.',
  keywords: [
    'ball valves manufacturers india', '3 piece ball valves manufacturer',
    'three piece ball valves india', 'gun metal foot valves manufacturer',
    'industrial valves ludhiana', 'valve manufacturer punjab',
    'swastik valves india', 'steam ball valves india',
    'energy miser ball valves', 'cast iron ball valves manufacturer',
    'gun metal valves exporters india', 'screwed end ball valves',
    'iso 9001 valve manufacturer india', 'valve manufacturer ludhiana punjab'
  ],
  authors: [{ name: 'Swastik Valves India' }],
  creator: 'Swastik Valves India',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.swastikvalvesindia.com',
    siteName: 'Swastik Valves India',
    title: 'Swastik Valves India — Precision Valve Manufacturer Since 1988',
    description: 'ISO 9001:2008 certified manufacturer of 3 piece ball valves and gun metal foot valves. Located in Ludhiana, Punjab, India.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swastik Valves India',
    description: 'ISO certified ball valve manufacturer in Ludhiana, India',
  },
  alternates: { canonical: 'https://www.swastikvalvesindia.com' },
  verification: { google: 'YOUR_GOOGLE_VERIFICATION_CODE' }
}

──────────────────────────────────────────
PART B: SCHEMA MARKUP (src/components/common/SchemaMarkup.tsx)
──────────────────────────────────────────
Create a client component that injects JSON-LD schema into <head>.
Use next/script with strategy="lazyOnload".

Schema 1 — LocalBusiness + Manufacturer:
{
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
}

Schema 2 — Product (for each product page, dynamic):
Build a generateProductSchema(product) function:
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "brand": { "@type": "Brand", "name": "Swastik Valves India" },
  "manufacturer": {
    "@type": "Organization",
    "name": "Swastik Valves India",
    "address": { "@type": "PostalAddress", "addressLocality": "Ludhiana", "addressRegion": "Punjab", "addressCountry": "IN" }
  },
  "material": product.material,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "INR",
    "seller": { "@type": "Organization", "name": "Swastik Valves India" }
  }
}

Schema 3 — BreadcrumbList (on all interior pages):
Dynamic based on current page. Example for product page:
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.swastikvalvesindia.com" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.swastikvalvesindia.com/products" },
    { "@type": "ListItem", "position": 3, "name": "3 Piece Ball Valves", "item": "https://www.swastikvalvesindia.com/products/3-piece-ball-valves" }
  ]
}

──────────────────────────────────────────
PART C: SITEMAP (src/app/sitemap.ts)
──────────────────────────────────────────
import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.swastikvalvesindia.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://www.swastikvalvesindia.com/about', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.swastikvalvesindia.com/products', changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://www.swastikvalvesindia.com/products/3-piece-ball-valves', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.swastikvalvesindia.com/products/three-piece-ball-valves', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.swastikvalvesindia.com/products/gun-metal-foot-valves', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.swastikvalvesindia.com/products/gun-metal-valves', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.swastikvalvesindia.com/quality', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.swastikvalvesindia.com/infrastructure', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.swastikvalvesindia.com/enquiry', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.swastikvalvesindia.com/contact', changeFrequency: 'monthly', priority: 0.7 },
  ]
}

──────────────────────────────────────────
PART D: ROBOTS.TXT (src/app/robots.ts)
──────────────────────────────────────────
import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://www.swastikvalvesindia.com/sitemap.xml',
  }
}

──────────────────────────────────────────
PART E: PERFORMANCE OPTIMIZATIONS
──────────────────────────────────────────

1. next.config.js:
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ]
    }
  ]
}

2. All images: use next/image with width, height, alt, loading="lazy" (non-hero)
   Hero image: loading="eager" priority={true}

3. Framer Motion: use AnimatePresence + useReducedMotion hook to respect
   user accessibility preferences for animations

4. Font optimization: use next/font/google for Inter with display: 'swap'
   and subsets: ['latin']

5. Add loading.tsx files for each route with skeleton UI matching the page layout

6. 404 page (src/app/not-found.tsx):
   Brand-styled 404 with:
   - Large "404" in brand-orange
   - "Page Not Found"
   - "The page you're looking for doesn't exist."
   - Button: "Go Home" → /
   - Button: "View Products" → /products


════════════════════════════════════════════════════════════════════════════════
PROMPT 9 — ANIMATIONS, MICRO-INTERACTIONS & POLISH
════════════════════════════════════════════════════════════════════════════════

Add all animations and micro-interactions to polish the Swastik Valves website.

1. SCROLL ANIMATION HOOK (src/hooks/useScrollAnimation.ts):
   Use Intersection Observer API.
   Returns { ref, isVisible } — when element enters viewport, isVisible = true.
   useScrollAnimation(threshold = 0.15, rootMargin = "0px 0px -50px 0px")

2. SECTION ENTRY ANIMATIONS (apply to every section):
   Wrap content in Framer Motion div:
   - initial: { opacity: 0, y: 40 }
   - animate: isVisible ? { opacity: 1, y: 0 } : {}
   - transition: { duration: 0.6, ease: "easeOut" }
   
   For staggered children (cards, grid items):
   - Parent: variants with staggerChildren: 0.1
   - Child: variants with hidden (opacity 0, y 20) and show (opacity 1, y 0)

3. HERO ANIMATIONS:
   - Badge: { opacity: 0, y: -20 } → { opacity: 1, y: 0 } delay: 0
   - H1: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } delay: 0.2
   - Subtitle: { opacity: 0, y: 30 } → { opacity: 1, y: 0 } delay: 0.4
   - CTAs: { opacity: 0, y: 20 } → { opacity: 1, y: 0 } delay: 0.6
   - Right side stats: { opacity: 0, scale: 0.8 } → { opacity: 1, scale: 1 }
     staggered from delay 0.8

4. NAVBAR SCROLL BEHAVIOR:
   useEffect on scroll: if window.scrollY > 80:
   - Add classes: shadow-xl, bg-brand-navy/95, backdrop-blur-md
   - Slightly reduce padding (py-4 → py-2) with CSS transition

5. BUTTON HOVER STATES:
   All primary buttons:
   - whileHover: { scale: 1.02, boxShadow: "0 20px 40px rgba(231,111,0,0.3)" }
   - whileTap: { scale: 0.98 }
   
   Secondary/outline buttons:
   - whileHover: { scale: 1.02 }
   - whileTap: { scale: 0.98 }

6. PRODUCT CARD HOVER:
   - whileHover: { y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }
   - transition: { type: "spring", stiffness: 300, damping: 20 }

7. INDUSTRY TILE HOVER:
   - whileHover: { scale: 1.05, borderColor: "#E76F00" }
   - Icon inside: whileHover: { rotate: 15 } (subtle rotation)

8. TRUST STRIP MARQUEE (mobile):
   CSS animation: @keyframes marquee { from { transform: translateX(0) }
   to { transform: translateX(-50%) } }
   Duplicate content for seamless loop.

9. WHATSAPP BUTTON PULSE:
   Framer Motion:
   animate: { scale: [1, 1.15, 1] }
   transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
   
   Outer ring pulse:
   animate: { scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }
   transition: { duration: 2, repeat: Infinity }

10. COUNTER ANIMATION (for hero stats):
    Create useCountUp(target, duration=2000) hook:
    - When element enters viewport, animates from 0 to target
    - Used for "35+" years, stats numbers

11. FORM FIELD FOCUS:
    CSS transition on focus: border-color + ring appearance
    Label float animation on focus (if using floating labels)
    
    Error state: shake animation:
    animate: hasError ? { x: [-5, 5, -5, 5, 0] } : {}
    transition: { duration: 0.3 }

12. PAGE TRANSITIONS:
    Wrap page content in:
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >

13. LOADING SKELETONS (src/app/loading.tsx per route):
    Pulse animation skeletons matching page layout:
    className="animate-pulse bg-gray-200 rounded"
    Match heights and widths to actual content

14. BACK TO TOP:
    Smooth scroll + Framer animate presence fade-in/out:
    <AnimatePresence>
    {showButton && (
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      />
    )}
    </AnimatePresence>

15. SECTION HEADERS (src/components/common/SectionHeader.tsx):
    Reusable component:
    - Small eyebrow label (brand-orange, uppercase, tracking-widest)
    - H2 (brand-navy or white depending on bg)
    - Subtitle text (brand-steel)
    - Orange decorative line under H2 (w-16 h-1 bg-brand-orange rounded)
    Animate: eyebrow fades in first, then H2, then line grows from left


════════════════════════════════════════════════════════════════════════════════
PROMPT 10 — FINAL QA CHECKLIST, DEPLOYMENT & LAUNCH
════════════════════════════════════════════════════════════════════════════════

Final quality assurance, deployment preparation and launch for Swastik Valves.

──────────────────────────────────────────
PART A: AUTOMATED QA CHECKS
──────────────────────────────────────────
Run through every item and fix all issues:

FUNCTIONALITY CHECKLIST:
[ ] Home page loads, all sections visible, no broken layouts
[ ] Navbar: all links work, dropdown opens, mobile drawer works
[ ] Products dropdown shows all 4 products with correct links
[ ] All 4 product pages load with correct data (specs, sizes, features)
[ ] Product pages: "Request a Quote" button links to /enquiry
[ ] About page: all text present, industries list complete (16 industries)
[ ] Quality page: ISO cert block visible, 5 policy points listed, certs shown
[ ] Infrastructure page: all 13 machines listed, gallery section present
[ ] Enquiry form: all fields present, validation works, required fields enforced
[ ] Enquiry form: country dropdown has full list (check for India in list)
[ ] Enquiry form: success state shows after submission
[ ] Enquiry form: error state shows if API fails
[ ] Contact page: all contact details correct, map embeds, quick form works
[ ] WhatsApp button: visible on all pages, links to wa.me/919815652779
[ ] Back to top: appears after scrolling, scrolls to top smoothly
[ ] Footer: all 4 columns correct, all links work, phone/email clickable
[ ] 404 page: shows branded 404 for invalid routes

CONTENT ACCURACY CHECKLIST:
[ ] Company name: "Swastik Valves" / "MAHAVIR VALVES" — correct everywhere
[ ] Phone: +91-161-2503914 — exact, everywhere
[ ] Mobile: +91-98156-52779 — exact, everywhere
[ ] Email: mahavirvalves@gmail.com — exact, everywhere
[ ] Address: Plot. 1240, St. No: 41, Janta Nagar, Jaimal Road,
             Ludhiana - 141003, Punjab (INDIA) — exact
[ ] Founded: 1988 — correct everywhere
[ ] Certification: ISO 9001:2008 by JAZ ANZ
[ ] Ball valve sizes: 15mm, 20mm, 25mm, 32mm, 40mm, 50mm (all 6)
[ ] Foot valve sizes: 15mm to 150mm
[ ] Ball valve pressure: Class 800
[ ] Ball valve seat: PTFE/CFT
[ ] Foot valve body material: Gun Metal IS:318 Gr.LTB2
[ ] Foot valve gasket: Synthetic Rubber IS:5192
[ ] All 13 machinery items listed correctly on infrastructure page

RESPONSIVE DESIGN CHECKLIST:
[ ] 320px mobile: no horizontal overflow, all text readable
[ ] 375px (iPhone): hero looks good, nav hamburger works
[ ] 768px tablet: products 2-col, industries 3-col
[ ] 1024px: full desktop nav visible
[ ] 1280px+: max container width respected, centered

PERFORMANCE CHECKLIST:
[ ] Run npx next build — zero errors, zero warnings
[ ] Run npx @next/bundle-analyzer — check bundle size
[ ] All images use next/image with proper width/height/alt
[ ] No console errors or warnings in browser
[ ] Lighthouse score: Performance > 85, SEO > 95, Accessibility > 90, Best Practices > 95
[ ] Check Core Web Vitals in Chrome DevTools

SEO CHECKLIST:
[ ] Each page has unique title and meta description
[ ] H1 is unique per page
[ ] All images have descriptive alt text
[ ] Schema markup valid (test at schema.org/validator)
[ ] Sitemap accessible at /sitemap.xml
[ ] robots.txt accessible at /robots.txt
[ ] No canonical issues
[ ] Internal links use relative paths (next/link)

──────────────────────────────────────────
PART B: ENVIRONMENT CONFIGURATION
──────────────────────────────────────────
Create .env.local (DO NOT commit to git):
NEXT_PUBLIC_SITE_URL=https://www.swastikvalvesindia.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mahavirvalves@gmail.com
SMTP_PASS=your_gmail_app_password_here
SMTP_TO=mahavirvalves@gmail.com
NEXT_PUBLIC_WHATSAPP=919815652779
NEXT_PUBLIC_MAPS_API_KEY=your_google_maps_key

Add .env.example with all keys (empty values).
Add .env.local to .gitignore.

──────────────────────────────────────────
PART C: GOOGLE ANALYTICS 4 INTEGRATION
──────────────────────────────────────────
Install: npm install @next/third-parties
In src/app/layout.tsx:
import { GoogleAnalytics } from '@next/third-parties/google'
Add: <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />

Track key events:
- enquiry_form_submit (on successful form submission)
- enquiry_form_error (on API error)
- whatsapp_click (on WhatsApp button click)
- phone_click (on tel: link click)
- product_view (on each product page load — use useEffect)
- quote_cta_click (on "Get a Quote" button click)

──────────────────────────────────────────
PART D: VERCEL DEPLOYMENT (RECOMMENDED)
──────────────────────────────────────────
1. Push code to GitHub repository
2. Connect repo to Vercel (vercel.com)
3. Add all environment variables in Vercel dashboard
4. Set production domain: www.swastikvalvesindia.com
5. Update DNS: Add CNAME record → cname.vercel-dns.com
6. Enable Vercel Analytics (free)
7. Test production build: npm run build && npm run start

Alternative (Hostinger/cPanel):
1. Run: npm run build
2. Export (if using static): next export (add output: 'export' to next.config.js)
3. Upload .next folder and public folder via FTP
4. Configure Node.js on hosting panel
5. Set start command: node .next/standalone/server.js

──────────────────────────────────────────
PART E: POST-LAUNCH TASKS
──────────────────────────────────────────
[ ] Submit sitemap in Google Search Console
[ ] Verify site ownership in Google Search Console
[ ] Set up Google Analytics goals for form submissions
[ ] Test enquiry form end-to-end (send a test enquiry)
[ ] Verify email received at mahavirvalves@gmail.com
[ ] Verify auto-reply works
[ ] Test WhatsApp button on mobile
[ ] Test click-to-call on mobile
[ ] Set up 301 redirects from old URLs to new:
    /3-piece-ball-valves-maufacturers-india-punjab-ab.html → /about
    /ball-valves-manufacturers-india-punjab-india-pro.html → /products
    /3-piece-ball-valves-manufacturer-india-punjab.html → /products/3-piece-ball-valves
    /three-piece-ball-valves-manufacturer-india-punjab.html → /products/three-piece-ball-valves
    /gun-metal-foot-valves-manufacturer-india-punjab.html → /products/gun-metal-foot-valves
    /three-piece-ball-valves-manufacturers-india-punjab-quality.html → /quality
    /screwed-end-ball-valves-india-punjab-infra.html → /infrastructure
    /gun-metal-ball-valves-manufacturers-india-punjab-enq.html → /enquiry
    /gun-metal-foot-valves-manufacturers-india-punjab-cont.html → /contact
[ ] Monitor Core Web Vitals for 2 weeks post-launch
[ ] Check Google Search Console for crawl errors weekly

Add redirects in next.config.js:
async redirects() {
  return [
    { source: '/3-piece-ball-valves-maufacturers-india-punjab-ab.html', destination: '/about', permanent: true },
    { source: '/ball-valves-manufacturers-india-punjab-india-pro.html', destination: '/products', permanent: true },
    { source: '/3-piece-ball-valves-manufacturer-india-punjab.html', destination: '/products/3-piece-ball-valves', permanent: true },
    { source: '/three-piece-ball-valves-manufacturer-india-punjab.html', destination: '/products/three-piece-ball-valves', permanent: true },
    { source: '/gun-metal-foot-valves-manufacturer-india-punjab.html', destination: '/products/gun-metal-foot-valves', permanent: true },
    { source: '/three-piece-ball-valves-manufacturers-india-punjab-quality.html', destination: '/quality', permanent: true },
    { source: '/screwed-end-ball-valves-india-punjab-infra.html', destination: '/infrastructure', permanent: true },
    { source: '/gun-metal-ball-valves-manufacturers-india-punjab-enq.html', destination: '/enquiry', permanent: true },
    { source: '/gun-metal-foot-valves-manufacturers-india-punjab-cont.html', destination: '/contact', permanent: true },
    { source: '/index.html', destination: '/', permanent: true },
  ]
}


================================================================================
END OF SUPERPROMPTS FILE
================================================================================
Summary of prompts:
PROMPT 1 — Project Scaffolding, Tech Stack & Design System Setup
PROMPT 2 — Navbar, Footer, WhatsApp Button, Back to Top
PROMPT 3 — Complete Home Page (7 sections)
PROMPT 4 — About Us Page
PROMPT 5 — Products Overview + All 4 Product Detail Pages
PROMPT 6 — Quality Policy Page + Infrastructure/Facilities Page
PROMPT 7 — Enquiry Form Page + Contact Page + API Route
PROMPT 8 — SEO, Schema Markup, Sitemap, Performance Optimization
PROMPT 9 — Animations, Micro-interactions & UI Polish
PROMPT 10 — Final QA Checklist, Deployment & Post-Launch

Tech Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS ·
shadcn/ui · Framer Motion · react-hook-form · Zod · Nodemailer

Feed prompts 1 → 10 sequentially to Claude Code / Cursor / v0.dev
================================================================================
