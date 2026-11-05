-- CreateTable
CREATE TABLE "StatusChange" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "backfilled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "StatusChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StatusChange_applicationId_changedAt_idx" ON "StatusChange"("applicationId", "changedAt");

-- AddForeignKey
ALTER TABLE "StatusChange" ADD CONSTRAINT "StatusChange_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Backfill: an Applied row for every application. createdAt is set 1s earlier
-- so it orders before the current-status row (now() is constant per transaction).
INSERT INTO "StatusChange" ("id", "applicationId", "status", "changedAt", "createdAt", "backfilled")
SELECT gen_random_uuid()::text, "id", 'Applied', "dateApplied", now() - interval '1 second', true
FROM "Application";

-- Backfill: a current-status row when the status isn't Applied.
INSERT INTO "StatusChange" ("id", "applicationId", "status", "changedAt", "createdAt", "backfilled")
SELECT gen_random_uuid()::text, "id", "status", "dateApplied", now(), true
FROM "Application"
WHERE "status" <> 'Applied';
