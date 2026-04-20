import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Check } from "lucide-react";
import FadeIn, { FadeInGroup, FadeInItem } from "@/components/fade-in";
import AnimatedCard from "@/components/animated-card";
import MagneticButton from "@/components/magnetic-button";
import { PrivateEventsNotice } from "@/components/private-events-notice";

export const metadata: Metadata = {
  title: "Wedding Cinema Packages",
  description:
    "Outdoor wedding cinema in Southeast Michigan. Elopement, reception, or full-day ceremony plus reception. Veteran-owned, water ballast setup, wireless audio. Contact for quote.",
  alternates: { canonical: "/packages/weddings" },
};

const tiers = [
  {
    name: "Elopement / Micro-Wedding",
    duration: "3 hour event",
    includes: [
      "20 ft airtight inflatable screen",
      "4K laser projector",
      "2 Soundboks 4 speakers",
      "Ceremony wireless mic pair",
      "Projected ceremony backdrop",
      "Water ballast, no venue staking required",
    ],
    cta: "Request Elopement Quote",
  },
  {
    name: "Wedding Reception Cinema",
    duration: "4 to 5 hour event",
    popular: true,
    includes: [
      "30 ft airtight inflatable screen",
      "4K laser projector",
      "Dance floor Soundboks audio zone",
      "Death From Below MK2 subwoofer",
      "First dance film or love-story reel display",
      "Wireless mic pair for toasts",
      "Lightboks audio-reactive LED lighting",
    ],
    cta: "Request Reception Quote",
  },
  {
    name: "Wedding Full Day",
    duration: "Ceremony through reception",
    includes: [
      "Dual audio zones: ceremony and reception",
      "Wireless mic pair for vows and officiant",
      "Ceremony backdrop projection",
      "30 ft reception screen",
      "Reception dance floor Soundboks and DFB MK2",
      "Lightboks dance floor lighting",
      "On-site crew from ceremony through breakdown",
    ],
    cta: "Request Full Day Quote",
  },
];

const weddingAddOns = [
  { item: "Ceremony sound setup", bestFor: "Clean vows audio and processional music" },
  { item: "First dance projected film", bestFor: "Love-story reel during first dance" },
  { item: "Reception dance floor zone", bestFor: "Premium Soundboks and Lightboks dance floor" },
  { item: "Late night after-party bass drop", bestFor: "After-dinner energy shift" },
  { item: "Brunch projection loop", bestFor: "Next-day brunch recap loops" },
];

const weddingFaq = [
  {
    q: "Do you handle ceremonies and receptions?",
    a: "Yes. The Full Day package covers ceremony through reception with dual audio zones. The Elopement and Reception Cinema tiers are purpose-built for shorter events.",
  },
  {
    q: "Do you need to stake the screen at our venue?",
    a: "No. Water ballast setup handles most sites including golf courses, vineyards, barns, hardscape, and private estates. No utility locates needed.",
  },
  {
    q: "Can you show our engagement video or love-story reel?",
    a: "Yes. BYO Content means you supply the video and we display it. The First Dance Projected Film add-on is built for exactly this.",
  },
  {
    q: "Is the audio loud enough for a dance floor?",
    a: "Yes. The Reception and Full Day tiers include a dedicated dance floor Soundboks zone and a DFB MK2 subwoofer.",
  },
  {
    q: "Are these private events only?",
    a: "Yes. All bookings are for private, non-ticketed gatherings. Selling tickets or charging admission is prohibited per our Service Agreement.",
  },
];

export default function WeddingsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h1 className="font-display text-5xl sm:text-7xl text-projector tracking-wider leading-none mb-2">
                A WEDDING THAT LOOKS AS GOOD AS IT FEELS.
              </h1>
              <span className="oxblood-rule" />
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="text-steel text-lg leading-relaxed mt-6 max-w-2xl">
                Elopement, reception cinema, or full-day ceremony plus reception.
                Ceremony audio through the dance floor, all from one veteran-owned operator.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <MagneticButton className="inline-flex mt-8">
                <Link
                  href="/contact?package=Wedding"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                >
                  Get a Wedding Quote
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </section>

        {/* Three tiers */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="tiers-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 id="tiers-heading" className="font-heading text-2xl sm:text-3xl text-projector mb-10">
                Three tiers, one operator
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {tiers.map((tier, i) => (
                <AnimatedCard
                  key={tier.name}
                  delay={i * 0.1}
                  className={`rounded-lg p-8 flex flex-col ${
                    tier.popular
                      ? "bg-charcoal ring-2 ring-oxblood"
                      : "bg-charcoal border border-white/10 hover:border-white/20 transition-colors"
                  }`}
                >
                  {tier.popular && (
                    <span className="inline-flex self-start mb-3 bg-oxblood text-projector text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-heading text-xl text-projector mb-1">{tier.name}</h3>
                  <p className="text-steel text-xs mb-5">{tier.duration}</p>
                  <ul className="space-y-2.5 flex-1 mt-5 mb-6">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-steel text-sm">
                        <Check size={14} className="text-oxblood mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?package=${encodeURIComponent(tier.name)}`}
                    className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                      tier.popular
                        ? "bg-oxblood text-projector hover:bg-oxblood-deep"
                        : "border border-oxblood text-oxblood hover:bg-oxblood hover:text-projector"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Wedding add-ons */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="wedding-addons-heading">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <h2 id="wedding-addons-heading" className="font-heading text-2xl text-projector mb-6">
                Wedding Add-Ons
              </h2>
            </FadeIn>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="px-5 py-3 text-steel font-semibold">Item</th>
                    <th className="px-5 py-3 text-steel font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {weddingAddOns.map((row, i) => (
                    <tr
                      key={row.item}
                      className={`border-b border-white/5 ${i % 2 === 1 ? "bg-screening/40" : ""}`}
                    >
                      <td className="px-5 py-3.5 text-projector font-medium">{row.item}</td>
                      <td className="px-5 py-3.5 text-steel">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
            </div>
          </div>
        </section>

        {/* Wedding FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="wedding-faq-heading">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 id="wedding-faq-heading" className="font-heading text-2xl text-projector mb-8">
                Common questions
              </h2>
            </FadeIn>
            <FadeInGroup className="space-y-5" stagger={0.07}>
              {weddingFaq.map((item) => (
                <FadeInItem key={item.q}>
                  <div className="border-b border-white/10 pb-5">
                    <h3 className="font-heading text-base text-projector mb-2">{item.q}</h3>
                    <p className="text-steel text-sm leading-relaxed">{item.a}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInGroup>
          </div>
        </section>

        {/* Private events + CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl space-y-6">
            <PrivateEventsNotice />
            <div className="text-center pt-4">
              <MagneticButton className="inline-flex">
                <Link
                  href="/contact?package=Wedding"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                >
                  Get a Wedding Quote
                </Link>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
