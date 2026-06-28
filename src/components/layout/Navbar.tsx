"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { COMPANY, PRODUCTS } from "@/lib/constants";
import { RedesignedLogo } from "@/components/layout/logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products", hasDropdown: true },
    { name: "Quality", href: "/quality" },
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0F1D]/95 backdrop-blur-md py-2 shadow-lg border-b border-slate-800/40"
          : "bg-[#0A0F1D]/80 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Area */}
          <div className="flex items-center">
            <Link href="/">
              <RedesignedLogo />
            </Link>
            <div className="hidden xl:flex flex-col border-l border-slate-800/80 pl-4 ml-4">
              <span className="text-[9px] font-mono tracking-widest text-orange-400 uppercase font-bold">Core B2B Segment</span>
              <span className="text-xs text-slate-400 font-medium">Manufacturers & Exporters of Ball Valves & Gun Metal Foot Valves</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button className="flex items-center space-x-1 text-white hover:text-brand-orange transition-colors font-medium">
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-64 bg-brand-charcoal border border-brand-steel/20 rounded-md shadow-xl overflow-hidden"
                      >
                        <div className="py-2">
                          {PRODUCTS.map((prod) => (
                            <Link
                              key={prod.id}
                              href={prod.slug}
                              className={`block px-4 py-2 text-sm text-white hover:bg-brand-orange hover:text-white transition-colors ${
                                pathname === prod.slug ? "text-brand-orange font-bold" : ""
                              }`}
                            >
                              {prod.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-white hover:text-brand-orange transition-colors font-medium relative ${
                    pathname === link.href ? "text-brand-orange font-bold" : ""
                  }`}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="activeNavBorder"
                      className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-brand-orange"
                    />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center space-x-2 text-brand-orange hover:text-orange-400 transition-colors"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-bold">{COMPANY.phone}</span>
            </a>
            <Link
              href="/enquiry"
              className="bg-brand-orange text-white hover:bg-orange-600 transition-colors px-5 py-2.5 rounded-md font-bold text-sm tracking-wide shadow-md hover:shadow-lg"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-brand-orange hover:bg-brand-charcoal focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-brand-charcoal z-50 p-6 shadow-2xl flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-brand-steel/20">
                  <Link href="/">
                    <RedesignedLogo />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-md text-white hover:text-brand-orange"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-8 flex flex-col space-y-4">
                  {navLinks.map((link) =>
                    link.hasDropdown ? (
                      <div key={link.name} className="flex flex-col">
                        <span className="text-brand-steel text-xs uppercase font-bold tracking-wider mb-2">
                          {link.name}
                        </span>
                        <div className="pl-4 flex flex-col space-y-3 border-l border-brand-steel/20">
                          {PRODUCTS.map((prod) => (
                            <Link
                              key={prod.id}
                              href={prod.slug}
                              className={`text-white hover:text-brand-orange transition-colors ${
                                pathname === prod.slug ? "text-brand-orange font-bold" : ""
                              }`}
                            >
                              {prod.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`text-lg font-semibold hover:text-brand-orange transition-colors ${
                          pathname === link.href ? "text-brand-orange font-bold" : "text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Mobile Drawer Bottom Actions */}
              <div className="pt-6 border-t border-brand-steel/20 space-y-4">
                <a
                  href={`tel:${COMPANY.mobile}`}
                  className="flex items-center justify-center space-x-2 text-brand-orange py-2 rounded-md border border-brand-orange/20 bg-brand-orange/5"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-bold">{COMPANY.mobile}</span>
                </a>
                <Link
                  href="/enquiry"
                  className="block text-center bg-brand-orange text-white hover:bg-orange-600 py-3 rounded-md font-bold shadow-md"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
