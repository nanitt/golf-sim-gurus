"use client";

import { CountUp } from "@/components/ui/count-up";

export function StatsBar() {
  return (
    <section className="border-b border-border bg-stone">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-wrap items-baseline gap-x-14 gap-y-6 py-10">

          <div className="flex items-baseline gap-3">
            <CountUp
              end={200}
              suffix="+"
              className="font-heading text-5xl italic text-charcoal"
            />
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Builds Completed
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-heading text-5xl italic text-charcoal">
              $8K – $100K+
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Build Range
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="h-px w-6 bg-brass" />
            <span className="font-mono text-xs uppercase tracking-widest text-celtic">
              Trackman &amp; Foresight Certified
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
