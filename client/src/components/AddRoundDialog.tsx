import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import AddRoundForm from "./AddRoundForm";

const AddRoundDialog = ({ applicationId }: { applicationId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Add Round</Button>} />
      <AddRoundForm
        applicationId={applicationId}
        onCreated={() => setOpen(false)}
      />
    </Dialog>
  );
};

export default AddRoundDialog;
