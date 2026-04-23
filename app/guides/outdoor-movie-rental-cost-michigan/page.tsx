import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import MagneticButton from "@/components/magnetic-button";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildArticle, buildBreadcrumbList, buildFAQPage } from "@/lib/schema";
import Balancer from "react-wrap-balancer";

const SLUG = "/guides/outdoor-movie-rental-cost-michigan";
const PUBLISHED = "2026-04-22";
const UPDATED = "2026-04-23";

export const metadata: Metadata = {
  title:
    "How Much Does an Outdoor Movie Rental Cost in Michigan? (2026 Guide)",
  description:
    "What outdoor movie and inflatable cinema rentals actually cost in metro Detroit and Southeast Michigan. Audio tier, event type, what changes the price.",
  alternates: { canonical: SLUG },
  openGraph: {
    title: "Outdoor Movie Rental Cost in Michigan (2026)",
    description:
      "What outdoor cinema rentals actually cost in Southeast Michigan: one 30 ft screen, three audio tiers.",
    url: `https://afterduskevents.com${SLUG}`,
  },
};

const guideFaqs = [
  {
    q: "What is the average cost of an outdoor movie rental in Michigan?",
    a: "Outdoor cinema rentals in Southeast Michigan run a custom range depending on audio tier, event type, runtime, distance, and add-ons. Every After Dusk Events booking is quoted custom around the event. There is no automated calculator.",
  },
  {
    q: "What changes the price of a backyard movie rental?",
    a: "The biggest factors are audio tier (single speaker, two speakers, or two speakers plus a Death From Below subwoofer), runtime, distance from Canton MI, and add-ons (karaoke with two mics, drone video, popcorn machine, backyard games, photo backdrop, patio heater, bug zapper, string lighting, early setup, late teardown).",
  },
  {
    q: "Do you charge a deposit?",
    a: "Yes. Every booking requires a deposit to lock the date, with the balance due before the event. Specific deposit amounts are spelled out in the Service Agreement that comes with your quote.",
  },
  {
    q: "Is there a travel fee?",
    a: "Inside 60 miles of Canton, MI, no separate travel fee is added. Beyond 60 miles, contact Blake for a custom quote with a travel line item.",
  },
  {
    q: "Do you publish a price list?",
    a: "Not in fixed-price form. Every event is different and benefits from a real conversation about audio tier, layout, and add-ons. We respond to every inquiry within 24 hours with a real number tied to your specific event.",
  },
];

export default function GuidePage() {
  return (
    <>
      <SchemaMarkup
        id="guide-cost-schema"
        data={[
          buildArticle({
            headline: "How Much Does an Outdoor Movie Rental Cost in Michigan? (2026)",
            description:
              "What outdoor movie and inflatable cinema rentals cost across metro Detroit and Southeast Michigan in 2026.",
            slug: SLUG,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          buildFAQPage(guideFaqs),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "Guides", href: "/guides" },
            { name: "Outdoor Movie Rental Cost (Michigan)", href: SLUG },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1 pt-16">
        <article className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <p className="text-ember text-xs tracking-[0.2em] uppercase mb-3">
                Guide
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl text-projector mb-4 leading-tight">
                <Balancer>How much does an outdoor movie rental cost in Michigan? (2026)</Balancer>
              </h1>
              <p className="text-steel text-xs uppercase tracking-wider">
                By <Link href="/about" className="text-ember hover:text-projector transition-colors">Blake</Link>
                {" · "}
                Updated{" "}
                <time dateTime={UPDATED}>April 2026</time>
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p className="text-steel text-lg leading-relaxed mt-8">
                After Dusk Events runs one 30 ft inflatable screen with three audio tiers. The
                pricing axis is audio, not screen size. Every booking is custom-quoted within
                24 hours of inquiry. This guide walks through what changes the number.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-heading text-2xl text-projector mt-12 mb-4">
                Three audio tiers, one screen
              </h2>
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left bg-charcoal">
                      <th className="px-5 py-3 text-steel font-semibold">Audio tier</th>
                      <th className="px-5 py-3 text-steel font-semibold">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { tier: "30 ft + Single Speaker", rec: "Smaller backyards, intimate gatherings" },
                      { tier: "30 ft + Two Speakers", rec: "Standard outdoor events, most bookings" },
                      { tier: "30 ft + Two Speakers + Death From Below Sub", rec: "Fight nights, bass-heavy music, large crowds" },
                    ].map((row, i) => (
                      <tr key={row.tier} className={`border-b border-white/5 ${i % 2 === 1 ? "bg-charcoal/40" : ""}`}>
                        <td className="px-5 py-3.5 text-ember font-semibold">{row.tier}</td>
                        <td className="px-5 py-3.5 text-steel">{row.rec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-steel text-xs italic mt-3">
                Real numbers come with your quote. Contact Blake to price your specific event.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-heading text-2xl text-projector mt-12 mb-4">
                What changes the price
              </h2>
              <ul className="space-y-3 text-steel leading-relaxed">
                {[
                  ["Audio tier", "Single speaker, two speakers, or two speakers plus a Death From Below subwoofer. The subwoofer tier is the one to pick for fight nights and music-heavy events."],
                  ["Runtime", "3 hour vs 4 hour vs 6+ hour events scale the price."],
                  ["Distance from Canton", "Inside 60 miles, no travel fee. Beyond, a travel line is added."],
                  ["Add-ons", "Karaoke with 2 wireless mics, drone video/photos, popcorn machine, cooler, cornhole / can jam / ladder ball, photo backdrop, ambient string lighting, blacklights + glow kit, patio heater, bug zapper, folding tables, early setup, late teardown."],
                  ["Console hookup", "BYO PlayStation or Xbox with staff hookup is a paid add-on (waiver signed at event)."],
                ].map(([title, body]) => (
                  <li key={title}>
                    <strong className="text-projector">{title}.</strong> {body}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-heading text-2xl text-projector mt-12 mb-4">
                Common questions
              </h2>
              <div className="space-y-6">
                {guideFaqs.map((f) => (
                  <div key={f.q} className="border-b border-white/10 pb-5">
                    <h3 className="font-heading text-base text-projector mb-2">{f.q}</h3>
                    <p className="text-steel text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="mt-16 text-center">
                <h2 className="font-heading text-2xl text-projector mb-4">
                  Get a real quote for your event
                </h2>
                <p className="text-steel mb-8 text-sm leading-relaxed max-w-xl mx-auto">
                  Tell us the date, location, and guest count. You will get a real number within 24 hours.
                </p>
                <MagneticButton className="inline-flex">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
                  >
                    Get a Quote
                  </Link>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
