import { INTERVIEW_ROUND_OUTCOMES } from "server/src/schemas/interviewRound";
import { cn } from "@/lib/utils";

type InterviewRoundOutcomeStatus = (typeof INTERVIEW_ROUND_OUTCOMES)[number];

// The dot carries the colour; the chip stays neutral.
const OUTCOME_DOT: Record<InterviewRoundOutcomeStatus, string> = {
  Pending: "bg-outcome-pending-dot",
  Passed: "bg-outcome-passed-dot",
  Failed: "bg-outcome-failed-dot",
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
        "inline-flex h-6 items-center gap-1.5 rounded-md bg-chip-fill px-2 text-xs font-medium text-foreground",
        className,
      )}
    >
      <span aria-hidden className={`size-2 rounded-full ${OUTCOME_DOT[outcome]}`} />
      {outcome}
    </span>
  );
};

export default OutcomeBadge;
