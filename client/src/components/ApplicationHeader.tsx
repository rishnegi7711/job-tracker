import { Link, useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import EmptyState from "./EmptyState";
import DeleteApplicationDialog from "./DeleteApplicationDialog";
import { formatDate } from "@/lib/utils";
import type { ApplicationRecord } from "server/src/schemas/application";

const ApplicationHeader = ({ application }: { application: ApplicationRecord }) => {
  const navigate = useNavigate();
  return (
    <header>
      <Link
        to="/"
        className="text-sm text-muted-foreground underline decoration-link-underline underline-offset-4 outline-none hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-focus-ring"
      >
        ← Board
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-serif text-[30px] leading-[1.1] font-semibold tracking-[-0.025em] text-balance">
            {application.company}
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            {application.role}
          </p>
        </div>
        <DeleteApplicationDialog
          applicationId={application.id}
          onDeleted={() => navigate("/")}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <StatusBadge status={application.status} />
        <span className="text-xs text-ink-subtle">
          Applied {formatDate(application.dateApplied)}
        </span>
      </div>
      <h2 className="mt-7 text-[11px] font-medium tracking-wide text-ink-subtle uppercase">
        Notes
      </h2>
      {application.notes ? (
        <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-wrap text-pretty">
          {application.notes}
        </p>
      ) : (
        <div className="mt-2">
          <EmptyState>
            <p className="text-sm text-ink-subtle">
              No notes for this application.
            </p>
          </EmptyState>
        </div>
      )}
    </header>
  );
};

export default ApplicationHeader;
