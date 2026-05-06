"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MonitorCard } from "@/components/compare/monitor-card";
import { ComparisonGrid } from "@/components/compare/comparison-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const monitors = [
  {
    id: "trackman",
    name: "Trackman iO",
    technology: "Dual Radar",
    accuracy: "\u00b10.2\u00b0",
    ballSpeed: "400 mph",
    spinRate: "Yes — full spin axis",
    clubData: true,
    outdoorCapable: true,
    mounting: "Floor/Tripod",
    price: "From $25,000",
    image: null,
    description:
      "The undisputed standard in professional golf. Used on every major tour worldwide, the Trackman iO combines dual radar technology with optical imaging for the most comprehensive and accurate ball and club data available.",
    recommendation:
      "Best for: Serious golfers who demand the same technology used by tour professionals. Ideal for large, dedicated rooms where its radar range can perform at full capability.",
  },
  {
    id: "foresight",
    name: "Foresight GCQuad",
    technology: "Quadrascopic Camera",
    accuracy: "\u00b10.5\u00b0",
    ballSpeed: "350 mph",
    spinRate: "Yes — full spin axis",
    clubData: true,
    outdoorCapable: true,
    mounting: "Floor/Tripod",
    price: "From $16,000",
    image: null,
    description:
      "Four high-speed cameras capture every detail of impact with photographic precision. The GCQuad's compact form factor and camera-based technology make it versatile for both indoor and outdoor use.",
    recommendation:
      "Best for: Golfers who want near-Trackman accuracy in a more versatile, portable package. Excellent for rooms of all sizes.",
  },
  {
    id: "uneekor",
    name: "Uneekor EYE XO2",
    technology: "Overhead Mounted",
    accuracy: "\u00b11.0\u00b0",
    ballSpeed: "300 mph",
    spinRate: "Yes — full spin axis",
    clubData: true,
    outdoorCapable: false,
    mounting: "Ceiling",
    price: "From $8,000",
    image: null,
    description:
      "Mounted overhead, the EYE XO2 uses high-speed cameras to track both ball and club data without taking up any floor space. Its fixed position means zero setup time — just step up and swing.",
    recommendation:
      "Best for: Dedicated simulator rooms where ceiling mounting is possible. Great value for money with reliable accuracy.",
  },
];

export default function ComparePage() {
  const [selected, setSelected] = useState("trackman");
  const [compareMode, setCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  }

  const selectedMonitor = monitors.find((m) => m.id === selected)!;
  const compareMonitors = monitors.filter((m) => compareIds.includes(m.id));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <ScrollReveal>
            <p className="kicker mb-4">Compare</p>
            <h1 className="mb-4 font-heading text-4xl text-charcoal md:text-5xl">
              Launch Monitors
            </h1>
            <p className="mb-12 max-w-2xl text-lg text-text-muted">
              Every Golf Sim Gurus build starts with the right launch monitor.
              Compare the three we trust and install.
            </p>
          </ScrollReveal>

          {/* Toggle */}
          <div className="mb-10 flex gap-4">
            <button
              onClick={() => setCompareMode(false)}
              className={`text-sm font-semibold transition-colors ${
                !compareMode ? "text-celtic" : "text-text-muted hover:text-charcoal"
              }`}
            >
              Card View
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => setCompareMode(true)}
              className={`text-sm font-semibold transition-colors ${
                compareMode ? "text-celtic" : "text-text-muted hover:text-charcoal"
              }`}
            >
              Side by Side
            </button>
          </div>

          {!compareMode ? (
            <>
              <div className="mb-8 flex flex-wrap gap-3">
                {monitors.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m.id)}
                    className={`px-5 py-2.5 text-sm font-semibold transition-all ${
                      selected === m.id
                        ? "bg-celtic text-white"
                        : "border border-border text-charcoal-light hover:border-celtic/30"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
              <MonitorCard monitor={selectedMonitor} />
            </>
          ) : (
            <>
              <div className="mb-8 flex flex-wrap gap-3">
                {monitors.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => toggleCompare(m.id)}
                    className={`px-5 py-2.5 text-sm font-semibold transition-all ${
                      compareIds.includes(m.id)
                        ? "bg-celtic text-white"
                        : "border border-border text-charcoal-light hover:border-celtic/30"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
              <p className="mb-8 text-sm text-text-muted">
                Select 2 monitors to compare ({compareIds.length}/2)
              </p>
              {compareMonitors.length === 2 && (
                <ComparisonGrid monitorA={compareMonitors[0]} monitorB={compareMonitors[1]} />
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
