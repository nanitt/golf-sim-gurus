"use client";

import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function QuizCta() {
  return (
    <section className="relative overflow-hidden bg-celtic">
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-36">
        <ScrollReveal>
          {/* Brass rule + kicker */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-10 bg-brass" />
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass">
              4 Questions · 60 Seconds
            </p>
          </div>

          <h2 className="mb-8 max-w-2xl font-heading text-6xl leading-[0.92] text-cream md:text-8xl">
            Not Sure<br />Where to Start?
          </h2>

          <p className="mb-12 max-w-sm text-lg leading-relaxed text-cream/65">
            Answer 4 quick questions and we&apos;ll recommend the perfect simulator
            setup for your space and budget.
          </p>

          <Button
            size="lg"
            href="/quiz"
            className="bg-cream text-celtic hover:bg-stone active:bg-champagne"
          >
            Take the Quiz →
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
