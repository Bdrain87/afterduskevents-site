import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import LightCheck from "@/components/packages/light-check";
import BallparkTool from "@/components/packages/ballpark-tool";
import ComparisonSlides from "@/components/packages/comparison-slides";
import ByocPanel from "@/components/funnel/byoc-panel";
import EventMotifCard from "@/components/event-motif-card";
import StatTicker from "@/components/stat-ticker";
import { FadeInGroup, FadeInItem } from "@/components/fade-in";
import {
  ActionBar,
  FunnelSection,
  PrimaryCta,
  QuotePanel,
  SectionHeader,
  TextCta,
  TierCard,
} from "@/components/funnel/layout";
import { audioTiers, useCases } from "@/lib/packages";
import {
  buildAllServicesGraph,
  buildBreadcrumbList,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Compare After Dusk Events outdoor cinema packages: one 30 ft screen with four audio tiers up to four speakers and two subwoofers. Custom quotes for private events in Southeast Michigan.",
  alternates: { canonical: "/packages" },
};

const soundStats: Array<{ value: number; unit: string; label: string; note: string }> = [
  {
    value: 126,
    unit: "dB",
    label: "Max SPL per speaker",
    note: "Rated peak volume across every full-range unit.",
  },
  {
    value: 20,
    unit: "kHz",
    label: "Top-end response",
    note: "Clean dialogue, commentary, and music up to 20,000 Hz.",
  },
  {
    value: 25,
    unit: "Hz",
    label: "Sub low-end floor",
    note: "Dual 8-inch drivers reach down to 25 Hz for the bass-heavy nights.",
  },
];

export default function PackagesPage() {
  return (
    <>
      <SchemaMarkup
        id="packages-services"
        data={[
          ...buildAllServicesGraph(),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "Packages", href: "/packages" },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1 pt-16">
        <FunnelSection className="pt-20 lg:pt-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-caption text-ember mb-4">Packages</p>
              <h1 className="font-display text-display-lg leading-none tracking-wider text-projector">
                ONE 30 FT SCREEN. FOUR WAYS TO HEAR IT.
              </h1>
              <p className="mt-6 max-w-[64ch] text-body-lg leading-relaxed text-silver">
                Every booking uses the same big screen. Your package choice is the audio coverage: how wide the seating area is, how many guests are coming, and whether the night needs stronger bass.
              </p>
              <ActionBar className="mt-8">
                <PrimaryCta href="/contact">Get a Quote</PrimaryCta>
                <TextCta href="#ballpark-heading">Use the sound chooser</TextCta>
              </ActionBar>
            </div>
            <div className="lg:col-span-4">
              <PrivateEventsNotice />
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="quick-pick-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="quick-pick-heading"
              eyebrow="Quick pick"
              title="START WITH THE CROWD."
              body="These are not four different screens. They are four different ways to cover a space with sound."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audioTiers.map((tier) => (
                <TierCard key={tier.slug} tier={tier} href={`/packages/${tier.slug}`} />
              ))}
            </div>
          </div>
        </FunnelSection>

        <LightCheck />

        <ByocPanel />

        <FunnelSection labelledBy="sound-specs-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="sound-specs-heading"
              eyebrow="Sound specs, translated"
              title="WHAT THE AUDIO UPGRADE ACTUALLY DOES."
              body="The specs matter because outdoor sound disappears fast. More coverage means guests can hear clearly without the whole yard feeling overdriven."
            />
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-charcoal/40 p-8 sm:p-10 lg:p-12">
              <FadeInGroup
                className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6"
                stagger={0.14}
              >
                {soundStats.map((stat, i) => (
                  <FadeInItem
                    key={stat.label}
                    className={`relative ${i > 0 ? "md:border-l md:border-white/10 md:pl-6" : ""}`}
                  >
                    <p className="text-caption text-ember mb-3">0{i + 1}</p>
                    <p className="flex items-baseline gap-1 font-display leading-none tracking-wider text-projector">
                      <StatTicker
                        value={stat.value}
                        className="text-[4.5rem] leading-none sm:text-[5.5rem]"
                      />
                      <span className="text-xl uppercase tracking-[0.2em] text-ember sm:text-2xl">{stat.unit}</span>
                    </p>
                    <p className="mt-4 text-heading-md font-semibold text-projector">{stat.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{stat.note}</p>
                  </FadeInItem>
                ))}
              </FadeInGroup>
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="ballpark-heading">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              id="ballpark-heading"
              eyebrow="Still not sure?"
              title="TWO QUESTIONS, ONE RECOMMENDATION."
              body="Use this as a starting point. We still review the layout, distance, add-ons, and timing before quoting."
            />
            <BallparkTool />
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="comparison-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="comparison-heading"
              eyebrow="Compare"
              title="SIDE BY SIDE."
              body="Same screen and setup rules across every tier. The differences are audio coverage and bass."
            />
            <ComparisonSlides />
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="event-fit-heading">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="event-fit-heading"
              eyebrow="Event fit"
              title="MATCH THE SETUP TO THE NIGHT."
              body="Most events start from the two-speaker tier. Sports, fights, music, and larger crowds usually benefit from subwoofer support."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((uc) => (
                <EventMotifCard
                  key={uc.slug}
                  event={uc}
                  href={`/contact?useCase=${uc.slug}`}
                />
              ))}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection tone="band">
          <div className="mx-auto max-w-4xl">
            <QuotePanel
              title="NOT SURE WHICH FITS?"
              body="Send the event date, city, guest count, and the kind of night you want. We will recommend the setup and quote the full event."
            />
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
