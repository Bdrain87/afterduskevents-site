/**
 * Sports motif. Two stadium-light blooms top-left and top-right, with
 * faint perspective field lines converging toward the horizon.
 * No photograph. Pure SVG.
 */
export default function StadiumBloom() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 267"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full motif-bg"
    >
      <defs>
        <radialGradient id="sb-bloom-l" cx="15%" cy="18%" r="40%">
          <stop offset="0%" stopColor="#F5F1EC" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#DD5454" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#DD5454" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sb-bloom-r" cx="85%" cy="18%" r="40%">
          <stop offset="0%" stopColor="#F5F1EC" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#DD5454" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#DD5454" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sb-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0A0A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>
      <rect width="400" height="267" fill="url(#sb-floor)" />
      {/* Field perspective lines */}
      <g stroke="#2a2a2a" strokeWidth="1" className="motif-center" opacity="0.9">
        <line x1="-20" y1="267" x2="200" y2="130" />
        <line x1="70" y1="267" x2="200" y2="130" />
        <line x1="160" y1="267" x2="200" y2="130" />
        <line x1="240" y1="267" x2="200" y2="130" />
        <line x1="330" y1="267" x2="200" y2="130" />
        <line x1="420" y1="267" x2="200" y2="130" />
      </g>
      {/* Horizon rule */}
      <line x1="0" y1="130" x2="400" y2="130" stroke="#6B1F1F" strokeOpacity="0.4" strokeWidth="0.75" />
      {/* Blooms */}
      <rect width="400" height="267" fill="url(#sb-bloom-l)" />
      <rect width="400" height="267" fill="url(#sb-bloom-r)" />
    </svg>
  );
}
