import { z } from "zod";

export const INTERVIEW_ROUND_OUTCOMES = [
  "Pending",
  "Passed",
  "Failed",
] as const;

export const INTERVIEW_ROUND_TYPES = [
  "Phone Screen",
  "Technical Screen",
  "System Design",
  "Coding Interview",
  "Take-home Assignment",
  "Behavioral",
  "Final Round",
  "Offer Discussion",
] as const;
export const InterviewRoundSchema = z.object({
  type: z.enum(INTERVIEW_ROUND_TYPES),
  date: z.coerce.date(),
  outcome: z.enum(INTERVIEW_ROUND_OUTCOMES),
});

export type InterviewRoundInput = z.infer<typeof InterviewRoundSchema>;
