// PROTOTYPE A "Paper": warm, quiet, Notion-like. Motion = cards settling into columns; success moves one to Offer.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import z from "zod";
import { Check, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
type Input = z.infer<typeof schema>;
type Status = "idle" | "pending" | "error" | "success";

const columns = ["Applied", "Interview", "Offer"];
const cards = [
  { n: "Linear", col: 0 },
  { n: "Vercel", col: 0 },
  { n: "Stripe", col: 1 },
  { n: "Figma", col: 1 },
  { n: "Notion", col: 2 },
];

const field =
  "h-10 w-full rounded-lg border border-[#e6e2da] bg-white px-3 text-[15px] text-[#37352f] outline-none transition-shadow placeholder:text-[#b4b0a8] focus:border-[#2383e2] focus:shadow-[0_0_0_3px_rgba(35,131,226,.18)]";

export default function LoginVariantA() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submit = async (d: Input) => {
    setStatus("pending");
    await new Promise((r) => setTimeout(r, 900));
    const ok = d.password !== "wrong";
    setStatus(ok ? "success" : "error");
    if (ok) setTimeout(() => setStatus("idle"), 2800);
  };

  const placed = cards.map((c) => ({
    ...c,
    col: c.n === "Stripe" && status === "success" ? 2 : c.col,
  }));

  return (
    <div className="lp flex min-h-screen flex-col items-center justify-center bg-[#f9f8f6] px-4 py-20 text-[#37352f]">
      <div className="w-full max-w-[360px]">
        <div className="lp-rise" style={{ "--d": "0ms" } as React.CSSProperties}>
          <div className="mb-8 flex size-9 items-center justify-center rounded-lg bg-[#37352f] text-sm font-semibold text-[#faf8f5]">
            A
          </div>
          <h1 className="lp-serif text-[30px] leading-[1.1] font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-[15px] text-[#65625c]">
            Pick up where your search left off.
          </p>
        </div>

        {/* mini board */}
        <div
          aria-hidden
          className="relative mt-7 h-[112px] rounded-xl border border-[#ece8e0] bg-[#f4f1ea]/70"
        >
          {columns.map((c, i) => (
            <span
              key={c}
              className="absolute top-2 text-[11px] font-medium tracking-wide text-[#8a867d] uppercase"
              style={{ left: `calc(${i} * 33.333% + 10px)` }}
            >
              {c}
            </span>
          ))}
          {placed.map((c, i) => {
            const row = placed.slice(0, i).filter((p) => p.col === c.col).length;
            const won = c.n === "Stripe" && c.col === 2;
            return (
              <div
                key={c.n}
                className="absolute"
                style={{
                  left: `calc(${c.col} * 33.333% + 6px)`,
                  top: 26 + row * 34,
                  width: "calc(33.333% - 12px)",
                  transition:
                    "left .7s cubic-bezier(.2,.8,.2,1), top .7s cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <div
                  className="lp-settle truncate rounded-md border bg-white px-2 py-1.5 text-xs shadow-[0_1px_2px_rgba(55,53,47,.08)]"
                  style={
                    {
                      "--d": `${250 + i * 90}ms`,
                      borderColor: won ? "#4dab9a" : "#ece8e0",
                    } as React.CSSProperties
                  }
                >
                  {c.n}
                </div>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit(submit)}
          className="lp-rise mt-7 flex flex-col gap-4"
          style={{ "--d": "150ms" } as React.CSSProperties}
        >
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Email
            <input {...register("email")} type="email" placeholder="you@email.com" className={field} />
            {errors.email && <span className="text-xs font-normal text-[#eb5757]">{errors.email.message}</span>}
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Password
            <input {...register("password")} type="password" className={field} />
            {errors.password && <span className="text-xs font-normal text-[#eb5757]">{errors.password.message}</span>}
          </label>
          {status === "error" && (
            <p className="text-sm text-[#eb5757]">That password doesn&apos;t match.</p>
          )}
          <button
            disabled={status === "pending"}
            className="mt-1 flex h-10 items-center justify-center gap-2 rounded-lg bg-[#37352f] text-[15px] font-medium text-white transition-all hover:bg-[#2b2a26] active:scale-[.98] disabled:opacity-70"
          >
            {status === "pending" && <Loader2 className="size-4 animate-spin" />}
            {status === "success" && <Check className="size-4" />}
            {status === "pending" ? "Signing in" : status === "success" ? "Signed in" : "Continue"}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#65625c]">
          New here?{" "}
          <Link to="/register" className="font-medium text-[#37352f] underline decoration-[#d3cfc6] underline-offset-4 hover:decoration-[#37352f]">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
