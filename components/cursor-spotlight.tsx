"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Touch devices: no custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.style.cursor = "none";

    let raf: number;
    let tx = -100, ty = -100;
    let rx = -100, ry = -100;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.translate = `${tx - 4}px ${ty - 4}px`;
    };

    const onOver = (e: MouseEvent) => {
      const isInteractive = !!(e.target as HTMLElement).closest(
        "a, button, [role='button'], input, select, textarea, label",
      );
      if (isInteractive !== hovered.current) {
        hovered.current = isInteractive;
        ring.style.scale = isInteractive ? "2.2" : "1";
        ring.style.opacity = isInteractive ? "0.5" : "1";
      }
    };

    const tick = () => {
      rx += (tx - rx) * 0.1;
      ry += (ty - ry) * 0.1;
      ring.style.translate = `${rx - 20}px ${ry - 20}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot: snaps to cursor instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-ember"
        style={{ willChange: "translate" }}
      />
      {/* Ring: lags behind for cinematic feel */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full border border-ember/40 transition-[scale,opacity] duration-200"
        style={{ willChange: "translate" }}
      />
    </>
  );
}
