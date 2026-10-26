import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  InterviewRoundSchema,
  type InterviewRoundInput,
} from "server/src/schemas/interviewRound";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { env } from "@/env";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  INTERVIEW_ROUND_OUTCOMES,
  INTERVIEW_ROUND_TYPES,
} from "server/src/schemas/interviewRound";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { Input } from "@/components/ui/input";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const createRoundForm = async (data: InterviewRoundInput, id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${env.VITE_API_URL}/api/applications/${id}/rounds`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Failed to add interview round");
  }
  return res.json();
};

const AddRoundForm = ({
  open,
  applicationId,
  onCreated,
}: {
  open: boolean;
  applicationId: string;
  onCreated: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(InterviewRoundSchema),
    defaultValues: { outcome: "Pending", type: "Phone Screen" },
  });
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    isError,
    error,
    reset: resetMutation,
  } = useMutation({
    mutationFn: (data: InterviewRoundInput) =>
      createRoundForm(data, applicationId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds", applicationId] });
      reset({ type: "Phone Screen", outcome: "Pending", date: "" });
      onCreated();
    },
  });
  // A stale server error shouldn't greet the next open.
  useEffect(() => {
    if (!open) resetMutation();
  }, [open, resetMutation]);
  const onSubmit = (data: InterviewRoundInput) => {
    mutate(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add interview round</DialogTitle>
        <DialogDescription>Log a new round for this application</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField id="type" label="Type" error={errors.type?.message}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                key={field.value ?? "empty"}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger
                  id="type"
                  aria-describedby={errors.type ? "type-error" : undefined}
                >
                  <SelectValue placeholder="Select Interview type" />
                </SelectTrigger>
                <SelectContent>
                  {INTERVIEW_ROUND_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        <FormField id="date" label="Date" error={errors.date?.message}>
          <Input
            id="date"
            type="date"
            aria-describedby={errors.date ? "date-error" : undefined}
            {...register("date")}
          />
        </FormField>
        <FormField id="outcome" label="Outcome" error={errors.outcome?.message}>
          <Controller
            name="outcome"
            control={control}
            render={({ field }) => (
              <Select
                key={field.value ?? "empty"}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger
                  id="outcome"
                  aria-describedby={errors.outcome ? "outcome-error" : undefined}
                >
                  <SelectValue placeholder="Select outcome" />
                </SelectTrigger>
                <SelectContent>
                  {INTERVIEW_ROUND_OUTCOMES.map((outcome) => (
                    <SelectItem key={outcome} value={outcome}>
                      {outcome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        {isError && (
          <p role="alert" className="text-sm text-destructive">
            {error.message}
          </p>
        )}
        <DialogFooter className="mt-3">
          <DialogClose render={<Button type="button" variant="outline" className="h-10 px-4" />}>
            Cancel
          </DialogClose>
          <Button type="submit" className="h-10 gap-2 px-4 text-[15px] hover:bg-action-hover" disabled={isPending}>
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Adding" : "Add round"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddRoundForm;
