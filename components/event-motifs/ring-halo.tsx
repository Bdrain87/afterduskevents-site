/**
 * Fights motif. Overhead spotlight cone narrowing onto ring canvas.
 * Oxblood halo pulses at heartbeat cadence. Reduced-motion: pulse disabled.
 * No photograph. Pure SVG + CSS.
 */
export default function RingHalo() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden motif-bg">
      <svg
        viewBox="0 0 400 267"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="rh-floor" cx="50%" cy="75%" r="45%">
            <stop offset="0%" stopColor="#6B1F1F" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#6B1F1F" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#6B1F1F" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rh-cone" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#F5F1EC" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#F5F1EC" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="400" height="267" fill="#0A0A0A" />
        {/* Spotlight cone */}
        <polygon points="180,0 220,0 280,267 120,267" fill="url(#rh-cone)" />
        {/* Floor halo */}
        <rect width="400" height="267" fill="url(#rh-floor)" />
        {/* Ring ropes */}
        <g stroke="#DD5454" strokeOpacity="0.35" strokeWidth="1">
          <line x1="40" y1="210" x2="360" y2="210" />
          <line x1="60" y1="230" x2="340" y2="230" />
          <line x1="80" y1="250" x2="320" y2="250" />
        </g>
      </svg>
      {/* Heartbeat pulse */}
      <div
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[ring-pulse_1.2s_ease-in-out_infinite] motif-pulse"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(221,84,84,0.25) 0%, rgba(221,84,84,0) 60%)",
        }}
      />
    </div>
  );
}
