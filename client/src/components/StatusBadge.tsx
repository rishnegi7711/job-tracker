import { APPLICATION_STATUSES } from "server/src/schemas/application";
import { cn } from "@/lib/utils";

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

// The dot carries the colour; the chip stays neutral. Full class strings so Tailwind can see them.
const STATUS_DOT: Record<ApplicationStatus, string> = {
  Applied: "bg-status-applied-dot",
  Interviewing: "bg-status-interviewing-dot",
  Rejected: "bg-status-rejected-dot",
  Offer: "bg-status-offer-dot",
};

const StatusBadge = ({
  status,
  className,
}: {
  status: ApplicationStatus;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md bg-chip-fill px-2 text-xs font-medium text-foreground",
        className,
      )}
    >
      <span aria-hidden className={`size-2 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
