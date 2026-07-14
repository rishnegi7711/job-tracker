import "./App.css";
import { useQuery } from "@tanstack/react-query";
import CreateApplicationForm from "./components/CreateApplicationForm";

const fetchApplications = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching applications</p>;
  return (
    <>
      <CreateApplicationForm />
      <pre>{JSON.stringify(data, null, 2)} </pre>
    </>
  );
}

export default App;
