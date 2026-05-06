"use client";

import { useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export function CameraController({
  progress,
  w,
  d,
  h,
}: {
  progress: number;
  w: number;
  d: number;
  h: number;
}) {
  const { camera } = useThree();
  const scale = Math.max(w, d) / 6;
  const halfH = h / 2;

  // Build CatmullRom splines for position and lookAt — only rebuild when room dims change
  const { posCurve, lookCurve } = useMemo(() => {
    const positions = [
      new THREE.Vector3(0, 2.5 * scale, 8 * scale),                        // Wide establishing, high
      new THREE.Vector3(2 * scale, 1.5 * scale, 5 * scale),                // Push in + orbit right
      new THREE.Vector3(0, 0.5 * scale, 4 * scale),                        // Eye level, straight on
      new THREE.Vector3(0.5 * scale, -halfH + 0.8, 2 * scale),             // Low angle behind hitting area
      new THREE.Vector3(2.5 * scale, 0.8 * scale, 2 * scale),              // Side profile
      new THREE.Vector3(-1.5 * scale, 0.5 * scale, 0.5 * scale),           // Inside room, back corner
      new THREE.Vector3(1.5 * scale, 2 * scale, 5 * scale),                // 3/4 overhead beauty shot
    ];

    const lookAts = [
      new THREE.Vector3(0, 0, 0),                                           // Room center
      new THREE.Vector3(-0.5, 0, -d / 2 + 0.5),                            // Back wall panels
      new THREE.Vector3(0, 0, -d / 2),                                      // Screen
      new THREE.Vector3(0, -halfH + 0.3, d * 0.2),                          // Launch monitor
      new THREE.Vector3(0, 0, 0),                                           // Full setup
      new THREE.Vector3(w * 0.3, -halfH + 0.5, d * 0.15),                  // Furniture + golf bag
      new THREE.Vector3(0, 0, -0.5),                                        // Room center
    ];

    return {
      posCurve: new THREE.CatmullRomCurve3(positions, false, "centripetal", 0.5),
      lookCurve: new THREE.CatmullRomCurve3(lookAts, false, "centripetal", 0.5),
    };
  }, [scale, halfH, d, w]);

  // Hoisted working vectors to avoid per-frame GC
  const posTarget = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const t = Math.max(0, Math.min(progress, 1));
    posCurve.getPoint(t, posTarget);
    lookCurve.getPoint(t, lookTarget);

    camera.position.lerp(posTarget, 0.1);
    camera.lookAt(lookTarget);
  });

  return null;
}

export function StaticCamera() {
  return (
    <OrbitControls
      autoRotate
      autoRotateSpeed={0.5}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.2}
      target={[0, 0, 0]}
      makeDefault
    />
  );
}
