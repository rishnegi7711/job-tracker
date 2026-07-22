import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AddRoundForm from "../components/AddRoundForm";

const fetchApplication = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/applications/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.json();
};

const fetchRounds = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/applications/${id}/rounds`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
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
      <div className="bg-amber-300 text-black">
        <p>{application.company}</p>
        <p>{application.role}</p>
        <p>{application.status}</p>
        <p>{application.notes}</p>
      </div>
      {rounds.length == 0 ? (
        <p>No rounds yet</p>
      ) : (
        <div>
          {rounds.map((round) => {
            return (
              <div key={round.id}>
                <li>{round.type}</li>
                <li>{round.date}</li>
                <li>{round.outcome}</li>
              </div>
            );
          })}
        </div>
      )}
      <AddRoundForm applicationId={id as string} />
    </div>
  );
};

export default DetailView;
