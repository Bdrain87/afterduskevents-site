"use client";

import SkyGradient from "./sky-gradient";
import Starfield from "./starfield";

/**
 * The whole site lives in one continuous sky. SkyGradient drifts softly in
 * the background, Starfield twinkles on top, both fixed to the viewport so
 * content scrolls "past" the sky rather than over a new one each section.
 */
export default function AmbientSky() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <SkyGradient />
      <div className="absolute inset-0" style={{ opacity: "var(--atmo-star-opacity, 0.85)" }}>
        <Starfield quantity={220} maxSize={1.8} vy={0.012} />
      </div>
    </div>
  );
}
