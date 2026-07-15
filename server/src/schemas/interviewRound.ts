import { z } from "zod";

export const InterviewRoundSchema = z.object({
  type: z.string().min(1, "Interiew round type is required"),
  date: z.coerce.date(),
  outcome: z.string().optional(),
});

export type InterviewRoundInput = z.infer<typeof InterviewRoundSchema>;
