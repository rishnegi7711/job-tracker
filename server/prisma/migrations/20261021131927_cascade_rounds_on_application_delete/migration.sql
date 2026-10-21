-- DropForeignKey
ALTER TABLE "InterviewRound" DROP CONSTRAINT "InterviewRound_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "InterviewRound" ADD CONSTRAINT "InterviewRound_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
