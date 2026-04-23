/**
 * Diagonal meteor streaks atmospheric effect.
 * Pattern adapted from Magic UI Meteors (https://magicui.design/docs/components/meteors).
 * Pure CSS animation, no JS, no deps. Honors prefers-reduced-motion via Tailwind motion-safe.
 */
import { cn } from "@/lib/utils";

type Props = {
  number?: number;
  className?: string;
};

export default function Meteors({ number = 12, className }: Props) {
  const meteors = Array.from({ length: number });
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {meteors.map((_, idx) => {
        const left = Math.random() * 100;
        const delay = (Math.random() * 6).toFixed(2);
        const duration = (Math.random() * 5 + 6).toFixed(2);
        return (
          <span
            key={idx}
            className="motion-safe:animate-meteor absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-full bg-projector shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
            style={{
              top: "-5%",
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <span className="absolute top-1/2 -translate-y-1/2 h-px w-[60px] bg-gradient-to-r from-projector/70 to-transparent pointer-events-none" />
          </span>
        );
      })}
    </div>
  );
}
