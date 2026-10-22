const name = "Applyd";

// Letters drop in like cards settling on the board (same `settle` motion as MiniBoard).
const Wordmark = () => (
  <div className="flex h-12 w-fit items-center rounded-lg bg-primary px-5 text-xl font-semibold tracking-tight text-primary-foreground">
    <span className="sr-only">{name}</span>
    <span aria-hidden className="flex">
      {[...name].map((ch, i) => (
        <span
          key={i}
          className="inline-block animate-settle motion-reduce:animate-none"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  </div>
);

export default Wordmark;
