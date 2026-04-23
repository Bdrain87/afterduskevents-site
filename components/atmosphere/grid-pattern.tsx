/**
 * Subtle SVG grid pattern background.
 * Pattern adapted from Magic UI Grid Pattern (https://magicui.design/docs/components/grid-pattern).
 * Pure SVG, no JS, no deps.
 */
import { cn } from "@/lib/utils";

type Props = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string;
  className?: string;
};

export default function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  className,
}: Props) {
  const patternId = `grid-pattern-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-projector/5 stroke-projector/10",
        className,
      )}
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill={`url(#${patternId})`} />
    </svg>
  );
}
