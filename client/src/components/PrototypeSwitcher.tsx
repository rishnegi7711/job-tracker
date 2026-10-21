// PROTOTYPE: throwaway variant switcher. Delete with src/pages/prototype/.
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = { variants: { key: string; name: string }[]; current: string };

export default function PrototypeSwitcher({ variants, current }: Props) {
  const [, setParams] = useSearchParams();
  const i = variants.findIndex((v) => v.key === current);

  useEffect(() => {
    const go = (d: number) =>
      setParams(
        { variant: variants[(i + d + variants.length) % variants.length].key },
        { replace: true },
      );
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, variants, setParams]);

  const step = (d: number) =>
    setParams(
      { variant: variants[(i + d + variants.length) % variants.length].key },
      { replace: true },
    );

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black px-2 py-1.5 text-xs font-medium text-white shadow-[0_8px_30px_rgba(0,0,0,.35)] ring-1 ring-white/20">
      <button aria-label="Previous variant" onClick={() => step(-1)} className="rounded-full p-1.5 hover:bg-white/15">
        <ChevronLeft className="size-4" />
      </button>
      <span className="min-w-44 text-center tabular-nums">
        {current} · {variants[i]?.name}
      </span>
      <button aria-label="Next variant" onClick={() => step(1)} className="rounded-full p-1.5 hover:bg-white/15">
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
