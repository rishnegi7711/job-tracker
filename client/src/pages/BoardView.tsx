import { useQuery } from "@tanstack/react-query";
import CreateApplicationForm from "../components/CreateApplicationForm";
// import { Link } from "react-router-dom";
import KanbanColumn from "@/components/KanbanColumn";
import { APPLICATION_STATUSES } from "../../../server/src/schemas/application";

const fetchApplications = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
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
      <CreateApplicationForm />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {APPLICATION_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            applications={data.filter((app) => app.status === status)}
          />
        ))}
      </div>
    </>
  );
};

export default BoardView;
