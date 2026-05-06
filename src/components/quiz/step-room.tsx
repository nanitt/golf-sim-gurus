"use client";

import { useFormContext } from "react-hook-form";
import type { QuizFormValues } from "@/lib/validations/quiz";
import { Button } from "@/components/ui/button";
import { widthOptions, depthOptions, heightOptions } from "@/lib/utils/dimensions";

interface StepRoomProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepRoom({ onNext, onBack }: StepRoomProps) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<QuizFormValues>();

  async function handleNext() {
    const valid = await trigger(["room_width", "room_depth", "ceiling_height"]);
    if (valid) onNext();
  }

  const selectClasses =
    "w-full border border-border bg-white px-4 py-3 font-body text-sm text-charcoal-light focus:border-brass focus:outline-none";

  return (
    <div>
      <h2 className="mb-2 font-heading text-3xl text-charcoal">
        Tell us about your space
      </h2>
      <p className="mb-8 text-text-muted">
        Don&apos;t worry if you&apos;re not sure — we&apos;ll measure
        everything during the consultation.
      </p>

      <div className="flex flex-col gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            Room Width
          </label>
          <select {...register("room_width")} className={selectClasses}>
            <option value="">Select width</option>
            {widthOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.room_width && (
            <p className="mt-1 text-xs text-red-600">{errors.room_width.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            Room Depth
          </label>
          <select {...register("room_depth")} className={selectClasses}>
            <option value="">Select depth</option>
            {depthOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.room_depth && (
            <p className="mt-1 text-xs text-red-600">{errors.room_depth.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            Ceiling Height
          </label>
          <select {...register("ceiling_height")} className={selectClasses}>
            <option value="">Select height</option>
            {heightOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.ceiling_height && (
            <p className="mt-1 text-xs text-red-600">{errors.ceiling_height.message}</p>
          )}
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <Button type="button" variant="secondary" onClick={onBack}>Back</Button>
        <Button type="button" onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}
