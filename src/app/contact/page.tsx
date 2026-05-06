"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card } from "@/components/ui/card";
import { RoomPreview } from "@/components/ui/room-preview";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { widthOptions, depthOptions, heightOptions, parseDimension } from "@/lib/utils/dimensions";
import { Phone, Mail, MapPin, Sparkles, X } from "lucide-react";

const projectStageOptions = [
  { value: "Just exploring", label: "Just exploring" },
  { value: "Planning (1-3 months)", label: "Planning (1-3 months)" },
  { value: "Ready to start", label: "Ready to start" },
  { value: "Under construction", label: "Under construction" },
];

const spaceTypeOptions = [
  { value: "Basement", label: "Basement" },
  { value: "Garage", label: "Garage" },
  { value: "Dedicated room", label: "Dedicated room" },
  { value: "New construction", label: "New construction" },
  { value: "Other", label: "Other" },
];

const timelineOptions = [
  { value: "ASAP", label: "ASAP" },
  { value: "1-3 months", label: "1-3 months" },
  { value: "3-6 months", label: "3-6 months" },
  { value: "6+ months", label: "6+ months" },
  { value: "Just researching", label: "Just researching" },
];

const budgetOptions = [
  { value: "40-60k", label: "$40,000 - $60,000" },
  { value: "60-80k", label: "$60,000 - $80,000" },
  { value: "80-100k", label: "$80,000 - $100,000" },
  { value: "100k+", label: "$100,000+" },
];

const dimWidthOptions = widthOptions.map((o) => ({ value: o, label: o }));
const dimDepthOptions = depthOptions.map((o) => ({ value: o, label: o }));
const dimHeightOptions = heightOptions.map((o) => ({ value: o, label: o }));

function ContactForm() {
  const searchParams = useSearchParams();
  const quizSource = searchParams.get("source") === "quiz";
  const quizTier = searchParams.get("tier") || "";
  const quizMonitor = searchParams.get("monitor") || "";

  const [quizBannerVisible, setQuizBannerVisible] = useState(!quizSource);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      source: quizSource ? "quiz" : "contact",
      quiz_tier: quizTier,
      quiz_monitor: quizMonitor,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchWidth = watch("room_width");
  const watchDepth = watch("room_depth");
  const watchHeight = watch("ceiling_height");

  const hasDimensions =
    watchWidth && watchWidth !== "Not sure" &&
    watchDepth && watchDepth !== "Not sure" &&
    watchHeight && watchHeight !== "Not sure";

  const dimensions = hasDimensions
    ? {
        width: parseDimension(watchWidth!, 16),
        depth: parseDimension(watchDepth!, 20),
        height: parseDimension(watchHeight!, 9),
      }
    : null;

  async function onSubmit(data: ContactFormValues) {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <Card className="p-8">
      {isSubmitSuccessful ? (
        <div className="py-12 text-center">
          <h3 className="mb-4 font-heading text-2xl text-charcoal">Thank You!</h3>
          <p className="text-text-muted">
            We&apos;ll be in touch within 24 hours to discuss your project.
          </p>
        </div>
      ) : (
        <>
          {/* Quiz-first banner (shown when NOT arriving from quiz) */}
          {quizBannerVisible && (
            <div className="relative mb-6 rounded border border-brass/30 bg-brass/5 p-4">
              <button
                type="button"
                onClick={() => setQuizBannerVisible(false)}
                className="absolute right-3 top-3 text-text-muted hover:text-charcoal"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="pr-6 text-sm text-charcoal-light">
                Not sure what you need?{" "}
                <Link href="/quiz" className="font-medium text-celtic underline underline-offset-2 hover:text-celtic/80">
                  Take our 60-second quiz
                </Link>{" "}
                for a personalized recommendation.
              </p>
            </div>
          )}

          {/* Quiz context banner (shown when arriving FROM quiz) */}
          {quizSource && quizMonitor && (
            <div className="mb-6 rounded border border-celtic/20 bg-celtic/5 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-celtic" />
                <p className="text-sm font-medium text-charcoal">
                  Based on your quiz: <strong>{quizMonitor}</strong>{" "}
                  <span className="font-mono text-xs uppercase text-celtic">({quizTier} Package)</span>
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Hidden fields */}
            <input type="hidden" {...register("source")} />
            <input type="hidden" {...register("quiz_tier")} />
            <input type="hidden" {...register("quiz_monitor")} />

            {/* Section: About You */}
            <div>
              <h3 className="mb-4 font-heading text-lg text-charcoal">About You</h3>
              <div className="flex flex-col gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input id="contact-name" label="Name" placeholder="Your name" error={errors.name?.message} {...register("name")} />
                  <Input id="contact-email" label="Email" type="email" placeholder="you@email.com" error={errors.email?.message} {...register("email")} />
                </div>
                <Input id="contact-phone" label="Phone (optional)" type="tel" placeholder="(555) 555-5555" {...register("phone")} />
              </div>
            </div>

            {/* Section: Your Project */}
            <div>
              <h3 className="mb-4 font-heading text-lg text-charcoal">Your Project</h3>
              <div className="flex flex-col gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Select id="contact-stage" label="Project Stage" options={projectStageOptions} placeholder="Where are you at?" {...register("project_stage")} />
                  <Select id="contact-space" label="Space Type" options={spaceTypeOptions} placeholder="Type of room" {...register("space_type")} />
                </div>

                {/* Dimensions row */}
                <div>
                  <p className="mb-2 font-body text-sm font-medium text-charcoal">Room Dimensions (optional)</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Select id="contact-width" options={dimWidthOptions} placeholder="Width" {...register("room_width")} />
                    <Select id="contact-depth" options={dimDepthOptions} placeholder="Depth" {...register("room_depth")} />
                    <Select id="contact-height" options={dimHeightOptions} placeholder="Ceiling" {...register("ceiling_height")} />
                  </div>
                </div>

                {/* 3D preview when dimensions are filled */}
                {dimensions && (
                  <div>
                    <RoomPreview dimensions={dimensions} />
                    <p className="mt-2 text-center text-xs text-text-muted">
                      Drag to rotate. Approximate visualization based on your dimensions.
                    </p>
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <Select id="contact-timeline" label="Timeline" options={timelineOptions} placeholder="When are you looking to start?" {...register("timeline")} />
                  <Select id="contact-budget" label="Budget Range" options={budgetOptions} placeholder="Select range" {...register("budget")} />
                </div>
              </div>
            </div>

            {/* Section: Tell Us More */}
            <div>
              <h3 className="mb-4 font-heading text-lg text-charcoal">Tell Us More</h3>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="font-body text-sm font-medium text-charcoal">About Your Project</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us about your space, goals, and any questions you have..."
                  className="border border-border bg-white px-4 py-3 font-body text-sm text-charcoal-light placeholder:text-text-muted transition-colors focus:border-brass focus:outline-none"
                  {...register("message")}
                />
                {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-2" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </>
      )}
    </Card>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pt-24">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-16 md:grid-cols-2">
            <ScrollReveal direction="left">
              <p className="kicker mb-4">Contact</p>
              <h1 className="mb-6 font-heading text-4xl text-charcoal md:text-5xl">
                Let&apos;s Build Something Extraordinary
              </h1>
              <p className="mb-12 text-lg text-text-muted">
                Whether you&apos;re ready to start or just exploring, we&apos;d
                love to hear about your project.
              </p>

              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-celtic" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Phone</p>
                    <a href="tel:+16136980787" className="font-mono text-sm text-text-muted hover:text-celtic">
                      613-698-0787
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-celtic" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Email</p>
                    <a href="mailto:info@golfsimgurus.com" className="text-sm text-text-muted hover:text-celtic">
                      info@golfsimgurus.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 text-celtic" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Service Area</p>
                    <p className="text-sm text-text-muted">
                      24 Prescott St, Kemptville, ON K0G 1J0
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 aspect-video overflow-hidden">
                <Image
                  src="/images/contact/celtic-course-4.jpg"
                  alt="Golf Sim Gurus location"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <Suspense fallback={<Card className="p-8"><p className="kicker">Loading form...</p></Card>}>
                <ContactForm />
              </Suspense>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
