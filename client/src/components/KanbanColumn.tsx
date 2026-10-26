import ApplicationCard from "./ApplicationCard";
import EmptyState from "./EmptyState";
import { APPLICATION_STATUSES } from "server/src/schemas/application";
import type { ApplicationCardProps } from "./ApplicationCard";

type Status = (typeof APPLICATION_STATUSES)[number];
type KanbanColumnProps = {
  status: Status;
  applications: ApplicationCardProps["application"][];
  index: number;
  settle: boolean;
};

// Full class strings so Tailwind can see them.
const STATUS_DOT: Record<Status, string> = {
  Applied: "bg-status-applied-dot",
  Interviewing: "bg-status-interviewing-dot",
  Rejected: "bg-status-rejected-dot",
  Offer: "bg-status-offer-dot",
};

const KanbanColumn = ({
  status,
  applications,
  index,
  settle,
}: KanbanColumnProps) => {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 p-1">
      <div className="flex items-center justify-between px-1 pt-1">
        <h2 className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-ink-subtle uppercase">
          <span aria-hidden className={`size-2 rounded-full ${STATUS_DOT[status]}`} />
          {status}
        </h2>
        <span className="min-w-5 rounded-md bg-chip-fill px-1.5 text-center text-xs font-medium text-foreground tabular-nums">
          {applications.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {applications.length === 0 ? (
          <EmptyState>
            <p className="text-xs text-ink-subtle">No applications yet</p>
          </EmptyState>
        ) : (
          applications.map((application, row) => (
            <ApplicationCard
              key={application.id}
              application={application}
              // Capped so a long column never keeps cards hidden for seconds.
              settleDelay={
                settle ? Math.min(row, 6) * 90 + index * 30 : undefined
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
