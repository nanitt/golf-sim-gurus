"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function QuoteBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const footer = document.getElementById("footer");
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
      setVisible(window.scrollY > window.innerHeight * 0.7 && footerTop > window.innerHeight + 100);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-0 z-40 w-full border-b border-border bg-cream/95 backdrop-blur-sm"
        >
          <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
            <Image
              src="/images/logos/golfsimgurus.png"
              alt="Golf Sim Gurus"
              width={314}
              height={120}
              className="h-8 w-auto"
            />
            <span className="hidden font-mono text-xs text-text-muted sm:block">
              Custom builds · Kemptville, Ottawa &amp; Eastern Ontario
            </span>
            <Button size="sm" href="/contact">
              Get a Quote
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
