import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  InterviewRoundSchema,
  type InterviewRoundInput,
} from "../../../server/src/schemas/interviewRound";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const createRoundForm = async (data: InterviewRoundInput, id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/applications/${id}/rounds`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  return res.json();
};

const AddRoundForm = ({ applicationId }: { applicationId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(InterviewRoundSchema) });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: InterviewRoundInput) =>
      createRoundForm(data, applicationId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds", applicationId] });
      reset();
    },
  });
  const onSubmit = (data: InterviewRoundInput) => {
    mutate(data);
  };

  return (
    <div className="justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Type:{" "}
          <select {...register("type")}>
            <option>Phone Screen</option>
            <option>Technical Screen</option>
            <option>System Design</option>
            <option>Coding Interview</option>
            <option>Take-home Assignment</option>
            <option>Behavioral</option>
            <option>Final Round</option>
            <option>Offer Discussion</option>
          </select>
        </label>
        {errors.type && (
          <div className="text-red-500">{errors.type.message}</div>
        )}

        <label>
          Date: <input {...register("date")} type="date" />
        </label>
        {errors.date && (
          <div className="text-red-500"> {errors.date.message}</div>
        )}
        <label>
          Outcome:
          <input {...register("outcome")} type="text" />
        </label>
        {errors.outcome && (
          <div className="text-red-500"> {errors.outcome.message}</div>
        )}

        <button disabled={isPending} type="submit">
          {isPending ? "Loading..." : "Add Round"}
        </button>
      </form>
    </div>
  );
};

export default AddRoundForm;
