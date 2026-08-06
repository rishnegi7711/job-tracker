import {
  ApplicationSchema,
  type ApplicationInput,
  APPLICATION_STATUSES,
} from "../../../server/src/schemas/application";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BriefcaseIcon, PlusIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    control,
  } = useForm({ resolver: zodResolver(ApplicationSchema) });
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      reset({
        company: "",
        role: "",
        status: undefined,
        dateApplied: undefined,
        notes: "",
      });
      console.log("status value after reset:", control._formValues.status);
    },
  });
  const onSubmit = (data: ApplicationInput) => {
    mutate(data);
  };

  return (
    <Card className="w-full max-w-lg border-border/60 bg-card shadow-xl">
      <CardHeader className="gap-1 px-6 pt-6 pb-5 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
            <BriefcaseIcon className="size-4" />
          </span>
          <CardTitle className="text-base font-semibold tracking-tight text-foreground">
            Add Application
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground leading-relaxed pl-9">
          Track a new opportunity in your pipeline
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label
              htmlFor="company"
              className="text-sm font-medium text-foreground/80"
            >
              Company
            </Label>
            <Input
              {...register("company")}
              id="company"
              placeholder="e.g Checkout"
            />
            {errors.company && (
              <div className="text-red-500">{errors.company.message}</div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Label
              htmlFor="role"
              className="text-sm font-medium text-foreground/80"
            >
              Role
            </Label>
            <Input
              {...register("role")}
              id="role"
              placeholder="e.g Frontend Engineer"
            />
            {errors.role && (
              <div className="text-red-500">{errors.role.message}</div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-foreground/80"
              >
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    key={field.value ?? "empty"}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger id="status">
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
              {errors.status && (
                <div className="text-red-500">{errors.status.message}</div>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="dateApplied"
                className="text-sm font-medium text-foreground/80"
              >
                Date applied
              </Label>
              <Input
                id="dateApplied"
                type="date"
                className="h-9 text-sm [color-scheme:dark]"
                {...register("dateApplied")}
              />
              {errors.dateApplied && (
                <div className="text-red-500">{errors.dateApplied.message}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label
              htmlFor="notes"
              className="text-sm font-medium text-muted-foreground/80"
            >
              Notes
              <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                optional
              </span>
            </Label>
            <Textarea
              id="notes"
              className="resize-none text-sm leading-relaxed"
         