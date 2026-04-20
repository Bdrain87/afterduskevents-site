"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  colorFrom = "#6B1F1F",
  colorTo = "#4A0E0E",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={{
        "--size": size,
        "--duration": duration,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": `-${delay}s`,
      } as React.CSSProperties}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width,1px)*1px)_solid_transparent]",
        "[background:linear-gradient(var(--angle,0deg),transparent,transparent)_border-box]",
        "animate-border-beam",
        className
      )}
      aria-hidden="true"
    />
  );
}
