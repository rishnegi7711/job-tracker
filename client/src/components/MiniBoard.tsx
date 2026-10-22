const columns = ["Applied", "Interview", "Offer"];
const cards = [
  { n: "Linear", col: 0 },
  { n: "Vercel", col: 0 },
  { n: "Stripe", col: 1 },
  { n: "Figma", col: 1 },
  { n: "Notion", col: 2 },
];

// `won` moves Stripe from Interview to Offer.
const MiniBoard = ({ won = false }: { won?: boolean }) => {
  const placed = cards.map((c) => ({
    ...c,
    col: c.n === "Stripe" && won ? 2 : c.col,
  }));

  return (
    <div
      aria-hidden
      className="relative h-[112px] rounded-xl border border-border bg-muted"
    >
      {columns.map((c, i) => (
        <span
          key={c}
          className="absolute top-2 text-[11px] font-medium tracking-wide text-ink-subtle uppercase"
          style={{ left: `calc(${i} * 33.333% + 10px)` }}
        >
          {c}
        </span>
      ))}
      {placed.map((c, i) => {
        const row = placed.slice(0, i).filter((p) => p.col === c.col).length;
        const offer = c.n === "Stripe" && c.col === 2;
        return (
          <div
            key={c.n}
            className="absolute transition-[left,top] duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
            style={{
              left: `calc(${c.col} * 33.333% + 6px)`,
              top: 26 + row * 34,
              width: "calc(33.333% - 12px)",
            }}
          >
            <div
              className={`animate-settle truncate rounded-md border bg-card px-2 py-1.5 text-xs shadow-[0_1px_2px_var(--card-shadow)] transition-colors motion-reduce:animate-none motion-reduce:transition-none ${offer ? "border-success" : "border-border"}`}
              style={{ animationDelay: `${250 + i * 90}ms` }}
            >
              {c.n}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MiniBoard;
