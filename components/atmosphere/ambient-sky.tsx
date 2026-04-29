"use client";

import Starfield from "./starfield";

/**
 * Fixed-position backdrop that shows through the whole site: deep screening
 * base + a single low-amp deep-space radial + Starfield on top. Previously
 * rendered a MeshGradient shader which blew out text contrast and looked
 * like a pink smear on every page — removed.
 */
export default function AmbientSky() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1, background: "#0A0A0A" }}
    >
      {/* Very subtle deep-space radial so the sky isn't flat black */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 120%, rgba(18, 12, 32, 0.55) 0%, rgba(10, 10, 15, 0.8) 45%, #060608 100%)",
        }}
      />
      <div className="absolute inset-0" style={{ opacity: "var(--atmo-star-opacity, 0.95)" }}>
        <Starfield quantity={220} maxSize={1.7} vy={0.012} />
      </div>
    </div>
  );
}
