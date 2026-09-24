import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  InterviewRoundSchema,
  type InterviewRoundInput,
} from "../../../server/src/schemas/interviewRound";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "../../../server/src/schemas/interviewRound";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogDescription,
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
  applicationId,
  onCreated,
}: {
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
  const { mutate, isPending } = useMutation({
    mutationFn: (data: InterviewRoundInput) =>
      createRoundForm(data, applicationId as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds", applicationId] });
      reset({ type: "Phone Screen", outcome: "Pending", date: "" });
      onCreated();
    },
  });
  const onSubmit = (data: InterviewRoundInput) => {
    mutate(data);
  };

  return (
    <DialogContent className="px-6 py-6">
      <DialogHeader className="gap-1 px-6 pt-6 pb-5 border-b border-border/50">
        <DialogTitle className="text-base font-semibold tracking-tight text-foreground">
          Add interview round
        </DialogTitle>
        <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
          Log a new round for this application
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="type"
            className="text-sm font-medium text-foreground/80"
          >
            Type
          </Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                key={field.value}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger id="type">
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
          {errors.type && (
            <div className="text-red-500">{errors.type.message}</div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor="date"
            className="text-sm font-medium text-foreground/80"
          >
            Date
          </Label>
          <Input
            id="date"
            type="date"
            className="h-9 text-sm [color-scheme:dark]"
            {...register("date")}
          />
          {errors.date && (
            <div className="text-red-500">{errors.date.message}</div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label
            htmlFor="outcome"
            className="text-sm font-medium text-foreground/80"
          >
            Outcome
          </Label>
          <Controller
            name="outcome"
            control={control}
            render={({ field }) => (
              <Select
                key={field.value}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger id="outcome">
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
          {errors.outcome && (
            <div className="text-red-500">{errors.outcome.message}</div>
          )}
        </div>

        <Button
          type="submit"
          className="mt-1 w-full h-9 text-sm font-medium gap-1.5"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin size-4" /> Adding Round
            </>
          ) : (
            "Add Round"
          )}
        </Button>
      </form>
    </DialogContent>
  );
};

export default AddRoundForm;
