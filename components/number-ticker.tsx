"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Counts up to a target value when the element scrolls into view.
 * Pattern adapted from Magic UI Number Ticker (https://magicui.design/docs/components/number-ticker).
 * Honors prefers-reduced-motion (renders final value immediately).
 */
type Props = {
  value: number;
  /** ms */
  durationMs?: number;
  /** Optional decimal places */
  decimals?: number;
  className?: string;
  /** Format helper, e.g. (n) => `${n}+` */
  format?: (n: number) => string;
};

export default function NumberTicker({
  value,
  durationMs = 1500,
  decimals = 0,
  className,
  format,
}: Props) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            setShown(value * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setShown(value);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  const display = decimals > 0 ? shown.toFixed(decimals) : Math.round(shown).toString();
  const out = format ? format(Math.round(shown)) : display;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {out}
    </span>
  );
}
