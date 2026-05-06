"use client";

import { useFormContext } from "react-hook-form";
import type { QuizFormValues } from "@/lib/validations/quiz";
import { Button } from "@/components/ui/button";

const priorities = [
  { value: "accuracy", label: "Shot Accuracy" },
  { value: "entertainment", label: "Entertainment & Games" },
  { value: "build-quality", label: "Build Quality" },
  { value: "aesthetics", label: "Room Aesthetics" },
  { value: "outdoor-capable", label: "Outdoor Capable" },
  { value: "quiet", label: "Low Noise" },
  { value: "budget", label: "Value for Money" },
  { value: "resale", label: "Resale Value" },
];

interface StepPrioritiesProps {
  onNext: () => void;
  onBack: () => void;
}

export function StepPriorities({ onNext, onBack }: StepPrioritiesProps) {
  const { setValue, watch, trigger } = useFormContext<QuizFormValues>();
  const selected = watch("priorities") || [];

  function toggle(value: string) {
    const current = [...selected];
    const index = current.indexOf(value);
    if (index >= 0) {
      current.splice(index, 1);
    } else if (current.length < 3) {
      current.push(value);
    }
    setValue("priorities", current);
  }

  async function handleNext() {
    const valid = await trigger("priorities");
    if (valid) onNext();
  }

  return (
    <div>
      <h2 className="mb-2 font-heading text-3xl text-charcoal">
        What matters most to you?
      </h2>
      <p className="mb-8 text-text-muted">
        Select up to 3 priorities. This helps us tailor your recommendation.
      </p>

      <div className="flex flex-wrap gap-3">
        {priorities.map((p) => {
          const isSelected = selected.includes(p.value);
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => toggle(p.value)}
              className={`rounded-full border px-5 py-2.5 text-sm transition-all ${
                isSelected
                  ? "border-celtic bg-celtic text-cream font-semibold"
                  : "border-border text-text-muted hover:border-celtic/30 hover:text-charcoal"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-text-muted">{selected.length}/3 selected</p>

      <div className="mt-10 flex gap-4">
        <Button type="button" variant="secondary" onClick={onBack}>Back</Button>
        <Button type="button" onClick={handleNext} disabled={selected.length === 0}>
          Continue
        </Button>
      </div>
    </div>
  );
}
