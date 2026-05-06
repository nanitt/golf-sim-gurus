import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Golf Sim Gurus",
  description:
    "Get in touch to start your custom golf simulator project. Serving Kemptville, Ottawa, and Eastern Ontario.",
  openGraph: {
    title: "Contact | Golf Sim Gurus",
    description: "Get in touch to start your custom golf simulator project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Golf Sim Gurus",
    description: "Get in touch to start your custom golf simulator project.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
