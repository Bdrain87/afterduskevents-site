/**
 * Warm light-leak overlay — diagonal amber washes at screen corners,
 * evoking a photograph that sat in a shoebox. Static, ignored by pointer.
 */
export default function LightLeak() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 8% -10%, rgba(232,184,76,0.22), transparent 55%), " +
          "radial-gradient(ellipse 50% 35% at 100% 110%, rgba(184,40,30,0.18), transparent 55%)",
      }}
    />
  );
}
