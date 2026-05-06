"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RoomPreview } from "@/components/ui/room-preview";
import { getMonitorByName } from "@/lib/monitors";
import type { QuizResult as QuizResultType, RoomDimensions } from "@/types";

interface QuizResultProps {
  result: QuizResultType;
  dimensions?: RoomDimensions;
}

export function QuizResult({ result, dimensions }: QuizResultProps) {
  const contactHref = `/contact?source=quiz&tier=${result.tier}&monitor=${encodeURIComponent(result.monitor)}`;
  const monitorData = getMonitorByName(result.monitor);

  return (
    <>
      {/* ── Zone A: Summary ── */}
      <motion.div
        className="mx-auto max-w-3xl px-6 pb-16 pt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="kicker mb-4">Your Recommendation</p>

        {/* Product image + logo */}
        {monitorData && (
          <div className="mb-8 flex items-center gap-8 border border-border bg-stone p-8">
            <div className="relative h-32 w-48 shrink-0">
              <Image
                src={monitorData.productImage}
                alt={monitorData.name}
                fill
                className="object-contain"
                sizes="192px"
              />
            </div>
            <div>
              <Image
                src={monitorData.logo}
                alt={monitorData.name}
                width={160}
                height={32}
                className="h-7 w-auto object-contain object-left brightness-0"
              />
              <p className="mt-1 font-mono text-sm text-charcoal">{monitorData.name}</p>
              <p className="mt-0.5 font-mono text-xs text-celtic">{monitorData.price}</p>
            </div>
          </div>
        )}

        <h1 className="mb-4 font-heading text-4xl text-charcoal md:text-5xl">
          {result.monitor}
        </h1>
        <p className="mb-2 font-mono text-sm uppercase tracking-widest text-celtic">
          {result.tier} Package
        </p>
        <p className="mb-8 font-mono text-2xl text-celtic">
          {result.estimatedBudget}
        </p>

        <p className="mb-10 text-lg leading-relaxed text-charcoal-light">
          {result.description}
        </p>

        <Card className="p-8">
          <h3 className="mb-6 font-heading text-lg text-charcoal">What&apos;s Included</h3>
          <ul className="grid gap-3 md:grid-cols-2">
            {result.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-celtic" />
                <span className="text-sm text-charcoal-light">{feature}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* ── Zone B: Full-width 3D room ── */}
      {dimensions && (
        <div className="w-full bg-celtic-dark">
          <div className="mx-auto max-w-7xl px-6 pb-6 pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass/60">Your Room</p>
            <p className="mt-1 font-heading text-3xl text-cream md:text-4xl">
              {dimensions.width}&prime; &times; {dimensions.depth}&prime; &times; {dimensions.height}&prime;
            </p>
          </div>
          <RoomPreview dimensions={dimensions} variant="full" monitor={result.monitor} />
          <p className="pb-8 pt-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-brass/40">
            Drag to explore
          </p>
        </div>
      )}

      {/* ── Zone C: CTAs ── */}
      <motion.div
        className="mx-auto max-w-3xl px-6 pb-16 pt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button size="lg" href={contactHref}>
          Schedule a Consultation
        </Button>
      </motion.div>
    </>
  );
}
