/**
 * Concentric-arc sound visualization scaled to speaker count.
 * 1 / 2 / 3 / 5 arcs matching the four audio tiers. More arcs = more coverage.
 * Pure SVG, reduced-motion safe (a subtle scale pulse is gated under motion-safe).
 */
type Props = {
  speakers: number;
  subs?: number;
  className?: string;
};

export default function Waveform({ speakers, subs = 0, className }: Props) {
  // Arcs rendered = speakers + subs, capped at 5
  const rings = Math.min(5, speakers + subs);
  const sizes = Array.from({ length: rings }).map((_, i) => 36 + i * 22);
  const maxSize = sizes[sizes.length - 1] ?? 36;

  return (
    <svg
      aria-hidden="true"
      viewBox={`${-maxSize - 8} ${-maxSize - 8} ${maxSize * 2 + 16} ${maxSize + 16}`}
      className={className}
    >
      {/* Ground line */}
      <line
        x1={-maxSize - 4}
        y1={0}
        x2={maxSize + 4}
        y2={0}
        stroke="#2a2a2a"
        strokeWidth={1}
      />
      {/* Emitter */}
      <circle cx={0} cy={0} r={4} fill="#DD5454" />
      <circle cx={0} cy={0} r={8} fill="#DD5454" fillOpacity={0.12} />
      {/* Arcs, each a top half of an ellipse */}
      {sizes.map((r, i) => (
        <path
          key={r}
          d={`M ${-r} 0 A ${r} ${r * 0.62} 0 0 1 ${r} 0`}
          fill="none"
          stroke="#DD5454"
          strokeOpacity={Math.max(0.18, 0.85 - i * 0.13)}
          strokeWidth={1.1}
          className="motion-safe:animate-[wave-breathe_3.8s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.22}s`, transformOrigin: "0 0" }}
        />
      ))}
      {/* Subwoofer underscore: thicker, darker, below ground */}
      {subs > 0 && (
        <g>
          {Array.from({ length: subs }).map((_, i) => (
            <path
              key={`sub-${i}`}
              d={`M ${-sizes[0] - i * 6} 2 A ${sizes[0] + i * 8} ${(sizes[0] + i * 8) * 0.28} 0 0 0 ${sizes[0] + i * 6} 2`}
              fill="none"
              stroke="#6B1F1F"
              strokeOpacity={0.75 - i * 0.2}
              strokeWidth={1.5}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
