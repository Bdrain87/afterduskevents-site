"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Video object-fit treatment — defaults to cover */
  fit?: "cover" | "contain";
  /** Apply the warm dusk grade */
  duskGrade?: boolean;
};

/**
 * Subtle looping video for hero atmosphere (string lights, projector flicker, popcorn falling).
 * Auto-plays muted + inline. Honors prefers-reduced-motion by pausing.
 */
export default function Cinemagraph({
  src,
  poster,
  className,
  fit = "cover",
  duskGrade = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduce.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    apply();
    reduce.addEventListener("change", apply);
    return () => reduce.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      loop
      preload="metadata"
      aria-hidden="true"
      className={cn(
        "absolute inset-0 h-full w-full",
        fit === "cover" ? "object-cover" : "object-contain",
        duskGrade && "dusk-grade",
        className,
      )}
    />
  );
}
