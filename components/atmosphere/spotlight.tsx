/**
 * Static SVG spotlight overlay for hero sections.
 * Pattern adapted from Aceternity UI (https://ui.aceternity.com/components/spotlight).
 * Pure SVG, no JS, no deps. Honors prefers-reduced-motion via CSS.
 */
type Props = {
  className?: string;
  fill?: string;
};

export default function Spotlight({
  className = "",
  fill = "rgba(107, 31, 31, 0.45)",
}: Props) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70 motion-safe:animate-spotlight ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      aria-hidden="true"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
}
