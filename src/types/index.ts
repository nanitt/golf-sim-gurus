// ─── Gallery ───
export interface GalleryItem {
  _id: string;
  title: string;
  slug: string;
  image: SanityImage;
  roomWidth: string;
  roomDepth: string;
  ceilingHeight: string;
  launchMonitor: string;
  description?: string;
  featured: boolean;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// ─── Equipment ───
export interface LaunchMonitor {
  _id: string;
  name: string;
  slug: string;
  image: SanityImage;
  price: string;
  accuracy: string;
  ballSpeed: string;
  clubData: boolean;
  outdoorCapable: boolean;
  technology: string;
  description: string;
  recommendation: string;
}

// ─── Testimonials ───
export interface Testimonial {
  _id: string;
  name: string;
  location: string;
  quote: string;
  image?: SanityImage;
  roomImage?: SanityImage;
}

// ─── Quiz ───
export type PrimaryGoal = "practice" | "entertainment" | "both";

export interface QuizFormData {
  primary_goal: PrimaryGoal;
  room_width: string;
  room_depth: string;
  ceiling_height: string;
  priorities: string[];
  name: string;
  email: string;
  phone?: string;
  notes?: string;
}

export interface QuizResult {
  monitor: string;
  tier: "premium" | "elite" | "ultra";
  estimatedBudget: string;
  description: string;
  features: string[];
}

// ─── Room Dimensions ───
export interface RoomDimensions {
  width: number;  // feet
  depth: number;  // feet
  height: number; // feet
}

// ─── Process ───
export interface ProcessPhase {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
}
