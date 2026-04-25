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

const mobileServices = ["Netflix", "Disney+", "Prime Video", "YouTube", "PlayStation", "Laptop", "And more"];

export default function ByocPanel() {
  return (
    <FunnelSection labelledBy="byoc-heading" tone="band">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeader
            id="byoc-heading"
            eyebrow="Bring your own content"
            title="NEW MOVIE. SEASON DROP. WATCH PARTY."
            body="You bring the account, playlist, disc, laptop, or console. We bring the screen, audio, power, and connection plan for a private viewing party."
            className="mb-0"
          />
        </div>
        <div className="min-w-0 lg:col-span-7">
          <div className="relative min-w-0 overflow-hidden rounded-lg border border-ember/25 bg-[linear-gradient(135deg,rgba(107,31,31,0.24),rgba(10,10,10,0.78)_42%,rgba(26,26,26,0.82))] p-5 shadow-[0_24px_70px_rgba(107,31,31,0.16)] sm:p-6">
            <div className="mb-5 flex min-w-0 items-center gap-3 text-sm font-semibold text-cream">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ember/45 bg-oxblood/70 text-cream shadow-[0_0_28px_rgba(221,84,84,0.16)]">
                <Play size={15} fill="currentColor" aria-hidden="true" />
              </span>
              <span className="min-w-0 break-words">Private viewing, your content</span>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-2 sm:hidden">
                {mobileServices.map((service) => (
                  <span
                    key={service}
                    className="min-w-0 rounded-lg border border-ember/35 bg-oxblood/25 px-3 py-3 text-center text-xs font-semibold text-cream shadow-[0_0_24px_rgba(107,31,31,0.16)]"
                  >
                    {service}
                  </span>
                ))}
              </div>
              <div className="-mx-6 hidden sm:block">
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
            </div>
            <p className="mt-5 break-words text-xs leading-relaxed text-silver/80">
              Streaming accounts, subscriptions, purchases, rentals, and licensing are the customer&apos;s responsibility. Private, non-ticketed events only.
            </p>
          </div>
        </div>
      </div>
    </FunnelSection>
  );
}
