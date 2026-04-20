import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Check } from "lucide-react";
import FadeIn, { FadeInGroup, FadeInItem } from "@/components/fade-in";
import AnimatedCard from "@/components/animated-card";
import MagneticButton from "@/components/magnetic-button";
import { EstimateNote } from "@/components/estimate-note";
import { PrivateEventsNotice } from "@/components/private-events-notice";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "Outdoor cinema packages for private events in Southeast Michigan. Movie nights, sports parties, gaming, weddings, corporate. Starting at $600. Canton, MI.",
  alternates: { canonical: "/packages" },
};

const corePackages = [
  {
    name: "Intimate 20 ft",
    price: "Starting at $750",
    popular: false,
    highlights: [
      "3 hour event",
      "20 ft airtight inflatable screen",
      "4K laser projector (BenQ LU930)",
      "2 Soundboks 4 wireless speakers",
      "BYO Content",
      "Water ballast, no digging required",
    ],
    best: "Backyards, small parties, family movie nights",
  },
  {
    name: "Community 30 ft",
    price: "Starting at $1,250",
    popular: true,
    highlights: [
      "4 hour event",
      "30 ft airtight inflatable screen",
      "4K laser projector",
      "4 Soundboks 4 speakers across two zones",
      "1 Death From Below MK2 subwoofer",
      "BYO Content",
      "Coverage up to ~250 people",
    ],
    best: "HOA nights, block parties, church events, larger backyards",
  },
  {
    name: "Indoor Winter",
    price: "Starting at $600",
    popular: false,
    highlights: [
      "3 hour event",
      "120 inch Da-Lite fast-fold screen",
      "4K laser projector",
      "2 Soundboks 4 speakers",
      "BYO Content",
      "Works in halls, gyms, barns, large living rooms",
    ],
    best: "Year-round events regardless of weather",
  },
];

const eventPackages = [
  {
    name: "Sports Watch Party",
    price: "Starting at $1,500",
    highlights: [
      "4 hour event, 30 ft screen",
      "Multi-zone Soundboks audio",
      "DFB MK2 subwoofer",
      "Live TV or streaming via Starlink Mini",
    ],
    best: "Fight nights, Super Bowl, Final Four, World Cup",
  },
  {
    name: "Gaming Night",
    price: "Starting at $1,400",
    highlights: [
      "4 hour event, 20 ft screen",
      "Nintendo Switch OLED + Retroid Pocket 4 Pro",
      "Wireless controllers",
      "2 Soundboks 4 speakers",
    ],
    best: "Birthdays, teen events, corporate team building",
  },
  {
    name: "Karaoke Night",
    price: "Starting at $900",
    highlights: [
      "3 hour event, 20 ft screen",
      "2 professional wireless microphones",
      "Multi-zone Soundboks audio",
      "Lightboks audio-reactive LED lighting",
    ],
    best: "Birthdays, bachelorette, holiday parties",
  },
  {
    name: "Birthday or Graduation",
    price: "Starting at $1,200",
    highlights: [
      "3 to 4 hour event",
      "20 ft or 30 ft screen",
      "Full Soundboks audio",
      "Photo slideshow or memory reel on screen",
    ],
    best: "Milestone celebrations for all ages",
  },
  {
    name: "Corporate or Community Org",
    price: "Starting at $2,200",
    highlights: [
      "4 to 6 hour event, 30 ft screen",
      "Multi-zone Soundboks audio",
      "Wireless mic pair for speakers",
      "Starlink Mini for presentations and live streams",
      "Invoicing and COI support",
    ],
    best: "Company events, non-profits, community organizations",
  },
];

export default function PackagesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <h1 className="font-display text-5xl sm:text-6xl text-projector tracking-wider mb-2">
                PACKAGES
              </h1>
              <span className="oxblood-rule mx-auto" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-steel text-lg leading-relaxed mt-6">
                Every package is a private, non-ticketed event. Setup, systems test, and teardown included.
              </p>
              <p className="text-steel text-sm mt-2 italic">
                All pricing is an estimate. Reach out for a real quote built around your event.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Private events notice */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <PrivateEventsNotice />
        </div>

        {/* Core Cinema */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="core-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 id="core-heading" className="font-heading text-2xl sm:text-3xl text-projector mb-8">
                Core Cinema
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {corePackages.map((pkg, i) => (
                <AnimatedCard
                  key={pkg.name}
                  delay={i * 0.08}
                  className={`rounded-lg p-8 flex flex-col ${
                    pkg.popular
                      ? "bg-charcoal ring-2 ring-oxblood"
                      : "bg-charcoal border border-white/10 hover:border-white/20 transition-colors"
                  }`}
                >
                  {pkg.popular && (
                    <span className="inline-flex self-start mb-3 bg-oxblood text-projector text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-heading text-xl text-projector mb-1">{pkg.name}</h3>
                  <p className="text-oxblood font-semibold text-lg mb-1">{pkg.price}</p>
                  <EstimateNote />
                  <p className="text-steel text-xs mt-3 mb-4 italic">Best for: {pkg.best}</p>
                  <ul className="space-y-2 flex-1 mb-6">
                    {pkg.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-steel text-sm">
                        <Check size={14} className="text-oxblood mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                      pkg.popular
                        ? "bg-oxblood text-projector hover:bg-oxblood-deep"
                        : "border border-oxblood text-oxblood hover:bg-oxblood hover:text-projector"
                    }`}
                  >
                    Request a Quote
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Weddings teaser */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <FadeIn>
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-lg border border-oxblood/30">
              <div>
                <h2 className="font-heading text-2xl text-projector mb-1">Weddings</h2>
                <p className="text-steel text-sm">Elopement, reception cinema, or full ceremony plus reception. Three tiers, one veteran-owned operator.</p>
                <p className="text-oxblood font-semibold mt-1 text-sm">Starting at $1,400</p>
              </div>
              <Link
                href="/packages/weddings"
                className="shrink-0 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold bg-oxblood text-projector hover:bg-oxblood-deep transition-colors"
              >
                See Wedding Packages
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* Event-type packages */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="event-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 id="event-heading" className="font-heading text-2xl sm:text-3xl text-projector mb-8">
                Event-Type Packages
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventPackages.map((pkg, i) => (
                <AnimatedCard
                  key={pkg.name}
                  delay={(i % 2) * 0.08}
                  className="bg-charcoal rounded-lg p-8 flex flex-col border border-white/10 hover:border-white/20 transition-colors"
                >
                  <h3 className="font-heading text-xl text-projector mb-1">{pkg.name}</h3>
                  <p className="text-oxblood font-semibold text-lg mb-1">{pkg.price}</p>
                  <EstimateNote />
                  <p className="text-steel text-xs mt-3 mb-4 italic">Best for: {pkg.best}</p>
                  <ul className="space-y-2 flex-1 mb-6">
                    {pkg.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-steel text-sm">
                        <Check size={14} className="text-oxblood mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold border border-oxblood text-oxblood hover:bg-oxblood hover:text-projector transition-colors"
                  >
                    Request a Quote
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons link */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="font-heading text-2xl text-projector mb-3">Need extras?</h2>
              <p className="text-steel mb-6 text-sm leading-relaxed">
                Popcorn, extra speakers, gaming bundles, Lightboks lighting, fog machines, and more.
              </p>
              <Link href="/add-ons" className="text-oxblood underline-offset-4 hover:underline font-medium">
                Browse the Add-On Catalog
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="font-heading text-3xl text-projector mb-4">Not sure which fits?</h2>
              <p className="text-steel mb-8 leading-relaxed">
                Tell us about your event and we will recommend the right setup.
              </p>
              <MagneticButton className="inline-flex">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                >
                  Get a Quote
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
