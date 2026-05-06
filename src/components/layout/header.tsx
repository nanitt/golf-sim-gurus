"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Our Work", href: "/#gallery" },
  { label: "Process", href: "/#process" },
  { label: "Equipment", href: "/compare" },
  { label: "Quiz", href: "/quiz" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/8 bg-[#0a0a0a]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center bg-celtic">
            <span className="font-heading text-sm font-bold text-[#0a0a0a]">G</span>
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-white">
            Golf Sim <span className="text-celtic">Gurus</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+16136980787"
            className="font-mono text-sm text-white/40 transition-colors hover:text-white/70"
          >
            613-698-0787
          </a>
          <Button size="sm" href="/contact">
            Get a Quote
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-white/70 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/8 bg-[#111111] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-white/8 pt-4">
                <Button className="w-full" size="md" href="/contact">
                  Get a Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
