"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { COLORS } from "../constants";

export interface MaterialConfigs {
  wallPaint: {
    map: THREE.Texture;
    roughnessMap: THREE.Texture;
    normalMap: THREE.Texture;
    normalScale: THREE.Vector2;
    color: string;
    roughness: number;
    clearcoat: number;
  };
  hardwood: {
    map: THREE.Texture;
    roughnessMap: THREE.Texture;
    normalMap: THREE.Texture;
    normalScale: THREE.Vector2;
    color: string;
    roughness: number;
    clearcoat: number;
  };
  ceiling: { color: string; roughness: number };
  trim: { color: string; roughness: number; clearcoat: number };
  brushedMetal: { color: string; metalness: number; roughness: number };
  darkMetal: { color: string; metalness: number; roughness: number };
  brassAccent: { color: string; metalness: number; roughness: number };
  screenFabric: { color: string; roughness: number; transmission: number };
  acousticFabric: {
    map: THREE.Texture;
    roughnessMap: THREE.Texture;
    normalMap: THREE.Texture;
    normalScale: THREE.Vector2;
    color: string;
    roughness: number;
  };
  turf: {
    map: THREE.Texture;
    roughnessMap: THREE.Texture;
    normalMap: THREE.Texture;
    normalScale: THREE.Vector2;
    color: string;
    roughness: number;
  };
  leather: { color: string; roughness: number; clearcoat: number; sheen: number; sheenColor: string };
  rubber: { color: string; roughness: number };
}

function configureTexture(t: THREE.Texture, repeatX: number, repeatY: number, srgb = false) {
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX, repeatY);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
}

export function useMaterials(w: number, d: number, h: number): MaterialConfigs {
  const floor = useTexture({
    map: "/textures/floor/diff.jpg",
    normalMap: "/textures/floor/nor.jpg",
    roughnessMap: "/textures/floor/rough.jpg",
  });

  const wall = useTexture({
    map: "/textures/wall/diff.jpg",
    normalMap: "/textures/wall/nor.jpg",
    roughnessMap: "/textures/wall/rough.jpg",
  });

  const fabric = useTexture({
    map: "/textures/fabric/diff.jpg",
    normalMap: "/textures/fabric/nor.jpg",
    roughnessMap: "/textures/fabric/rough.jpg",
  });

  const turfMaps = useTexture({
    map: "/textures/turf/diff.jpg",
    normalMap: "/textures/turf/nor.jpg",
    roughnessMap: "/textures/turf/rough.jpg",
  });

  return useMemo(() => {
    // Floor — tile to room footprint
    configureTexture(floor.map, w * 1.8, d * 1.8, true);
    configureTexture(floor.normalMap, w * 1.8, d * 1.8);
    configureTexture(floor.roughnessMap, w * 1.8, d * 1.8);

    // Walls — tile across width, scale to height
    const wallW = Math.max(w, d) * 1.2;
    const wallH = h * 1.0;
    configureTexture(wall.map, wallW, wallH, true);
    configureTexture(wall.normalMap, wallW, wallH);
    configureTexture(wall.roughnessMap, wallW, wallH);

    // Acoustic fabric panels — visible weave texture
    configureTexture(fabric.map, 6, 6, true);
    configureTexture(fabric.normalMap, 6, 6);
    configureTexture(fabric.roughnessMap, 6, 6);

    // Turf mat — smaller repeat for realistic grass scale
    configureTexture(turfMaps.map, 3, 2, true);
    configureTexture(turfMaps.normalMap, 3, 2);
    configureTexture(turfMaps.roughnessMap, 3, 2);

    return {
      wallPaint: {
        map: wall.map,
        roughnessMap: wall.roughnessMap,
        normalMap: wall.normalMap,
        normalScale: new THREE.Vector2(0.6, 0.6),
        color: "#e8e5e0",
        roughness: 1.0,
        clearcoat: 0.02,
      },
      hardwood: {
        map: floor.map,
        roughnessMap: floor.roughnessMap,
        normalMap: floor.normalMap,
        normalScale: new THREE.Vector2(0.8, 0.8),
        color: "#ffffff",
        roughness: 1.0,
        clearcoat: 0.2,
      },
      ceiling: { color: COLORS.cream, roughness: 0.9 },
      trim: { color: COLORS.charcoal, roughness: 0.5, clearcoat: 0.3 },
      brushedMetal: { color: COLORS.metalGray, metalness: 0.95, roughness: 0.35 },
      darkMetal: { color: COLORS.charcoal, metalness: 0.9, roughness: 0.2 },
      brassAccent: { color: COLORS.brass, metalness: 0.85, roughness: 0.25 },
      screenFabric: { color: COLORS.white, roughness: 0.9, transmission: 0.05 },
      acousticFabric: {
        map: fabric.map,
        roughnessMap: fabric.roughnessMap,
        normalMap: fabric.normalMap,
        normalScale: new THREE.Vector2(1.5, 1.5),
        color: COLORS.celtic,
        roughness: 1.0,
      },
      turf: {
        map: turfMaps.map,
        roughnessMap: turfMaps.roughnessMap,
        normalMap: turfMaps.normalMap,
        normalScale: new THREE.Vector2(2.0, 2.0),
        color: COLORS.turfGreen,
        roughness: 1.0,
      },
      leather: { color: COLORS.charcoal, roughness: 0.65, clearcoat: 0.1, sheen: 0.3, sheenColor: COLORS.charcoalLight },
      rubber: { color: COLORS.nearBlack, roughness: 0.95 },
    };
  }, [w, d, h, floor, wall, fabric, turfMaps]);
}
