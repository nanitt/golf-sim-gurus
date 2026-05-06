"use client";

import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface MonitorData {
  name: string;
  technology: string;
  accuracy: string;
  ballSpeed: string;
  price: string;
  highlight: string;
  image: string;
}

const defaultMonitors: MonitorData[] = [
  {
    name: "Trackman iO",
    technology: "Dual Radar",
    accuracy: "±0.2°",
    ballSpeed: "Up to 400 mph",
    price: "From $25,000",
    highlight: "Tour-level accuracy. Trusted by PGA professionals worldwide.",
    image: "/images/gallery/build-29.jpg",
  },
  {
    name: "Foresight GCQuad",
    technology: "Quadrascopic Camera",
    accuracy: "±0.5°",
    ballSpeed: "Up to 350 mph",
    price: "From $16,000",
    highlight: "The gold standard in photometric launch monitors.",
    image: "/images/gallery/commercial-sim.jpg",
  },
  {
    name: "Uneekor EYE XO2",
    technology: "Overhead Mounted",
    accuracy: "±1.0°",
    ballSpeed: "Up to 300 mph",
    price: "From $8,000",
    highlight: "Ceiling-mounted precision with zero floor footprint.",
    image: "/images/gallery/celtic-course-5.jpg",
  },
];

interface EquipmentShowcaseProps {
  items?: MonitorData[];
}

export function EquipmentShowcase({ items }: EquipmentShowcaseProps) {
  const monitors = items && items.length > 0 ? items : defaultMonitors;

  return (
    <section className="bg-[#111111] py-4">
      {/* Label */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">Launch Monitors</p>
        <Button variant="ghost" size="sm" href="/compare">
          Full Comparison →
        </Button>
      </div>

      {/* Monitor rows */}
      <div className="divide-y divide-white/6 border-t border-white/6">
        {monitors.map((monitor, i) => (
          <ScrollReveal key={monitor.name} delay={i * 0.1}>
            <div className="group mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 transition-colors hover:bg-white/2 md:grid-cols-[1fr_auto]">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr]">
                {/* Monitor name + highlight */}
                <div className="min-w-[200px]">
                  <h3 className="font-heading text-xl font-bold text-white">{monitor.name}</h3>
                  <p className="mt-1 text-sm text-white/40">{monitor.highlight}</p>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                  {[
                    { label: "Technology", value: monitor.technology },
                    { label: "Accuracy",   value: monitor.accuracy },
                    { label: "Ball Speed", value: monitor.ballSpeed },
                    { label: "Starting",   value: monitor.price, accent: true },
                  ].map(({ label, value, accent }) => (
                    <div key={label}>
                      <p className="text-xs uppercase tracking-widest text-white/25">{label}</p>
                      <p className={`mt-0.5 font-mono text-sm ${accent ? "text-celtic" : "text-white/60"}`}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center">
                <Button variant="secondary" size="sm" href="/contact">
                  Get a Quote
                </Button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
