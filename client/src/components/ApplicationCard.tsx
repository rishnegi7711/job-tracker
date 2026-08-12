import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

export type ApplicationCardProps = {
  application: {
    id: string;
    company: string;
    role: string;
    dateApplied: string;
  };
};

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  return (
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
  );
};

export default ApplicationCard;
