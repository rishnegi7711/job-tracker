import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AddRoundDialog from "../components/AddRoundDialog";
import ApplicationHeader from "@/components/ApplicationHeader";
import { InterviewRoundItem } from "@/components/InterviewRoundItem";
import { env } from "@/env";

const fetchApplication = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

const fetchRounds = async (id: string) => {
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
    return <p className="text-6xl">...Loading</p>;
  if (applicationError || roundError) return <p className="text-6xl">Error</p>;
  return (
    <div>
      <ApplicationHeader application={application} />
      {rounds.length == 0 ? (
        <p>No rounds yet</p>
      ) : (
        <ol>
          {rounds.map((round, index) => {
            return (
              <InterviewRoundItem
                key={round.id}
                round={round}
                isLast={index === rounds.length - 1}
              />
            );
          })}
        </ol>
      )}
      <AddRoundDialog applicationId={id as string} />
    </div>
  );
};

export default DetailView;
