import z from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().min(1, "VITE_API_URL is required"),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("Invalid environment variables");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Missing required environment variables - check client/.env");
}

export const env = parsed.data;
