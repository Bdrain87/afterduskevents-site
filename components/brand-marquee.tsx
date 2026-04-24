import Marquee from "@/components/marquee";

const SIGNALS = [
  "Veteran-Owned",
  "Fully Insured",
  "SE Michigan",
  "60-Mile Radius",
  "Private Events Only",
  "Starlink On-Site",
  "Real 30 ft Screen",
  "Concert-Grade Audio",
  "Battery-Powered",
  "Water-Ballast Setup",
  "Canton, MI",
] as const;

/**
 * Full-bleed brand signal marquee. Sits between sections to break the
 * card-grid rhythm and act as a rolling trust band.
 * Pauses on hover; respects reduced-motion automatically via motion-safe.
 */
export default function BrandMarquee() {
  return (
    <div
      aria-label="Brand signals"
      className="relative overflow-hidden border-y border-white/8 bg-screening/70 py-5"
    >
      <Marquee pauseOnHover className="[--duration:55s] [--gap:3.5rem]">
        {SIGNALS.map((signal) => (
          <span
            key={signal}
            className="flex shrink-0 items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-silver"
          >
            <span aria-hidden="true" className="block h-1 w-1 rounded-full bg-ember" />
            {signal}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
