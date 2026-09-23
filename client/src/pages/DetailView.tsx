import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AddRoundDialog from "../components/AddRoundDialog";
import ApplicationHeader from "@/components/ApplicationHeader";
import { InterviewRoundItem } from "@/components/InterviewRoundItem";
import TopBar from "@/components/TopBar";
import { Empty, EmptyDescription } from "@/components/ui/empty";
import { env } from "@/env";
import type { RawInterviewRound } from "@/components/InterviewRoundItem";

const fetchApplication = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

const fetchRounds = async (id: string): Promise<RawInterviewRound[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications/${id}/rounds`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
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
  if (applicationLoading || roundLoading)
    return <p className="text-3xl text-muted-foreground">...Loading</p>;
  if (applicationError || roundError) return <p className="text-6xl">Error</p>;
  return (
    <>
      <TopBar />
      <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">
        <ApplicationHeader application={application} />
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
    </>
  );
};

export default DetailView;
