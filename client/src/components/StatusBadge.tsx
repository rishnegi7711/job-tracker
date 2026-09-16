import { APPLICATION_STATUSES } from "../../../server/src/schemas/application";
import { cn } from "@/lib/utils";

type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Applied: "bg-sky-500/10 text-sky-400 border-sky-500/25",
  Interviewing: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/25",
  Offer: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
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
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status],
        className,
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
