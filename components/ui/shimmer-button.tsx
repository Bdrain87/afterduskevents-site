"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  shimmerColor?: string;
  background?: string;
  className?: string;
  asChild?: boolean;
}

export function ShimmerButton({
  children,
  shimmerColor = "rgba(255,255,255,0.12)",
  background = "#6B1F1F",
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-8 py-4",
        "text-base font-semibold text-projector transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(107,31,31,0.4)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood",
        className
      )}
      style={{ background, "--shimmer-color": shimmerColor } as React.CSSProperties}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-lg"
        aria-hidden="true"
      >
        <div
          className="absolute -top-1/2 left-0 h-[200%] w-[60%] -translate-x-full rotate-[25deg] opacity-0 transition-all duration-700 group-hover:translate-x-[250%] group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)` }}
        />
      </div>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
