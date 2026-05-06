import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About | Golf Sim Gurus",
  description:
    "Custom craftsmanship, certified technology, and white-glove service. Learn about the team behind Golf Sim Gurus.",
  openGraph: {
    title: "About | Golf Sim Gurus",
    description: "Custom craftsmanship, certified technology, and white-glove service.",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Golf Sim Gurus",
    description: "Custom craftsmanship, certified technology, and white-glove service.",
  },
};

const values = [
  {
    title: "Craftsmanship First",
    description:
      "Every build is custom. We don't sell kits or drop-ship components. Our team designs, engineers, and installs every element of your simulator room.",
  },
  {
    title: "Technology Partners",
    description:
      "We're certified by Trackman and Foresight — the two most trusted names in launch monitor technology. We don't compromise on accuracy.",
  },
  {
    title: "Design-Led",
    description:
      "Your simulator room should be a room you're proud to show off. We treat every project as an interior design challenge, not just a tech install.",
  },
  {
    title: "White-Glove Service",
    description:
      "From the first consultation to ongoing support, you have a dedicated project manager. We handle permits, construction, and calibration.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <ScrollReveal>
            <p className="kicker mb-4">About Us</p>
            <h1 className="mb-6 max-w-3xl font-heading text-4xl text-charcoal md:text-6xl">
              We Build Golf Sanctuaries
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
              Golf Sim Gurus was founded on a simple belief: a personal golf
              simulator should feel as refined as the homes they&apos;re built
              in. We combine tour-level technology with architectural-grade
              craftsmanship to create rooms that perform as good as they look.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative mt-12 aspect-[21/9] overflow-hidden">
              <Image
                src="/images/hero/celtic-cover.jpg"
                alt="Golf Sim Gurus facility"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </ScrollReveal>

          <Divider className="my-16" />

          <div className="grid gap-12 md:grid-cols-2">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div>
                  <span className="font-mono text-xs text-celtic">0{i + 1}</span>
                  <h3 className="mt-2 font-heading text-2xl text-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <Divider className="my-16" />

          <ScrollReveal>
            <div className="text-center">
              <h2 className="mb-6 font-heading text-3xl text-charcoal">
                Ready to see what we can build for you?
              </h2>
              <Button size="lg" href="/contact">
                Start Your Project
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
