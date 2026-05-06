"use client";

import { Suspense } from "react";
import { RoomBuilder } from "@/3d/room-builder";
import type { RoomDimensions } from "@/types";

interface RoomPreviewProps {
  dimensions: RoomDimensions;
  variant?: "inline" | "full";
  monitor?: string;
}

export function RoomPreview({ dimensions, variant = "inline", monitor }: RoomPreviewProps) {
  return (
    <Suspense
      fallback={
        <div
          className="flex w-full items-center justify-center bg-celtic-dark"
          style={{
            aspectRatio: variant === "full" ? "16/9" : "4/3",
            minHeight: variant === "full" ? "280px" : undefined,
          }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-brass/50">Loading room...</p>
        </div>
      }
    >
      <RoomBuilder
        width={dimensions.width}
        depth={dimensions.depth}
        height={dimensions.height}
        mode="static"
        variant={variant}
        monitor={monitor}
      />
    </Suspense>
  );
}
