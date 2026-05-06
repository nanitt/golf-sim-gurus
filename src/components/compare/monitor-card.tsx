"use client";

import { Card } from "@/components/ui/card";
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
  image: null;
  description: string;
  recommendation: string;
}

interface MonitorCardProps {
  monitor: Monitor;
}

export function MonitorCard({ monitor }: MonitorCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid md:grid-cols-2">
        <div className="aspect-square bg-gradient-to-br from-celtic-dark/10 to-stone-dark md:aspect-auto" />
        <div className="p-8 md:p-10">
          <h2 className="font-heading text-3xl text-charcoal">{monitor.name}</h2>
          <p className="mt-1 font-mono text-sm text-celtic">{monitor.price}</p>

          <p className="mt-6 text-sm leading-relaxed text-charcoal-light">
            {monitor.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
            {[
              { label: "Technology", value: monitor.technology },
              { label: "Accuracy", value: monitor.accuracy, accent: true },
              { label: "Ball Speed", value: monitor.ballSpeed },
              { label: "Spin Rate", value: monitor.spinRate },
              { label: "Club Data", value: monitor.clubData ? "Yes" : "No" },
              { label: "Outdoor", value: monitor.outdoorCapable ? "Yes" : "No" },
            ].map((spec) => (
              <div key={spec.label}>
                <p className="text-xs font-medium uppercase text-text-muted">{spec.label}</p>
                <p className={`font-mono text-sm ${spec.accent ? "text-celtic" : "text-charcoal-light"}`}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm italic text-text-muted">{monitor.recommendation}</p>
          </div>

          <Button className="mt-8" href="/contact">
            Get a Quote with {monitor.name}
          </Button>
        </div>
      </div>
    </Card>
  );
}
