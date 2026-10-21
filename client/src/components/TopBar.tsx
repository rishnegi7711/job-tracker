import CreateApplicationForm from "./CreateApplicationForm";
import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  };

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Applyd
        </Link>
        <div className="flex items-center gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button>Add application</Button>} />
            <CreateApplicationForm onCreated={() => setOpen(false)} />
          </Dialog>
          <Button variant="secondary" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
