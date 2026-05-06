import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Launch Monitors | Golf Sim Gurus",
  description:
    "Trackman iO vs Foresight GCQuad vs Uneekor EYE XO2. Compare specs, accuracy, and pricing for the top golf simulator launch monitors.",
  openGraph: {
    title: "Compare Launch Monitors | Golf Sim Gurus",
    description: "Compare Trackman, Foresight, and Uneekor launch monitors side by side.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Launch Monitors | Golf Sim Gurus",
    description: "Compare Trackman, Foresight, and Uneekor launch monitors side by side.",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
