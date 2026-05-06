"use client";

import { motion } from "framer-motion";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RoomPreview } from "@/components/ui/room-preview";
import type { QuizResult as QuizResultType, RoomDimensions } from "@/types";

interface QuizResultProps {
  result: QuizResultType;
  dimensions?: RoomDimensions;
}

export function QuizResult({ result, dimensions }: QuizResultProps) {
  const contactHref = `/contact?source=quiz&tier=${result.tier}&monitor=${encodeURIComponent(result.monitor)}`;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="kicker mb-4">Your Recommendation</p>
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

        <Card className="mb-10 p-8">
          <h3 className="mb-6 font-heading text-lg text-charcoal">
            What&apos;s Included
          </h3>
          <ul className="grid gap-3 md:grid-cols-2">
            {result.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-celtic" />
                <span className="text-sm text-charcoal-light">{feature}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 3D Room Preview */}
        {dimensions && (
          <div className="mb-10">
            <RoomPreview dimensions={dimensions} />
            <p className="mt-2 text-center text-xs text-text-muted">
              Drag to rotate. Approximate visualization based on your dimensions.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" href={contactHref}>
            Schedule a Consultation
          </Button>
          <Button variant="secondary" size="lg">
            <Download className="h-4 w-4" />
            Download Buyer&apos;s Guide
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
