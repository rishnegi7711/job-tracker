import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

type LoginInput = z.infer<typeof loginSchema>;

const sendLoginData = async (data: LoginInput) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { mutate, isPending } = useMutation({
    mutationFn: sendLoginData,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
  });
  const onSubmit = (data: LoginInput) => {
    mutate(data);
  };
  return (
    <div className="justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email: <input {...register("email")} type="email" />
        </label>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <label>
          Password: <input {...register("password")} type="password" />
        </label>
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <button disabled={isPending} type="submit">
          {isPending ? "Logging In" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
