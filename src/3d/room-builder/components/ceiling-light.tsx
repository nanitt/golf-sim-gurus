"use client";

import { COLORS } from "../constants";
import { type MaterialConfigs } from "../materials/use-materials";

interface CeilingLightProps {
  opacity: number;
  h: number;
  materials: MaterialConfigs;
}

export function CeilingLight({ opacity, h, materials }: CeilingLightProps) {
  const halfH = h / 2;

  return (
    <group position={[0, halfH, 0]}>
      {/* Canopy (flush to ceiling) */}
      <mesh position={[0, -0.01, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
        <meshPhysicalMaterial {...materials.brassAccent} transparent opacity={opacity} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.38, 8]} />
        <meshPhysicalMaterial {...materials.brassAccent} transparent opacity={opacity} />
      </mesh>

      {/* Shade (cone/dome) */}
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.02, 0.15, 0.12, 24]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Emitter (always visible warm glow) */}
      <mesh position={[0, -0.44, 0]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial
          color={COLORS.warmWhite}
          transparent
          opacity={opacity}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
