"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  SSAO,
  ToneMapping,
  DepthOfField,
  Vignette,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { type QualityTier } from "../hooks/use-quality-tier";

interface PostProcessingProps {
  isStatic: boolean;
  progress: number;
  qualityTier: QualityTier;
}

/** HIGH tier — full cinematic pipeline */
function HighEffects({ isStatic, progress }: { isStatic: boolean; progress: number }) {
  const focusDistance = useMemo(() => {
    if (progress < 0.27) return 0.02;
    if (progress < 0.42) return 0.005;
    if (progress < 0.72) return 0.015;
    return 0.02;
  }, [progress]);

  const chromaticOffset = useMemo(() => new THREE.Vector2(0.0005, 0.0005), []);

  if (isStatic) {
    // Static mode: no DoF (orbit controls change focus constantly)
    return (
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.4} luminanceThreshold={0.8} mipmapBlur />
        <SSAO samples={24} radius={0.08} intensity={6} bias={0.02} />
        <Vignette offset={0.1} darkness={0.6} />
        <ChromaticAberration offset={chromaticOffset} radialModulation modulationOffset={0.5} />
        <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.015} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.4} luminanceThreshold={0.8} mipmapBlur />
      <SSAO samples={24} radius={0.08} intensity={6} bias={0.02} />
      <DepthOfField focusDistance={focusDistance} focalLength={0.05} bokehScale={3} />
      <Vignette offset={0.1} darkness={0.6} />
      <ChromaticAberration offset={chromaticOffset} radialModulation modulationOffset={0.5} />
      <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.015} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}

/** MEDIUM tier — no DoF, no ChromaticAberration */
function MediumEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.4} luminanceThreshold={0.8} mipmapBlur />
      <SSAO samples={24} radius={0.08} intensity={6} bias={0.02} />
      <Vignette offset={0.1} darkness={0.6} />
      <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.015} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}

export function PostProcessing({ isStatic, progress, qualityTier }: PostProcessingProps) {
  if (qualityTier === "LOW") return null;
  if (qualityTier === "MEDIUM") return <MediumEffects />;
  return <HighEffects isStatic={isStatic} progress={progress} />;
}
