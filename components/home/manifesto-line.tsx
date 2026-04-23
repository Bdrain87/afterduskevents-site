/**
 * One statement line that replaces the three-row "WE TURN..." block. Sits
 * centered in a 60vh section. No box, no gradient card. The sky behind
 * does the work.
 */
export default function ManifestoLine() {
  return (
    <section
      aria-label="What we bring"
      className="relative flex items-center overflow-hidden px-6 sm:px-10"
      style={{ minHeight: "60vh", paddingTop: "96px", paddingBottom: "96px" }}
    >
      <div className="mx-auto max-w-5xl">
        <p className="kinetic-headline font-display text-projector text-display-xl tracking-wider leading-none">
          <span style={{ animationDelay: "0ms" }}>You</span>{" "}
          <span style={{ animationDelay: "60ms" }}>already</span>{" "}
          <span style={{ animationDelay: "120ms" }}>have</span>{" "}
          <span style={{ animationDelay: "180ms" }}>the</span>{" "}
          <span style={{ animationDelay: "240ms" }}>yard.</span>{" "}
          <span style={{ animationDelay: "320ms" }}>The</span>{" "}
          <span style={{ animationDelay: "380ms" }}>people.</span>{" "}
          <span style={{ animationDelay: "440ms" }}>The</span>{" "}
          <span style={{ animationDelay: "500ms" }}>night.</span>
        </p>
        <p className="mt-8 font-display text-ember text-display-lg tracking-wider leading-tight">
          We bring the other half.
        </p>
      </div>
    </section>
  );
}
