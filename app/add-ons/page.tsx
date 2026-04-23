import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";
import FilmStrip from "@/components/film-strip";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Add-On Catalog",
  description:
    "Customize your outdoor cinema event: karaoke, drone video, gaming, backyard games, popcorn, photo backdrop, string lights, patio heater, and more. After Dusk Events, Canton, MI.",
  alternates: { canonical: "/add-ons" },
};

const categories = [
  {
    name: "Entertainment",
    items: [
      { item: "8-bit retro system + 4 wireless controllers", bestFor: "Birthdays, family nights, casual gaming" },
      { item: "BYO console hookup (PlayStation / Xbox, staff-connected)", bestFor: "Gamers bringing their own gear" },
      { item: "YouTube karaoke + 2 wireless mics", bestFor: "Any event, any age" },
      { item: "Drone video and photos (staff-operated only)", bestFor: "Big events, memories you want recorded" },
      { item: "Cornhole", bestFor: "Daytime / pre-event activation" },
      { item: "Can jam", bestFor: "Daytime / pre-event activation" },
      { item: "Ladder ball", bestFor: "Daytime / pre-event activation" },
    ],
  },
  {
    name: "Concessions",
    items: [
      { item: "Popcorn machine rental", bestFor: "Movie nights, birthdays, classic cinema feel" },
      { item: "Cooler rental (you supply drinks, ice, popcorn supplies)", bestFor: "Outdoor events" },
    ],
  },
  {
    name: "Atmosphere",
    items: [
      { item: "Ambient string lighting", bestFor: "Dinner parties, backyard vibes" },
      { item: "Blacklights", bestFor: "Teen birthdays, graduations, glow parties. Pairs with the glow bundle." },
      { item: "Glow sticks, bracelets, necklaces", bestFor: "Teen / tween parties, late-night energy" },
      { item: "Photo area with backdrop", bestFor: "Graduations, memory-driven events" },
    ],
  },
  {
    name: "Comfort",
    items: [
      { item: "Patio heater", bestFor: "Cool-weather evenings" },
      { item: "Bug zapper", bestFor: "Any outdoor event, summer months" },
    ],
  },
  {
    name: "Seating & surfaces",
    items: [
      { item: "Folding table, 6 ft", bestFor: "Food service, concessions, gift table" },
      { item: "Folding table, 4 ft", bestFor: "Smaller concessions" },
      { item: "Folding table, 4 ft round", bestFor: "Dinner service, round-table seating" },
    ],
  },
  {
    name: "Service extensions",
    items: [
      { item: "Early setup", bestFor: "Complex venues, tight timelines" },
      { item: "Late teardown", bestFor: "Late-running events" },
    ],
  },
];

const bundles = [
  {
    name: "Blacklight + Neon Kit",
    includes:
      "Blacklights + glow sticks + glow bracelets + glow necklaces, priced as one line.",
    bestFor: "Teen birthdays, graduations, bachelorettes, post-prom, Halloween",
  },
];

export default function AddOnsPage() {
  return (
    <>
      <SchemaMarkup
        id="addons-breadcrumb"
        data={buildBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Setup", href: "/packages" },
          { name: "Add-Ons", href: "/add-ons" },
        ])}
      />
      <Nav />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-14">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">№ 005 · The Concessions Stand</p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-none">
              Add-on catalog.
            </h1>
            <p className="mt-8 font-body text-lg max-w-xl">
              Every add-on is quoted with your setup. No set prices.
              Contact us for a real total inside 24 hours.
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        {/* Menu categories */}
        <section className="bg-paper px-4 sm:px-10 py-16">
          <div className="mx-auto max-w-5xl">
            {categories.map((cat) => (
              <div key={cat.name} className="mb-16 last:mb-0">
                <div className="flex items-baseline justify-between mb-6 pb-2 border-b-2 border-ink">
                  <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-none">
                    {cat.name}
                  </h2>
                  <p className="serial text-concrete">
                    {String(cat.items.length).padStart(2, "0")} items
                  </p>
                </div>
                <ul className="divide-y-2 divide-ink/20">
                  {cat.items.map((row) => (
                    <li
                      key={row.item}
                      className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:gap-8 py-4 items-baseline"
                    >
                      <p className="font-display text-xl uppercase leading-tight">
                        {row.item}
                      </p>
                      <p className="font-mono text-sm text-concrete mt-1 sm:mt-0 sm:text-right">
                        {row.bestFor}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end mt-3">
                  <span className="stamp">Custom Quote</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bundles */}
        <section
          className="bg-ink text-paper px-4 sm:px-10 py-20"
          aria-labelledby="bundles-heading"
        >
          <div className="mx-auto max-w-5xl">
            <p className="serial text-bulb mb-4">Combo Deals</p>
            <h2
              id="bundles-heading"
              className="font-display text-[clamp(2.25rem,5vw,4rem)] uppercase mb-3"
            >
              Bundles.
            </h2>
            <p className="font-body text-paper/80 mb-10">
              Pre-built combos, quoted as one line.
            </p>
            <ul className="divide-y-2 divide-paper/25 border-y-2 border-paper/25">
              {bundles.map((b) => (
                <li key={b.name} className="py-6">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase leading-none mb-2">
                    {b.name}
                  </h3>
                  <p className="font-body leading-relaxed mb-2">{b.includes}</p>
                  <p className="font-mono text-sm text-bulb">
                    Best for: {b.bestFor}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-paper px-4 sm:px-10 py-20 text-center">
          <p className="serial text-tail mb-4">Ready to Build?</p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-none mb-6">
            Tell us what you want.
          </h2>
          <p className="font-body text-concrete max-w-xl mx-auto mb-10">
            Tell us what you&apos;re thinking and we&apos;ll put together a real quote.
          </p>
          <BulbButton href="/contact">Get a Quote</BulbButton>
        </section>
      </main>
      <Footer />
    </>
  );
}
