import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

interface GalleryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GalleryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} | Golf Sim Gurus`,
    description: `View the ${title} custom golf simulator build by Golf Sim Gurus.`,
    openGraph: {
      title: `${title} | Golf Sim Gurus`,
      description: `View the ${title} custom golf simulator build.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Golf Sim Gurus`,
      description: `View the ${title} custom golf simulator build.`,
    },
  };
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { slug } = await params;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="kicker mb-4">Project</p>
          <h1 className="mb-6 font-heading text-4xl text-charcoal md:text-5xl">
            {slug.replace(/-/g, " ")}
          </h1>

          <div className="relative mb-8 aspect-video overflow-hidden">
            <Image
              src="/images/gallery/build-29.jpg"
              alt={slug.replace(/-/g, " ")}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <p className="mb-8 max-w-2xl text-lg text-text-muted">
            Detailed project information will be loaded from Sanity CMS.
          </p>

          <Button href="/gallery">Back to Gallery</Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
