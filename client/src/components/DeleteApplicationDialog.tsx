import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { env } from "@/env";

const deleteApplication = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${env.VITE_API_URL}/api/applications/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Failed to delete application");
  }
};

const DeleteApplicationDialog = ({
  applicationId,
  onDeleted,
}: {
  applicationId: string;
  onDeleted?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setOpen(false);
      onDeleted?.();
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) reset();
      }}
    >
      <DialogTrigger
        render={
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this application?</DialogTitle>
          <DialogDescription>
            This permanently deletes the application. This also deletes its
            interview rounds.
          </DialogDescription>
        </DialogHeader>
        {isError && (
          <p role="alert" className="-mt-3 text-sm text-destructive">
            {error.message}
          </p>
        )}
        <DialogFooter>
          <DialogClose render={<Button variant="outline" className="h-10 px-4">Cancel</Button>} />
          <Button
            variant="destructive"
            className="h-10 gap-2 px-4 text-[15px]"
            disabled={isPending}
            onClick={() => mutate(applicationId)}
          >
            {isPending && <Loader2 className="animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteApplicationDialog;
