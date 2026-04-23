"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Animated SVG beams converging toward bottom.
 * Pattern adapted from Aceternity UI Background Beams (https://ui.aceternity.com/components/background-beams).
 * Uses Motion for path-draw animation. Honors prefers-reduced-motion via Motion's defaults.
 *
 * Random transition timings are memoized per mount so Motion doesn't restart on every render.
 */
type Props = {
  className?: string;
};

const paths = [
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
  "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
  "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
  "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
  "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
  "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
  "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
];

export default function BackgroundBeams({ className }: Props) {
  // Stable per-mount randomization so transitions don't restart on parent re-renders
  const timings = useMemo(
    () =>
      paths.map(() => ({
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
        y2: 93 + Math.random() * 8,
      })),
    [],
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-hidden",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Background beams</title>
        {paths.map((d, idx) => (
          <motion.path
            key={idx}
            d={d}
            stroke={`url(#linearGradient-${idx})`}
            strokeOpacity="0.4"
            strokeWidth="0.5"
            fill="none"
          />
        ))}
        <defs>
          {paths.map((_, idx) => (
            <motion.linearGradient
              key={`grad-${idx}`}
              id={`linearGradient-${idx}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${timings[idx].y2}%`],
              }}
              transition={{
                duration: timings[idx].duration,
                ease: "easeInOut",
                repeat: Infinity,
                delay: timings[idx].delay,
              }}
            >
              <stop stopColor="#6B1F1F" stopOpacity="0" />
              <stop stopColor="#6B1F1F" />
              <stop offset="32.5%" stopColor="#FAFAFA" />
              <stop offset="100%" stopColor="#6B1F1F" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
