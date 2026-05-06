"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Monitor } from "@/lib/monitors";

interface ComparisonGridProps {
  monitorA: Monitor;
  monitorB: Monitor;
}

const specs: { key: keyof Monitor; label: string; type: "string" | "boolean" }[] = [
  { key: "technology", label: "Technology", type: "string" },
  { key: "accuracy", label: "Accuracy", type: "string" },
  { key: "dataPoints", label: "Data Points", type: "string" },
  { key: "spinRate", label: "Spin Rate", type: "string" },
  { key: "clubData", label: "Club Data", type: "boolean" },
  { key: "outdoorCapable", label: "Outdoor Capable", type: "boolean" },
  { key: "mounting", label: "Mounting", type: "string" },
  { key: "price", label: "Starting Price", type: "string" },
];

export function ComparisonGrid({ monitorA, monitorB }: ComparisonGridProps) {
  return (
    <div className="overflow-hidden border border-border">
      {/* Header row with product images + logos */}
      <div className="grid grid-cols-3 bg-stone">
        <div className="p-4" />
        {[monitorA, monitorB].map((m) => (
          <div key={m.id} className="border-l border-border p-6 text-center">
            <div className="relative mx-auto mb-4 h-24 w-full">
              <Image
                src={m.productImage}
                alt={m.name}
                fill
                className="object-contain"
                sizes="200px"
              />
            </div>
            <Image
              src={m.logo}
              alt={m.name}
              width={120}
              height={24}
              className="mx-auto h-5 w-auto object-contain brightness-0"
            />
            <p className="mt-1 font-mono text-xs text-charcoal">{m.name}</p>
          </div>
        ))}
      </div>

      {specs.map((spec, i) => {
        const valA = monitorA[spec.key];
        const valB = monitorB[spec.key];
        const displayA = spec.type === "boolean" ? (valA ? "Yes" : "No") : String(valA);
        const displayB = spec.type === "boolean" ? (valB ? "Yes" : "No") : String(valB);

        return (
          <div
            key={spec.key}
            className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-stone"}`}
          >
            <div className="p-4 text-xs font-medium uppercase text-text-muted">{spec.label}</div>
            <div className="border-l border-border p-4 text-center font-mono text-sm text-charcoal-light">
              {displayA}
            </div>
            <div className="border-l border-border p-4 text-center font-mono text-sm text-charcoal-light">
              {displayB}
            </div>
          </div>
        );
      })}

      <div className="grid grid-cols-3 border-t border-border bg-stone">
        <div className="p-4" />
        <div className="border-l border-border p-4 text-center">
          <Button size="sm" href="/contact">Get a Quote</Button>
        </div>
        <div className="border-l border-border p-4 text-center">
          <Button size="sm" href="/contact">Get a Quote</Button>
        </div>
      </div>
    </div>
  );
}
