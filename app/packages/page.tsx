import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";
import TicketStub from "@/components/ticket-stub";
import FilmStrip from "@/components/film-strip";
import NeonSign from "@/components/neon-sign";
import SchemaMarkup from "@/components/seo/schema-markup";
import { audioTiers, useCases } from "@/lib/packages";
import { buildAllServicesGraph, buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Setup & Audio Tiers",
  description:
    "One 30 ft inflatable screen. Three audio tiers. Private events only in Southeast Michigan. After Dusk Events, Canton, MI.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <SchemaMarkup
        id="packages-services"
        data={[
          ...buildAllServicesGraph(),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "Setup", href: "/packages" },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-14">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">№ 003 · The Menu</p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-none">
              One screen.
              <br />
              Three audio tiers.
            </h1>
            <p className="mt-8 font-body text-lg max-w-xl">
              Every booking is a private, non-ticketed event on a 30 ft
              inflatable screen. Pick the audio that fits the night.
              Add what you need. Setup, systems test, and teardown are
              on the house.
            </p>
            <p className="serial text-concrete mt-6">
              Every event is custom-quoted — contact for a real number inside 24 hours.
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        {/* Ticket-stub tier grid */}
        <section
          className="bg-ink text-paper px-4 sm:px-10 py-20"
          aria-labelledby="tiers-heading"
        >
          <div className="mx-auto max-w-7xl">
            <p className="serial text-bulb mb-4">Now Booking</p>
            <h2
              id="tiers-heading"
              className="font-display text-[clamp(2.25rem,5vw,4rem)] uppercase mb-12"
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
                  <h3
                    className="font-display text-2xl sm:text-3xl uppercase leading-tight mb-3"
                    style={{ viewTransitionName: `tier-name-${tier.slug}` }}
                  >
                    {tier.name}
                  </h3>
                  <p className="serial text-tail mb-4">Custom quote per event</p>
                  <p className="font-mono text-sm text-concrete mb-5">
                    Best for: {tier.best}
                  </p>
                  <ul className="space-y-1.5 mb-6 text-sm font-body">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-tail">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href={`/packages/${tier.slug}`}
                      className="serial text-ink border-b-2 border-ink pb-0.5 hover:text-tail hover:border-tail transition-colors"
                    >
                      Spec Sheet →
                    </Link>
                    <Link
                      href={`/contact?package=${encodeURIComponent(tier.name)}`}
                      className="serial bg-tail text-paper px-3 py-2 hover:bg-ink transition-colors"
                    >
                      Quote
                    </Link>
                  </div>
                </TicketStub>
              ))}
            </div>
          </div>
        </section>

        {/* Event types — Now Showing board */}
        <section
          id="use-cases"
          className="bg-paper px-4 sm:px-10 py-20"
          aria-labelledby="use-cases-heading"
        >
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-4">№ 004 · Now Showing</p>
            <h2
              id="use-cases-heading"
              className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase mb-4"
            >
              Event types.
            </h2>
            <p className="font-body text-concrete max-w-xl mb-10">
              Pick your event. We match the audio tier. Every type
              below runs on the same 30 ft screen — sound scales with
              the crowd.
            </p>

            <ul
              className="divide-y-2 divide-ink border-y-2 border-ink"
              role="list"
            >
              {useCases.map((uc) => (
                <li
                  key={uc.slug}
                  id={uc.slug}
                  className="grid grid-cols-[1fr_auto] gap-6 items-center py-6"
                >
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase leading-none mb-2">
                      {uc.name}
                    </h3>
                    <p className="font-body text-sm text-concrete max-w-xl">
                      {uc.desc}
                    </p>
                  </div>
                  <Link
                    href={`/contact?package=${encodeURIComponent(uc.name)}`}
                    className="serial text-tail border-2 border-tail px-3 py-2 hover:bg-tail hover:text-paper transition-colors whitespace-nowrap"
                  >
                    Request Quote
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FilmStrip tone="ink" />

        {/* Add-ons teaser */}
        <section className="bg-paper px-4 sm:px-10 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="serial text-tail mb-4">The Concessions Stand</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none mb-5">
              Need extras?
            </h2>
            <p className="font-body text-concrete mb-8">
              Karaoke, drone, popcorn, cornhole, photo backdrop, string
              lights, patio heater, bug zapper, and more.
            </p>
            <Link
              href="/add-ons"
              className="serial border-b-2 border-ink pb-0.5 hover:text-tail hover:border-tail transition-colors"
            >
              Browse the Add-On Catalog →
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section
          aria-labelledby="cta-heading"
          className="bg-ink text-paper px-4 sm:px-10 py-24 text-center"
        >
          <p className="serial text-bulb mb-6">Reserve the Night</p>
          <h2
            id="cta-heading"
            className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-none"
          >
            <NeonSign>Book it.</NeonSign>
          </h2>
          <p className="mt-6 font-body text-lg max-w-lg mx-auto">
            Not sure which tier fits? Tell us the event and we&apos;ll match the rig.
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
