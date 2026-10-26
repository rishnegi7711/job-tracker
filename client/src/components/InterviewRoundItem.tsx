import OutcomeBadge from "@/components/OutcomeBadge";

import type { InterviewRoundRecord } from "server/src/schemas/interviewRound";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const settle = "animate-settle motion-reduce:animate-none";

// `delay` and `step` (ms) time the open animation: the rail segment below this round
// grows over `step`, reaching the next round as it settles. A `fresh` round (added after
// the page opened) settles at once and fades a highlight.
export function InterviewRoundItem({
  round,
  isLast,
  delay,
  step,
  fresh,
}: {
  round: InterviewRoundRecord;
  isLast: boolean;
  delay: number;
  step: number;
  fresh: boolean;
}) {
  const at = fresh ? 0 : delay;
  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {/* Always rendered, hidden on the last round, so it never restarts its growth. */}
      <span
        aria-hidden="true"
        className={`absolute top-3 left-[5px] -bottom-2 w-px origin-top animate-grow bg-border motion-reduce:animate-none ${isLast ? "invisible" : ""}`}
        style={{ animationDelay: `${at}ms`, animationDuration: `${step}ms` }}
      />
      <span
        aria-hidden="true"
        className={`relative top-1.5 z-10 size-2.5 shrink-0 rounded-full border-2 border-input bg-background ${settle}`}
        style={{ animationDelay: `${at}ms` }}
      />
      <div
        className={`flex-1 ${settle}`}
        style={{ animationDelay: `${at}ms` }}
      >
        <div
          className={`flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2.5 ${fresh ? "animate-fresh motion-reduce:animate-none" : ""}`}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{round.type}</span>
            <span className="text-xs text-ink-subtle tabular-nums">
              {formatDate(round.date)}
            </span>
          </div>
          <OutcomeBadge outcome={round.outcome} />
        </div>
      </div>
    </li>
  );
}
