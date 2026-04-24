"use client";

import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  /** ms to wait after enter before animating. Default 120. */
  delay?: number;
};

/**
 * Wraps @number-flow to tick from 0 → value when the element first scrolls
 * into view. Respects reduced-motion by snapping to the final value without
 * an animation. SSR-safe: renders static "0" on the server, hydrates to
 * animate on the client.
 */
export default function StatTicker({ value, suffix = "", prefix = "", className, delay = 120 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.setTimeout(() => setDisplay(value), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <NumberFlow value={display} />
      {suffix}
    </span>
  );
}
