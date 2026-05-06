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

const SEAT_H = 0.22;
const SEAT_W = 0.92;
const SEAT_D = 0.78;
const LEG_H = 0.30;
const LEG_R = 0.018;
const BACK_H = 0.64;
const BACK_D = 0.18;
const BACK_ANGLE = 0.32; // ~18° reclining

function LoungeChair({
  position,
  rotation,
  opacity,
  materials,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  opacity: number;
  materials: MaterialConfigs;
}) {
  // backrest pivot: rear of seat, bottom of back flush with seat top
  const backPivotZ = -SEAT_D / 2 + BACK_D * 0.4;
  const backCenterY = SEAT_H / 2 + (BACK_H / 2) * Math.cos(BACK_ANGLE);
  const backCenterZ = backPivotZ - (BACK_H / 2) * Math.sin(BACK_ANGLE);

  return (
    <group position={position} rotation={rotation}>
      {/* Tapered metal legs — bottoms touch the floor (group y = floor + LEG_H + SEAT_H/2) */}
      {([
        [-0.30, -0.26],
        [ 0.30, -0.26],
        [-0.30,  0.26],
        [ 0.30,  0.26],
      ] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, -SEAT_H / 2 - LEG_H / 2, z]}>
          <cylinderGeometry args={[LEG_R, LEG_R * 0.7, LEG_H, 8]} />
          <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Seat cushion */}
      <RoundedBox args={[SEAT_W, SEAT_H, SEAT_D]} radius={0.07} smoothness={6} position={[0, 0, 0]}>
        <meshPhysicalMaterial {...materials.leather} transparent opacity={opacity} />
      </RoundedBox>

      {/* Backrest — angled back from rear edge */}
      <group position={[0, backCenterY, backCenterZ]} rotation={[-BACK_ANGLE, 0, 0]}>
        <RoundedBox args={[SEAT_W, BACK_H, BACK_D]} radius={0.05} smoothness={6}>
          <meshPhysicalMaterial {...materials.leather} transparent opacity={opacity} />
        </RoundedBox>
      </group>

      {/* Armrests — flush with seat top, run along sides */}
      {([-1, 1] as number[]).map((side, i) => (
        <RoundedBox
          key={i}
          args={[0.09, SEAT_H * 0.8, SEAT_D * 0.75]}
          radius={0.03}
          smoothness={4}
          position={[side * (SEAT_W / 2 + 0.045), SEAT_H * 0.1, -SEAT_D * 0.05]}
        >
          <meshPhysicalMaterial {...materials.leather} transparent opacity={opacity} />
        </RoundedBox>
      ))}
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
      {/* Three slim legs */}
      {([0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] as number[]).map((angle, i) => (
        <mesh key={i} position={[Math.sin(angle) * 0.18, 0.2, Math.cos(angle) * 0.18]}>
          <cylinderGeometry args={[0.012, 0.009, 0.40, 8]} />
          <meshPhysicalMaterial {...materials.brassAccent} transparent opacity={opacity} />
        </mesh>
      ))}
      {/* Tabletop */}
      <mesh position={[0, 0.40, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.022, 32]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>
      {/* Brass edge ring */}
      <mesh position={[0, 0.40, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.007, 8, 40]} />
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
      {/* Rubber base cap */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.13, 0.11, 0.06, 16]} />
        <meshStandardMaterial {...materials.rubber} transparent opacity={opacity} />
      </mesh>

      {/* Bag body — leather/canvas, slightly tapered */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.12, 0.13, 0.92, 16]} />
        <meshPhysicalMaterial {...materials.leather} transparent opacity={opacity} />
      </mesh>

      {/* Top collar */}
      <mesh position={[0, 0.99, 0]}>
        <cylinderGeometry args={[0.13, 0.12, 0.06, 16]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>

      {/* Stand legs */}
      {([0.3, -0.3] as number[]).map((angle, i) => (
        <mesh
          key={i}
          position={[Math.sin(angle) * 0.1, 0.12, Math.cos(angle) * 0.12]}
          rotation={[angle, 0, 0]}
        >
          <cylinderGeometry args={[0.008, 0.008, 0.38, 6]} />
          <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Club shafts */}
      {([
        [0,    0, 0.04, 0],
        [0.03, 0.02, 0.03, 0],
        [-0.03, 0, 0.05, 0],
        [0.01, -0.02, 0.03, 0],
      ] as [number, number, number, number][]).map(([x, z, rx, rz], i) => (
        <group key={i} position={[x, 0.98, z]} rotation={[rx, 0, rz]}>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.004, 0.005, 0.44, 6]} />
            <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AreaRug({
  position,
  w,
  opacity,
}: {
  position: [number, number, number];
  w: number;
  opacity: number;
}) {
  const rugW = Math.min(w * 0.38, 1.8);
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[rugW, 1.4]} />
      <meshStandardMaterial
        color="#c8b89a"
        roughness={0.95}
        transparent
        opacity={opacity * 0.85}
      />
    </mesh>
  );
}

export function Furniture({ opacity, w, d, h, materials }: FurnitureProps) {
  const floor = -h / 2;
  // Group y: seat center = floor + leg height + half seat height
  const chairY = floor + LEG_H + SEAT_H / 2;

  const chairX = w * 0.34;
  const chairZ = d * 0.14;

  return (
    <group>
      {/* Rug — just above floor to avoid z-fighting */}
      <AreaRug
        position={[chairX - 0.1, floor + 0.003, chairZ]}
        w={w}
        opacity={opacity}
      />

      <LoungeChair
        position={[chairX, chairY, chairZ]}
        rotation={[0, Math.PI, 0]}
        opacity={opacity}
        materials={materials}
      />

      <SideTable
        position={[chairX + SEAT_W / 2 + 0.36, floor, chairZ - 0.1]}
        opacity={opacity}
        materials={materials}
      />

      <GolfBag
        position={[-w * 0.37, floor, d * 0.28]}
        opacity={opacity}
        materials={materials}
      />
    </group>
  );
}
