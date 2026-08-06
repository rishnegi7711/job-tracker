import { z } from "zod";

export const APPLICATION_STATUSES = [
  "Applied",
  "Interviewing",
  "Rejected",
  "Offer",
] as const;

export const ApplicationSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(APPLICATION_STATUSES, { message: "Please select a status" }),
  dateApplied: z.coerce.date({ message: "Please select a date" }),
  notes: z.string().optional(