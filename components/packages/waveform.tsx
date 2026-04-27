/**
 * Volumetric speaker scene. Replaces the flat concentric-arc viz with a
 * dimensional 3D-feeling stage:
 *   - Receding perspective rays in the dome area
 *   - N isometric speaker cabinets on the ground line (scales with `speakers`)
 *   - Stacked translucent domes (radial-gradient fills, mix-blend screen) so
 *     overlapping rings glow additively instead of stacking lifeless lines
 *   - Sub cabinets + a wide, low ellipse dome below ground for `subs`
 *   - Ember-gradient ground line for cinematic anchor
 *
 * Pure SVG, no client JS. Reduced-motion safe (the per-ring breathe pulse
 * is gated under `motion-safe`). Aspect ratio is roughly 2:1; renders
 * cleanly from 64px-wide corner badges to full-card hero blocks.
 */
type Props = {
  speakers: number;
  subs?: number;
  className?: string;
};

const VIEWBOX = { x: -100, y: -68, w: 200, h: 90 };
const MAX_DOMES = 5;

export default function Waveform({ speakers, subs = 0, className }: Props) {
  const domes = Math.min(MAX_DOMES, speakers + subs);
  const baseRadius = 30;
  const radiusStep = 13;
  const domeRadii = Array.from({ length: domes }).map(
    (_, i) => baseRadius + i * radiusStep,
  );
  const maxR = domeRadii[domeRadii.length - 1] ?? baseRadius;

  // Speaker cabinet positions on the ground line.
  // 1: centered, 2: spread, 4: distributed.
  const spkSpacing = speakers <= 2 ? 22 : 14;
  const speakerPositions = Array.from({ length: speakers }).map(
    (_, i) => (i - (speakers - 1) / 2) * spkSpacing,
  );

  // Subwoofer cabinets: a touch wider, sit slightly forward (lower on screen).
  const subSpacing = 30;
  const subPositions = Array.from({ length: subs }).map(
    (_, i) => (i - (subs - 1) / 2) * subSpacing,
  );

  return (
    <svg
      aria-hidden="true"
      viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Volumetric dome fill: bright at apex, dissolves toward edges */}
        <radialGradient id="adv-dome-fill" cx="50%" cy="100%" r="100%">
          <stop offset="0%" stopColor="#DD5454" stopOpacity="0.32" />
          <stop offset="55%" stopColor="#DD5454" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#DD5454" stopOpacity="0" />
        </radialGradient>
        {/* Dome stroke gradient: hot top, cool feet — sells depth */}
        <linearGradient id="adv-dome-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF8E8E" stopOpacity="1" />
          <stop offset="55%" stopColor="#DD5454" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6B1F1F" stopOpacity="0.1" />
        </linearGradient>
        {/* Subwoofer dome fill (below ground): deeper oxblood */}
        <radialGradient id="adv-sub-fill" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#7A2828" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#6B1F1F" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4A0E0E" stopOpacity="0" />
        </radialGradient>
        {/* Speaker grille glow — looks like a hot driver behind the cabinet face */}
        <radialGradient id="adv-grille" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC4C4" stopOpacity="1" />
          <stop offset="55%" stopColor="#DD5454" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#6B1F1F" stopOpacity="0.55" />
        </radialGradient>
        {/* Ground line: ember at center, fades to nothing at edges */}
        <linearGradient id="adv-ground" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3A3A3A" stopOpacity="0" />
          <stop offset="20%" stopColor="#3A3A3A" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#DD5454" stopOpacity="0.7" />
          <stop offset="80%" stopColor="#3A3A3A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3A3A3A" stopOpacity="0" />
        </linearGradient>
        {/* Soft halo behind speakers, suggests live energy on the deck */}
        <radialGradient id="adv-deck-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DD5454" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#DD5454" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Receding perspective rays in the dome area. Faint — just enough to
          telegraph "you're looking at a stage from above the seats." */}
      <g opacity={0.22}>
        {[-0.85, -0.5, -0.18, 0.18, 0.5, 0.85].map((t) => (
          <line
            key={`ray-${t}`}
            x1={t * 95}
            y1={0}
            x2={t * 28}
            y2={-maxR - 4}
            stroke="#3A3A3A"
            strokeWidth={0.4}
          />
        ))}
        {/* One arc at the very top echoing the dome shape, very faint */}
        <path
          d={`M ${-(maxR + 6)} 0 A ${maxR + 6} ${(maxR + 6) * 0.62} 0 0 1 ${maxR + 6} 0`}
          fill="none"
          stroke="#3A3A3A"
          strokeOpacity={0.4}
          strokeWidth={0.35}
          strokeDasharray="1.2 2.4"
        />
      </g>

      {/* Subwoofer dome below ground — wide, low, slow */}
      {subs > 0 && (
        <g style={{ mixBlendMode: "screen" }}>
          <ellipse
            cx={0}
            cy={0}
            rx={maxR + 16}
            ry={(maxR + 16) * 0.32}
            fill="url(#adv-sub-fill)"
            className="motion-safe:animate-[wave-breathe_5.4s_ease-in-out_infinite]"
            style={{ transformOrigin: "0 0", transformBox: "fill-box" }}
          />
          <ellipse
            cx={0}
            cy={0}
            rx={maxR + 16}
            ry={(maxR + 16) * 0.32}
            fill="none"
            stroke="#7A2828"
            strokeOpacity={0.6}
            strokeWidth={0.55}
            strokeDasharray={subs > 1 ? "0" : "0"}
          />
          {subs > 1 && (
            <ellipse
              cx={0}
              cy={0}
              rx={maxR + 4}
              ry={(maxR + 4) * 0.3}
              fill="none"
              stroke="#7A2828"
              strokeOpacity={0.5}
              strokeWidth={0.5}
            />
          )}
        </g>
      )}

      {/* Volumetric domes above ground — rendered back-to-front so the
          smallest (front) dome sits on top of the larger ones. */}
      <g style={{ mixBlendMode: "screen" }}>
        {domeRadii
          .slice()
          .reverse()
          .map((r, idx) => {
            const i = domeRadii.length - 1 - idx;
            const fillOpacity = Math.max(0.18, 0.62 - i * 0.1);
            const strokeOpacity = Math.max(0.32, 0.95 - i * 0.13);
            return (
              <g
                key={r}
                className="motion-safe:animate-[wave-breathe_4.2s_ease-in-out_infinite]"
                style={{
                  transformOrigin: "0 0",
                  transformBox: "fill-box",
                  animationDelay: `${i * 0.28}s`,
                }}
              >
                {/* Filled dome */}
                <path
                  d={`M ${-r} 0 A ${r} ${r * 0.62} 0 0 1 ${r} 0 Z`}
                  fill="url(#adv-dome-fill)"
                  opacity={fillOpacity}
                />
                {/* Outline arc */}
                <path
                  d={`M ${-r} 0 A ${r} ${r * 0.62} 0 0 1 ${r} 0`}
                  fill="none"
                  stroke="url(#adv-dome-stroke)"
                  strokeOpacity={strokeOpacity}
                  strokeWidth={1}
                  strokeLinecap="round"
                />
              </g>
            );
          })}
      </g>

      {/* Ground line. Drawn after domes so it cuts cleanly across them. */}
      <line
        x1={-95}
        y1={0}
        x2={95}
        y2={0}
        stroke="url(#adv-ground)"
        strokeWidth={0.85}
      />

      {/* Halo behind the speaker cluster — soft red presence on the deck */}
      <ellipse
        cx={0}
        cy={-1}
        rx={Math.max(20, speakerPositions.length * 12 + 4)}
        ry={6}
        fill="url(#adv-deck-halo)"
        opacity={0.7}
        style={{ mixBlendMode: "screen" }}
      />

      {/* Speaker cabinets — small isometric cuboids facing the viewer.
          Top trapezoid sells the perspective; the grille is the warm focal
          point so the eye lands on the speaker before the dome. */}
      {speakerPositions.map((x, i) => (
        <g key={`spk-${i}`} transform={`translate(${x}, 0)`}>
          {/* Cast shadow */}
          <ellipse cx={0.4} cy={1.6} rx={6.5} ry={1.4} fill="#000" opacity={0.6} />
          {/* Side face (right, isometric) */}
          <path d="M 4 -8 L 5.4 -7 L 5.4 1.1 L 4 0 Z" fill="#070707" />
          {/* Front face */}
          <rect x={-4} y={-8} width={8} height={8} fill="#161616" />
          {/* Top face */}
          <path
            d="M -4 -8 L 4 -8 L 5.4 -7 L -2.6 -7 Z"
            fill="#262626"
          />
          {/* Bezel ring around grille */}
          <circle cx={0} cy={-4} r={2.6} fill="#0A0A0A" />
          {/* Hot grille */}
          <circle cx={0} cy={-4} r={2.1} fill="url(#adv-grille)" />
          {/* Specular highlight on the top edge */}
          <line
            x1={-3.6}
            y1={-7.92}
            x2={3.6}
            y2={-7.92}
            stroke="#DD5454"
            strokeOpacity={0.55}
            strokeWidth={0.35}
          />
          {/* Tiny status LED, bottom-front */}
          <circle cx={-2.6} cy={-1} r={0.4} fill="#FFC4C4" opacity={0.85} />
        </g>
      ))}

      {/* Subwoofer cabinets — wider, shorter, sit on ground in front of speakers */}
      {subPositions.map((x, i) => (
        <g key={`sub-${i}`} transform={`translate(${x}, 0)`}>
          <ellipse cx={0.6} cy={3.4} rx={9} ry={1.5} fill="#000" opacity={0.7} />
          {/* Side face */}
          <path d="M 7 0 L 8.6 1 L 8.6 5.6 L 7 4.6 Z" fill="#050505" />
          {/* Front face */}
          <rect x={-7} y={0} width={14} height={4.6} fill="#101010" />
          {/* Top face */}
          <path d="M -7 0 L 7 0 L 8.6 1 L -5.4 1 Z" fill="#1c1c1c" />
          {/* Driver */}
          <circle cx={0} cy={2.6} r={1.4} fill="url(#adv-grille)" opacity={0.75} />
          {/* Top edge highlight */}
          <line
            x1={-6.6}
            y1={0.08}
            x2={6.6}
            y2={0.08}
            stroke="#6B1F1F"
            strokeOpacity={0.7}
            strokeWidth={0.3}
          />
        </g>
      ))}
    </svg>
  );
}
