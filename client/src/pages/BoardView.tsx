import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import KanbanColumn from "@/components/KanbanColumn";
import TopBar from "@/components/TopBar";
import {
  APPLICATION_STATUSES,
  ApplicationRecordSchema,
  type ApplicationRecord,
} from "server/src/schemas/application";
import { env } from "@/env";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

const fetchApplications = async (): Promise<ApplicationRecord[]> => {
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
  const data = await res.json();
  return ApplicationRecordSchema.array().parse(data);
};

// Cards settle in once per page load. Coming back from Detail shows the board
// as it was, because motion means placement.
let boardSettled = false;

const BoardView = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
  const [settle] = useState(() => !boardSettled);
  useEffect(() => {
    if (data) boardSettled = true;
  }, [data]);

  return (
    <>
      <TopBar />
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState message="Failed to load applications" />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-6">
            <h1 className="font-serif text-[30px] leading-[1.1] font-semibold tracking-[-0.025em]">
              Applications
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              {data?.length
                ? `${data.length} in your pipeline.`
                : "No applications yet."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 rounded-xl border border-border bg-muted p-2 md:grid-cols-2 lg:grid-cols-4">
            {APPLICATION_STATUSES.map((status, i) => (
              <KanbanColumn
                key={status}
                status={status}
                index={i}
                settle={settle}
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
