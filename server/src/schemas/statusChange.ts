import { z } from "zod";
import { APPLICATION_STATUSES } from "./application";

export const StatusChangeRecordSchema = z.object({
  id: z.string(),
  applicationId: z.string(),
  status: z.enum(APPLICATION_STATUSES),
  changedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  backfilled: z.boolean(),
});

export type StatusChangeRecord = z.infer<typeof StatusChangeRecordSchema>;
