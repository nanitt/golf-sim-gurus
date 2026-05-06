"use client";

import { Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { COLORS } from "../constants";
import { type QualityTier } from "../hooks/use-quality-tier";

interface LightingRigProps {
  w: number;
  d: number;
  h: number;
  screenOpacity: number;
  progress: number;
  qualityTier: QualityTier;
}

export function LightingRig({ w, d, h, screenOpacity, qualityTier }: LightingRigProps) {
  const halfH = h / 2;
  const shadowScale = Math.max(w, d) * 1.5;
  const showParticles = qualityTier !== "LOW";

  return (
    <>
      {/* Real HDRI — provides ambient GI and reflections */}
      <Environment
        files="/textures/hdri/room.hdr"
        background={false}
        environmentIntensity={0.6}
      />

      {/* Key light — ceiling fixture position */}
      <pointLight
        position={[0, halfH - 0.5, 0]}
        intensity={1.8}
        color={COLORS.warmWhite}
        decay={2}
      />

      {/* Projector beam — brightens as screen appears */}
      <spotLight
        position={[0, halfH - 0.3, -d * 0.2]}
        target-position={[0, 0, -d / 2]}
        angle={0.6}
        penumbra={0.8}
        intensity={screenOpacity * 2.5}
        color="#d0e8ff"
      />

      <ContactShadows
        position={[0, -h / 2 + 0.005, 0]}
        opacity={0.45}
        scale={shadowScale}
        blur={2}
        resolution={512}
      />

      {showParticles && (
        <Sparkles
          count={30}
          scale={[w, h, d]}
          speed={0.05}
          opacity={0.12}
          size={0.3}
          color={COLORS.cream}
        />
      )}
    </>
  );
}
