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
    "Compare After Dusk Events outdoor cinema packages: a 30 ft screen, 4K theater-quality projection, Soundboks 4 speakers, and SKAA subwoofer support. Custom quotes for private events in Southeast Michigan.",
  alternates: { canonical: "/packages" },
};

const gearProofs = [
  {
    label: "4K theater-quality projector",
    title: "Sharp picture",
    body: "The visual side is not a basic backyard projector. The 4K projector gives movies, games, sports, and slideshows a cleaner, sharper image on the big screen.",
  },
  {
    label: "30 ft cinema screen",
    title: "Real scale",
    body: "The screen is big enough to become the centerpiece of the night, so the crowd feels like they are at an event instead of watching someone’s TV outside.",
  },
  {
    label: "Soundboks 4 speakers",
    title: "Clean reach outside",
    body: "These are not little Bluetooth boxes on a table. They are loud, battery-powered outdoor speakers with the headroom to keep dialogue and music clear across open space.",
  },
  {
    label: "SKAA Death From Below Mk2 subs",
    title: "Bass people feel",
    body: "The subwoofer handles the low end: walkout music, movie scores, sports hits, and dance tracks. That gives the event weight without burying the voices.",
  },
  {
    label: "Wireless layout",
    title: "Cleaner setup",
    body: "SKAA wireless linking lets us place sound where the crowd needs it instead of dragging cable runs through the middle of the party.",
  },
] as const;

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
                Every booking uses the same 4K theater-quality projector and big screen. Your package choice is the audio coverage: how wide the seating area is, how many guests are coming, and whether the night needs stronger bass.
              </p>
              <ActionBar className="mt-8">
                <PrimaryCta href="/contact">Request a Quote</PrimaryCta>
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
              body="These are not four different picture setups. Every tier gets the 4K projector and 30 ft screen; the difference is how much sound coverage and bass the event needs."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audioTiers.map((tier) => (
                <TierCard key={tier.slug} tier={tier} href={`/packages/${tier.slug}`} />
              ))}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="gear-proof-heading">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="gear-proof-heading"
              eyebrow="Gear proof"
              title="WHAT YOUR QUOTE IS ACTUALLY BUYING."
              body="The quote covers the full premium setup: 4K projection, a real 30 ft screen, clean outdoor sound, and bass support when the night calls for it."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {gearProofs.map((proof) => (
                <article
                  key={proof.label}
                  className="rounded-lg border border-white/10 bg-screening/70 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.22)]"
                >
                  <p className="text-caption text-ember">{proof.label}</p>
                  <h3 className="mt-4 font-display text-heading-lg leading-none tracking-wider text-projector">
                    {proof.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-silver">{proof.body}</p>
                </article>
              ))}
            </div>
          </div>
        </FunnelSection>

        <LightCheck />

        <ByocPanel />

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
              body="Same 4K projection, same screen, same setup rules across every tier. The differences are audio coverage and bass."
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
