import { z } from "zod";

export const ApplicationSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["Applied", "Interviewing", "Rejected", "Offer"]),
  dateApplied: z.coerce.date(),
  notes: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;
