"use client";

import { COLORS } from "../constants";
import { type MaterialConfigs } from "../materials/use-materials";

interface WallTVProps {
  opacity: number;
  w: number;
  d: number;
  materials: MaterialConfigs;
}

export function WallTV({ opacity, w, d, materials }: WallTVProps) {
  return (
    <group position={[w / 2 - 0.03, 0.3, -d * 0.15]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Wall mount */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>

      {/* Frame bezel */}
      <mesh position={[0, 0, 0.005]}>
        <boxGeometry args={[0.84, 0.49, 0.02]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>

      {/* Screen (slightly recessed, with emissive glow) */}
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[0.8, 0.45]} />
        <meshStandardMaterial
          color="#0a1f15"
          emissive={COLORS.celtic}
          emissiveIntensity={opacity * 0.3}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}
