"use client";

import { CameraController, StaticCamera } from "./camera";
import { useMaterials } from "./materials/use-materials";
import { useQualityTier } from "./hooks/use-quality-tier";
import { RoomShell } from "./components/room-shell";
import { AcousticPanels } from "./components/acoustic-panels";
import { ImpactScreen } from "./components/impact-screen";
import { LaunchMonitor } from "./components/launch-monitor";
import { Projector } from "./components/projector";
import { HittingMat } from "./components/hitting-mat";
import { Furniture } from "./components/furniture";
import { WallTV } from "./components/wall-tv";
import { CeilingLight } from "./components/ceiling-light";
import { LightingRig } from "./components/lighting-rig";
import { PostProcessing } from "./components/post-processing";
import { EquipmentCallout } from "./components/equipment-callout";

interface SceneContentProps {
  progress: number;
  w: number;
  d: number;
  h: number;
  isStatic: boolean;
  monitorName?: string;
}

export function SceneContent({ progress, w, d, h, isStatic, monitorName }: SceneContentProps) {
  const materials = useMaterials(w, d, h);
  const qualityTier = useQualityTier();

  // 7-phase opacity bands matching the new camera path
  const shellOpacity = isStatic
    ? 1
    : Math.min(progress / 0.12, 1);

  const panelOpacity = isStatic
    ? 1
    : Math.max(0, Math.min((progress - 0.12) / 0.15, 1));

  const screenOpacity = isStatic
    ? 1
    : Math.max(0, Math.min((progress - 0.27) / 0.15, 1));

  const monitorOpacity = isStatic
    ? 1
    : Math.max(0, Math.min((progress - 0.42) / 0.15, 1));

  const detailOpacity = isStatic
    ? 1
    : Math.max(0, Math.min((progress - 0.57) / 0.15, 1));

  const furnitureOpacity = isStatic
    ? 1
    : Math.max(0, Math.min((progress - 0.72) / 0.15, 1));

  // Equipment callout wrapper — only wraps children in static mode
  const Callout = isStatic ? EquipmentCallout : PassthroughGroup;

  return (
    <>
      {isStatic ? (
        <StaticCamera />
      ) : (
        <CameraController progress={progress} w={w} d={d} h={h} />
      )}

      <LightingRig
        w={w}
        d={d}
        h={h}
        screenOpacity={screenOpacity}
        progress={progress}
        qualityTier={qualityTier}
      />

      <RoomShell
        opacity={shellOpacity}
        w={w}
        d={d}
        h={h}
        materials={materials}
      />

      <Callout label="ACOUSTIC PANELS" description="Sound-dampening fabric panels for zero room echo." position={[0, 0.5, 0]}>
        <AcousticPanels opacity={panelOpacity} w={w} d={d} materials={materials} />
      </Callout>

      <Callout label="IMPACT SCREEN" description="Commercial-grade woven screen with 4K projection." position={[0, 0.5, 0]}>
        <ImpactScreen opacity={screenOpacity} w={w} d={d} materials={materials} />
      </Callout>

      <Callout label="SHORT-THROW PROJECTOR" description="Ceiling-mounted 4K laser projector with ultra-short throw." position={[0, 0.3, 0]}>
        <Projector opacity={screenOpacity} d={d} h={h} materials={materials} qualityTier={qualityTier} />
      </Callout>

      <Callout label="LAUNCH MONITORS" description="Trackman iO, Trackman 4, GCQuad, & Uneekor EYE XO2." position={[0, 0.3, 0]}>
        <LaunchMonitor opacity={monitorOpacity} w={w} d={d} h={h} materials={materials} monitorName={monitorName} />
      </Callout>

      <Callout label="HITTING MAT" description="Premium turf with alignment guides and rubber tee." position={[0, 0.2, 0]}>
        <HittingMat opacity={detailOpacity} w={w} d={d} h={h} materials={materials} />
      </Callout>

      <Callout label="LOUNGE AREA" description="Leather seating, side table, and golf bag storage." position={[0, 0.3, 0]}>
        <Furniture opacity={furnitureOpacity} w={w} d={d} h={h} materials={materials} />
      </Callout>

      <WallTV opacity={furnitureOpacity} w={w} d={d} materials={materials} />
      <CeilingLight opacity={shellOpacity} h={h} materials={materials} />

      <PostProcessing isStatic={isStatic} progress={progress} qualityTier={qualityTier} />
    </>
  );
}

/** Passthrough group that accepts (and ignores) callout props — used in scroll mode */
function PassthroughGroup({ children }: { label: string; description: string; position?: [number, number, number]; children: React.ReactNode }) {
  return <group>{children}</group>;
}
