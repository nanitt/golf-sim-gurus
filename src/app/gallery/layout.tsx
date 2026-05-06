import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Golf Sim Gurus",
  description:
    "Browse our portfolio of custom golf simulator installations. From basement retreats to dedicated wings.",
  openGraph: {
    title: "Our Work | Golf Sim Gurus",
    description: "Browse our portfolio of custom golf simulator installations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | Golf Sim Gurus",
    description: "Browse our portfolio of custom golf simulator installations.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
