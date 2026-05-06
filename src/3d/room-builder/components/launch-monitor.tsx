"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { COLORS } from "../constants";
import { type MaterialConfigs } from "../materials/use-materials";

interface LaunchMonitorProps {
  opacity: number;
  w: number;
  d: number;
  h: number;
  materials: MaterialConfigs;
}

/** Pulsing LED — oscillates opacity via sin(time * speed + phase) */
function PulsingLED({
  position,
  radius = 0.008,
  opacity,
  phase = 0,
  speed = 2,
}: {
  position: [number, number, number];
  radius?: number;
  opacity: number;
  phase?: number;
  speed?: number;
}) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const pulse = 0.5 + 0.5 * Math.sin(clock.elapsedTime * speed + phase);
    matRef.current.opacity = opacity * (0.4 + 0.6 * pulse);
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 8, 8]} />
      <meshBasicMaterial
        ref={matRef}
        color={COLORS.celtic}
        transparent
        opacity={opacity}
        toneMapped={false}
      />
    </mesh>
  );
}

/**
 * Trackman iO — ceiling-mounted radar/camera bar.
 */
function TrackmanIO({
  opacity,
  h,
  ballZ,
  materials,
}: {
  opacity: number;
  h: number;
  ballZ: number;
  materials: MaterialConfigs;
}) {
  const halfH = h / 2;

  return (
    <group position={[0, halfH, ballZ - 0.3]}>
      {/* Ceiling plate */}
      <mesh position={[0, -0.01, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.015, 16]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>

      {/* Articulating mount arm */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.17, 8]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Pivot joint */}
      <mesh position={[0, -0.19, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Main housing — slim rectangular bar (soundbar shape) */}
      <RoundedBox
        args={[0.55, 0.06, 0.1]}
        radius={0.02}
        smoothness={4}
        position={[0, -0.24, 0]}
      >
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </RoundedBox>

      {/* Sensor strip on underside (row of lenses) */}
      {[-0.15, -0.05, 0.05, 0.15].map((xOff, i) => (
        <mesh key={i} position={[xOff, -0.28, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.005, 12]} />
          <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Status LED — pulsing */}
      <PulsingLED position={[0.22, -0.22, 0.051]} opacity={opacity} phase={0} speed={2} />
    </group>
  );
}

/**
 * Trackman 4 — floor-mounted radar unit, placed 6-8ft BEHIND the ball.
 */
function Trackman4({
  opacity,
  h,
  ballZ,
  materials,
}: {
  opacity: number;
  h: number;
  ballZ: number;
  materials: MaterialConfigs;
}) {
  const halfH = h / 2;
  const z = ballZ + 1.8;

  return (
    <group position={[0, -halfH, z]}>
      {/* Legs (4 short feet) */}
      {([
        [-0.07, 0.01, -0.05],
        [0.07, 0.01, -0.05],
        [-0.07, 0.01, 0.05],
        [0.07, 0.01, 0.05],
      ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.012, 0.015, 0.02, 8]} />
          <meshStandardMaterial {...materials.rubber} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Main body */}
      <RoundedBox
        args={[0.18, 0.1, 0.12]}
        radius={0.015}
        smoothness={4}
        position={[0, 0.07, 0]}
      >
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </RoundedBox>

      {/* Radar dome/radome on top */}
      <mesh position={[0, 0.13, -0.01]}>
        <sphereGeometry args={[0.05, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>

      {/* Front sensor window */}
      <mesh position={[0, 0.08, -0.061]}>
        <planeGeometry args={[0.1, 0.04]} />
        <meshPhysicalMaterial
          color={COLORS.charcoal}
          metalness={0.3}
          roughness={0.1}
          transparent
          opacity={opacity * 0.8}
        />
      </mesh>

      {/* Trackman logo area (subtle brass accent strip) */}
      <mesh position={[0, 0.12, 0.061]}>
        <boxGeometry args={[0.1, 0.008, 0.001]} />
        <meshPhysicalMaterial {...materials.brassAccent} transparent opacity={opacity} />
      </mesh>

      {/* Status LED — pulsing */}
      <PulsingLED position={[0.06, 0.13, -0.06]} radius={0.005} opacity={opacity} phase={1.5} speed={2.3} />
    </group>
  );
}

/**
 * GCQuad (Foresight Sports) — compact camera unit beside the ball.
 */
function GCQuad({
  opacity,
  h,
  ballZ,
  materials,
}: {
  opacity: number;
  h: number;
  ballZ: number;
  materials: MaterialConfigs;
}) {
  const halfH = h / 2;

  return (
    <group position={[0, -halfH, ballZ + 0.05]}>
      {/* Small feet */}
      {([
        [-0.04, 0.005, -0.03],
        [0.04, 0.005, -0.03],
        [-0.04, 0.005, 0.03],
        [0.04, 0.005, 0.03],
      ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.006, 0.008, 0.01, 8]} />
          <meshStandardMaterial {...materials.rubber} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Main body — very low-profile rectangle */}
      <RoundedBox
        args={[0.11, 0.035, 0.08]}
        radius={0.008}
        smoothness={4}
        position={[0, 0.03, 0]}
      >
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </RoundedBox>

      {/* Four camera lenses on top (the "Quad") — 2×2 grid */}
      {([
        [-0.02, 0.05, -0.015],
        [0.02, 0.05, -0.015],
        [-0.02, 0.05, 0.015],
        [0.02, 0.05, 0.015],
      ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.008, 0.008, 0.004, 12]} />
          <meshPhysicalMaterial
            color={COLORS.charcoal}
            metalness={0.5}
            roughness={0.1}
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}

      {/* Lens glass (reflective ring around each) */}
      {([
        [-0.02, 0.052, -0.015],
        [0.02, 0.052, -0.015],
        [-0.02, 0.052, 0.015],
        [0.02, 0.052, 0.015],
      ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.008, 0.001, 8, 16]} />
          <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Status indicator — pulsing */}
      <PulsingLED position={[0.04, 0.048, 0.041]} radius={0.005} opacity={opacity} phase={3.0} speed={1.8} />
    </group>
  );
}

/**
 * Uneekor EYE XO2 — ceiling-mounted overhead camera system.
 */
function UneekorEYE({
  opacity,
  h,
  ballZ,
  materials,
}: {
  opacity: number;
  h: number;
  ballZ: number;
  materials: MaterialConfigs;
}) {
  const halfH = h / 2;

  return (
    <group position={[0, halfH, ballZ - 0.1]}>
      {/* Ceiling plate */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[0.12, 0.015, 0.12]} />
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </mesh>

      {/* Mount arm — short, sturdy */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
        <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
      </mesh>

      {/* Main housing */}
      <RoundedBox
        args={[0.4, 0.1, 0.28]}
        radius={0.025}
        smoothness={4}
        position={[0, -0.19, 0]}
      >
        <meshPhysicalMaterial {...materials.darkMetal} transparent opacity={opacity} />
      </RoundedBox>

      {/* Viewing window on bottom */}
      <mesh position={[0, -0.245, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.22, 0.16]} />
        <meshPhysicalMaterial
          color={COLORS.charcoal}
          metalness={0.3}
          roughness={0.05}
          transparent
          opacity={opacity * 0.7}
        />
      </mesh>

      {/* Camera lenses visible through window — 3 in a row */}
      {[-0.06, 0, 0.06].map((xOff, i) => (
        <mesh key={i} position={[xOff, -0.24, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.008, 12]} />
          <meshPhysicalMaterial {...materials.brushedMetal} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Accent strip (brand identity) */}
      <mesh position={[0, -0.14, 0.141]}>
        <boxGeometry args={[0.2, 0.015, 0.001]} />
        <meshPhysicalMaterial {...materials.brassAccent} transparent opacity={opacity} />
      </mesh>

      {/* Status LED — pulsing */}
      <PulsingLED position={[0.16, -0.16, 0.141]} radius={0.006} opacity={opacity} phase={4.5} speed={2.1} />
    </group>
  );
}

export function LaunchMonitor({ opacity, w, d, h, materials }: LaunchMonitorProps) {
  const matD = d * 0.35;
  const ballZ = d * 0.08 + matD * 0.25;
  const ceilOffset = w * 0.12;
  const sideOffset = w * 0.12;

  return (
    <group>
      {/* Ceiling-mounted units — offset left/right */}
      <group position={[ceilOffset, 0, 0]}>
        <TrackmanIO opacity={opacity} h={h} ballZ={ballZ} materials={materials} />
      </group>
      <group position={[-ceilOffset, 0, 0]}>
        <UneekorEYE opacity={opacity} h={h} ballZ={ballZ} materials={materials} />
      </group>
      {/* Floor units — behind and beside the ball */}
      <Trackman4 opacity={opacity} h={h} ballZ={ballZ} materials={materials} />
      <group position={[sideOffset, 0, 0]}>
        <GCQuad opacity={opacity} h={h} ballZ={ballZ} materials={materials} />
      </group>
    </group>
  );
}
