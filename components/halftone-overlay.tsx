/**
 * Static halftone dot pattern overlay. Print-press texture — subtle,
 * always-on, zero runtime cost. Fixed position over the whole viewport.
 */
export default function HalftoneOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #0E0A08 1px, transparent 1.5px)",
        backgroundSize: "5px 5px",
        opacity: 0.05,
        mixBlendMode: "multiply",
      }}
    />
  );
}
