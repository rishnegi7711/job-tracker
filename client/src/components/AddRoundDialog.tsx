import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import AddRoundForm from "./AddRoundForm";

const AddRoundDialog = ({ applicationId }: { applicationId: string }) => {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) setFormKey((k) => k + 1);
      }}
    >
      <DialogTrigger render={<Button variant="outline" className="h-9 px-4">Add round</Button>} />
      <AddRoundForm
        key={formKey}
        applicationId={applicationId}
        onCreated={() => setOpen(false)}
      />
    </Dialog>
  );
};

export default AddRoundDialog;
