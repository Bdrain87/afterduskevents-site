"use client";

import { motion } from "motion/react";
import { DUR, EASE, STAGGER, useReducedMotionLive } from "@/lib/motion";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import TrustStrip from "@/components/trust-strip";
import NextEventCard from "@/components/next-event-card";
import ThirtyFootCheck from "@/components/home/thirty-foot-check";
import GearHighlights from "@/components/home/gear-highlights";
import ByocPanel from "@/components/funnel/byoc-panel";
import EventMotifCard from "@/components/event-motif-card";
import HeroIgnition, { IgnitedWordmark } from "@/components/hero-ignition";
import MagneticButton from "@/components/magnetic-button";
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
    title: "4K picture",
    body: "A theater-quality 4K projector on a real 35 ft inflatable cinema screen. Big, sharp, and built to be the centerpiece.",
  },
  {
    title: "Sound that fits",
    body: "Choose from one speaker up to four speakers with two subwoofers. The screen stays the same; coverage scales with real audio gear.",
  },
  {
    title: "Power + connectivity",
    body: "Venue power and wifi are used first when they are available. We bring a generator, battery bank, and Starlink along as backup so a hiccup does not stall the night.",
  },
  {
    title: "Setup handled",
    body: "Ground-anchor setup, systems test, teardown, private-event rules, and insurance handled before guests settle in.",
  },
];

const bookingSteps = [
  {
    title: "Tell us the basics",
    body: "Date, city, guest count, and what kind of night you are planning.",
  },
  {
    title: "We match the setup",
    body: "We recommend the audio tier and any add-ons that actually fit the event.",
  },
  {
    title: "We run the setup",
    body: "We arrive early, inflate the screen, tune the sound, test the systems, and tear down after.",
  },
];

export default function HomeClient({ geo }: Props = {}) {
  const reduced = useReducedMotionLive();
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
      <main className="flex-1 pt-16">
        <HeroIgnition mediaAlt="35 foot inflatable outdoor cinema screen setup">
          <h1 className="font-display text-display-xl leading-none text-projector">
            <IgnitedWordmark text="AFTER DUSK EVENTS" className="brand-hero-wordmark wordmark-glow" />
          </h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: DUR.slow, ease: EASE.snappy, delay: reduced ? 0 : 1.05 }}
            className="mt-5 max-w-[52ch] text-body-lg leading-relaxed text-silver"
          >
            4K outdoor cinema projection, a 35 ft screen, scalable sound, and a setup crew that handles the night from arrival to teardown.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: DUR.slow, ease: EASE.snappy, delay: reduced ? 0 : 1.2 }}
            className="mt-4 text-sm leading-relaxed text-silver"
          >
            {locationLine}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: DUR.slow, ease: EASE.snappy, delay: reduced ? 0 : 1.35 }}
          >
            <ActionBar className="mt-8">
              <MagneticButton>
                <PrimaryCta href={geo?.inRadius ? `/contact?location=${encodeURIComponent(geo.city.name)}` : "/contact"}>
                  {geo?.inRadius && geo.city.slug !== "canton" ? `Request a ${geo.city.name} Quote` : "Request a Quote"}
                </PrimaryCta>
              </MagneticButton>
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
              title="THE SETUP IS OURS. THE NIGHT IS YOURS."
              body="4K theater-quality projection, one big screen, audio coverage matched to the crowd, and a setup that does not depend on your outlet, wifi, or guesswork."
            />
            <motion.ol
              className="divide-y divide-white/8 border-y border-white/8"
              initial={reduced ? undefined : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: STAGGER } },
              }}
            >
              {bringItems.map((item, i) => (
                <motion.li
                  key={item.title}
                  variants={
                    reduced
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 14 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: DUR.slow, ease: EASE.snappy },
                          },
                        }
                  }
                  className="group grid grid-cols-[auto_1fr] items-start gap-6 py-6 pl-4 -ml-4 border-l-2 border-transparent transition-colors hover:border-ember sm:grid-cols-[auto_1fr_2fr] sm:gap-10"
                >
                  <span className="font-display text-display-md leading-none tracking-wider text-steel transition-colors group-hover:text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-heading-md text-projector">{item.title}</h3>
                  <p className="col-span-2 text-sm leading-relaxed text-silver sm:col-span-1">
                    {item.body}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </FunnelSection>

        <ThirtyFootCheck />

        <GearHighlights />

        <FunnelSection labelledBy="sound-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeader
                id="sound-heading"
                eyebrow="Packages"
                title="PICK THE SOUND. THE SCREEN STAYS BIG."
                body="The package choice is about coverage. Smaller groups need clear dialogue. Larger yards need more speakers and stronger bass."
                className="mb-0"
              />
              <TextCta href="/packages">Open package guide</TextCta>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {audioTiers.map((tier) => (
                <TierCard key={tier.slug} tier={tier} href={`/packages/${tier.slug}`} />
              ))}
            </div>
          </div>
        </FunnelSection>

        <ByocPanel />

        <FunnelSection labelledBy="events-heading">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="events-heading"
              eyebrow="Private events"
              title="BUILT AROUND YOUR NIGHT."
              body="Movie, game, fight, graduation, birthday, or backyard gathering. We keep the format simple and match the setup to the crowd."
            />
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              initial={reduced ? undefined : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: STAGGER } },
              }}
            >
              {useCases.map((event) => (
                <motion.div
                  key={event.slug}
                  variants={
                    reduced
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 12 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: DUR.base, ease: EASE.snappy },
                          },
                        }
                  }
                >
                  <EventMotifCard
                    event={event}
                    href={`/contact?useCase=${event.slug}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="booking-heading" tone="band">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              id="booking-heading"
              eyebrow="How booking works"
              title="FROM FIRST MESSAGE TO SHOWTIME."
              body="Send the basics, get a setup recommendation, then we handle the 4K projection, screen, sound, and teardown."
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
                body="Standard service runs within 40 miles of Canton. Farther trips work too with an additional travel charge added to the quote."
                className="mb-0"
              />
            </div>
            <div className="lg:col-span-5">
              <div className="group rounded-lg border border-white/10 bg-charcoal/45 p-6 transition-colors duration-300 hover:border-ember/35">
                <MapPin
                  size={22}
                  className="mb-4 text-ember transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_12px_rgba(221,84,84,0.45))]"
                  aria-hidden="true"
                />
                <p className="font-heading text-heading-md text-projector">40-mile core service radius</p>
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
              title="REQUEST A QUOTE."
              body="Send the date, city, guest count, and event type. We will match the setup and reply with a real quote within 24 hours."
            />
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
