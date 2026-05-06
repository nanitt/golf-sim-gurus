"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Environment, ContactShadows, Lightformer, Sparkles } from "@react-three/drei";
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

// Color temperature keyframes — interpolated across 7 phases
const TEMP_COLORS = [
  new THREE.Color("#e8eef5"), // Phase 0: cool daylight (empty room)
  new THREE.Color("#e8eef5"), // Phase 1: still cool
  new THREE.Color("#f0eee8"), // Phase 2: neutral (equipment arriving)
  new THREE.Color("#f0eee8"), // Phase 3: neutral
  new THREE.Color("#f5ead8"), // Phase 4: warming
  new THREE.Color("#ffe8c4"), // Phase 5: golden warm (fully furnished)
  new THREE.Color("#fff5e6"), // Phase 6: warm neutral (beauty shot)
];

function getInterpolatedColor(progress: number): THREE.Color {
  const segment = progress * (TEMP_COLORS.length - 1);
  const index = Math.floor(segment);
  const t = segment - index;
  const nextIndex = Math.min(index + 1, TEMP_COLORS.length - 1);

  const result = new THREE.Color();
  result.copy(TEMP_COLORS[index]);
  result.lerp(TEMP_COLORS[nextIndex], t);
  return result;
}

export function LightingRig({ w, d, h, screenOpacity, progress, qualityTier }: LightingRigProps) {
  const halfH = h / 2;
  const shadowScale = Math.max(w, d) * 1.5;

  const ambientColor = useMemo(() => getInterpolatedColor(progress), [progress]);
  const showParticles = qualityTier !== "LOW";

  return (
    <>
      {/* Ambient fill — color temperature shifts with progress */}
      <ambientLight intensity={0.5} color={ambientColor} />

      {/* Main overhead (matches ceiling light fixture position) */}
      <pointLight
        position={[0, halfH - 0.5, 0]}
        intensity={1.2}
        color={COLORS.warmWhite}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Projector spotlight toward screen */}
      <spotLight
        position={[0, halfH - 0.3, -d * 0.2]}
        target-position={[0, 0, -d / 2]}
        angle={0.6}
        penumbra={0.8}
        intensity={screenOpacity * 2}
        color={COLORS.brass}
      />

      {/* Fill light from behind camera */}
      <pointLight
        position={[0, 1, d * 0.8]}
        intensity={0.3}
        color={COLORS.cream}
      />

      {/* Side accent light — warm brass */}
      <pointLight
        position={[w * 0.4, 0, d * 0.2]}
        intensity={0.2}
        color={COLORS.brass}
      />

      {/* Secondary fill — opposite side for even coverage */}
      <pointLight
        position={[-w * 0.4, 0.5, d * 0.1]}
        intensity={0.15}
        color={COLORS.warmWhite}
      />

      {/* Custom Environment with Lightformers */}
      <Environment resolution={256}>
        {/* Warm overhead panel */}
        <Lightformer
          form="rect"
          intensity={1.5}
          color={COLORS.warmWhite}
          position={[0, 5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[4, 4, 1]}
        />
        {/* Screen bounce light — intensity tracks screen reveal */}
        <Lightformer
          form="rect"
          intensity={0.5 + screenOpacity * 0.5}
          color="#e0f0ff"
          position={[0, 0, -5]}
          scale={[3, 2, 1]}
        />
        {/* Warm fill from behind */}
        <Lightformer
          form="ring"
          intensity={0.8}
          color="#ffe8c4"
          position={[0, 1, 5]}
          scale={2}
        />
        {/* Side fill — prevents dark left wall */}
        <Lightformer
          form="rect"
          intensity={0.6}
          color={COLORS.cream}
          position={[5, 1, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3, 3, 1]}
        />
      </Environment>

      <ContactShadows
        position={[0, -h / 2, 0]}
        opacity={0.4}
        scale={shadowScale}
        blur={2}
      />

      {/* Ambient floating particles — barely visible depth cue */}
      {showParticles && (
        <Sparkles
          count={30}
          scale={[w, h, d]}
          speed={0.05}
          opacity={0.15}
          size={0.3}
          color={COLORS.cream}
        />
      )}
    </>
  );
}
