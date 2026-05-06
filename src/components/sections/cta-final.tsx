"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";

export function CtaFinal() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { source: "homepage" },
  });

  async function onSubmit(data: ContactFormValues) {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <section className="bg-stone py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:gap-20">
        {/* Left */}
        <ScrollReveal direction="left">
          <div className="flex h-full flex-col justify-center">
            <div className="relative aspect-[4/3] overflow-hidden border border-border">
              <Image
                src="/images/contact/celtic-course-4.jpg"
                alt="Custom golf simulator installation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone/70 to-transparent" />
            </div>
            <div className="mt-8 border-l-2 border-celtic pl-6">
              <p className="text-sm leading-relaxed text-charcoal-light">
                Every build is designed around your space, your game, and your budget.
                No templates. No shortcuts.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Form */}
        <ScrollReveal direction="right">
          <div className="flex h-full flex-col justify-center">
            <p className="kicker mb-4">Get Started</p>
            <h2 className="mb-2 font-heading text-6xl text-charcoal">
              Ready to Build?
            </h2>
            <p className="mb-4 text-charcoal-light">
              Tell us about your project — we&apos;ll get back to you within 24 hours.
            </p>
            <p className="mb-8 text-sm text-text-muted">
              Not sure what you need?{" "}
              <Link href="/quiz" className="font-medium text-celtic underline underline-offset-2 hover:text-celtic-light">
                Take our 60-second quiz →
              </Link>
            </p>

            {isSubmitSuccessful ? (
              <div className="border border-celtic/20 bg-celtic/5 px-8 py-12 text-center">
                <h3 className="mb-3 font-heading text-2xl font-bold text-charcoal">We&apos;ll Be in Touch</h3>
                <p className="text-charcoal-light">Expect a reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input type="hidden" {...register("source")} />
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    id="cta-name"
                    label="Name"
                    placeholder="Your name"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    id="cta-email"
                    label="Email"
                    type="email"
                    placeholder="you@email.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>
                <Input
                  id="cta-phone"
                  label="Phone (optional)"
                  type="tel"
                  placeholder="(555) 555-5555"
                  {...register("phone")}
                />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cta-message" className="text-sm font-medium text-charcoal">
                    About Your Project
                  </label>
                  <textarea
                    id="cta-message"
                    rows={4}
                    placeholder="Tell us about your space, goals, and timeline..."
                    className="border border-border bg-white px-4 py-3 font-body text-sm text-charcoal-light placeholder:text-text-muted transition-colors focus:border-celtic focus:outline-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>
                <Button type="submit" size="lg" className="mt-2" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Get Your Free Quote"}
                </Button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
