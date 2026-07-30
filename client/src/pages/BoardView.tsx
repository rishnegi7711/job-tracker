import { useQuery } from "@tanstack/react-query";
import CreateApplicationForm from "../components/CreateApplicationForm";
import { Link } from "react-router-dom";

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
      {data.map((application) => {
        return (
          <Link key={application.id} to={`/applications/${application.id}`}>
            <ul>
              <li>{application.company}</li>
              <li>{application.role}</li>
              <li>{application.status}</li>
              <li>{application.dateApplied}</li>
              <li>{application.notes}</li>
            </ul>
          </Link>
        );
      })}
    </>
  );
};

export default BoardView;
