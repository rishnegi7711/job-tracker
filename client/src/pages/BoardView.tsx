import { useQuery } from "@tanstack/react-query";
import KanbanColumn from "@/components/KanbanColumn";
import TopBar from "@/components/TopBar";
import { APPLICATION_STATUSES } from "../../../server/src/schemas/application";
import { env } from "@/env";

type Application = {
  id: string;
  status: string;
  company: string;
  role: string;
  dateApplied: string;
};

const fetchApplications = async (): Promise<Application[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

const BoardView = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching applications</p>;
  return (
    <>
      <TopBar />
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {APPLICATION_STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              applications={(data ?? []).filter((app) => app.status === status)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardView;
