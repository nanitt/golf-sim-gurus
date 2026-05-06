"use client";

import { RoundedBox } from "@react-three/drei";
import { COLORS } from "../constants";
import { type MaterialConfigs } from "../materials/use-materials";

interface HittingMatProps {
  opacity: number;
  w: number;
  d: number;
  h: number;
  materials: MaterialConfigs;
}

export function HittingMat({ opacity, w, d, h, materials }: HittingMatProps) {
  const halfH = h / 2;
  const matW = w * 0.5;
  const matD = d * 0.35;
  const y = -halfH + 0.015;

  return (
    <group position={[0, y, d * 0.08]}>
      {/* Rubber base */}
      <RoundedBox
        args={[matW + 0.1, 0.03, matD + 0.1]}
        radius={0.01}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial {...materials.rubber} transparent opacity={opacity} />
      </RoundedBox>

      {/* Turf surface */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[matW, 0.02, matD]} />
        <meshStandardMaterial {...materials.turf} transparent opacity={opacity} />
      </mesh>

      {/* Center alignment line */}
      <mesh position={[0, 0.036, 0]}>
        <boxGeometry args={[matW, 0.001, 0.005]} />
        <meshBasicMaterial color={COLORS.white} transparent opacity={opacity * 0.5} />
      </mesh>

      {/* Stance lines */}
      <mesh position={[-0.15, 0.036, 0]}>
        <boxGeometry args={[0.005, 0.001, 0.3]} />
        <meshBasicMaterial color={COLORS.white} transparent opacity={opacity * 0.5} />
      </mesh>
      <mesh position={[0.15, 0.036, 0]}>
        <boxGeometry args={[0.005, 0.001, 0.3]} />
        <meshBasicMaterial color={COLORS.white} transparent opacity={opacity * 0.5} />
      </mesh>

      {/* Golf tee — tapered cylinder */}
      <group position={[0, 0.035, matD * 0.25]}>
        {/* Tee base (wider) */}
        <mesh position={[0, 0.005, 0]}>
          <cylinderGeometry args={[0.008, 0.012, 0.01, 12]} />
          <meshStandardMaterial color="#d4b896" roughness={0.7} transparent opacity={opacity} />
        </mesh>
        {/* Tee shaft (tapered) */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.003, 0.006, 0.04, 12]} />
          <meshStandardMaterial color="#d4b896" roughness={0.7} transparent opacity={opacity} />
        </mesh>
        {/* Tee cup (top) */}
        <mesh position={[0, 0.052, 0]}>
          <cylinderGeometry args={[0.007, 0.003, 0.005, 12]} />
          <meshStandardMaterial color="#d4b896" roughness={0.7} transparent opacity={opacity} />
        </mesh>

        {/* Golf ball — r=0.021 scene units ≈ 1.68" real */}
        <mesh position={[0, 0.076, 0]} castShadow>
          <sphereGeometry args={[0.021, 24, 24]} />
          <meshPhysicalMaterial
            color="#f5f5f0"
            roughness={0.3}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            transparent
            opacity={opacity}
          />
        </mesh>
      </group>
    </group>
  );
}
