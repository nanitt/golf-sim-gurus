"use client";

import { Ruler, DollarSign, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const benefits = [
  { icon: Ruler, text: "Room size analysis" },
  { icon: DollarSign, text: "Budget estimate" },
  { icon: Monitor, text: "Equipment recommendation" },
];

export function QuizCta() {
  return (
    <section className="relative overflow-hidden bg-celtic py-24">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#0a0a0a]/60">
            4 Questions · 60 Seconds
          </p>
          <h2 className="font-heading text-4xl font-bold text-[#0a0a0a] md:text-6xl">
            Not Sure Where to Start?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-[#0a0a0a]/70">
            Answer 4 quick questions and we&apos;ll recommend the perfect simulator
            setup for your space and budget.
          </p>

          <div className="mx-auto mt-10 flex flex-wrap justify-center gap-6">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 rounded-none bg-[#0a0a0a]/10 px-5 py-3">
                <Icon className="h-4 w-4 text-[#0a0a0a]" />
                <span className="text-sm font-medium text-[#0a0a0a]">{text}</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            href="/quiz"
            className="mt-10 bg-[#0a0a0a] text-white hover:bg-[#1a1a1a] active:bg-[#333]"
          >
            Take the Quiz →
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
