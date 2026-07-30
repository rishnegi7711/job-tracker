import {
  ApplicationSchema,
  type ApplicationInput,
} from "../../../server/src/schemas/application";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createApplication = async (data: ApplicationInput) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

const CreateApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(ApplicationSchema) });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      reset();
    },
  });
  const onSubmit = (data: ApplicationInput) => {
    mutate(data);
  };

  return (
    <div className="justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Company: <input {...register("company")} type="text" />
        </label>
        {errors.company && (
          <div className="text-red-500">{errors.company.message}</div>
        )}
        <label>
          Role: <input {...register("role")} type="text" />
        </label>
        {errors.role && (
          <div className="text-red-500">{errors.role.message}</div>
        )}
        <label>
          Status:{" "}
          <select {...register("status")}>
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>
        </label>
        <label>
          Date: <input {...register("dateApplied")} type="date" />
        </label>
        {errors.dateApplied && (
          <div className="text-red-500">{errors.dateApplied.message}</div>
        )}
        <label>
          Notes: <textarea {...register("notes")}></textarea>
        </label>
        <button disabled={isPending} type="submit">
          {isPending ? "Loading..." : "Add Application"}
        </button>
      </form>
    </div>
  );
};

export default CreateApplicationForm;
