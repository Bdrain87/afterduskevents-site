"use client";

import { motion, useReducedMotion } from "motion/react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import TrustStrip from "@/components/trust-strip";
import NextEventCard from "@/components/next-event-card";
import ThirtyFootCheck from "@/components/home/thirty-foot-check";
import ByocPanel from "@/components/funnel/byoc-panel";
import EventMotifCard from "@/components/event-motif-card";
import HeroIgnition, { IgnitedWordmark } from "@/components/hero-ignition";
import {
  ActionBar,
  BookingStep,
  FunnelSection,
  PrimaryCta,
  QuotePanel,
  SectionHeader,
  TextCta,
  TierCard,
} from "@/components/funnel/layout";
import { audioTiers, useCases } from "@/lib/packages";
import type { NearestCityResult } from "@/lib/nearest-city";
import { MapPin } from "lucide-react";

type Props = {
  geo?: NearestCityResult | null;
};

const bringItems = [
  {
    title: "30 ft screen",
    body: "One real inflatable cinema screen for every booking. Big enough to be the centerpiece.",
  },
  {
    title: "Sound that fits",
    body: "Choose from one speaker up to four speakers with two subwoofers. The screen stays the same; coverage scales with audio.",
  },
  {
    title: "Power + connectivity",
    body: "Generator, battery backup, and Starlink are part of the event kit so the venue is not carrying the night.",
  },
  {
    title: "Setup handled",
    body: "Water ballast setup, systems test, teardown, private-event rules, and insurance handled before guests settle in.",
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
  const reduced = useReducedMotion();
  const locationLine =
    geo?.inRadius && geo.city.slug !== "canton"
      ? `Serving ${geo.city.name} from Canton, MI.`
      : geo?.travelZone
        ? `We travel to ${geo.city.name}. Expect a travel line on the quote.`
        : "Private outdoor cinema rental across Southeast Michigan.";

  const fadeUp = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <>
      <Nav />
      <main className="flex-1">
        <HeroIgnition mediaAlt="30 foot inflatable outdoor cinema screen setup">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 1.25 }}
            className="text-caption text-ember mb-4"
          >
            Canton, MI · Private events only
          </motion.p>
          <h1 className="font-display text-display-xl leading-none tracking-wider text-projector">
            <IgnitedWordmark text="AFTER DUSK EVENTS" />
          </h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 1.55 }}
            className="mt-5 max-w-[52ch] text-body-lg leading-relaxed text-silver"
          >
            30 ft outdoor cinema screen, scalable sound, and a setup crew that handles the night from arrival to teardown.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 1.7 }}
            className="mt-4 text-sm leading-relaxed text-steel"
          >
            {locationLine}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 1.85 }}
          >
            <ActionBar className="mt-8">
              <PrimaryCta href={geo?.inRadius ? `/contact?location=${encodeURIComponent(geo.city.name)}` : "/contact"}>
                {geo?.inRadius && geo.city.slug !== "canton" ? `Get a ${geo.city.name} Quote` : "Get a Quote"}
              </PrimaryCta>
              <TextCta href="/packages">Compare packages</TextCta>
            </ActionBar>
            <div className="mt-8">
              <TrustStrip />
            </div>
          </motion.div>
        </HeroIgnition>

        <NextEventCard />

        <FunnelSection labelledBy="bring-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="bring-heading"
              eyebrow="What we bring"
              title="A REAL SCREEN. A CLEAN PLAN."
              body="The event is built around one big screen, the right audio coverage, and a setup that does not depend on your outlet, wifi, or guesswork."
            />
            <ol className="divide-y divide-white/8 border-y border-white/8">
              {bringItems.map((item, i) => (
                <li
                  key={item.title}
                  className="group grid grid-cols-[auto_1fr] items-start gap-6 py-6 pl-4 -ml-4 border-l-2 border-transparent transition-colors hover:border-ember sm:grid-cols-[auto_1fr_2fr] sm:gap-10"
                >
                  <span className="font-display text-display-md leading-none tracking-wider text-steel transition-colors group-hover:text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-heading-md text-projector">{item.title}</h3>
                  <p className="col-span-2 text-sm leading-relaxed text-silver sm:col-span-1">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
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
                <EventMotifCard
                  key={event.slug}
                  event={event}
                  href={`/contact?useCase=${event.slug}`}
                />
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
