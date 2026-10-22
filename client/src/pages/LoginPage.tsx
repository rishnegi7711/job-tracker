import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AuthField } from "@/components/AuthField";
import MiniBoard from "@/components/MiniBoard";
import Wordmark from "@/components/Wordmark";
import { Link } from "react-router-dom";
import z from "zod";
import { env } from "@/env";
import { Check, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

type LoginInput = z.infer<typeof loginSchema>;

const sendLoginData = async (data: LoginInput) => {
  const res = await fetch(`${env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Login Failed");
  }
  return res.json();
};
// Matches the 700ms card-to-Offer move in MiniBoard.
const REDIRECT_DELAY_MS = 700;

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation({
    mutationFn: sendLoginData,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });

  // Let the card reach Offer, then redirect. Straight away under reduced motion.
  useEffect(() => {
    if (!isSuccess) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => navigate("/"), reduced ? 0 : REDIRECT_DELAY_MS);
    return () => clearTimeout(t);
  }, [isSuccess, navigate]);

  const onSubmit = (data: LoginInput) => {
    mutate(data);
  };

  // Editing a field clears a stale server error.
  const field = (name: keyof LoginInput) => {
    const r = register(name);
    return {
      ...r,
      onChange: async (e: React.ChangeEvent<HTMLInputElement>) => {
        await r.onChange(e);
        if (isError) reset();
      },
    };
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-20 text-foreground">
      <div className="w-full max-w-[360px]">
        <div className="animate-rise motion-reduce:animate-none">
          <div className="mb-8">
            <Wordmark />
          </div>
          <h1 className="font-serif text-[30px] leading-[1.1] font-semibold tracking-[-0.025em]">
            Welcome back
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Pick up where your search left off.
          </p>
        </div>

        <div className="mt-7">
          <MiniBoard won={isSuccess} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 flex animate-rise flex-col gap-4 motion-reduce:animate-none"
          style={{ animationDelay: "150ms" }}
        >
          <AuthField
            {...field("email")}
            id="email"
            label="Email"
            type="email"
            placeholder="you@email.com"
            error={errors.email?.message}
          />
          <AuthField
            {...field("password")}
            id="password"
            label="Password"
            type="password"
            error={errors.password?.message}
          />
          {isError && (
            <p role="alert" className="text-sm text-destructive">
              {error.message}
            </p>
          )}
          <Button
            disabled={isPending || isSuccess}
            type="submit"
            className="mt-1 h-10 w-full gap-2 text-[15px] hover:bg-action-hover active:scale-[.98] disabled:opacity-70"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isSuccess && <Check className="size-4" />}
            {isPending ? "Signing in" : isSuccess ? "Signed in" : "Continue"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          New here?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground underline decoration-link-underline underline-offset-4 hover:decoration-foreground"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
