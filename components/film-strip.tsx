/**
 * Horizontal film-perforation strip — section divider. Two rows of
 * regular rectangular holes, 35mm film proportions.
 */
type Props = {
  tone?: "ink" | "paper";
  className?: string;
};

export default function FilmStrip({ tone = "ink", className = "" }: Props) {
  const fg = tone === "ink" ? "#0E0A08" : "#F0E5D0";
  const bg = tone === "ink" ? "#F0E5D0" : "#0E0A08";
  return (
    <div
      aria-hidden="true"
      className={`w-full ${className}`}
      style={{
        height: 40,
        background: fg,
        backgroundImage:
          `linear-gradient(${bg} 0 0), linear-gradient(${bg} 0 0)`,
        backgroundPosition: "0 6px, 0 calc(100% - 6px)",
        backgroundSize: "100% 10px, 100% 10px",
        backgroundRepeat: "no-repeat, no-repeat",
        maskImage:
          "linear-gradient(90deg, black 0 0)," +
          "repeating-linear-gradient(90deg, black 0 12px, transparent 12px 24px)",
        WebkitMaskImage:
          "linear-gradient(90deg, black 0 0)," +
          "repeating-linear-gradient(90deg, black 0 12px, transparent 12px 24px)",
      }}
    >
      {/* Perforation holes rendered as inline SVG for crisp rectangles */}
      <svg
        width="100%"
        height="40"
        viewBox="0 0 800 40"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <rect width="800" height="40" fill={fg} />
        {Array.from({ length: 40 }).map((_, i) => (
          <g key={i}>
            <rect x={i * 20 + 4} y={5} width={12} height={8} fill={bg} rx={1} />
            <rect x={i * 20 + 4} y={27} width={12} height={8} fill={bg} rx={1} />
          </g>
        ))}
      </svg>
    </div>
  );
}
