"use client";

import { Suspense } from "react";
import { RoomBuilder } from "@/3d/room-builder";
import type { RoomDimensions } from "@/types";

interface RoomPreviewProps {
  dimensions: RoomDimensions;
}

export function RoomPreview({ dimensions }: RoomPreviewProps) {
  return (
    <Suspense
      fallback={
        <div className="flex aspect-[4/3] w-full items-center justify-center bg-stone">
          <p className="kicker">Loading 3D preview...</p>
        </div>
      }
    >
      <RoomBuilder
        width={dimensions.width}
        depth={dimensions.depth}
        height={dimensions.height}
        mode="static"
      />
    </Suspense>
  );
}
