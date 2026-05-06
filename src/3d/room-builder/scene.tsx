"use client";

import { Suspense, useRef, useEffect, useState, useSyncExternalStore, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { toSceneUnits } from "@/lib/utils/dimensions";
import { SceneContent } from "./scene-content";

gsap.registerPlugin(ScrollTrigger);

export interface RoomBuilderProps {
  width?: number;  // feet, default 16
  depth?: number;  // feet, default 12
  height?: number; // feet, default 8
  mode?: "scroll" | "static";
  variant?: "inline" | "full";
  monitor?: string; // recommended monitor name — static mode only shows this unit
}

const captions = [
  "It starts with a room.",
  "Acoustic engineering for zero sound leakage.",
  "Commercial-grade impact screen.",
  "Trackman iO. Tour-level accuracy.",
  "Every detail, dialed in.",
  "Your personal golf sanctuary.",
  "Ready to build yours?",
];

export function RoomBuilder({
  width = 16,
  depth = 12,
  height = 8,
  mode = "scroll",
  variant = "inline",
  monitor,
}: RoomBuilderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const subscribeMotion = useCallback((cb: () => void) => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  }, []);
  const getMotionSnapshot = useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const getMotionServerSnapshot = useCallback(() => false, []);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getMotionServerSnapshot
  );

  const w = toSceneUnits(width);
  const d = toSceneUnits(depth);
  const h = toSceneUnits(height);
  const isStatic = mode === "static";
  const camDist = Math.max(w, d) * 1.4;

  useEffect(() => {
    if (isStatic || prefersReducedMotion || !containerRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => setProgress(self.progress),
    });
    return () => trigger.kill();
  }, [prefersReducedMotion, isStatic]);

  // Static mode
  if (isStatic) {
    const isFull = variant === "full";
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: isFull ? "16/9" : "4/3",
          minHeight: isFull ? "280px" : undefined,
        }}
      >
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center bg-celtic-dark">
              <p className="font-mono text-xs uppercase tracking-widest text-brass/50">Loading room...</p>
            </div>
          }
        >
          <Canvas
            camera={{ position: [camDist * 0.65, camDist * 0.55, camDist * 0.65], fov: 45 }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            shadows
            onCreated={({ gl }) => gl.setClearColor("#142f24", 1)}
          >
            <SceneContent progress={1} w={w} d={d} h={h} isStatic monitorName={monitor} />
          </Canvas>
        </Suspense>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-brass/60">
          {width}&apos; &times; {depth}&apos; &times; {height}&apos;
        </div>
      </div>
    );
  }

  const captionIndex = Math.min(
    Math.floor(progress * captions.length),
    captions.length - 1
  );

  if (prefersReducedMotion) {
    return (
      <section className="bg-stone py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <ScrollReveal>
            <p className="kicker mb-4">The Build</p>
            <h2 className="mb-6 font-heading text-4xl text-charcoal">
              Watch Your Room Come Together
            </h2>
            <p className="text-text-muted">
              From empty room to personal golf sanctuary — we handle every phase.
            </p>
            <div className="mx-auto mt-12 aspect-video max-w-4xl bg-gradient-to-br from-celtic-dark/10 to-stone-dark" />
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-screen bg-stone">
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <p className="kicker">Loading room builder...</p>
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 2, 8], fov: 50 }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            shadows
          >
            <SceneContent progress={progress} w={w} d={d} h={h} isStatic={false} />
          </Canvas>
        </Suspense>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-stone to-transparent pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="kicker mb-2">The Build</p>
          <p className="font-heading text-3xl text-charcoal transition-all duration-500 md:text-5xl">
            {captions[captionIndex]}
          </p>
          <div className="mt-8 h-px w-48 bg-border">
            <div
              className="h-full bg-celtic transition-all duration-200"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
