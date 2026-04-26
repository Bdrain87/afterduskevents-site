"use client";

import { useEffect, useRef, useState } from "react";

const PROJECTOR_X = 48;
const PROJECTOR_Y = 24;
const CONE_SPREAD_DEG = 16;
const HALF_SPREAD = CONE_SPREAD_DEG / 2;

/**
 * A narrow cone of light emanating from a virtual projector point at the
 * top-left (48px, 24px) down through the cursor. Renders as a CSS
 * conic-gradient with mix-blend-mode: screen so ember tints show up only
 * against dark surfaces. Sections with `[data-dim-beam]` attribute dim
 * the cone to 2% alpha so text stays readable.
 *
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export default function CursorBeam() {
  const beamRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;
    setActive(true);

    const beam = beamRef.current;
    if (!beam) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let dimmed = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as Element | null;
      const dimSection = target?.closest?.("[data-dim-beam]");
      const nowDimmed = !!dimSection;
      if (nowDimmed !== dimmed) {
        dimmed = nowDimmed;
        beam.dataset.dim = nowDimmed ? "1" : "0";
      }
    };

    const tick = () => {
      // Tighter follow: ~32% lerp per frame keeps the cone close to the
      // cursor without snapping. 0.2 caused visible lag on fast moves.
      cx += (tx - cx) * 0.32;
      cy += (ty - cy) * 0.32;
      const dx = cx - PROJECTOR_X;
      const dy = cy - PROJECTOR_Y;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      beam.style.setProperty("--beam-angle", `${angle}deg`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={beamRef}
        aria-hidden="true"
        className="cursor-beam pointer-events-none fixed inset-0"
        data-dim="0"
        style={{
          zIndex: 40,
          mixBlendMode: "screen",
          opacity: "var(--atmo-beam-opacity, 1)",
          background: `conic-gradient(
            from calc(var(--beam-angle, 180deg) - ${HALF_SPREAD}deg) at ${PROJECTOR_X}px ${PROJECTOR_Y}px,
            rgba(221, 84, 84, 0) 0deg,
            rgba(221, 84, 84, var(--beam-intensity, 0.06)) ${HALF_SPREAD}deg,
            rgba(221, 84, 84, 0) ${CONE_SPREAD_DEG}deg,
            transparent ${CONE_SPREAD_DEG}.01deg 360deg
          )`,
          transition: "opacity 280ms ease-out",
        }}
      />
      {/* Dust particles near the projector point, drifting slowly. They only
          show up where the beam brightens them against dark surfaces. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          top: PROJECTOR_Y,
          left: PROJECTOR_X,
          width: 240,
          height: 180,
          zIndex: 40,
          mixBlendMode: "screen",
          opacity: "calc(var(--atmo-beam-opacity, 1) * 0.6)",
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full beam-dust"
            style={{
              width: 2,
              height: 2,
              background: "rgba(245, 241, 236, 0.7)",
              left: `${15 + i * 30}%`,
              top: `${18 + ((i * 41) % 60)}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: "6s",
            }}
          />
        ))}
      </div>
    </>
  );
}
