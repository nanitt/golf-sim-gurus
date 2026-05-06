"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "../constants";
import { type MaterialConfigs } from "../materials/use-materials";
import { AnimatedScreenTexture } from "../materials/animated-screen";

interface ImpactScreenProps {
  opacity: number;
  w: number;
  d: number;
  materials: MaterialConfigs;
}

export function ImpactScreen({ opacity, w, d, materials }: ImpactScreenProps) {
  const screenW = w * 0.625;
  const screenH = w * 0.375;
  const halfW = screenW / 2;
  const halfSH = screenH / 2;
  const frameR = 0.03;
  const z = -d / 2 + 0.2;

  // Animated screen texture — created once, updated at ~10fps
  const screenTex = useMemo(() => new AnimatedScreenTexture(), []);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useEffect(() => {
    return () => screenTex.dispose();
  }, [screenTex]);

  useFrame(({ clock }) => {
    if (opacity > 0.5) {
      screenTex.update(clock.elapsedTime);
    }
    if (matRef.current) {
      // Assign map when screen is visible enough
      if (opacity > 0.5 && !matRef.current.map) {
        matRef.current.map = screenTex.texture;
        matRef.current.needsUpdate = true;
      }
    }
  });

  return (
    <group position={[0, 0, z]}>
      {/* Screen surface */}
      <mesh>
        <planeGeometry args={[screenW, screenH]} />
        <meshPhysicalMaterial
          ref={matRef}
          {...materials.screenFabric}
          emissive={COLORS.brass}
          emissiveIntensity={opacity * 0.15}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Frame — top bar */}
      <mesh position={[0, halfSH, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[frameR, frameR, screenW + frameR * 2, 16]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Frame — bottom bar */}
      <mesh position={[0, -halfSH, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[frameR, frameR, screenW + frameR * 2, 16]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Frame — left bar */}
      <mesh position={[-halfW, 0, 0]}>
        <cylinderGeometry args={[frameR, frameR, screenH, 16]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Frame — right bar */}
      <mesh position={[halfW, 0, 0]}>
        <cylinderGeometry args={[frameR, frameR, screenH, 16]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Corner joints */}
      {([
        [-halfW, halfSH, 0],
        [halfW, halfSH, 0],
        [-halfW, -halfSH, 0],
        [halfW, -halfSH, 0],
      ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshPhysicalMaterial {...materials.brassAccent} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Projection glow plane (behind screen) */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[screenW * 1.1, screenH * 1.1]} />
        <meshBasicMaterial
          color={COLORS.brass}
          transparent
          opacity={opacity * 0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
