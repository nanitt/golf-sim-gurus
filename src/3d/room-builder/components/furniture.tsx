"use client";

import { RoundedBox } from "@react-three/drei";
import { type MaterialConfigs } from "../materials/use-materials";

interface FurnitureProps {
  opacity: number;
  w: number;
  d: number;
  h: number;
  materials: MaterialConfigs;
}

function LoungeChair({
  position,
  opacity,
  materials,
}: {
  position: [number, number, number];
  opacity: number;
  materials: MaterialConfigs;
}) {
  return (
    <group position={position}>
      {/* Legs */}
      {([
        [-0.28, -0.17, -0.25],
        [0.28, -0.17, -0.25],
        [-0.28, -0.17, 0.25],
        [0.28, -0.17, 0.25],
      ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Seat cushion */}
      <RoundedBox args={[0.7, 0.15, 0.65]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
        <meshPhysicalMaterial {...materials.leather} transparent opacity={opacity} />
      </RoundedBox>

      {/* Seat back (angled ~10deg) */}
      <group position={[0, 0.28, -0.28]} rotation={[0.17, 0, 0]}>
        <RoundedBox args={[0.7, 0.5, 0.12]} radius={0.04} smoothness={4}>
          <meshPhysicalMaterial {...materials.leather} transparent opacity={opacity} />
        </RoundedBox>
      </group>

      {/* Armrests */}
      <RoundedBox args={[0.1, 0.15, 0.55]} radius={0.03} smoothness={4} position={[-0.35, 0.1, -0.02]}>
        <meshPhysicalMaterial {...materials.leather} transparent opacity={opacity} />
      </RoundedBox>
      <RoundedBox args={[0.1, 0.15, 0.55]} radius={0.03} smoothness={4} position={[0.35, 0.1, -0.02]}>
        <meshPhysicalMaterial {...materials.leather} transparent opacity={opacity} />
      </RoundedBox>
    </group>
  );
}

function SideTable({
  position,
  opacity,
  materials,
}: {
  position: [number, number, number];
  opacity: number;
  materials: MaterialConfigs;
}) {
  return (
    <group position={position}>
      {/* Base disc */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.015, 24]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>
      {/* Column */}
      <mesh position={[0, 0.23, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.45, 12]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>
      {/* Tabletop */}
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.02, 24]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>
      {/* Brass rim */}
      <mesh position={[0, 0.46, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.008, 8, 32]} />
        <meshPhysicalMaterial {...materials.brassAccent} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

function GolfBag({
  position,
  opacity,
  materials,
}: {
  position: [number, number, number];
  opacity: number;
  materials: MaterialConfigs;
}) {
  return (
    <group position={position}>
      {/* Bag body (tapered cylinder) */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.08, 0.8, 12]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>

      {/* Stand legs */}
      <mesh position={[0.08, 0.15, 0.1]} rotation={[0.3, 0, 0.2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-0.08, 0.15, 0.1]} rotation={[0.3, 0, -0.2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 8]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Club shafts poking out at various angles */}
      {[
        { pos: [0, 0.8, 0] as [number, number, number], rot: [0, 0, 0.05] as [number, number, number], brass: false },
        { pos: [0.03, 0.8, 0.02] as [number, number, number], rot: [0.03, 0, -0.04] as [number, number, number], brass: true },
        { pos: [-0.02, 0.8, -0.01] as [number, number, number], rot: [-0.02, 0, 0.06] as [number, number, number], brass: false },
        { pos: [0.01, 0.78, -0.03] as [number, number, number], rot: [-0.04, 0, -0.03] as [number, number, number], brass: true },
        { pos: [-0.04, 0.78, 0.02] as [number, number, number], rot: [0.02, 0, 0.04] as [number, number, number], brass: false },
      ].map(({ pos, rot, brass }, i) => (
        <group key={i} position={pos} rotation={rot}>
          {/* Shaft */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.4, 6]} />
            <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
          </mesh>
          {/* Club head */}
          <mesh position={[0, 0.42, 0]}>
            <boxGeometry args={[0.04, 0.02, 0.03]} />
            <meshPhysicalMaterial
              {...(brass ? materials.brassAccent : materials.darkMetal)}
              transparent
              opacity={opacity}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Furniture({ opacity, w, d, h, materials }: FurnitureProps) {
  const halfH = h / 2;

  return (
    <group>
      <LoungeChair
        position={[w * 0.35, -halfH + 0.37, d * 0.15]}
        opacity={opacity}
        materials={materials}
      />
      <SideTable
        position={[w * 0.35 + 0.55, -halfH, d * 0.15]}
        opacity={opacity}
        materials={materials}
      />
      <GolfBag
        position={[-w * 0.38, -halfH, d * 0.3]}
        opacity={opacity}
        materials={materials}
      />
    </group>
  );
}
