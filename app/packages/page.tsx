import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import Image from "next/image";
import LightCheck from "@/components/packages/light-check";
import BallparkTool from "@/components/packages/ballpark-tool";
import ComparisonTable from "@/components/packages/comparison-table";
import ByocPanel from "@/components/funnel/byoc-panel";
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
import { ArrowRight, Radio, Volume2, Waves } from "lucide-react";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Compare After Dusk Events outdoor cinema packages: one 30 ft screen with four audio tiers up to four speakers and two subwoofers. Custom quotes for private events in Southeast Michigan.",
  alternates: { canonical: "/packages" },
};

const soundFacts = [
  {
    icon: Volume2,
    title: "The speakers carry the room",
    body: "Full-range speakers are rated up to 126 dB max volume and cover dialogue, commentary, and music from 40 Hz to 20 kHz.",
  },
  {
    icon: Radio,
    title: "Wireless linking keeps it clean",
    body: "Linked speakers let us place sound where the guests are instead of blasting one corner of the yard.",
  },
  {
    icon: Waves,
    title: "Subs add the low end",
    body: "Subwoofer tiers add dual 8-inch low-frequency drivers with bass response down to 25 Hz for sports, fights, and music-heavy nights.",
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
                Every booking uses the same big screen. Your package choice is the audio coverage: how wide the seating area is, how many guests are coming, and whether the night needs real low end.
              </p>
              <ActionBar className="mt-8">
                <PrimaryCta href="/contact">Get a Quote</PrimaryCta>
                <TextCta href="#tier-selector">Use the sound chooser</TextCta>
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {soundFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <article key={fact.title} className="rounded-lg border border-white/10 bg-screening/70 p-5">
                    <Icon size={22} className="mb-5 text-ember" aria-hidden="true" />
                    <h3 className="font-heading text-heading-md text-projector">{fact.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{fact.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="ballpark-heading">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              id="ballpark-heading"
              eyebrow="Still not sure?"
              title="TWO QUESTIONS, ONE RECOMMENDATION."
              body="Use this as a starting point. Blake still reviews the layout, distance, add-ons, and timing before quoting."
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
              body="Same screen and setup rules across every tier. The differences are audio coverage and low-end support."
            />
            <ComparisonTable />
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
              {useCases.map((uc) => {
                const tier = audioTiers.find((t) => t.slug === uc.recommendedTier);
                return (
                  <Link
                    key={uc.slug}
                    id={uc.slug}
                    href={`/contact?useCase=${uc.slug}`}
                    className="group overflow-hidden rounded-lg border border-white/10 bg-charcoal/45 transition-colors hover:border-ember/45"
                  >
                    <div className="relative aspect-[3/2] border-b border-white/10 bg-screening">
                      <Image
                        src={uc.image}
                        alt={uc.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-caption text-steel mb-3">{tier?.name}</p>
                      <h3 className="font-display text-heading-lg leading-none tracking-wider text-projector">
                        {uc.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-silver">{uc.desc}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-ember">
                        Start quote
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
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
