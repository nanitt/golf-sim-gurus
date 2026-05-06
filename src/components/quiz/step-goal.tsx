"use client";

import { useFormContext } from "react-hook-form";
import type { QuizFormValues } from "@/lib/validations/quiz";
import { Target, Users, Blend } from "lucide-react";

const goals = [
  {
    value: "practice" as const,
    label: "Serious Practice",
    description: "I want to improve my game with tour-level data and feedback.",
    icon: Target,
  },
  {
    value: "entertainment" as const,
    label: "Entertainment & Social",
    description: "A centerpiece for hosting, fun games, and family time.",
    icon: Users,
  },
  {
    value: "both" as const,
    label: "Best of Both",
    description: "Serious when I want to be, fun for everyone else.",
    icon: Blend,
  },
];

interface StepGoalProps {
  onNext: () => void;
}

export function StepGoal({ onNext }: StepGoalProps) {
  const { setValue, watch } = useFormContext<QuizFormValues>();
  const selected = watch("primary_goal");

  function select(value: QuizFormValues["primary_goal"]) {
    setValue("primary_goal", value);
    setTimeout(onNext, 300);
  }

  return (
    <div>
      <h2 className="mb-2 font-heading text-3xl text-charcoal">
        What&apos;s your primary goal?
      </h2>
      <p className="mb-8 text-text-muted">
        This helps us recommend the right technology for your needs.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = selected === goal.value;

          return (
            <button
              key={goal.value}
              type="button"
              onClick={() => select(goal.value)}
              className={`group flex flex-col items-center gap-4 border p-8 text-center transition-all ${
                isSelected
                  ? "border-celtic bg-celtic/5"
                  : "border-border bg-white hover:border-celtic/30"
              }`}
            >
              <Icon
                className={`h-8 w-8 transition-colors ${
                  isSelected ? "text-celtic" : "text-text-muted group-hover:text-celtic"
                }`}
              />
              <h3 className="font-heading text-lg text-charcoal">
                {goal.label}
              </h3>
              <p className="text-sm text-text-muted">{goal.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
