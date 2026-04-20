import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Monitor, Volume2, Zap, Star, ArrowRight } from "lucide-react";

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
  image: "https://afterduskevents.com/og-image.jpg",
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
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=2000"
            alt="Outdoor cinema at night with a large glowing screen"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-black/50 to-brand-black/90" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-16">
            <h1 className="font-display text-7xl sm:text-9xl tracking-wider text-brand-white leading-none mb-6">
              BIG SCREEN.<br />BIGGER NIGHTS.
            </h1>
            <p className="text-brand-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Veteran-owned premium outdoor cinema and event rentals for Southeast Michigan.
              30-foot screen. Concert-grade sound. Full power independence.
              One operator, every detail handled.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded px-8 py-4 text-base font-semibold text-brand-white bg-brand-red hover:bg-brand-red/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
              >
                Request a Quote
              </Link>
              <Link
                href="/packages"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded px-8 py-4 text-base font-semibold text-brand-white border border-brand-white/40 hover:border-brand-white/80 hover:bg-brand-white/5 transition-colors"
              >
                See Packages
              </Link>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <div className="bg-brand-charcoal border-b border-white/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-0.5 text-brand-red shrink-0" aria-label="5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
              ))}
            </div>
            <p className="text-brand-gray text-sm text-center">
              Serving backyards, weddings, HOAs, schools, and corporate teams within 60 miles of Canton, MI.
            </p>
          </div>
        </div>

        {/* Why section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="why-heading">
          <div className="mx-auto max-w-7xl">
            <h2
              id="why-heading"
              className="text-center font-heading text-3xl sm:text-4xl text-brand-white mb-16"
            >
              Not your average backyard projector
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Monitor size={32} className="text-brand-red" aria-hidden="true" />,
                  title: "30-Foot Screen",
                  body: "Our inflatable screen dwarfs typical backyard setups. Every guest gets a front-row seat, whether they are 10 feet away or 100.",
                },
                {
                  icon: <Volume2 size={32} className="text-brand-red" aria-hidden="true" />,
                  title: "Concert-Grade Sound",
                  body: "QSC speakers and subwoofers. Dialog stays crisp at any volume. Bass hits right. No tinny Bluetooth speaker vibes.",
                },
                {
                  icon: <Zap size={32} className="text-brand-red" aria-hidden="true" />,
                  title: "Power Independence",
                  body: "Generator-backed. We show up anywhere inside 60 miles of Canton -- field, farm, park, or parking lot -- outlet or no outlet.",
                },
              ].map((col) => (
                <div key={col.title} className="bg-brand-charcoal rounded-lg p-8">
                  <div className="mb-5">{col.icon}</div>
                  <h3 className="font-heading text-xl text-brand-white mb-3">{col.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{col.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-charcoal" aria-labelledby="how-heading">
          <div className="mx-auto max-w-7xl">
            <h2
              id="how-heading"
              className="text-center font-heading text-3xl sm:text-4xl text-brand-white mb-16"
            >
              How it works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {steps.map((step) => (
                <div key={step.n} className="flex flex-col">
                  <div className="font-display text-5xl text-brand-red leading-none mb-4">
                    {step.n}
                  </div>
                  <h3 className="font-heading text-base text-brand-white mb-2">{step.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured packages teaser */}
        <section className="py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="packages-heading">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <h2
                id="packages-heading"
                className="font-heading text-3xl sm:text-4xl text-brand-white"
              >
                Popular packages
              </h2>
              <Link
                href="/packages"
                className="flex items-center gap-2 text-brand-red text-sm font-medium hover:text-brand-red/80 transition-colors"
              >
                View all packages <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPackages.map((pkg) => (
                <div key={pkg.name} className="bg-brand-charcoal rounded-lg p-8 flex flex-col">
                  <span className="inline-flex mb-4 self-start bg-brand-red/10 text-brand-red text-xs font-semibold px-3 py-1 rounded-full">
                    {pkg.range}
                  </span>
                  <h3 className="font-heading text-xl text-brand-white mb-3">{pkg.name}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed flex-1">{pkg.desc}</p>
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className="mt-6 inline-flex items-center justify-center rounded px-4 py-2.5 text-sm font-semibold text-brand-white border border-white/20 hover:border-white/50 hover:bg-white/5 transition-colors"
                  >
                    Request this Package
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About teaser */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-charcoal" aria-labelledby="about-teaser-heading">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="about-teaser-heading"
              className="font-heading text-3xl sm:text-4xl text-brand-white mb-6"
            >
              Owner-operated. Mission-ready.
            </h2>
            <p className="text-brand-gray text-lg leading-relaxed mb-10">
              After Dusk Events is owner-operated by Blake Drain, a U.S. Air Force veteran whose
              field-service background shows up in every load-in. Checklists, backup plans, and
              disciplined execution are not just marketing -- they are how the business runs.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded px-6 py-3 text-base font-semibold text-brand-white border border-white/30 hover:border-white/60 hover:bg-white/5 transition-colors"
            >
              Read the Full Story
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand-red py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="cta-heading">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="cta-heading" className="font-heading text-3xl sm:text-4xl text-brand-white mb-4">
              Ready to book?
            </h2>
            <p className="text-brand-white/80 mb-8 text-lg">
              Tell us about your event and we will send availability and a tailored quote within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded px-8 py-4 text-base font-semibold text-brand-red bg-brand-white hover:bg-brand-white/90 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
