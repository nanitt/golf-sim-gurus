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
    <section id="process" className="bg-[#0a0a0a] py-4">
      {/* Section label */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">How We Build</p>
      </div>

      {/* Phases */}
      <div className="divide-y divide-white/6 border-t border-white/6">
        {phases.map((phase, i) => (
          <ScrollReveal key={phase.number} delay={i * 0.08}>
            <div className="group mx-auto grid max-w-7xl grid-cols-[auto_1fr] items-start gap-8 px-6 py-10 transition-colors hover:bg-white/2 md:grid-cols-[140px_1fr_200px] md:items-center md:gap-16">
              {/* Big number */}
              <span className="font-heading text-6xl font-bold text-celtic/20 transition-colors group-hover:text-celtic/40 md:text-8xl">
                {phase.number}
              </span>

              {/* Content */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                  {phase.title}{" "}
                  <span className="font-normal text-white/40">{phase.subtitle}</span>
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
                  {phase.description}
                </p>
              </div>

              {/* Duration */}
              <div className="hidden text-right md:block">
                <p className="font-mono text-xs uppercase tracking-widest text-white/30">Timeline</p>
                <p className="mt-1 font-mono text-sm text-celtic">{phase.duration}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
