import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import SchemaMarkup from "@/components/seo/schema-markup";
import {
  FunnelSection,
  QuotePanel,
  SectionHeader,
} from "@/components/funnel/layout";
import { buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Add-Ons",
  description:
    "Add entertainment, concessions, atmosphere, comfort, and service extras to your outdoor cinema event. After Dusk Events, Canton, MI.",
  alternates: { canonical: "/add-ons" },
};

const categories = [
  {
    name: "Entertainment",
    items: [
      { item: "Retro gaming kit: 100,000+ classic-game library, 50+ classic systems, 4 wireless controllers", bestFor: "Birthdays, family nights, casual gaming" },
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
    includes: "Blacklights, glow sticks, glow bracelets, and glow necklaces priced as one line.",
    bestFor: "Teen birthdays, graduations, bachelorettes, post-prom, Halloween",
    featured: true,
  },
];

function CategoryBlock({ category }: { category: (typeof categories)[0] }) {
  return (
    <div className="mb-16 last:mb-0">
      <h2 className="font-display text-projector text-display-md tracking-wider leading-none mb-6">
        {category.name.toUpperCase()}.
      </h2>
      <ul className="divide-y divide-white/8 border-t border-white/8">
        {category.items.map((row) => (
          <li
            key={row.item}
            className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-5 pl-3 -ml-3 sm:pl-4 sm:-ml-4 border-l-2 border-transparent hover:border-ember transition-colors"
          >
            <p className="text-projector text-heading-md font-medium leading-snug flex-1">
              {row.item}
            </p>
            <p className="text-caption text-steel sm:text-right sm:max-w-[34ch]">
              {row.bestFor}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AddOnsPage() {
  return (
    <>
      <SchemaMarkup
        id="addons-breadcrumb"
        data={buildBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Packages", href: "/packages" },
          { name: "Add-Ons", href: "/add-ons" },
        ])}
      />
      <Nav />
      <main className="flex-1 pt-16">
        <FunnelSection className="pt-20 lg:pt-28">
          <div className="mx-auto max-w-5xl">
            <h1 className="font-display text-projector text-display-lg tracking-wider leading-none">
              ADD WHAT FITS THE NIGHT.
            </h1>
            <p className="mt-6 max-w-[58ch] text-body-lg leading-relaxed text-silver">
              Add games, karaoke, concessions, lighting, comfort, or extra service time. We price the full setup around your event so everything works together.
            </p>
          </div>
        </FunnelSection>

        <FunnelSection>
          <div className="mx-auto max-w-5xl">
            {categories.map((cat) => (
              <CategoryBlock key={cat.name} category={cat} />
            ))}
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="bundles-heading" tone="band">
          <div className="mx-auto max-w-5xl">
            <SectionHeader
              id="bundles-heading"
              eyebrow="Pre-built"
              title="FEATURED BUNDLE."
              body="One favorite combo, priced as one line. Ask about bundle pricing."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bundles.map((b) => (
                <div
                  key={b.name}
                  className={`relative rounded-lg p-8 border ${
                    b.featured
                      ? "border-ember/50 bg-screening shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
                      : "border-white/10 bg-screening/60"
                  }`}
                >
                  <h3 className="font-display text-heading-lg text-projector tracking-wider mb-3">
                    {b.name}
                  </h3>
                  <p className="text-silver text-sm leading-relaxed mb-3">{b.includes}</p>
                  <p className="text-steel text-xs">Best for: {b.bestFor}</p>
                </div>
              ))}
            </div>
          </div>
        </FunnelSection>

        <FunnelSection>
          <div className="mx-auto max-w-4xl">
            <QuotePanel
              title="READY TO BUILD YOUR EVENT?"
              body="Tell us what you want to add and we will fold it into your event quote."
            />
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
