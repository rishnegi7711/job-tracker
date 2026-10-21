// PROTOTYPE C "Ledger": editorial wildcard. Motion = stage ticker; a rubber stamp lands on submit.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import z from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
type Input = z.infer<typeof schema>;
type Status = "idle" | "pending" | "error" | "success";

const stages = ["01 Applied", "02 Screen", "03 Onsite", "04 Offer", "01 Applied"];

const field =
  "lp-mono h-11 w-full border-0 border-b border-[#0b0f1a]/40 bg-transparent px-0 text-[15px] text-[#0b0f1a] outline-none transition-colors placeholder:text-[#0b0f1a]/30 focus:border-[#0b0f1a] focus:border-b-2";

export default function LoginVariantC() {
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
    setTimeout(() => setStatus("idle"), 2800);
  };

  return (
    <div className="lp grid min-h-screen bg-[#eef0f3] text-[#0b0f1a] md:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col justify-between bg-[#2340ff] text-white p-8 md:p-12">
        <span className="lp-mono text-sm">Applyd</span>
        <h1
          className="lp-rise text-[clamp(3rem,8.5vw,8.5rem)] leading-[.9] font-semibold tracking-[-0.04em]"
        >
          Accounted for.
        </h1>
        <div className="lp-mono flex items-center gap-3 text-sm">
          <span className="text-white/70">Now at</span>
          <div className="h-[1.4em] overflow-hidden leading-[1.4]">
            <div className="lp-roll">
              {stages.map((s, i) => (
                <div key={i}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center px-8 py-16 md:px-12">
        <form
          onSubmit={handleSubmit(submit)}
          className={`lp-rise relative flex w-full flex-col gap-7 ${status === "error" ? "lp-shake" : ""}`}
          style={{ "--d": "200ms" } as React.CSSProperties}
        >
          <div className="flex items-baseline justify-between border-b-2 border-[#0b0f1a] pb-2">
            <h2 className="text-lg font-semibold">Sign in</h2>
            <span className="lp-mono text-[12px] text-[#0b0f1a]/60">Form A-1</span>
          </div>
          <label className="lp-mono flex flex-col text-[13px]">
            Email
            <input {...register("email")} type="email" placeholder="you@email.com" className={field} />
            {errors.email && <span className="mt-1 text-[11px] text-[#c2331a] normal-case">{errors.email.message}</span>}
          </label>
          <label className="lp-mono flex flex-col text-[13px]">
            Password
            <input {...register("password")} type="password" className={field} />
            {errors.password && <span className="mt-1 text-[11px] text-[#c2331a] normal-case">{errors.password.message}</span>}
          </label>
          <button
            disabled={status === "pending"}
            className="h-12 bg-[#0b0f1a] text-sm font-medium text-[#eef0f3] transition-all hover:bg-[#2340ff] hover:text-white active:translate-y-px disabled:opacity-70"
          >
            {status === "pending" ? "Filing…" : "File sign-in →"}
          </button>
          <p className="lp-mono text-xs text-[#0b0f1a]/60">
            No record on file?{" "}
            <Link to="/register" className="text-[#0b0f1a] underline underline-offset-4">
              Open one
            </Link>
          </p>

          {(status === "success" || status === "error") && (
            <div
              aria-live="polite"
              className="lp-stamp lp-mono pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] border-4 px-4 py-1 text-3xl font-bold tracking-widest backdrop-blur-[1px]"
              style={{
                color: status === "success" ? "#1f7a3d" : "#c2331a",
                borderColor: status === "success" ? "#1f7a3d" : "#c2331a",
                background: "rgba(238,240,243,.8)",
              }}
            >
              {status === "success" ? "ACCEPTED" : "RETURNED"}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
