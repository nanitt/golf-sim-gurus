import type { QuizFormData, QuizResult } from "@/types";

export function getQuizResult(data: QuizFormData): QuizResult {
  const { primary_goal, room_width, room_depth, priorities } = data;

  const width = parseInt(room_width) || 0;
  const depth = parseInt(room_depth) || 0;
  const area = width * depth;

  const wantsAccuracy = priorities.includes("accuracy");
  const wantsEntertainment = priorities.includes("entertainment");
  const wantsBuildQuality = priorities.includes("build-quality");

  // Ultra tier — large room, accuracy-focused, or serious golfer
  if (
    (primary_goal === "practice" && wantsAccuracy && area >= 200) ||
    (area >= 250 && wantsBuildQuality)
  ) {
    return {
      monitor: "Trackman iO",
      tier: "ultra",
      estimatedBudget: "$85,000 – $120,000+",
      description:
        "For the serious golfer who demands tour-level data. The Trackman iO delivers unmatched accuracy with dual radar technology, and your room has the space to let it shine.",
      features: [
        "Trackman iO launch monitor",
        "Commercial-grade impact screen",
        "Custom acoustic treatment",
        "Premium turf & hitting mat",
        "Full room design & engineering",
        "Dedicated installation team",
      ],
    };
  }

  // Elite tier — medium room, balanced needs
  if (
    (primary_goal === "both" || wantsEntertainment) &&
    area >= 150
  ) {
    return {
      monitor: "Foresight GCQuad",
      tier: "elite",
      estimatedBudget: "$60,000 – $90,000",
      description:
        "The Foresight GCQuad is the gold standard for photometric accuracy with a compact form factor. Perfect for the golfer who wants serious data AND entertainment value.",
      features: [
        "Foresight GCQuad launch monitor",
        "High-definition impact screen",
        "Acoustic panel treatment",
        "Premium turf system",
        "Room design consultation",
        "Professional installation",
      ],
    };
  }

  // Premium tier — smaller rooms, entertainment-focused, or outdoor needs
  return {
    monitor: "Uneekor EYE XO2",
    tier: "premium",
    estimatedBudget: "$45,000 – $65,000",
    description:
      "The Uneekor EYE XO2 offers exceptional overhead-mounted accuracy in a ceiling-friendly package. Great for rooms where every inch counts.",
    features: [
      "Uneekor EYE XO2 launch monitor",
      "Impact screen & enclosure",
      "Sound dampening treatment",
      "Quality turf & mat system",
      "Room layout planning",
      "Professional installation",
    ],
  };
}
