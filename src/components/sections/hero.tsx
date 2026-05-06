"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/celtic-cover.jpg"
          alt="Golf simulator room"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
        <motion.p
          className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.3em] text-celtic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Custom Golf Simulators — Eastern Ontario
        </motion.p>

        <h1 className="mb-6 max-w-3xl font-heading text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
          {["Your Room.", "Your Game.", "Built Right."].map((line, i) => (
            <motion.span
              key={line}
              className="block"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4 + i * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              {i === 2 ? (
                <span className="text-celtic">{line}</span>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mb-10 max-w-lg text-lg text-white/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          We design, engineer, and install custom golf simulator rooms for homes
          and businesses across Kemptville, Ottawa, and Eastern Ontario.
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button size="lg" href="/contact">
            Get a Free Quote
          </Button>
          <Button size="lg" variant="secondary" href="/quiz">
            Find Your Simulator
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 flex flex-wrap items-center gap-8 border-t border-white/8 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {["200+ Installations", "Trackman Certified", "Foresight Certified", "Full-Service Build"].map((item) => (
            <span key={item} className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/40">
              <span className="h-1 w-1 rounded-full bg-celtic" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
