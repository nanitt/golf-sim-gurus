"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";

export function Hero() {
  return (
    <>
      {/* ── Part 1: Cream type panel ── */}
      <section className="relative overflow-hidden bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-12">

          {/* Kicker */}
          <motion.div
            className="mb-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="h-px w-8 bg-brass flex-shrink-0" />
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-celtic">
              Custom Golf Simulators · Eastern Ontario
            </p>
            <div className="h-px w-8 bg-brass flex-shrink-0" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-heading text-[clamp(4.5rem,11vw,12rem)] leading-[0.88] tracking-[0.03em] text-charcoal"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Your Room,{" "}
            <span className="block">Your Game.</span>
            <span className="block text-celtic">Built Right.</span>
          </motion.h1>

          {/* Body + CTAs */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="max-w-md text-[0.9rem] font-body leading-relaxed text-charcoal-light">
              We design, engineer, and install custom golf simulator rooms for
              homes and businesses across Kemptville, Ottawa, and Eastern Ontario.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" href="/contact">Get a Free Quote</Button>
              <Button size="lg" variant="secondary" href="/quiz">Find Your Simulator</Button>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-6 border-t border-border pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div>
              <CountUp
                end={200}
                suffix="+"
                className="block font-heading text-4xl leading-none tracking-wider text-charcoal"
              />
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-muted">Builds Completed</p>
            </div>
            <div>
              <span className="block font-heading text-4xl leading-none tracking-wider text-charcoal">$100K+</span>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-muted">Top Build Value</p>
            </div>
            <div>
              <span className="block font-heading text-4xl leading-none tracking-wider text-celtic">✓</span>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-muted">Trackman & Foresight</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Part 2: Full-bleed photo — no text, no overlay, stands alone ── */}
      <motion.div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(300px, 52vh, 580px)" }}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/hero/celtic-cover.jpg"
          alt="Custom golf simulator installation"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>
    </>
  );
}
