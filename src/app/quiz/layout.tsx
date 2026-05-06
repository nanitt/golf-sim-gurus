import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulator Finder | Golf Sim Gurus",
  description:
    "Answer 4 quick questions and get a personalized golf simulator recommendation with estimated budget.",
  openGraph: {
    title: "Simulator Finder | Golf Sim Gurus",
    description: "Answer 4 questions, get a personalized simulator recommendation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulator Finder | Golf Sim Gurus",
    description: "Answer 4 questions, get a personalized simulator recommendation.",
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
