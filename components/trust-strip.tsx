type Props = {
  className?: string;
};

const items = ["Veteran-Owned", "Fully Insured", "SE Michigan"] as const;

export default function TrustStrip({ className }: Props) {
  return (
    <div
      className={[
        "flex flex-wrap items-center gap-x-5 gap-y-2",
        className ?? "",
      ].join(" ")}
    >
      {items.map((label, i) => (
        <span key={label} className="inline-flex items-center gap-5">
          {i > 0 && (
            <span className="text-white/20 hidden sm:inline select-none" aria-hidden="true">
              ·
            </span>
          )}
          <span className="text-steel/60 text-[11px] tracking-[0.25em] uppercase">
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}
