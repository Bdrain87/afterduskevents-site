"use client";

import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import MarqueeHeadline from "@/components/marquee-headline";
import TicketStub from "@/components/ticket-stub";
import BulbButton from "@/components/bulb-button";
import NeonSign from "@/components/neon-sign";
import FilmStrip from "@/components/film-strip";
import SpecSheet from "@/components/spec-sheet";
import { audioTiers } from "@/lib/packages";
import type { NearestCityResult } from "@/lib/nearest-city";

type Props = {
  geo?: NearestCityResult | null;
};

const CITIES = [
  "Canton",
  "Plymouth",
  "Northville",
  "Novi",
  "Ann Arbor",
  "Dearborn",
  "Birmingham",
  "Royal Oak",
  "Grosse Pointe",
  "Detroit",
];

export default function HomeClient({ geo }: Props = {}) {
  const ctaHref = geo?.inRadius
    ? `/contact?location=${encodeURIComponent(geo.city.name)}`
    : "/contact";
  const ctaLabel =
    geo?.inRadius && geo.city.slug !== "canton"
      ? `Get a ${geo.city.name} Quote`
      : "Get a Quote";

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* ─── 1. HERO LETTERBOARD ─────────────────────────────────── */}
        <section
          aria-labelledby="hero-heading"
          className="relative bg-paper px-4 sm:px-10 pt-14 sm:pt-24 pb-16 sm:pb-24 overflow-hidden"
        >
          <div className="mx-auto max-w-7xl">
            <p className="serial text-tail mb-6">
              ★ Michigan · Private Events · Est. 2026 ★
            </p>
            <h1 id="hero-heading" className="sr-only">
              After Dusk Events — outdoor cinema for private events in Michigan
            </h1>
            <div className="space-y-3 sm:space-y-4">
              <MarqueeHeadline cellSize="2xl">After</MarqueeHeadline>
              <MarqueeHeadline cellSize="2xl">Dusk</MarqueeHeadline>
              <MarqueeHeadline cellSize="2xl">Events</MarqueeHeadline>
            </div>
            <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:items-end">
              <p className="font-body text-lg sm:text-xl max-w-xl text-ink">
                {geo?.inRadius && geo.city.slug !== "canton"
                  ? `Serving ${geo.city.name} from Canton, MI. Private outdoor cinema — 30 ft screen, three audio tiers. We bring everything.`
                  : geo?.travelZone
                    ? `We travel to ${geo.city.name}. Expect a travel line on the quote. Private outdoor cinema — 30 ft screen, three audio tiers.`
                    : "We turn your outdoor space into a cinema. You bring the guests. We bring everything else — screen, sound, power, staff, teardown."}
              </p>
              <BulbButton href={ctaHref}>{ctaLabel}</BulbButton>
            </div>
          </div>
        </section>

        <FilmStrip tone="ink" />

        {/* ─── 2. SPEC CALLOUT ─────────────────────────────────────── */}
        <section className="bg-paper px-4 sm:px-10 py-20">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">№ 001 · The Rig</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase mb-10">
              Thirty&nbsp;feet of screen.
              <br />
              Every seat is the front row.
            </h2>
            <SpecSheet
              rows={[
                { label: "Screen", value: "30 ft inflatable · water-ballast setup" },
                { label: "Audio", value: "Single speaker → Two speakers → Two speakers + Death From Below sub" },
                { label: "Content", value: "BYO · Netflix · Disney+ · YouTube · PS / Xbox" },
                { label: "Power", value: "Honda generator + EcoFlow · Starlink for streaming" },
                { label: "Staff", value: "3 hrs early · operate the show · teardown ours" },
                { label: "Radius", value: "60 mi from Canton, MI" },
              ]}
            />
          </div>
        </section>

        {/* ─── 3. TICKET-STUB TIER GRID ────────────────────────────── */}
        <section
          aria-labelledby="tiers-heading"
          className="bg-ink text-paper px-4 sm:px-10 py-20"
        >
          <div className="mx-auto max-w-7xl">
            <p className="serial text-bulb mb-6">Now Booking · Three Tiers</p>
            <h2
              id="tiers-heading"
              className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase mb-14"
            >
              Pick your reel.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {audioTiers.map((tier, i) => (
                <TicketStub
                  key={tier.slug}
                  tone="paper"
                  serial={`AT-${String(i + 1).padStart(3, "0")}`}
                  stamp={tier.popular ? "Most Popular" : undefined}
                >
                  <h3 className="font-display text-2xl sm:text-3xl uppercase leading-tight mb-3">
                    {tier.name}
                  </h3>
                  <p className="font-mono text-sm text-concrete mb-5">
                    {tier.best}
                  </p>
                  <ul className="space-y-1.5 mb-6 text-sm">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-tail">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/packages/${tier.slug}`}
                    className="serial text-tail border-b-2 border-tail pb-0.5 hover:text-ink hover:border-ink transition-colors"
                  >
                    View Spec Sheet →
                  </Link>
                </TicketStub>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. EDITORIAL SPREAD ─────────────────────────────────── */}
        <section className="bg-paper px-4 sm:px-10 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">№ 002 · The Night</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] uppercase leading-none">
                  The yard.
                  <br />
                  The screen.
                  <br />
                  The night.
                </h2>
              </div>
              <div className="font-body text-lg leading-relaxed space-y-5">
                <p>
                  Dusk hits. The inflatable comes up in ten minutes. Sound
                  comes alive. The first trailer loads from your account,
                  not ours. Chairs around the screen. Drinks in a cooler.
                  Kids in pajamas. Neighbors on lawn blankets. The
                  engine of a Honda generator out by the fence — quiet
                  enough you forget it's there.
                </p>
                <p>
                  We show up three hours early. We test every connection.
                  We run the show for you. When the last reel is done we
                  pack out. You wake up to a lawn with no wires in it.
                </p>
                <p className="serial text-tail pt-3">
                  That&apos;s the whole service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FilmStrip tone="ink" />

        {/* ─── 5. SERVICE AREA DECLARATION ─────────────────────────── */}
        <section className="bg-paper px-4 sm:px-10 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <p className="serial text-tail mb-6">Service Radius</p>
            <p className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-none">
              60 Mi · Canton, MI
            </p>
            <p className="mt-10 font-mono text-sm sm:text-base text-concrete">
              {CITIES.join(" · ")}
            </p>
          </div>
        </section>

        {/* ─── 6. FINAL CTA ────────────────────────────────────────── */}
        <section
          aria-labelledby="cta-heading"
          className="bg-ink text-paper px-4 sm:px-10 py-24 sm:py-32 text-center"
        >
          <p className="serial text-bulb mb-6">Reserve the Night</p>
          <h2
            id="cta-heading"
            className="font-display text-[clamp(3.5rem,10vw,9rem)] uppercase leading-none"
          >
            <NeonSign>Book it.</NeonSign>
          </h2>
          <p className="mt-6 font-body text-lg max-w-lg mx-auto">
            Tell us the date and the yard. Quote back inside 24 hours.
          </p>
          <div className="mt-10">
            <BulbButton href="/contact">Get a Quote</BulbButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
