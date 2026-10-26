import {
  ApplicationSchema,
  type ApplicationInput,
  APPLICATION_STATUSES,
} from "server/src/schemas/application";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { env } from "@/env";

const createApplication = async (data: ApplicationInput) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Failed to create application");
  }
  return res.json();
};

// The parent remounts this form (key) once the dialog has fully closed, which
// clears the fields, field errors and server error without a visible reset.
const CreateApplicationForm = ({ onCreated }: { onCreated: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: zodResolver(ApplicationSchema) });
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      onCreated();
    },
  });
  const onSubmit = (data: ApplicationInput) => {
    mutate(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add application</DialogTitle>
        <DialogDescription>Track a new opportunity in your pipeline</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField id="company" label="Company" error={errors.company?.message}>
          <Input
            {...register("company")}
            id="company"
            placeholder="e.g Checkout"
            aria-describedby={errors.company ? "company-error" : undefined}
          />
        </FormField>
        <FormField id="role" label="Role" error={errors.role?.message}>
          <Input
            {...register("role")}
            id="role"
            placeholder="e.g Frontend Engineer"
            aria-describedby={errors.role ? "role-error" : undefined}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField id="status" label="Status" error={errors.status?.message}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  key={field.value ?? "empty"}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    id="status"
                    aria-describedby={errors.status ? "status-error" : undefined}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {APPLICATION_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField
            id="dateApplied"
            label="Date applied"
            error={errors.dateApplied?.message}
          >
            <Input
              id="dateApplied"
              type="date"
              aria-describedby={
                errors.dateApplied ? "dateApplied-error" : undefined
              }
              {...register("dateApplied")}
            />
          </FormField>
        </div>
        <FormField id="notes" label="Notes" optional>
          <Textarea id="notes" {...register("notes")} />
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
            {isPending ? "Adding" : "Add application"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CreateApplicationForm;
