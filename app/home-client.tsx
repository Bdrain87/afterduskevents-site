"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import TrustStrip from "@/components/trust-strip";
import NextEventCard from "@/components/next-event-card";
import ThirtyFootCheck from "@/components/home/thirty-foot-check";
import GearHighlights from "@/components/home/gear-highlights";
import ByocPanel from "@/components/funnel/byoc-panel";
import EventMotifCard from "@/components/event-motif-card";
import HeroIgnition, { IgnitedWordmark } from "@/components/hero-ignition";
import BrandMarquee from "@/components/brand-marquee";
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
    title: "30 ft screen",
    body: "One real inflatable cinema screen for every booking. Big enough to be the centerpiece.",
  },
  {
    title: "Sound that fits",
    body: "Choose from one Soundboks 4 speaker up to four Soundboks 4 speakers with two SKAA subwoofers. The screen stays the same; coverage scales with real audio gear.",
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
      <main className="flex-1 pt-16">
        <HeroIgnition mediaAlt="30 foot inflatable outdoor cinema screen setup">
          <h1 className="font-display text-display-xl leading-none text-projector">
            <IgnitedWordmark text="AFTER DUSK EVENTS" className="brand-hero-wordmark wordmark-glow" />
          </h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 2.15 }}
            className="mt-5 max-w-[52ch] text-body-lg leading-relaxed text-silver"
          >
            30 ft outdoor cinema screen, scalable sound, and a setup crew that handles the night from arrival to teardown.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 2.3 }}
            className="mt-4 text-sm leading-relaxed text-steel"
          >
            {locationLine}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 2.45 }}
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
              body="One big screen, audio coverage matched to the crowd, and a setup that does not depend on your outlet, wifi, or guesswork."
            />
            <motion.ol
              className="divide-y divide-white/8 border-y border-white/8"
              initial={reduced ? undefined : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.09 } },
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
                            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
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

        <ByocPanel />

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

        <FunnelSection labelledBy="addons-heading">
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeader
              id="addons-heading"
              eyebrow="Add-ons"
              title="STACK THE NIGHT."
              body="Popcorn, karaoke with two mics, retro gaming, drone video, glow kit, backyard games, photo backdrop, string lights, patio heaters, bug zappers, fans. Quoted with the setup, not a la carte."
              align="center"
              className="mb-8"
            />
            <motion.ul
              className="mx-auto grid grid-cols-3 gap-3 sm:gap-5 mb-8 max-w-md sm:max-w-xl"
              initial={reduced ? undefined : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              }}
            >
              {[
                { src: "/images/addons/gaming.png", label: "Gaming", alt: "Retro gaming kit add-on with controllers and a big inflatable screen" },
                { src: "/images/addons/popcorn.png", label: "Popcorn", alt: "Popcorn machine add-on" },
                { src: "/images/addons/glow-kit.png", label: "Glow kit", alt: "Glow kit add-on with neon balloons and glow sticks" },
              ].map((item) => (
                <motion.li
                  key={item.label}
                  variants={
                    reduced
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 10 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                          },
                        }
                  }
                  className="flex flex-col"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-white/10 bg-charcoal/70 transition-colors hover:border-ember/40">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 640px) 200px, 32vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-caption text-steel">{item.label}</p>
                </motion.li>
              ))}
            </motion.ul>
            <div className="flex justify-center">
              <TextCta href="/add-ons">Full add-ons catalog</TextCta>
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
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              initial={reduced ? undefined : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
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
                            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
              body="Send the basics, get a setup recommendation, then we handle the screen, sound, and teardown."
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

        <BrandMarquee />

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
              <div className="rounded-lg border border-white/10 bg-charcoal/45 p-6">
                <MapPin size={22} className="mb-4 text-ember" aria-hidden="true" />
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
