"use client";

import { useFormContext } from "react-hook-form";
import type { QuizFormValues } from "@/lib/validations/quiz";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StepContactProps {
  onBack: () => void;
}

export function StepContact({ onBack }: StepContactProps) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<QuizFormValues>();

  return (
    <div>
      <h2 className="mb-2 font-heading text-3xl text-charcoal">
        Almost there!
      </h2>
      <p className="mb-8 text-text-muted">
        Enter your info to see your personalized recommendation.
      </p>

      <div className="flex flex-col gap-4">
        <Input
          id="quiz-name"
          label="Name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="quiz-email"
          label="Email"
          type="email"
          placeholder="you@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="quiz-phone"
          label="Phone (optional)"
          type="tel"
          placeholder="(555) 555-5555"
          {...register("phone")}
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="quiz-notes"
            className="text-sm font-medium text-charcoal"
          >
            Anything else? (optional)
          </label>
          <textarea
            id="quiz-notes"
            rows={3}
            placeholder="Timeline, budget range, specific equipment interests..."
            className="border border-border bg-white px-4 py-3 font-body text-sm text-charcoal-light placeholder:text-text-muted transition-colors focus:border-brass focus:outline-none"
            {...register("notes")}
          />
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <Button type="button" variant="secondary" onClick={onBack}>Back</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Get My Recommendation"}
        </Button>
      </div>
    </div>
  );
}
