const name = "Applyd";

// lg: letters drop in like cards settling on the board (same `settle` motion as MiniBoard).
// sm: static, for the TopBar, which remounts on every navigation.
const Wordmark = ({ size = "lg" }: { size?: "lg" | "sm" }) => {
  const sm = size === "sm";
  return (
    <div
      className={`flex w-fit items-center rounded-lg bg-primary font-semibold tracking-tight text-primary-foreground ${sm ? "h-9 px-3 text-base" : "h-12 px-5 text-xl"}`}
    >
      {sm ? (
        name
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Wordmark;
