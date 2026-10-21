import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AddRoundDialog from "../components/AddRoundDialog";
import ApplicationHeader from "@/components/ApplicationHeader";
import { InterviewRoundItem } from "@/components/InterviewRoundItem";
import TopBar from "@/components/TopBar";
import { Empty, EmptyDescription } from "@/components/ui/empty";
import { env } from "@/env";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import type { ApplicationRecord } from "server/src/schemas/application";
import { ApplicationRecordSchema } from "server/src/schemas/application";
import type { InterviewRoundRecord } from "server/src/schemas/interviewRound";
import { InterviewRoundRecordSchema } from "server/src/schemas/interviewRound";

const fetchApplication = async (id: string): Promise<ApplicationRecord> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Failed to fetch applications");
  }
  const data = await res.json();
  return ApplicationRecordSchema.parse(data);
};

const fetchRounds = async (id: string): Promise<InterviewRoundRecord[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications/${id}/rounds`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(
      errorBody.error || "Failed to fetch rounds for this application",
    );
  }
  const data = await res.json();
  return InterviewRoundRecordSchema.array().parse(data);
};

const DetailView = () => {
  const { id } = useParams();

  const {
    data: application,
    isLoading: applicationLoading,
    isError: applicationError,
  } = useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchApplication(id as string),
  });

  const {
    data: rounds,
    isLoading: roundLoading,
    isError: roundError,
  } = useQuery({
    queryKey: ["rounds", id],
    queryFn: () => fetchRounds(id as string),
  });
  return (
    <>
      <TopBar />
      {applicationLoading || roundLoading ? (
        <LoadingState />
      ) : applicationError ? (
        <ErrorState message="Failed to load this application" />
      ) : roundError ? (
        <ErrorState message="Failed to load interview rounds" />
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">
          {application && <ApplicationHeader application={application} />}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Interview Rounds</h2>
            <AddRoundDialog applicationId={id as string} />
          </div>
          {(rounds ?? []).length == 0 ? (
            <Empty className="border border-dashed py-10">
              <EmptyDescription>No rounds yet</EmptyDescription>
            </Empty>
          ) : (
            <ol>
              {(rounds ?? []).map((round, index) => {
                return (
                  <InterviewRoundItem
                    key={round.id}
                    round={round}
                    isLast={index === (rounds ?? []).length - 1}
                  />
                );
              })}
            </ol>
          )}
        </div>
      )}
    </>
  );
};

export default DetailView;
