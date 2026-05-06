"use client";

import { type MaterialConfigs } from "../materials/use-materials";

interface RoomShellProps {
  opacity: number;
  w: number;
  d: number;
  h: number;
  materials: MaterialConfigs;
}

export function RoomShell({ opacity, w, d, h, materials }: RoomShellProps) {
  const halfH = h / 2;

  return (
    <group>
      {/* Floor — HDRI environment map on clearcoat gives subtle reflection without FBO */}
      <mesh position={[0, -halfH, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshPhysicalMaterial {...materials.hardwood} transparent opacity={opacity} envMapIntensity={0.4} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 0, -d / 2]}>
        <planeGeometry args={[w, h]} />
        <meshPhysicalMaterial {...materials.wallPaint} transparent opacity={opacity} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-w / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[d, h]} />
        <meshPhysicalMaterial {...materials.wallPaint} transparent opacity={opacity} />
      </mesh>

      {/* Right wall */}
      <mesh position={[w / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[d, h]} />
        <meshPhysicalMaterial {...materials.wallPaint} transparent opacity={opacity} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, halfH, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial {...materials.ceiling} transparent opacity={opacity} />
      </mesh>

      {/* Baseboards — back, left, right */}
      <mesh position={[0, -halfH + 0.06, -d / 2 + 0.02]}>
        <boxGeometry args={[w, 0.12, 0.04]} />
        <meshPhysicalMaterial {...materials.trim} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-w / 2 + 0.02, -halfH + 0.06, 0]}>
        <boxGeometry args={[0.04, 0.12, d]} />
        <meshPhysicalMaterial {...materials.trim} transparent opacity={opacity} />
      </mesh>
      <mesh position={[w / 2 - 0.02, -halfH + 0.06, 0]}>
        <boxGeometry args={[0.04, 0.12, d]} />
        <meshPhysicalMaterial {...materials.trim} transparent opacity={opacity} />
      </mesh>

      {/* Crown molding — back, left, right */}
      <mesh position={[0, halfH - 0.04, -d / 2 + 0.02]}>
        <boxGeometry args={[w, 0.08, 0.04]} />
        <meshPhysicalMaterial {...materials.trim} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-w / 2 + 0.02, halfH - 0.04, 0]}>
        <boxGeometry args={[0.04, 0.08, d]} />
        <meshPhysicalMaterial {...materials.trim} transparent opacity={opacity} />
      </mesh>
      <mesh position={[w / 2 - 0.02, halfH - 0.04, 0]}>
        <boxGeometry args={[0.04, 0.08, d]} />
        <meshPhysicalMaterial {...materials.trim} transparent opacity={opacity} />
      </mesh>

      {/* Corner posts — where side walls meet back wall */}
      <mesh position={[-w / 2 + 0.02, 0, -d / 2 + 0.02]}>
        <boxGeometry args={[0.04, h, 0.04]} />
        <meshPhysicalMaterial {...materials.trim} transparent opacity={opacity} />
      </mesh>
      <mesh position={[w / 2 - 0.02, 0, -d / 2 + 0.02]}>
        <boxGeometry args={[0.04, h, 0.04]} />
        <meshPhysicalMaterial {...materials.trim} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}
