import { useQuery } from "@tanstack/react-query";
import KanbanColumn from "@/components/KanbanColumn";
import TopBar from "@/components/TopBar";
import { APPLICATION_STATUSES } from "../../../server/src/schemas/application";
import { env } from "@/env";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import type { Application } from "@/lib/types";

const fetchApplications = async (): Promise<Application[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Failed to load applications");
  }
  return res.json();
};

const BoardView = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
  return (
    <>
      <TopBar />
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="Failed to load applications" />
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {APPLICATION_STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                applications={(data ?? []).filter(
                  (app) => app.status === status,
                )}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BoardView;
