/**
 * Continuous horizontal marquee.
 * Pattern adapted from Magic UI Marquee (https://magicui.design/docs/components/marquee).
 * Pure CSS animation, GPU-accelerated, no JS deps.
 */
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  /** Number of times to repeat children (for seamless loop). Defaults to 4. */
  repeat?: number;
};

export default function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
}: Props) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1.5rem]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around gap-[--gap] motion-safe:[animation-duration:var(--duration)]",
            vertical
              ? "motion-safe:animate-marquee-vertical flex-col"
              : "motion-safe:animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
          aria-hidden={i > 0 ? "true" : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
