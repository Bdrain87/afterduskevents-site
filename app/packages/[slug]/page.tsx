import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import ByocPanel from "@/components/funnel/byoc-panel";
import Waveform from "@/components/packages/waveform";
import {
  ActionBar,
  FunnelSection,
  PrimaryCta,
  QuotePanel,
  SectionHeader,
  TextCta,
  TierCard,
} from "@/components/funnel/layout";
import { audioTiers, useCases, type AudioTier } from "@/lib/packages";
import { buildService, buildBreadcrumbList } from "@/lib/schema";
import { Check } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return audioTiers.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tier = audioTiers.find((t) => t.slug === slug);
  if (!tier) return {};
  const title = `${tier.name} | After Dusk Events`;
  const description = `${tier.name}. ${tier.plainBenefit} ${tier.coverageNote}`;
  return {
    title,
    description,
    alternates: { canonical: `/packages/${tier.slug}` },
    openGraph: {
      title,
      description,
      url: `https://afterduskevents.com/packages/${tier.slug}`,
    },
  };
}

const ADDON_SUGGESTIONS: Record<AudioTier["slug"], { heading: string; items: string[] }> = {
  "single-speaker": {
    heading: "Common add-ons for intimate setups",
    items: [
      "Popcorn machine rental",
      "Ambient string lighting",
      "Cornhole, can jam, ladder ball",
      "Photo area with backdrop",
    ],
  },
  "two-speakers": {
    heading: "Common add-ons for standard events",
    items: [
      "Retro gaming kit with four wireless controllers",
      "YouTube karaoke + 2 wireless mics",
      "Popcorn machine rental",
      "Drone video and photos",
      "Photo area with backdrop",
    ],
  },
  "two-speakers-sub": {
    heading: "Common add-ons for sports, fights, and larger groups",
    items: [
      "YouTube karaoke + 2 wireless mics",
      "Drone video and photos",
      "Blacklight + Neon Kit",
      "Patio heaters / bug zappers / fans",
      "Early setup, late teardown",
    ],
  },
  "four-speakers-two-subs": {
    heading: "Common add-ons for larger layouts",
    items: [
      "Drone video and photos",
      "Blacklight + Neon Kit",
      "Patio heaters / bug zappers / fans",
      "Early setup, late teardown",
      "Folding table package",
    ],
  },
};

export default async function TierPage({ params }: Params) {
  const { slug } = await params;
  const tier = audioTiers.find((t) => t.slug === slug);
  if (!tier) notFound();

  const addons = ADDON_SUGGESTIONS[tier.slug];
  const otherTiers = audioTiers.filter((t) => t.slug !== tier.slug);
  const fitUseCases = useCases.filter((u) => u.recommendedTier === tier.slug);

  return (
    <>
      <SchemaMarkup
        id={`tier-${tier.slug}-schema`}
        data={[
          buildService(tier),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "Packages", href: "/packages" },
            { name: tier.name, href: `/packages/${tier.slug}` },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1 pt-16">
        <FunnelSection className="pt-20 lg:pt-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-caption text-ember mb-4">Audio tier</p>
              <h1 className="font-display text-display-lg leading-none tracking-wider text-projector">
                {tier.name}
              </h1>
              <p className="mt-6 max-w-[58ch] text-body-lg leading-relaxed text-silver">
                {tier.plainBenefit}
              </p>
              <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-steel">
                {tier.coverageNote}
              </p>
              <ActionBar className="mt-8">
                <PrimaryCta href={`/contact?package=${encodeURIComponent(tier.name)}`}>
                  Request This Setup
                </PrimaryCta>
                <TextCta href="/packages">Compare all tiers</TextCta>
              </ActionBar>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-screening/50 p-6">
                <p className="text-caption text-steel">Coverage signal</p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Waveform
                    speakers={tier.speakerCount}
                    subs={tier.subwooferCount}
                    className="h-[70%] w-[82%]"
                  />
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-baseline justify-between gap-3 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-caption text-steel">Speakers</p>
                    <p className="font-display text-display-md leading-none text-projector">
                      {tier.speakerCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-caption text-steel">Subwoofers</p>
                    <p className="font-display text-display-md leading-none text-projector">
                      {tier.subwooferCount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-caption text-steel">Screen</p>
                    <p className="font-display text-display-md leading-none text-projector">
                      30 ft
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="includes-heading" tone="band">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader
                id="includes-heading"
                eyebrow="What this tier does"
                title="COVERAGE FIRST."
                body={tier.soundProfile}
                className="mb-0"
              />
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {tier.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-screening/70 p-4">
                    <Check size={18} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-projector">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FunnelSection>

        <ByocPanel />

        <FunnelSection labelledBy="fits-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="fits-heading"
              eyebrow="Event fit"
              title="WHERE THIS TIER MAKES SENSE."
              body="These are examples, not hard rules. Guest count, layout, and the kind of audio matter."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fitUseCases.map((uc) => (
                <Link
                  key={uc.slug}
                  href={`/contact?useCase=${uc.slug}&package=${encodeURIComponent(tier.name)}`}
                  className="rounded-lg border border-white/10 bg-screening/70 p-5 transition-colors hover:border-ember/45"
                >
                  <h3 className="font-display text-heading-lg leading-none tracking-wider text-projector">
                    {uc.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-silver">{uc.desc}</p>
                </Link>
              ))}
              {fitUseCases.length === 0 &&
                tier.recommendedFor.map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-screening/70 p-5">
                    <h3 className="font-heading text-heading-md text-projector">{item}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver">
                      A good fit when the seating area spreads out and coverage matters front to back.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="addons-heading">
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              id="addons-heading"
              eyebrow="Add-ons"
              title={`${addons.heading.toUpperCase()}.`}
              body="Add-ons are quoted with the setup, so the final number reflects the full event instead of a cart of disconnected rentals."
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {addons.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-silver">
                  <Check size={16} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <TextCta href="/add-ons">Full add-on catalog</TextCta>
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="other-tiers-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="other-tiers-heading"
              eyebrow="Other packages"
              title="COMPARE THE REST."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {otherTiers.map((t) => (
                <TierCard key={t.slug} tier={t} href={`/packages/${t.slug}`} compact />
              ))}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection>
          <div className="mx-auto max-w-4xl space-y-6">
            <PrivateEventsNotice />
            <QuotePanel
              title="READY TO CHECK THE DATE?"
              body="Send the city, guest count, and event type. We will confirm whether this setup is the right fit before quoting."
              href={`/contact?package=${encodeURIComponent(tier.name)}`}
            />
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
