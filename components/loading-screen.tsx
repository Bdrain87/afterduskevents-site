"use client";

import { useEffect, useState } from "react";

/**
 * First-load curtain. Black field with a single ember pinhole that expands
 * into a wash and fades out in under 700ms. Runs once per session; skips
 * entirely under prefers-reduced-motion.
 */
export default function LoadingScreen() {
  const [phase, setPhase] = useState<"mounted" | "expanding" | "fading" | "gone">("mounted");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ade-loaded")) {
      setPhase("gone");
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      sessionStorage.setItem("ade-loaded", "1");
      return;
    }
    sessionStorage.setItem("ade-loaded", "1");

    const t1 = setTimeout(() => setPhase("expanding"), 40);
    const t2 = setTimeout(() => setPhase("fading"), 480);
    const t3 = setTimeout(() => setPhase("gone"), 720);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
      style={{
        background: "#050505",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 240ms ease-out",
      }}
    >
      <span
        className="block rounded-full"
        style={{
          width: phase === "mounted" ? 4 : phase === "expanding" ? 1400 : 2200,
          height: phase === "mounted" ? 4 : phase === "expanding" ? 1400 : 2200,
          background:
            "radial-gradient(circle, rgba(221, 84, 84, 0.55) 0%, rgba(221, 84, 84, 0.18) 38%, transparent 72%)",
          transition: "width 440ms cubic-bezier(0.16, 1, 0.3, 1), height 440ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
