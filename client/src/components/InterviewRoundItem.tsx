import OutcomeBadge from "@/components/OutcomeBadge";
import type { InterviewRoundInput } from "../../../server/src/schemas/interviewRound";

type InterviewRound = InterviewRoundInput & { id: string };

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function InterviewRoundItem({
  round,
  isLast,
}: {
  round: InterviewRound;
  isLast: boolean;
}) {
  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute top-3 left-[5px] -bottom-2 w-px bg-border"
        />
      )}
      <span
        aria-hidden="true"
        className="relative top-1.5 z-10 size-2.5 shrink-0 rounded-full bg-muted-foreground/50"
      />
      <div className="flex flex-1 flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-secondary/40 px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{round.type}</span>
          <span className="text-xs text-muted-foreground">
            {formatDate(round.date)}
          </span>
        </div>
        <OutcomeBadge outcome={round.outcome} />
      </div>
    </li>
  );
}
