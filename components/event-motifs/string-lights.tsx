/**
 * Celebration motif. Catenary string of bulbs drooping across the card.
 * Each bulb flickers on a staggered delay. Reduced-motion: steady-on.
 * No photograph. Pure SVG + CSS.
 */
const BULBS = [
  { x: 40, y: 62, delay: 0 },
  { x: 92, y: 88, delay: 1.3 },
  { x: 144, y: 102, delay: 2.5 },
  { x: 200, y: 108, delay: 0.8 },
  { x: 256, y: 102, delay: 2.1 },
  { x: 308, y: 88, delay: 3.4 },
  { x: 360, y: 62, delay: 1.7 },
];

export default function StringLights() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 267"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full motif-bg"
    >
      <defs>
        <linearGradient id="sl-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <radialGradient id="sl-warm" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#DD5454" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#DD5454" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="267" fill="url(#sl-fade)" />
      <rect width="400" height="267" fill="url(#sl-warm)" className="motif-center" />
      {/* Catenary cable */}
      <path
        d="M 20 40 Q 200 150 380 40"
        fill="none"
        stroke="#2a2a2a"
        strokeWidth={1}
      />
      {/* Bulbs */}
      {BULBS.map((b, i) => (
        <g key={i}>
          {/* Glow halo */}
          <circle
            cx={b.x}
            cy={b.y + 4}
            r={10}
            fill="#F5F1EC"
            opacity={0.18}
            className="motion-safe:[animation:bulb-flicker_var(--bulb-dur)_ease-in-out_infinite_var(--bulb-delay)]"
            style={
              {
                ["--bulb-delay"]: `${b.delay}s`,
                ["--bulb-dur"]: "3.6s",
              } as React.CSSProperties
            }
          />
          {/* Wire drop */}
          <line
            x1={b.x}
            y1={b.y - 6}
            x2={b.x}
            y2={b.y}
            stroke="#2a2a2a"
            strokeWidth={0.75}
          />
          {/* Bulb body */}
          <circle
            cx={b.x}
            cy={b.y + 4}
            r={3.2}
            fill="#DD5454"
            className="motion-safe:[animation:bulb-flicker_var(--bulb-dur)_ease-in-out_infinite_var(--bulb-delay)]"
            style={
              {
                ["--bulb-delay"]: `${b.delay}s`,
                ["--bulb-dur"]: "3.6s",
              } as React.CSSProperties
            }
          />
        </g>
      ))}
    </svg>
  );
}
