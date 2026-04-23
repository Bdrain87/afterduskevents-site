import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import MagneticButton from "@/components/magnetic-button";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList } from "@/lib/schema";
import PageAtmosphere from "@/components/atmosphere/page-atmosphere";

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
      { item: "Drone video and photos (staff-operated only)", bestFor: "Weddings, big events, memories you want recorded" },
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
      { item: "Ambient string lighting", bestFor: "Dusk weddings, dinner parties, backyard vibes" },
      { item: "Blacklights", bestFor: "Teen birthdays, graduations, glow parties — pairs with the glow bundle" },
      { item: "Glow sticks, bracelets, necklaces", bestFor: "Teen / tween parties, reception late-night energy" },
      { item: "Photo area with backdrop", bestFor: "Weddings, graduations, memory-driven events" },
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
      { item: "Folding table, 4 ft round", bestFor: "Wedding / reception seating" },
    ],
  },
  {
    name: "Service extensions",
    items: [
      { item: "Early setup", bestFor: "Weddings, complex venues, tight timelines" },
      { item: "Late teardown", bestFor: "Late-running events, weddings" },
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

function CategoryTable({ category }: { category: typeof categories[0] }) {
  return (
    <FadeIn>
      <div className="mb-12">
        <h2 className="font-heading text-xl text-projector mb-4 pb-2 border-b border-oxblood/30">
          {category.name}
        </h2>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left bg-charcoal">
                <th className="px-5 py-3 text-steel font-semibold">Item</th>
                <th className="px-5 py-3 text-steel font-semibold">Best for</th>
              </tr>
            </thead>
            <tbody>
              {category.items.map((row, i) => (
                <tr
                  key={row.item}
                  className={`border-b border-white/5 ${i % 2 === 1 ? "bg-charcoal/50" : ""}`}
                >
                  <td className="px-5 py-3.5 text-projector font-medium align-top">{row.item}</td>
                  <td className="px-5 py-3.5 text-steel align-top">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FadeIn>
  );
}

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
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-oxblood relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-oxblood to-oxblood-deep" aria-hidden="true" />
          <PageAtmosphere variant="ember" className="opacity-60" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <FadeIn>
              <p className="text-projector/60 text-xs tracking-[0.2em] uppercase mb-3">Customize your event</p>
              <h1 className="font-display text-[clamp(3rem,8vw,6rem)] text-projector tracking-wider leading-none mb-2">
                ADD-ON CATALOG
              </h1>
              <div className="block w-12 h-[2px] bg-projector/40 mt-3" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-projector/70 text-lg leading-relaxed mt-6">
                Every add-on is quoted with your setup. Contact Blake for a real total.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {categories.map((cat) => (
              <CategoryTable key={cat.name} category={cat} />
            ))}
          </div>
        </section>

        {/* Bundles */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="bundles-heading">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 id="bundles-heading" className="font-heading text-2xl text-projector mb-2">
                Bundles
              </h2>
              <p className="text-steel text-sm mb-8">
                Pre-built combos. Ask Blake for bundle pricing.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bundles.map((b, i) => (
                <FadeIn key={b.name} delay={i * 0.06}>
                  <div className="bg-screening rounded-lg p-6 border border-white/10 hover:border-oxblood/30 transition-colors h-full">
                    <h3 className="font-heading text-base text-projector mb-2">{b.name}</h3>
                    <p className="text-steel text-sm leading-relaxed mb-2">{b.includes}</p>
                    <p className="text-steel text-xs italic">Best for: {b.bestFor}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="font-heading text-2xl text-projector mb-4">Ready to build your event?</h2>
              <p className="text-steel mb-8 text-sm leading-relaxed">
                Tell Blake what you are thinking and he will put together a real quote.
              </p>
              <MagneticButton className="inline-flex">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(107,31,31,0.4)] transition-all duration-300"
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
