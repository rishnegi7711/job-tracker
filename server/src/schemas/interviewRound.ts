import { z } from "zod";

export const InterviewRoundSchema = z.object({
  type: z.enum([
    "Phone Screen",
    "Technical Screen",
    "System Design",
    "Coding Interview",
    "Take-home Assignment",
    "Behavioral",
    "Final Round",
    "Offer Discussion",
  ]),
  date: z.coerce.date(),
  outcome: z.string().optional(),
});

export type InterviewRoundInput = z.infer<typeof InterviewRoundSchema>;
