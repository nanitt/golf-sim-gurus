import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { EquipmentShowcase } from "@/components/sections/equipment-showcase";
import { QuizCta } from "@/components/sections/quiz-cta";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaFinal } from "@/components/sections/cta-final";
import { QuoteBar } from "@/components/layout/quote-bar";
import { sanityClient } from "@/lib/sanity/client";
import {
  featuredGalleryQuery,
  testimonialsQuery,
  equipmentQuery,
} from "@/lib/sanity/queries";

async function getCmsData() {
  try {
    const [galleryRaw, testimonialsRaw, equipmentRaw] = await Promise.all([
      sanityClient.fetch(featuredGalleryQuery),
      sanityClient.fetch(testimonialsQuery),
      sanityClient.fetch(equipmentQuery),
    ]);

    const gallery =
      galleryRaw?.length > 0
        ? galleryRaw.map(
            (item: {
              _id: string;
              title: string;
              roomWidth?: string;
              roomDepth?: string;
              ceilingHeight?: string;
              launchMonitor?: string;
              image?: { asset?: { _ref?: string } };
            }) => ({
              id: item._id,
              title: item.title,
              dimensions: `${item.roomWidth || ""}' x ${item.roomDepth || ""}' x ${item.ceilingHeight || ""}'`,
              monitor: item.launchMonitor || "",
              image: item.image?.asset?._ref || "/images/gallery/build-29.jpg",
            })
          )
        : undefined;

    const testimonials =
      testimonialsRaw?.length > 0
        ? testimonialsRaw.map(
            (t: {
              _id: string;
              name: string;
              location: string;
              quote: string;
              roomImage?: { asset?: { _ref?: string } };
            }) => ({
              id: t._id,
              name: t.name,
              location: t.location,
              quote: t.quote,
              image:
                t.roomImage?.asset?._ref || "/images/gallery/build-16.jpg",
            })
          )
        : undefined;

    const equipment =
      equipmentRaw?.length > 0
        ? equipmentRaw.map(
            (m: {
              name: string;
              technology?: string;
              accuracy?: string;
              ballSpeed?: string;
              price?: string;
              description?: string;
              image?: { asset?: { _ref?: string } };
            }) => ({
              name: m.name,
              technology: m.technology || "",
              accuracy: m.accuracy || "",
              ballSpeed: m.ballSpeed || "",
              price: m.price || "",
              highlight: m.description || "",
              image:
                m.image?.asset?._ref || "/images/gallery/build-29.jpg",
            })
          )
        : undefined;

    return { gallery, testimonials, equipment };
  } catch {
    return { gallery: undefined, testimonials: undefined, equipment: undefined };
  }
}

export default async function Home() {
  const { gallery, testimonials, equipment } = await getCmsData();

  return (
    <>
      <Header />
      <QuoteBar />
      <main>
        {/* Section 1: Cinematic Hero */}
        <Hero />

        {/* Section 2: Stats Bar */}
        <StatsBar />

        <GalleryGrid items={gallery} />
        <ProcessTimeline />
        <QuizCta />
        <EquipmentShowcase />
        <Testimonials items={testimonials} />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
