"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox, Sparkles } from "@react-three/drei";
import { COLORS } from "../constants";
import { type MaterialConfigs } from "../materials/use-materials";
import { type QualityTier } from "../hooks/use-quality-tier";

interface ProjectorProps {
  opacity: number;
  d: number;
  h: number;
  materials: MaterialConfigs;
  qualityTier: QualityTier;
}

export function Projector({ opacity, d, h, materials, qualityTier }: ProjectorProps) {
  const halfH = h / 2;
  const z = -d * 0.2;
  const spotRef = useRef<THREE.SpotLight>(null);

  // Projector flicker — dual sine waves at irrational frequencies
  useFrame(({ clock }) => {
    if (!spotRef.current) return;
    const t = clock.elapsedTime;
    const flicker = 1 + 0.02 * Math.sin(t * 3.7) + 0.02 * Math.sin(t * 7.3);
    spotRef.current.intensity = opacity * 0.5 * flicker;
  });

  const showDustMotes = qualityTier !== "LOW" && opacity > 0.3;
  const beamLength = d * 0.35;

  return (
    <group position={[0, halfH - 0.15, z]}>
      {/* Projector spotlight (for flicker effect) */}
      <spotLight
        ref={spotRef}
        position={[0, -0.1, -0.18]}
        target-position={[0, -halfH, -d * 0.3]}
        angle={0.5}
        penumbra={0.9}
        intensity={0}
        color={COLORS.warmWhite}
      />

      {/* Ceiling plate */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.015, 16]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>

      {/* Mount arm */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Projector body */}
      <RoundedBox args={[0.35, 0.15, 0.3]} radius={0.03} smoothness={4} position={[0, -0.1, 0]}>
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </RoundedBox>

      {/* Lens */}
      <mesh position={[0, -0.1, -0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.08, 16]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Vent grilles */}
      {[-0.04, 0, 0.04].map((yOff, i) => (
        <mesh key={i} position={[0, -0.04 + yOff, 0.16]}>
          <boxGeometry args={[0.2, 0.005, 0.005]} />
          <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Projection beam cone (very subtle) */}
      <mesh position={[0, -0.1, -d * 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.6, beamLength, 16, 1, true]} />
        <meshBasicMaterial
          color={COLORS.brass}
          transparent
          opacity={opacity * 0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Dust motes in projector beam */}
      {showDustMotes && (
        <group position={[0, -0.1, -d * 0.1]}>
          <Sparkles
            count={50}
            speed={0.15}
            opacity={0.3}
            scale={[0.8, 0.6, beamLength * 0.8]}
            size={0.4}
            color={COLORS.warmWhite}
          />
        </group>
      )}
    </group>
  );
}
