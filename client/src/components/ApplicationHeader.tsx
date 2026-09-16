import { Card, CardContent } from "./ui/card";
import StatusBadge from "./StatusBadge";
import type { ApplicationInput } from "../../../server/src/schemas/application";

const ApplicationHeader = ({
  application,
}: {
  application: ApplicationInput;
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-balance">
              {application.company}
            </h1>
            <p className="text-sm text-muted-foreground">{application.role}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>
        <p className="rounded-md bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground text-pretty">
          {application.notes}
        </p>
      </CardContent>
    </Card>
  );
};

export default ApplicationHeader;
