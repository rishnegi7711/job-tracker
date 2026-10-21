// PROTOTYPE B "Command": dark, Linear/Raycast. Motion = cursor spotlight on the card; pipeline fills as the form completes.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import z from "zod";
import { Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
type Input = z.infer<typeof schema>;
type Status = "idle" | "pending" | "error" | "success";

const steps = ["Applied", "Interview", "Offer"];
const rows = [
  { co: "Linear", role: "Product Engineer", dot: "#5e6ad2" },
  { co: "Vercel", role: "Frontend Engineer", dot: "#e5a13a" },
  { co: "Stripe", role: "Full-stack Engineer", dot: "#4cb782" },
  { co: "Raycast", role: "Software Engineer", dot: "#8a8f98" },
];

const field =
  "h-10 w-full rounded-lg border border-white/10 bg-white/[.04] px-3 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#5e6ad2] focus:bg-white/[.06] focus:shadow-[0_0_0_3px_rgba(94,106,210,.25)]";

export default function LoginVariantB() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submit = async (d: Input) => {
    setStatus("pending");
    await new Promise((r) => setTimeout(r, 900));
    const ok = d.password !== "wrong";
    setStatus(ok ? "success" : "error");
    if (ok) setTimeout(() => setStatus("idle"), 2800);
  };

  const emailOk = schema.shape.email.safeParse(watch("email")).success;
  const pwOk = !!watch("password");
  const step = status === "success" ? 2 : emailOk ? (pwOk ? 2 : 1) : 0;

  return (
    <div className="lp grid min-h-screen bg-[#08090a] text-[#f7f8f8] lg:grid-cols-2">
      <div className="relative flex items-center justify-center px-6 py-20">
        <div
          className="lp-rise relative w-full max-w-[380px] rounded-2xl bg-white/[.09] p-px"
          style={{
            background:
              "radial-gradient(260px circle at var(--x,50%) var(--y,0%), rgba(255,255,255,.35), rgba(255,255,255,.08) 70%)",
          }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
            e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
          }}
        >
          <form
            onSubmit={handleSubmit(submit)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit(submit)();
            }}
            className="flex flex-col gap-4 rounded-[15px] bg-[#0d0e10] p-7"
          >
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Log in to Applyd</h1>
              <p className="mt-1 text-sm text-white/45">Your pipeline is waiting.</p>
            </div>

            {/* pipeline: fills as the form completes */}
            <div aria-hidden className="relative flex items-center justify-between py-2">
              <div className="absolute inset-x-2 top-1/2 h-px bg-white/10" />
              <div
                className="absolute top-1/2 left-2 h-px origin-left bg-[#5e6ad2]"
                style={{
                  width: "calc(100% - 16px)",
                  transform: `scaleX(${step / 2})`,
                  transition: "transform .6s cubic-bezier(.2,.8,.2,1)",
                }}
              />
              {steps.map((s, i) => (
                <div key={s} className="relative flex flex-col items-center gap-1.5">
                  <span
                    className={`block size-2.5 rounded-full ring-4 ring-[#0d0e10] transition-colors duration-500 ${i <= step ? "bg-[#5e6ad2]" : "bg-white/15"} ${status === "success" && i === 2 ? "lp-pulse" : ""}`}
                  />
                  <span className={`absolute top-4 text-[11px] whitespace-nowrap transition-colors duration-500 ${i <= step ? "text-white/70" : "text-white/25"}`}>
                    {s}
                  </span>
                </div>
              ))}
            </div>

            <label className="mt-4 flex flex-col gap-1.5 text-xs font-medium text-white/60">
              Email
              <input {...register("email")} type="email" placeholder="you@email.com" className={field} />
              {errors.email && <span className="text-xs font-normal text-[#eb5757]">{errors.email.message}</span>}
            </label>
            <label className="flex flex-col gap-1.5 text-xs font-medium text-white/60">
              Password
              <input {...register("password")} type="password" className={field} />
              {errors.password && <span className="text-xs font-normal text-[#eb5757]">{errors.password.message}</span>}
            </label>
            {status === "error" && <p className="text-sm text-[#eb5757]">Wrong email or password.</p>}

            <button
              disabled={status === "pending"}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#5e6ad2] text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2)] transition-all hover:bg-[#6c78e0] active:scale-[.98] disabled:opacity-70"
            >
              {status === "pending" && <Loader2 className="size-4 animate-spin" />}
              {status === "success" ? "Welcome back" : status === "pending" ? "Signing in" : "Continue"}
              {status === "idle" && (
                <kbd className="lp-mono ml-1 rounded bg-white/15 px-1.5 py-0.5 text-[10px]">⌘↵</kbd>
              )}
            </button>
            <p className="text-center text-xs text-white/40">
              No account?{" "}
              <Link to="/register" className="text-white/80 hover:text-white">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* faux command palette */}
      <div aria-hidden className="relative hidden items-center justify-center overflow-hidden border-l border-white/[.06] lg:flex">
        <div className="absolute size-[520px] rounded-full bg-[#5e6ad2]/10 blur-[110px]" />
        <div className="lp-rise relative w-[420px] overflow-hidden rounded-xl border border-white/10 bg-[#0d0e10]/90 " style={{ "--d": "250ms" } as React.CSSProperties}>
          <div className="flex h-12 items-center justify-between border-b border-white/[.06] px-4 text-sm text-white/35">
            Search applications…
            <kbd className="lp-mono rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/50">⌘K</kbd>
          </div>
          <div className="relative p-1.5">
            <div className="lp-sel absolute inset-x-1.5 top-1.5 h-12 rounded-lg bg-white/[.07]" />
            {rows.map((r) => (
              <div key={r.co} className="relative flex h-12 items-center gap-3 px-3 text-sm">
                <span className="size-2 rounded-full" style={{ background: r.dot }} />
                <span className="font-medium">{r.co}</span>
                <span className="text-white/40">{r.role}</span>
                <kbd className="lp-mono ml-auto text-[10px] text-white/25">↵</kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
