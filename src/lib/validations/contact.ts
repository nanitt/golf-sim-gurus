import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit about your project"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  project_stage: z.string().optional(),
  space_type: z.string().optional(),
  room_width: z.string().optional(),
  room_depth: z.string().optional(),
  ceiling_height: z.string().optional(),
  source: z.string().optional(),
  quiz_tier: z.string().optional(),
  quiz_monitor: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
