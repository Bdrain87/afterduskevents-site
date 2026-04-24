import { Play } from "lucide-react";
import { FunnelSection, SectionHeader } from "@/components/funnel/layout";
import Marquee from "@/components/marquee";

const services = [
  "Netflix",
  "Disney+",
  "Prime Video",
  "Hulu",
  "Max",
  "Apple TV+",
  "YouTube",
  "Peacock",
  "Paramount+",
  "ESPN+",
  "Xbox",
  "PlayStation",
  "Switch",
  "Laptop",
  "Disc",
];

export default function ByocPanel() {
  return (
    <FunnelSection labelledBy="byoc-heading" tone="band">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeader
            id="byoc-heading"
            eyebrow="Bring your own content"
            title="NEW MOVIE. SEASON DROP. WATCH PARTY."
            body="You bring the account, playlist, disc, laptop, or console. We bring the screen, audio, power, and connection plan for a private viewing party."
            className="mb-0"
          />
        </div>
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-lg border border-ember/25 bg-[linear-gradient(135deg,rgba(107,31,31,0.24),rgba(10,10,10,0.78)_42%,rgba(26,26,26,0.82))] p-5 shadow-[0_24px_70px_rgba(107,31,31,0.16)] sm:p-6">
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-cream">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ember/45 bg-oxblood/70 text-cream shadow-[0_0_28px_rgba(221,84,84,0.16)]">
                <Play size={15} fill="currentColor" aria-hidden="true" />
              </span>
              Private viewing, your content
            </div>
            <div className="relative -mx-5 sm:-mx-6">
              <Marquee pauseOnHover className="[--duration:38s] [--gap:0.75rem]">
                {services.map((service) => (
                  <span
                    key={service}
                    className="flex shrink-0 items-center justify-center rounded-lg border border-ember/35 bg-oxblood/25 px-5 py-3 text-xs font-semibold text-cream shadow-[0_0_24px_rgba(107,31,31,0.16)] transition-colors hover:border-ember/70 hover:bg-ember/15 hover:text-projector"
                  >
                    {service}
                  </span>
                ))}
              </Marquee>
              {/* Edge fades */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#160909] to-transparent"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#121010] to-transparent"
              />
            </div>
            <p className="mt-5 text-xs leading-relaxed text-silver/80">
              Streaming accounts, subscriptions, purchases, rentals, and licensing are the customer&apos;s responsibility. Private, non-ticketed events only.
            </p>
          </div>
        </div>
      </div>
    </FunnelSection>
  );
}
