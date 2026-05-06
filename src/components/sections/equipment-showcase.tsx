"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { monitors } from "@/lib/monitors";

export function EquipmentShowcase() {
  return (
    <section className="bg-stone py-4">
      {/* Label */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-muted">Launch Monitors</p>
        <Button variant="ghost" size="sm" href="/compare">
          Full Comparison →
        </Button>
      </div>

      {/* Monitor rows */}
      <div className="divide-y divide-border border-t border-border">
        {monitors.map((monitor, i) => (
          <ScrollReveal key={monitor.id} delay={i * 0.1}>
            <div className="group mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 transition-colors hover:bg-champagne md:grid-cols-[120px_1fr_auto]">

              {/* Product image */}
              <div className="relative hidden h-20 w-[120px] overflow-hidden md:block">
                <Image
                  src={monitor.productImage}
                  alt={monitor.name}
                  fill
                  className="object-contain object-center"
                  sizes="120px"
                />
              </div>

              {/* Info */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr]">
                {/* Logo + name + highlight */}
                <div>
                  <div className="mb-2">
                    <Image
                      src={monitor.logo}
                      alt={monitor.name}
                      width={140}
                      height={28}
                      className="h-6 w-auto object-contain object-left brightness-0"
                    />
                  </div>
                  <p className="font-mono text-xs font-medium text-charcoal">{monitor.name}</p>
                  <p className="mt-1 text-sm text-text-muted">{monitor.description.split(".")[0]}.</p>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                  {[
                    { label: "Technology", value: monitor.technology },
                    { label: "Accuracy",   value: monitor.accuracy },
                    { label: "Data Points", value: monitor.dataPoints },
                    { label: "Starting",   value: monitor.price, accent: true },
                  ].map(({ label, value, accent }) => (
                    <div key={label}>
                      <p className="text-xs uppercase tracking-widest text-text-muted">{label}</p>
                      <p className={`mt-0.5 font-mono text-sm ${accent ? "text-celtic" : "text-charcoal-light"}`}>
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
