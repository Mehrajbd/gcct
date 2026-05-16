"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GreenDot } from "@/components/ui/GreenDot";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Tracking", href: "/tracking" },
  { name: "Network", href: "/network" },
  { name: "Booking", href: "/booking" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300",
        isScrolled ? "bg-brand-dark/80 backdrop-blur-md border-b border-green-border" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display font-black text-2xl tracking-tighter">
            <span className="text-green-500">GC</span>
            <span className="text-white">CT</span>
          </span>
          <GreenDot className="h-2 w-2" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-white-80 hover:text-green-500 transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop VTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/tracking">
            <Button variant="ghost" size="sm">
              Track Shipment
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white-100"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-dark z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-black text-2xl">
                <span className="text-green-500">GC</span>
                <span className="text-white">CT</span>
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} className="text-white-100" />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-display font-bold text-white-100 hover:text-green-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
            <Link href="/dashboard" className="w-full">
              <Button variant="primary" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/tracking" className="w-full">
              <Button variant="ghost" className="w-full">
                Track Shipment
              </Button>
            </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
