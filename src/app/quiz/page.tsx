"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { quizSchema, type QuizFormValues } from "@/lib/validations/quiz";
import { getQuizResult } from "@/lib/utils/quiz-logic";
import { parseDimension } from "@/lib/utils/dimensions";
import { StepGoal } from "@/components/quiz/step-goal";
import { StepRoom } from "@/components/quiz/step-room";
import { StepPriorities } from "@/components/quiz/step-priorities";
import { StepContact } from "@/components/quiz/step-contact";
import { QuizResult } from "@/components/quiz/quiz-result";
import type { QuizResult as QuizResultType, RoomDimensions } from "@/types";

const steps = [
  { id: "goal", label: "Your Goal" },
  { id: "room", label: "Your Space" },
  { id: "priorities", label: "Priorities" },
  { id: "contact", label: "Contact" },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [dimensions, setDimensions] = useState<RoomDimensions | undefined>();

  const methods = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      primary_goal: undefined,
      room_width: "",
      room_depth: "",
      ceiling_height: "",
      priorities: [],
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  function goNext() {
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(data: QuizFormValues) {
    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Still show result
    }

    const quizResult = getQuizResult(data);

    const w = parseDimension(data.room_width, 0);
    const d = parseDimension(data.room_depth, 0);
    const h = parseDimension(data.ceiling_height, 0);
    if (w > 0 && d > 0 && h > 0) {
      setDimensions({ width: w, depth: d, height: h });
    }

    setResult(quizResult);
  }

  if (result) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-cream pt-24">
          <QuizResult result={result} dimensions={dimensions} />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center bg-cream px-6 pt-32 pb-24">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-12">
            <div className="flex justify-between">
              {steps.map((step, i) => (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs transition-colors ${
                      i <= currentStep
                        ? "bg-celtic text-white"
                        : "border border-border text-text-muted"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`hidden text-xs md:block ${
                      i <= currentStep ? "text-charcoal" : "text-text-muted"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1 bg-stone-dark">
              <div
                className="h-full bg-celtic transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && <StepGoal onNext={goNext} />}
                  {currentStep === 1 && <StepRoom onNext={goNext} onBack={goBack} />}
                  {currentStep === 2 && <StepPriorities onNext={goNext} onBack={goBack} />}
                  {currentStep === 3 && <StepContact onBack={goBack} />}
                </motion.div>
              </AnimatePresence>
            </form>
          </FormProvider>
        </div>
      </main>
      <Footer />
    </>
  );
}
