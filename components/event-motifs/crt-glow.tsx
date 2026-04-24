/**
 * Gaming-night motif. CRT scanlines, subtle vignette, slow RGB drift on hover.
 * No photograph. Pure CSS + SVG.
 */
export default function CrtGlow() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden motif-bg">
      {/* Phosphor dim background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 45%, rgba(107,31,31,0.28) 0%, rgba(10,10,10,1) 70%)",
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-40 motion-safe:animate-[crt-scan_8s_linear_infinite]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(221,84,84,0.10) 0px, rgba(221,84,84,0.10) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Chromatic aberration band (left ember, right ice) */}
      <div
        className="absolute inset-0 motif-center opacity-0 mix-blend-screen transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, rgba(221,84,84,0.20) 0%, transparent 20%, transparent 80%, rgba(184,184,184,0.15) 100%)",
        }}
      />
      {/* Center vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 90px 20px rgba(0,0,0,0.85)",
        }}
      />
    </div>
  );
}
