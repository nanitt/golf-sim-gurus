"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { ProcessPhase } from "@/types";

const phases: ProcessPhase[] = [
  {
    number: "01",
    title: "Consultation",
    subtitle: "& Site Survey",
    description: "We visit your space, take precise measurements, assess structural requirements, and discuss your vision for the perfect simulator room.",
    duration: "1–2 weeks",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "& Engineering",
    description: "Our team creates detailed 3D renderings, acoustic plans, and engineering specs tailored to your room and equipment preferences.",
    duration: "2–3 weeks",
  },
  {
    number: "03",
    title: "Build",
    subtitle: "& Installation",
    description: "Expert craftsmen handle construction, acoustic treatment, screen installation, technology integration, and final calibration.",
    duration: "3–5 weeks",
  },
  {
    number: "04",
    title: "Enjoy",
    subtitle: "& Ongoing Support",
    description: "Full walkthrough, software setup, and ongoing support. Your personal golf sanctuary is ready for play.",
    duration: "Lifetime",
  },
];

export function ProcessTimeline() {
  return (
    <section id="process" className="bg-cream">
      {/* Section label */}
      <div className="mx-auto max-w-7xl px-6 pb-2 pt-16 md:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-muted">How We Build</p>
      </div>

      {/* Phases */}
      <div className="divide-y divide-border border-t border-border">
        {phases.map((phase, i) => (
          <ScrollReveal key={phase.number} delay={i * 0.06}>
            <div className="group relative overflow-hidden">
              {/* Giant background number — purely decorative */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-heading text-[22vw] font-bold italic leading-none text-celtic/[0.04] transition-colors duration-500 group-hover:text-celtic/[0.07] md:right-12"
              >
                {phase.number}
              </span>

              <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-16">
                {/* Number + rule + duration */}
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-mono text-xs text-celtic">{phase.number}</span>
                  <div className="h-px w-8 bg-brass" />
                  <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    {phase.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="max-w-lg font-heading text-5xl text-charcoal md:text-6xl">
                  {phase.title}{" "}
                  <span className="text-text-muted">{phase.subtitle}</span>
                </h3>

                {/* Description */}
                <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-light">
                  {phase.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
