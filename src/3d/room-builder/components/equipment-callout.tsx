"use client";

import { useState } from "react";
import { Html } from "@react-three/drei";

interface EquipmentCalloutProps {
  label: string;
  description: string;
  position?: [number, number, number];
  children: React.ReactNode;
}

export function EquipmentCallout({ label, description, position, children }: EquipmentCalloutProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {children}
      {hovered && (
        <Html
          position={position}
          distanceFactor={4}
          style={{ pointerEvents: "none" }}
        >
          <div className="rounded-sm border border-brass/30 bg-celtic-dark/90 px-3 py-2 shadow-lg backdrop-blur-sm">
            <p className="font-mono text-[10px] font-semibold tracking-wider text-brass">
              {label}
            </p>
            <p className="mt-0.5 max-w-[160px] font-mono text-[9px] leading-tight text-white/70">
              {description}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}
