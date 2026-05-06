"use client";

import { Button } from "@/components/ui/button";

interface Monitor {
  id: string;
  name: string;
  technology: string;
  accuracy: string;
  ballSpeed: string;
  spinRate: string;
  clubData: boolean;
  outdoorCapable: boolean;
  mounting: string;
  price: string;
}

interface ComparisonGridProps {
  monitorA: Monitor;
  monitorB: Monitor;
}

const specs: { key: keyof Monitor; label: string; type: "string" | "boolean" }[] = [
  { key: "technology", label: "Technology", type: "string" },
  { key: "accuracy", label: "Accuracy", type: "string" },
  { key: "ballSpeed", label: "Ball Speed", type: "string" },
  { key: "spinRate", label: "Spin Rate", type: "string" },
  { key: "clubData", label: "Club Data", type: "boolean" },
  { key: "outdoorCapable", label: "Outdoor Capable", type: "boolean" },
  { key: "mounting", label: "Mounting", type: "string" },
  { key: "price", label: "Starting Price", type: "string" },
];

export function ComparisonGrid({ monitorA, monitorB }: ComparisonGridProps) {
  return (
    <div className="overflow-hidden border border-border">
      <div className="grid grid-cols-3 bg-stone">
        <div className="p-4" />
        <div className="border-l border-border p-4 text-center">
          <h3 className="font-heading text-lg text-charcoal">{monitorA.name}</h3>
        </div>
        <div className="border-l border-border p-4 text-center">
          <h3 className="font-heading text-lg text-charcoal">{monitorB.name}</h3>
        </div>
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
          <Button size="sm" href="/contact">Quote</Button>
        </div>
        <div className="border-l border-border p-4 text-center">
          <Button size="sm" href="/contact">Quote</Button>
        </div>
      </div>
    </div>
  );
}
