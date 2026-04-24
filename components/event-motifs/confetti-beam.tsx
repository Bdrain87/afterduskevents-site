/**
 * Graduation motif. A diagonal projector beam cutting through drifting
 * ember particles. Low particle count so it stays GPU-cheap.
 * No photograph. Pure SVG + CSS.
 */
const PARTICLES = [
  { left: 8, top: 82, delay: 0, dur: 11 },
  { left: 18, top: 36, delay: 1.5, dur: 9 },
  { left: 28, top: 68, delay: 3.2, dur: 12 },
  { left: 42, top: 24, delay: 0.9, dur: 10 },
  { left: 54, top: 58, delay: 2.4, dur: 11 },
  { left: 66, top: 18, delay: 4, dur: 13 },
  { left: 74, top: 74, delay: 1.1, dur: 10 },
  { left: 84, top: 42, delay: 2.7, dur: 9 },
  { left: 92, top: 66, delay: 3.8, dur: 12 },
];

export default function ConfettiBeam() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden motif-bg">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #1A1A1A 0%, #0A0A0A 60%, #050505 100%)",
        }}
      />
      {/* Diagonal beam */}
      <div
        className="absolute -top-10 -left-10 h-[160%] w-[70%] rotate-[22deg] motif-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(221,84,84,0) 0%, rgba(221,84,84,0.18) 40%, rgba(245,241,236,0.28) 55%, rgba(221,84,84,0.18) 70%, rgba(221,84,84,0) 100%)",
          filter: "blur(14px)",
          opacity: 0.85,
        }}
      />
      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-[color:#F5F1EC] motion-safe:animate-[confetti-drift_linear_infinite]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: 2,
            height: 2,
            opacity: 0.7,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
