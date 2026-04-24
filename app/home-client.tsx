"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import TrustStrip from "@/components/trust-strip";
import NextEventCard from "@/components/next-event-card";
import ThirtyFootCheck from "@/components/home/thirty-foot-check";
import ByocPanel from "@/components/funnel/byoc-panel";
import {
  ActionBar,
  BookingStep,
  FunnelSection,
  MediaPanel,
  PrimaryCta,
  QuotePanel,
  SectionHeader,
  TextCta,
  TierCard,
} from "@/components/funnel/layout";
import { audioTiers, useCases } from "@/lib/packages";
import type { NearestCityResult } from "@/lib/nearest-city";
import { BatteryCharging, MapPin, ShieldCheck, Sparkles, Volume2 } from "lucide-react";

type Props = {
  geo?: NearestCityResult | null;
};

const bringItems = [
  {
    title: "30 ft screen",
    body: "One real inflatable cinema screen for every booking. Big enough to be the centerpiece.",
    icon: Sparkles,
  },
  {
    title: "Sound that fits",
    body: "Choose from one speaker up to four speakers with two subwoofers. The screen stays the same; coverage scales with audio.",
    icon: Volume2,
  },
  {
    title: "Power + connectivity",
    body: "Generator, battery backup, and Starlink are part of the event kit so the venue is not carrying the night.",
    icon: BatteryCharging,
  },
  {
    title: "Setup handled",
    body: "Water ballast setup, systems test, teardown, private-event rules, and insurance handled before guests settle in.",
    icon: ShieldCheck,
  },
];

const bookingSteps = [
  {
    title: "Tell us the basics",
    body: "Date, city, guest count, and what kind of night you are planning.",
  },
  {
    title: "We match the setup",
    body: "Blake recommends the audio tier and any add-ons that actually fit the event.",
  },
  {
    title: "We run the setup",
    body: "We arrive early, inflate the screen, tune the sound, test the systems, and tear down after.",
  },
];

export default function HomeClient({ geo }: Props = {}) {
  const locationLine =
    geo?.inRadius && geo.city.slug !== "canton"
      ? `Serving ${geo.city.name} from Canton, MI.`
      : geo?.travelZone
        ? `We travel to ${geo.city.name}. Expect a travel line on the quote.`
        : "Private outdoor cinema rental across Southeast Michigan.";

  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-24 lg:pt-36">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-caption text-ember mb-4">Canton, MI · Private events only</p>
              <h1 className="font-display text-display-xl leading-none tracking-wider text-projector">
                AFTER DUSK EVENTS
              </h1>
              <p className="mt-5 max-w-[52ch] text-body-lg leading-relaxed text-silver">
                30 ft outdoor cinema screen, scalable sound, and a setup crew that handles the night from arrival to teardown.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-steel">{locationLine}</p>
              <ActionBar className="mt-8">
                <PrimaryCta href={geo?.inRadius ? `/contact?location=${encodeURIComponent(geo.city.name)}` : "/contact"}>
                  {geo?.inRadius && geo.city.slug !== "canton" ? `Get a ${geo.city.name} Quote` : "Get a Quote"}
                </PrimaryCta>
                <TextCta href="/packages">Compare packages</TextCta>
              </ActionBar>
              <div className="mt-8">
                <TrustStrip />
              </div>
            </div>

            <div className="lg:col-span-6">
              <MediaPanel className="mx-auto aspect-[4/5] max-w-[560px] border-0 bg-transparent shadow-none lg:ml-auto">
                <Image
                  src="/images/setup/30ft-screen-studio.avif"
                  alt="30 foot inflatable outdoor cinema screen setup"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="rounded-lg object-cover object-[50%_55%]"
                />
              </MediaPanel>
            </div>
          </div>
        </section>

        <NextEventCard />

        <FunnelSection labelledBy="bring-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="bring-heading"
              eyebrow="What we bring"
              title="A REAL SCREEN. A CLEAN PLAN."
              body="The event is built around one big screen, the right audio coverage, and a setup that does not depend on your outlet, wifi, or guesswork."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {bringItems.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-lg border border-white/10 bg-screening/70 p-5">
                    <Icon size={22} className="mb-5 text-ember" aria-hidden="true" />
                    <h3 className="font-heading text-heading-md text-projector">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </FunnelSection>

        <ThirtyFootCheck />

        <ByocPanel />

        <FunnelSection labelledBy="sound-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeader
                id="sound-heading"
                eyebrow="Packages"
                title="PICK THE SOUND. THE SCREEN STAYS BIG."
                body="The package choice is about coverage. Smaller groups need clean dialogue. Larger yards need more speakers and more low-end support."
                className="mb-0"
              />
              <TextCta href="/packages">Open package guide</TextCta>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audioTiers.map((tier) => (
                <TierCard key={tier.slug} tier={tier} href={`/packages#tier-${tier.slug}`} />
              ))}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="events-heading">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="events-heading"
              eyebrow="Private events"
              title="BUILT AROUND YOUR NIGHT."
              body="Movie, game, fight, graduation, birthday, or backyard gathering. We keep the format simple and match the setup to the crowd."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((event) => (
                <Link
                  key={event.slug}
                  href={`/contact?useCase=${event.slug}`}
                  className="group overflow-hidden rounded-lg border border-white/10 bg-charcoal/45 transition-colors hover:border-ember/45"
                >
                  <div className="relative aspect-[3/2] border-b border-white/10 bg-screening">
                    <Image
                      src={event.image}
                      alt={event.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-caption text-steel mb-3">
                      {audioTiers.find((tier) => tier.slug === event.recommendedTier)?.name}
                    </p>
                    <h3 className="font-display text-heading-lg leading-none tracking-wider text-projector">
                      {event.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-silver">{event.desc}</p>
                    <span className="mt-5 inline-flex text-[11px] uppercase tracking-[0.2em] text-ember">
                      Start quote
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="booking-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="booking-heading"
              eyebrow="Booking flow"
              title="FROM IDEA TO SCREEN TEST."
              body="Simple steps, clear responsibilities, and a tested setup before people show up."
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {bookingSteps.map((step, index) => (
                <BookingStep
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  body={step.body}
                />
              ))}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="service-heading">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <SectionHeader
                id="service-heading"
                eyebrow="Service area"
                title="BASED IN CANTON. BUILT FOR SE MICHIGAN."
                body="We serve private events within 60 miles of Canton. Farther trips can still work when the travel line makes sense."
                className="mb-0"
              />
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-white/10 bg-charcoal/45 p-6">
                <MapPin size={22} className="mb-4 text-ember" aria-hidden="true" />
                <p className="font-heading text-heading-md text-projector">60-mile core service radius</p>
                <p className="mt-2 text-sm leading-relaxed text-silver">
                  Detroit, Ann Arbor, Plymouth, Northville, Novi, Birmingham, and surrounding Southeast Michigan cities.
                </p>
                <TextCta href="/serving">See service area</TextCta>
              </div>
            </div>
          </div>
        </FunnelSection>

        <FunnelSection tone="band">
          <div className="mx-auto max-w-4xl">
            <QuotePanel
              title="BUILD YOUR QUOTE."
              body="Send the date, city, guest count, and event type. We will match the setup and reply with a real quote within 24 hours."
            />
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
