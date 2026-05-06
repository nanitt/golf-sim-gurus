"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { COLORS } from "../constants";
import {
  createWoodTexture,
  createFabricTexture,
  createTurfTexture,
  createWallNoiseTexture,
} from "./procedural-textures";
import {
  createWoodNormalMap,
  createFabricNormalMap,
  createTurfNormalMap,
  createWallNormalMap,
} from "./procedural-normals";

/**
 * Material config objects — spread into JSX material elements so each mesh
 * gets its own instance with independent opacity. Texture maps are shared.
 */
export interface MaterialConfigs {
  wallPaint: {
    map: THREE.CanvasTexture;
    color: string;
    roughness: number;
    clearcoat: number;
    normalMap: THREE.CanvasTexture;
    normalScale: THREE.Vector2;
  };
  hardwood: {
    map: THREE.CanvasTexture;
    color: string;
    roughness: number;
    clearcoat: number;
    normalMap: THREE.CanvasTexture;
    normalScale: THREE.Vector2;
  };
  ceiling: { color: string; roughness: number };
  trim: { color: string; roughness: number; clearcoat: number };
  brushedMetal: { color: string; metalness: number; roughness: number };
  darkMetal: { color: string; metalness: number; roughness: number };
  brassAccent: { color: string; metalness: number; roughness: number };
  screenFabric: { color: string; roughness: number; transmission: number };
  acousticFabric: {
    map: THREE.CanvasTexture;
    color: string;
    roughness: number;
    normalMap: THREE.CanvasTexture;
    normalScale: THREE.Vector2;
  };
  turf: {
    map: THREE.CanvasTexture;
    color: string;
    roughness: number;
    normalMap: THREE.CanvasTexture;
    normalScale: THREE.Vector2;
  };
  leather: { color: string; roughness: number; clearcoat: number; sheen: number; sheenColor: string };
  rubber: { color: string; roughness: number };
}

export function useMaterials(w: number, d: number): MaterialConfigs {
  return useMemo(() => {
    const woodMap = createWoodTexture(w * 2, d * 2);
    const fabricMap = createFabricTexture();
    const turfMap = createTurfTexture();
    const wallNoiseMap = createWallNoiseTexture();

    // Normal maps
    const woodNormal = createWoodNormalMap(w * 2, d * 2);
    const fabricNormal = createFabricNormalMap();
    const turfNormal = createTurfNormalMap();
    const wallNormal = createWallNormalMap();

    return {
      wallPaint: {
        map: wallNoiseMap,
        color: COLORS.stone,
        roughness: 0.85,
        clearcoat: 0.05,
        normalMap: wallNormal,
        normalScale: new THREE.Vector2(0.5, 0.5),
      },
      hardwood: {
        map: woodMap,
        color: COLORS.oakBase,
        roughness: 0.6,
        clearcoat: 0.15,
        normalMap: woodNormal,
        normalScale: new THREE.Vector2(1.5, 1.5),
      },
      ceiling: { color: COLORS.cream, roughness: 0.95 },
      trim: { color: COLORS.charcoal, roughness: 0.5, clearcoat: 0.3 },
      brushedMetal: { color: COLORS.metalGray, metalness: 0.95, roughness: 0.35 },
      darkMetal: { color: COLORS.charcoal, metalness: 0.9, roughness: 0.2 },
      brassAccent: { color: COLORS.brass, metalness: 0.85, roughness: 0.25 },
      screenFabric: { color: COLORS.white, roughness: 0.9, transmission: 0.05 },
      acousticFabric: {
        map: fabricMap,
        color: COLORS.celtic,
        roughness: 0.95,
        normalMap: fabricNormal,
        normalScale: new THREE.Vector2(2.0, 2.0),
      },
      turf: {
        map: turfMap,
        color: COLORS.turfGreen,
        roughness: 0.95,
        normalMap: turfNormal,
        normalScale: new THREE.Vector2(3.0, 3.0),
      },
      leather: { color: COLORS.charcoal, roughness: 0.65, clearcoat: 0.1, sheen: 0.3, sheenColor: COLORS.charcoalLight },
      rubber: { color: COLORS.nearBlack, roughness: 0.95 },
    };
  }, [w, d]);
}
