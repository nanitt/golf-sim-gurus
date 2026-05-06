"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MonitorCard } from "@/components/compare/monitor-card";
import { ComparisonGrid } from "@/components/compare/comparison-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { monitors } from "@/lib/monitors";

export default function ComparePage() {
  const [selected, setSelected] = useState(monitors[0].id);
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
              Compare the four we trust and install.
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
                        ? "bg-celtic text-cream"
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
                        ? "bg-celtic text-cream"
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
