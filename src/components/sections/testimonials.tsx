"use client";

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
    <section className="bg-cream">
      {/* Featured testimonial — editorial pull quote */}
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-text-muted">
            Client Stories
          </p>

          {/* Big opening mark */}
          <div
            aria-hidden="true"
            className="mb-2 font-heading text-[7rem] leading-none text-brass/25 select-none"
          >
            &ldquo;
          </div>

          <blockquote className="max-w-4xl font-heading text-4xl leading-snug text-charcoal md:text-5xl">
            {featured.quote}
          </blockquote>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-10 bg-brass" />
            <span className="font-mono text-sm font-medium text-charcoal">{featured.name}</span>
            <span className="text-text-muted">·</span>
            <span className="font-mono text-sm text-text-muted">{featured.location}</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Secondary testimonials — side by side, smaller */}
      {rest.length > 0 && (
        <div className="border-t border-border">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
            {rest.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.1}>
                <div className="px-6 py-10 md:px-12">
                  <blockquote className="text-base leading-relaxed text-charcoal-light">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center bg-celtic text-xs font-semibold text-cream">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.location}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
