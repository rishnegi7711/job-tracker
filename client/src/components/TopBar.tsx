import CreateApplicationForm from "./CreateApplicationForm";
import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  };

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          aria-label="Applyd, board"
          className="rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-focus-ring"
        >
          <Wordmark size="sm" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Dialog
            open={open}
            onOpenChange={setOpen}
            onOpenChangeComplete={(isOpen) => {
              if (!isOpen) setFormKey((k) => k + 1);
            }}
          >
            <DialogTrigger
              render={
                <Button className="h-9 px-4 hover:bg-action-hover active:scale-[.98]">
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add application</span>
                </Button>
              }
            />
            <CreateApplicationForm key={formKey} onCreated={() => setOpen(false)} />
          </Dialog>
          <Button
            variant="link"
            onClick={logout}
            className="px-1 text-foreground underline decoration-link-underline hover:decoration-foreground"
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
