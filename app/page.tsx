import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Monitor, Volume2, Zap, Star, ArrowRight } from "lucide-react";
import AnimatedHeroText, {
  AnimatedSubtext,
  AnimatedCTAs,
} from "@/components/animated-hero-text";
import FadeIn, { FadeInGroup, FadeInItem } from "@/components/fade-in";
import AnimatedCard from "@/components/animated-card";
import MagneticButton from "@/components/magnetic-button";

export const metadata: Metadata = {
  title: "Outdoor Movie Rentals & Event Cinema | After Dusk Events | Canton, MI",
  description:
    "Premium outdoor cinema and event rental. 30-foot screen, concert-grade sound, veteran-owned. Serving Canton, Ann Arbor, Detroit, and Southeast Michigan within 60 miles.",
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "After Dusk Events LLC",
  description:
    "Veteran-owned premium outdoor cinema and event rentals for Southeast Michigan. 30-foot screen, concert-grade sound, full power independence.",
  url: "https://afterduskevents.com",
  telephone: "+1-734-000-0000",
  email: "hello@afterduskevents.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Canton",
    addressRegion: "MI",
    postalCode: "48188",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 42.3084,
      longitude: -83.4822,
    },
    geoRadius: "96560",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "23:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "1",
  },
  priceRange: "$$$",
  image: "https://afterduskevents.com/og-image.png",
};

const steps = [
  {
    n: "01",
    title: "Tell us about your event",
    body: "Date, location, guest count, vibe. A quick form or a call -- either works.",
  },
  {
    n: "02",
    title: "We send a quote and Service Agreement",
    body: "Transparent pricing, no surprises. Everything spelled out before you sign.",
  },
  {
    n: "03",
    title: "Lock the date with 50% deposit",
    body: "Card, tap, or invoice. Your date is held the moment the deposit lands.",
  },
  {
    n: "04",
    title: "We arrive 3 hours early",
    body: "Setup, sound check, full systems test before your first guest sets foot on the lawn.",
  },
  {
    n: "05",
    title: "You enjoy the night",
    body: "We run the show and handle the teardown. All you do is watch the movie.",
  },
];

const featuredPackages = [
  {
    name: "Premium Cinema",
    range: "$1,950 to $2,450",
    desc: "Full power independence, subwoofers, enhanced lighting, concessions option.",
  },
  {
    name: "Sports Watch Party",
    range: "$1,850 to $2,250",
    desc: "Large screen, live-stream support, lounge-style environment, wireless audio.",
  },
  {
    name: "Corporate Event",
    range: "$2,500 to $3,500",
    desc: "Wireless mics, mixer, presentation support, branded operator station.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=2000"
            alt="Outdoor cinema at night with a large glowing screen"
            fill
            className="object-cover object-center scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-screening/70 via-screening/50 to-screening/90" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-16">
            <AnimatedHeroText />
            <AnimatedSubtext>
              Veteran-owned premium outdoor cinema and event rentals for Southeast Michigan.
              30-foot screen. Concert-grade sound. Full power independence.
              One operator, every detail handled.
            </AnimatedSubtext>
            <AnimatedCTAs>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood"
                  >
                    Request a Quote
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/packages"
                    className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors"
                  >
                    See Packages
                  </Link>
                </MagneticButton>
              </div>
            </AnimatedCTAs>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-projector text-xs tracking-widest uppercase">Scroll</span>
            <div
              className="w-px h-10 bg-projector"
              style={{ animation: "scrollHint 2s ease-in-out infinite" }}
            />
          </div>
        </section>

        {/* ── Trust strip ───────────────────────────────────────── */}
        <div className="bg-charcoal border-b border-white/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-0.5 text-oxblood shrink-0" aria-label="5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
              ))}
            </div>
            <p className="text-steel text-sm text-center">
              Serving backyards, weddings, HOAs, schools, and corporate teams within 60 miles of Canton, MI.
            </p>
          </div>
        </div>

        {/* ── Why section ───────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="why-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2
                id="why-heading"
                className="text-center font-heading text-3xl sm:text-4xl text-projector mb-16"
              >
                Not your average backyard projector
              </h2>
            </FadeIn>
            <FadeInGroup className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12}>
              {[
                {
                  icon: <Monitor size={32} className="text-oxblood" aria-hidden="true" />,
                  title: "30-Foot Screen",
                  body: "Our inflatable screen dwarfs typical backyard setups. Every guest gets a front-row seat, whether they are 10 feet away or 100.",
                },
                {
                  icon: <Volume2 size={32} className="text-oxblood" aria-hidden="true" />,
                  title: "Concert-Grade Sound",
                  body: "QSC speakers and subwoofers. Dialog stays crisp at any volume. Bass hits right. No tinny Bluetooth speaker vibes.",
                },
                {
                  icon: <Zap size={32} className="text-oxblood" aria-hidden="true" />,
                  title: "Power Independence",
                  body: "Generator-backed. We show up anywhere inside 60 miles of Canton -- field, farm, park, or parking lot -- outlet or no outlet.",
                },
              ].map((col) => (
                <FadeInItem key={col.title}>
                  <div className="bg-charcoal rounded-lg p-8 h-full group hover:bg-charcoal/80 transition-colors duration-300 border border-transparent hover:border-white/8">
                    <div className="mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {col.icon}
                    </div>
                    <h3 className="font-heading text-xl text-projector mb-3">{col.title}</h3>
                    <p className="text-steel leading-relaxed">{col.body}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInGroup>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="how-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2
                id="how-heading"
                className="text-center font-heading text-3xl sm:text-4xl text-projector mb-16"
              >
                How it works
              </h2>
            </FadeIn>
            <FadeInGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8" stagger={0.1} delay={0.1}>
              {steps.map((step) => (
                <FadeInItem key={step.n}>
                  <div className="flex flex-col">
                    <div className="font-display text-5xl text-oxblood leading-none mb-4">
                      {step.n}
                    </div>
                    <h3 className="font-heading text-base text-projector mb-2">{step.title}</h3>
                    <p className="text-steel text-sm leading-relaxed">{step.body}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInGroup>
          </div>
        </section>

        {/* ── Featured packages ─────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="packages-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <h2
                id="packages-heading"
                className="font-heading text-3xl sm:text-4xl text-projector"
              >
                Popular packages
              </h2>
              <Link
                href="/packages"
                className="flex items-center gap-2 text-oxblood text-sm font-medium hover:text-oxblood/80 transition-colors group"
              >
                View all packages{" "}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPackages.map((pkg, i) => (
                <AnimatedCard
                  key={pkg.name}
                  delay={i * 0.1}
                  className="bg-charcoal rounded-lg p-8 flex flex-col border border-white/8 hover:border-white/20 transition-colors duration-300"
                >
                  <span className="inline-flex mb-4 self-start bg-oxblood/10 text-oxblood text-xs font-semibold px-3 py-1 rounded-full">
                    {pkg.range}
                  </span>
                  <h3 className="font-heading text-xl text-projector mb-3">{pkg.name}</h3>
                  <p className="text-steel text-sm leading-relaxed flex-1">{pkg.desc}</p>
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className="mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-projector border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors"
                  >
                    Request this Package
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── About teaser ──────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="about-teaser-heading">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2
                id="about-teaser-heading"
                className="font-heading text-3xl sm:text-4xl text-projector mb-6"
              >
                Owner-operated. Mission-ready.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-steel text-lg leading-relaxed mb-10">
                After Dusk Events is owner-operated by Blake Drain, a U.S. Air Force veteran whose
                field-service background shows up in every load-in. Checklists, backup plans, and
                disciplined execution are not just marketing -- they are how the business runs.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <MagneticButton className="inline-flex">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-projector border border-white/30 hover:border-white/60 hover:bg-white/5 transition-colors"
                >
                  Read the Full Story
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="bg-oxblood py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="cta-heading">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 id="cta-heading" className="font-heading text-3xl sm:text-4xl text-projector mb-4">
                Ready to book?
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-projector/80 mb-8 text-lg">
                Tell us about your event and we will send availability and a tailored quote within 24 hours.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <MagneticButton className="inline-flex">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-oxblood bg-projector hover:bg-projector/90 transition-colors"
                >
                  Request a Quote
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes scrollHint {
          0%, 100% { opacity: 0.4; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(0.4); transform-origin: top; }
        }
      `}</style>
    </>
  );
}
