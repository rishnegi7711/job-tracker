import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import DeleteApplicationDialog from "./DeleteApplicationDialog";
import type { ApplicationRecord } from "../../../server/src/schemas/application";
export type ApplicationCardProps = {
  application: ApplicationRecord;
};

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  return (
    <div className="relative">
      <Link to={`/applications/${application.id}`}>
        <Card size="sm" className="shadow-none">
          <CardContent className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-card-foreground leading-snug">
              {application.company}
            </span>
            <span className="text-sm font-semibold text-muted-foreground leading-snug">
              {application.role}
            </span>
            <span className="text-sm font-semibold text-muted-foreground leading-snug">
              {formatDate(application.dateApplied)}
            </span>
          </CardContent>
        </Card>
      </Link>
      <div className="absolute top-2 right-2">
        <DeleteApplicationDialog applicationId={application.id} />
      </div>
    </div>
  );
};

export default ApplicationCard;
