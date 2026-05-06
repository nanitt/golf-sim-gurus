"use client";

import { CountUp } from "@/components/ui/count-up";

export function StatsBar() {
  return (
    <section className="border-y border-white/6 bg-[#0f0f0f]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-px divide-x divide-white/6 px-0">
        {[
          { pre: "", value: 200, suf: "+", label: "Builds Completed" },
          { pre: "$", value: 8, suf: "K – $100K+", label: "Build Range" },
          { pre: "", value: null, suf: "", label: "Trackman & Foresight Certified" },
        ].map((s, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1 py-8 px-8 text-center">
            {s.value !== null ? (
              <CountUp
                end={s.value}
                prefix={s.pre}
                suffix={s.suf}
                className="font-heading text-3xl font-bold text-celtic"
              />
            ) : (
              <span className="font-heading text-xl font-bold text-celtic">✓ Certified</span>
            )}
            <span className="text-xs uppercase tracking-widest text-white/30">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
