"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface TestimonialData {
  id: string;
  name: string;
  location: string;
  quote: string;
  image: string;
}

const defaultTestimonials: TestimonialData[] = [
  {
    id: "1",
    name: "Mark Turner",
    location: "Ontario",
    quote: "I spent months researching before choosing Golf Sim Gurus. The build quality speaks for itself — this is furniture-grade craftsmanship, not a weekend DIY job. Every detail was considered.",
    image: "/images/gallery/build-29.jpg",
  },
  {
    id: "2",
    name: "Sarah Lee",
    location: "Ontario",
    quote: "I absolutely love my home simulator. The experience is incredible and the service from start to finish was top-notch.",
    image: "/images/gallery/sim-room-1.jpg",
  },
  {
    id: "3",
    name: "James Thornton",
    location: "Kemptville, ON",
    quote: "The Golf Sim Gurus build transformed my facility. Clients book around it — it's become the centrepiece of the whole operation.",
    image: "/images/gallery/sim-room-3.jpg",
  },
];

interface TestimonialsProps {
  items?: TestimonialData[];
}

export function Testimonials({ items }: TestimonialsProps) {
  const testimonials = items && items.length > 0 ? items : defaultTestimonials;
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section className="bg-[#0a0a0a]">
      {/* Featured testimonial */}
      <ScrollReveal>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 border-b border-white/6 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px]">
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/60 md:to-[#0a0a0a]/80" />
          </div>

          {/* Quote */}
          <div className="flex flex-col justify-center border-l border-white/6 px-10 py-16 md:px-16">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">Client Stories</p>
            <blockquote className="mt-8 font-heading text-2xl font-bold leading-snug text-white md:text-3xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <div>
                <p className="text-sm font-semibold text-white">{featured.name}</p>
                <p className="text-xs text-white/40">{featured.location}</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Secondary testimonials */}
      {rest.length > 0 && (
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-x divide-white/6 md:grid-cols-2">
          {rest.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.1}>
              <div className="border-b border-white/6 px-10 py-10 md:px-12">
                <blockquote className="text-base leading-relaxed text-white/60">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center bg-celtic text-xs font-bold text-[#0a0a0a]">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/30">{t.location}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
