import { INTERVIEW_ROUND_OUTCOMES } from "../../../server/src/schemas/interviewRound";
import { cn } from "@/lib/utils";

type InterviewRoundOutcomeStatus = (typeof INTERVIEW_ROUND_OUTCOMES)[number];

const OUTCOME_STYLES: Record<InterviewRoundOutcomeStatus, string> = {
  Pending: "bg-secondary text-muted-foreground border-border",
  Passed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  Failed: "bg-red-500/10 text-red-400 border-red-500/25",
};

const OutcomeBadge = ({
  outcome,
  className,
}: {
  outcome: InterviewRoundOutcomeStatus;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        OUTCOME_STYLES[outcome],
        className,
      )}
    >
      {outcome}
    </span>
  );
};

export default OutcomeBadge;
