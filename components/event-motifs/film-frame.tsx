/**
 * Movie-night motif. Outlined 35mm film frame with sprockets.
 * The frame's corner ticks brighten on card hover.
 * No photograph. Pure SVG.
 */
export default function FilmFrame() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 267"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full motif-bg"
    >
      <defs>
        <linearGradient id="ff-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <radialGradient id="ff-center-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#DD5454" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#DD5454" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#DD5454" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="267" fill="url(#ff-fade)" />
      <rect
        width="400"
        height="267"
        fill="url(#ff-center-glow)"
        className="motif-center"
      />
      {/* Top sprockets */}
      <g fill="#2a2a2a">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect
            key={`top-${i}`}
            x={18 + i * 38}
            y={14}
            width={18}
            height={10}
            rx={1.5}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <rect
            key={`bot-${i}`}
            x={18 + i * 38}
            y={243}
            width={18}
            height={10}
            rx={1.5}
          />
        ))}
      </g>
      {/* Frame cutout */}
      <rect
        x={28}
        y={42}
        width={344}
        height={183}
        fill="none"
        stroke="#6B1F1F"
        strokeOpacity={0.55}
        strokeWidth={1}
      />
      {/* Corner ticks */}
      <g stroke="#DD5454" strokeWidth={1.2} className="motif-corners">
        <path d="M28 56 L28 42 L42 42" fill="none" />
        <path d="M358 42 L372 42 L372 56" fill="none" />
        <path d="M372 211 L372 225 L358 225" fill="none" />
        <path d="M42 225 L28 225 L28 211" fill="none" />
      </g>
    </svg>
  );
}
