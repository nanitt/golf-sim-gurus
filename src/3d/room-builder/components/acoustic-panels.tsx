"use client";

import { RoundedBox } from "@react-three/drei";
import { type MaterialConfigs } from "../materials/use-materials";

interface AcousticPanelsProps {
  opacity: number;
  w: number;
  d: number;
  materials: MaterialConfigs;
}

export function AcousticPanels({ opacity, w, d, materials }: AcousticPanelsProps) {
  const panelW = w * 0.19;
  const panelH = w * 0.31;
  const spacing = w / 5;

  const positions: [number, number, number][] = [
    [-spacing * 1.5, 0, -d / 2 + 0.07],
    [-spacing * 0.5, 0, -d / 2 + 0.07],
    [spacing * 0.5, 0, -d / 2 + 0.07],
    [spacing * 1.5, 0, -d / 2 + 0.07],
  ];

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Mounting spacer */}
          <mesh position={[0, 0, -0.03]}>
            <boxGeometry args={[panelW * 0.8, panelH * 0.8, 0.02]} />
            <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
          </mesh>
          {/* Panel body */}
          <RoundedBox args={[panelW, panelH, 0.08]} radius={0.02} smoothness={4}>
            <meshStandardMaterial {...materials.acousticFabric} transparent opacity={opacity * 0.6} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}
