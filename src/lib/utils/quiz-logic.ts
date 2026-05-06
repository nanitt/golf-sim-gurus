import type { QuizFormData, QuizResult } from "@/types";
import { parseDimension } from "./dimensions";

export function getQuizResult(data: QuizFormData): QuizResult {
  const { primary_goal, room_width, room_depth, ceiling_height, priorities } = data;

  const width = parseDimension(room_width, 14);
  const depth = parseDimension(room_depth, 18);
  const height = parseDimension(ceiling_height, 9);

  const area = width * depth;
  const wantsAccuracy = priorities.includes("accuracy");
  const wantsOutdoor = priorities.includes("outdoor-capable");
  const wantsBuildQuality = priorities.includes("build-quality");
  const wantsBudget = priorities.includes("budget");
  const highCeiling = height >= 9;

  // Trackman 4 — the only unit that works outdoors
  if (wantsOutdoor) {
    return {
      monitor: "Trackman 4",
      tier: "ultra",
      estimatedBudget: "$90,000 – $130,000+",
      description:
        "The Trackman 4 is the dual-radar system trusted by tour professionals worldwide — and the only launch monitor in our lineup that works both inside your simulator and on the course. Pure precision, wherever you play.",
      features: [
        "Trackman 4 dual-radar launch monitor",
        "Indoor + outdoor use",
        "Commercial-grade impact screen",
        "Full acoustic treatment package",
        "Premium hitting mat & turf",
        "Professional installation & calibration",
      ],
    };
  }

  // Trackman iO — ceiling-mounted indoor specialist, needs 9'+ clearance
  if (
    wantsAccuracy &&
    primary_goal === "practice" &&
    highCeiling &&
    area >= 200 &&
    !wantsBudget
  ) {
    return {
      monitor: "Trackman iO",
      tier: "ultra",
      estimatedBudget: "$85,000 – $120,000+",
      description:
        "The Trackman iO is purpose-built for the indoor simulator — a ceiling-mounted system combining radar and high-speed cameras to deliver the most accurate ball data available indoors. Zero setup, zero compromise.",
      features: [
        "Trackman iO ceiling-mounted system",
        "Radar + high-speed camera tracking",
        "Commercial-grade impact screen",
        "Custom acoustic treatment",
        "Premium turf & hitting mat",
        "Full room design & engineering",
      ],
    };
  }

  // Foresight GCQuad — photometric precision, floor-based, any ceiling height
  if (
    wantsAccuracy ||
    primary_goal === "both" ||
    wantsBuildQuality ||
    (!highCeiling && area >= 180)
  ) {
    return {
      monitor: "Foresight GCQuad",
      tier: "elite",
      estimatedBudget: "$60,000 – $90,000",
      description:
        "The Foresight GCQuad is the gold standard for camera-based launch monitoring. Four high-speed cameras deliver photometric precision with no ceiling clearance required — perfect for serious golfers who also want a world-class entertainment setup.",
      features: [
        "Foresight GCQuad launch monitor",
        "4-camera photometric tracking",
        "High-definition impact screen",
        "Acoustic panel treatment",
        "Premium turf system",
        "Professional installation",
      ],
    };
  }

  // Uneekor EYE XO2 — overhead camera system, entertainment-focused, ceiling required
  return {
    monitor: "Uneekor EYE XO2",
    tier: "premium",
    estimatedBudget: "$45,000 – $65,000",
    description:
      "The Uneekor EYE XO2 delivers accurate overhead camera tracking in a compact ceiling-mounted package. With access to 85+ world-class courses, it's the ideal hub for entertainment and casual practice.",
    features: [
      "Uneekor EYE XO2 ceiling-mounted system",
      "Overhead high-speed camera tracking",
      "Impact screen & enclosure",
      "Sound-dampening treatment",
      "Quality turf & mat system",
      "Professional installation",
    ],
  };
}
