import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";
import FilmStrip from "@/components/film-strip";
import SpecSheet from "@/components/spec-sheet";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildArticle, buildBreadcrumbList, buildFAQPage } from "@/lib/schema";

const SLUG = "/guides/outdoor-movie-rental-cost-michigan";
const PUBLISHED = "2026-04-22";
const UPDATED = "2026-04-23";

export const metadata: Metadata = {
  title: "How Much Does an Outdoor Movie Rental Cost in Michigan? (2026 Guide)",
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
    a: "Inside 60 miles of Canton, MI, no separate travel fee is added. Beyond 60 miles, contact us for a custom quote with a travel line item.",
  },
  {
    q: "Do you publish a price list?",
    a: "Not in fixed-price form. Every event is different and benefits from a real conversation about audio tier, layout, and add-ons. We respond to every inquiry within 24 hours with a real number tied to your specific event.",
  },
];

const priceDrivers: [string, string][] = [
  ["Audio Tier", "Single speaker, two speakers, or two speakers plus a Death From Below subwoofer. The subwoofer tier is the one to pick for fight nights and music-heavy events."],
  ["Runtime", "3 hour vs 4 hour vs 6+ hour events scale the price."],
  ["Distance", "Inside 60 miles of Canton — no travel fee. Beyond that, a travel line is added."],
  ["Add-Ons", "Karaoke + 2 mics, drone video, popcorn machine, cooler, cornhole, photo backdrop, string lights, blacklights, patio heater, bug zapper, tables, early setup, late teardown."],
  ["Console Hookup", "BYO PlayStation or Xbox with staff hookup is a paid add-on (waiver signed at event)."],
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
      <main className="flex-1">
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-10">
          <div className="mx-auto max-w-3xl">
            <p className="serial text-tail mb-6">Guide · Pricing</p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-none">
              How much does an outdoor movie rental cost in Michigan?
            </h1>
            <p className="serial text-concrete mt-8">
              By{" "}
              <Link href="/about" className="text-tail hover:text-ink transition-colors">
                Blake
              </Link>
              {" · Updated "}
              <time dateTime={UPDATED}>April 2026</time>
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        <article className="bg-paper px-4 sm:px-10 py-16">
          <div className="mx-auto max-w-3xl font-body text-lg leading-relaxed">
            <p>
              <span className="float-left font-display text-[clamp(5rem,11vw,8rem)] leading-[0.8] mr-3 mt-1 text-tail">
                A
              </span>
              fter Dusk Events runs one 30 ft inflatable screen with three
              audio tiers. The pricing axis is audio, not screen size.
              Every booking is custom-quoted within 24 hours of inquiry.
              This guide walks through what changes the number.
            </p>

            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] uppercase leading-none mt-14 mb-6">
              Three audio tiers, one screen.
            </h2>
            <SpecSheet
              rows={[
                {
                  label: "Single Speaker",
                  value: "Intimate gatherings, smaller backyards",
                },
                {
                  label: "Two Speakers",
                  value: "Standard outdoor events — most bookings land here",
                },
                {
                  label: "Two Speakers + Sub",
                  value: "Fight nights, bass-heavy music, large crowds",
                },
              ]}
            />
            <p className="serial text-concrete mt-4">
              Real numbers come with your quote — tell us the event and we&apos;ll price it.
            </p>

            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] uppercase leading-none mt-14 mb-6">
              What changes the price.
            </h2>
            <ul className="space-y-5">
              {priceDrivers.map(([title, desc]) => (
                <li key={title} className="pl-4 border-l-4 border-tail">
                  <p className="font-display text-xl uppercase leading-none mb-2">
                    {title}
                  </p>
                  <p className="text-base">{desc}</p>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] uppercase leading-none mt-14 mb-6">
              Common questions.
            </h2>
            <div className="space-y-6">
              {guideFaqs.map((f, i) => (
                <div key={f.q} className="border-t-2 border-ink pt-5">
                  <p className="serial text-tail mb-2">
                    Q{String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-xl uppercase leading-tight mb-3">
                    {f.q}
                  </h3>
                  <p className="text-base text-concrete">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <section className="bg-ink text-paper px-4 sm:px-10 py-20 text-center">
          <p className="serial text-bulb mb-4">Get a Real Quote</p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-none mb-6">
            Ready to price it?
          </h2>
          <p className="font-body text-paper/80 max-w-lg mx-auto mb-10">
            Tell us the date, location, and guest count. Real quote inside 24 hours.
          </p>
          <BulbButton href="/contact">Get a Quote</BulbButton>
        </section>
      </main>
      <Footer />
    </>
  );
}
