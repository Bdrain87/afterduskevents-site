type Props = {
  className?: string;
};

const items = ["Veteran-Owned", "Fully Insured", "SE Michigan"] as const;

function MiniAmericanFlag() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 38 24"
      className="h-3.5 w-5 flex-none rounded-[1px] shadow-[0_0_10px_rgba(221,84,84,0.25)]"
    >
      <rect width="38" height="24" fill="#f5f1ec" />
      {[0, 2, 4, 6, 8, 10].map((stripe) => (
        <rect key={stripe} y={stripe * 2} width="38" height="2" fill="#b91f2c" />
      ))}
      <rect width="16" height="13" fill="#17345f" />
      {[3, 8, 13].map((x) =>
        [3, 7, 11].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="0.8" fill="#f5f1ec" />
        )),
      )}
    </svg>
  );
}

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
          <span className="inline-flex items-center gap-2 text-silver text-[11px] tracking-[0.25em] uppercase">
            {i === 0 && <MiniAmericanFlag />}
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}
