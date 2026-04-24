import { Play } from "lucide-react";
import { FunnelSection, SectionHeader } from "@/components/funnel/layout";

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
          <div className="rounded-lg border border-white/10 bg-screening/70 p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-projector">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-oxblood text-projector">
                <Play size={15} fill="currentColor" aria-hidden="true" />
              </span>
              Private viewing, your content
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {services.map((service) => (
                <span
                  key={service}
                  className="flex min-h-[44px] items-center justify-center rounded-lg border border-white/10 bg-charcoal/65 px-3 text-center text-xs font-semibold text-silver"
                >
                  {service}
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-steel">
              Streaming accounts, subscriptions, purchases, rentals, and licensing are the customer&apos;s responsibility. Private, non-ticketed events only.
            </p>
          </div>
        </div>
      </div>
    </FunnelSection>
  );
}
