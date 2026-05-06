"use client";

import { useState } from "react";

export type QualityTier = "HIGH" | "MEDIUM" | "LOW";

/**
 * Detects device capability and returns a quality tier.
 *
 * HIGH   (desktop, no touch):  All effects
 * MEDIUM (tablet, high DPR):   No DoF, no ChromaticAberration, reflector res=256
 * LOW    (mobile, touch):      No postprocessing, no reflector, no Sparkles
 */
export function useQualityTier(): QualityTier {
  const [tier] = useState<QualityTier>(() => {
    if (typeof window === "undefined") return "LOW";

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const cores = navigator.hardwareConcurrency ?? 2;
    const dpr = window.devicePixelRatio ?? 1;

    if (isTouchDevice) {
      // High-end tablet: MEDIUM, otherwise LOW
      if (dpr > 1 && cores > 4) return "MEDIUM";
      return "LOW";
    }

    // Desktop — check for underpowered machines
    if (cores <= 4 && dpr <= 1) return "MEDIUM";

    return "HIGH";
  });

  return tier;
}
