import CreateApplicationForm from "./CreateApplicationForm";
import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const TopBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Applyd
        </Link>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button>Add application</Button>} />
          <CreateApplicationForm onCreated={() => setOpen(false)} />
        </Dialog>
      </div>
    </header>
  );
};

export default TopBar;
