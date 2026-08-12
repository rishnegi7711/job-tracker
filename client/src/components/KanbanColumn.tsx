import ApplicationCard from "./ApplicationCard";
import { Badge } from "@/components/ui/badge";
import { Empty, EmptyDescription } from "@/components/ui/empty";
import { APPLICATION_STATUSES } from "../../../server/src/schemas/application";
import type { ApplicationCardProps } from "./ApplicationCard";

type Status = (typeof APPLICATION_STATUSES)[number];
type KanbanColumnProps = {
  status: Status;
  applications: ApplicationCardProps["application"][];
};

const KanbanColumn = ({ status, applications }: KanbanColumnProps) => {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-medium text-foreground">{status}</h2>
        <Badge variant="secondary">{applications.length}</Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {applications.length === 0 ? (
          <Empty className="border border-dashed py-10">
            <EmptyDescription>No applications yet</EmptyDescription>
          </Empty>
        ) : (
          applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
