"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  duration = 12,
  colorFrom = "#6B1F1F",
  colorTo = "transparent",
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-[-1px] rounded-[inherit] overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `conic-gradient(from var(--beam-angle, 0deg), ${colorTo}, ${colorFrom} 15%, ${colorTo} 30%)`,
          animation: `border-beam ${duration}s linear infinite`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
    </div>
  );
}
