import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AuthField } from "@/components/AuthField";
import MiniBoard from "@/components/MiniBoard";
import z from "zod";
import { env } from "@/env";
import { Loader2 } from "lucide-react";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password should atleast have 8 characters"),
});

type RegisterInput = z.infer<typeof registerSchema>;

const sendRegistrationData = async (data: RegisterInput) => {
  const res = await fetch(`${env.VITE_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.error || "Failed to register user");
  }
  return res.json();
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: sendRegistrationData,
    onSuccess: () => {
      navigate("/login");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const onSubmit = (data: RegisterInput) => {
    mutate(data);
  };

  // Editing the email clears a stale server error.
  const emailField = () => {
    const r = register("email");
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
          <div className="mb-8 flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            A
          </div>
          <h1 className="font-serif text-[30px] leading-[1.1] font-semibold tracking-[-0.025em]">
            Create your account
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            One board for every application.
          </p>
        </div>

        <div className="mt-7">
          <MiniBoard />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 flex animate-rise flex-col gap-4 motion-reduce:animate-none"
          style={{ animationDelay: "150ms" }}
        >
          <AuthField
            {...emailField()}
            id="email"
            label="Email"
            type="email"
            placeholder="you@email.com"
            error={errors.email?.message}
          />
          <AuthField
            {...register("password")}
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
            disabled={isPending}
            type="submit"
            className="mt-1 h-10 w-full gap-2 text-[15px] hover:bg-action-hover active:scale-[.98] disabled:opacity-70"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Creating account" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground underline decoration-link-underline underline-offset-4 hover:decoration-foreground"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
