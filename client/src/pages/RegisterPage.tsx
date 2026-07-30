import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import z from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password should atleast have 8 characters"),
});

type RegisterInput = z.infer<typeof registerSchema>;

const sendRegistrationData = async (data: RegisterInput) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
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
  const { mutate, isPending, isError, error } = useMutation({
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
  return (
    <div className="justify-center min-h-screen flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Applyd</h1>
        <p className="text-sm text-muted-foreground">
          One board for every application
        </p>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your details below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")} type="email" id="email" />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="password">Password</Label>
              <Input {...register("password")} type="password" id="password" />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>

            {isError && <p className="text-red-500 text-sm">{error.message}</p>}
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Registering..." : "Register"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-foreground underline-offset-4 hover:underline transition-colors"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
