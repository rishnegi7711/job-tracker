import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import DeleteApplicationDialog from "./DeleteApplicationDialog";
import type { ApplicationRecord } from "server/src/schemas/application";
export type ApplicationCardProps = {
  application: ApplicationRecord;
  // ms delay for the settle animation; undefined means render static.
  settleDelay?: number;
};

const ApplicationCard = ({ application, settleDelay }: ApplicationCardProps) => {
  const settling = settleDelay !== undefined;
  return (
    <div
      className={`group relative ${settling ? "animate-settle motion-reduce:animate-none" : ""}`}
      style={settling ? { animationDelay: `${settleDelay}ms` } : undefined}
    >
      <Link
        to={`/applications/${application.id}`}
        className="flex flex-col gap-0.5 rounded-md border border-border bg-card px-3 py-2.5 shadow-[0_1px_2px_var(--card-shadow)] outline-none transition-colors hover:border-input focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-focus-ring"
      >
        <span className="pr-14 text-sm leading-snug font-medium text-card-foreground">
          {application.company}
        </span>
        <span className="text-xs text-muted-foreground">
          {application.role}
        </span>
        <span className="text-xs text-ink-subtle tabular-nums">
          {formatDate(application.dateApplied)}
        </span>
      </Link>
      <div className="absolute top-2 right-2 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:opacity-0">
        <DeleteApplicationDialog applicationId={application.id} />
      </div>
    </div>
  );
};

export default ApplicationCard;
