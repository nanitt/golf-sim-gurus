"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Monitor } from "@/lib/monitors";

interface MonitorCardProps {
  monitor: Monitor;
}

export function MonitorCard({ monitor }: MonitorCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid md:grid-cols-2">
        {/* Product image */}
        <div className="relative flex min-h-[280px] items-center justify-center bg-stone p-10 md:min-h-[420px]">
          <Image
            src={monitor.productImage}
            alt={monitor.name}
            fill
            className="object-contain p-10"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Info */}
        <div className="p-8 md:p-10">
          {/* Logo */}
          <div className="mb-4">
            <Image
              src={monitor.logo}
              alt={monitor.name}
              width={160}
              height={32}
              className="h-7 w-auto object-contain object-left brightness-0"
            />
          </div>

          <h2 className="font-heading text-3xl text-charcoal">{monitor.name}</h2>
          <p className="mt-1 font-mono text-sm text-celtic">{monitor.price}</p>

          <p className="mt-6 text-sm leading-relaxed text-charcoal-light">
            {monitor.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
            {[
              { label: "Technology", value: monitor.technology },
              { label: "Accuracy", value: monitor.accuracy, accent: true },
              { label: "Data Points", value: monitor.dataPoints },
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
