import { z } from "zod";

export const quizSchema = z.object({
  primary_goal: z.enum(["practice", "entertainment", "both"]),
  room_width: z.string().min(1, "Please select a room width"),
  room_depth: z.string().min(1, "Please select a room depth"),
  ceiling_height: z.string().min(1, "Please select a ceiling height"),
  priorities: z
    .array(z.string())
    .min(1, "Select at least one priority")
    .max(3, "Select up to 3 priorities"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export type QuizFormValues = z.infer<typeof quizSchema>;
