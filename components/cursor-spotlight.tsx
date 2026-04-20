"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf: number;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      spot.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40"
      style={{
        width: 400,
        height: 400,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(107,31,31,0.06) 0%, rgba(107,31,31,0.02) 40%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
