import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import MagneticButton from "@/components/magnetic-button";
import { EstimateNote } from "@/components/estimate-note";

export const metadata: Metadata = {
  title: "Add-On Catalog",
  description:
    "Customize your outdoor cinema event with audio upgrades, lighting, gaming, concessions, and more. After Dusk Events, Canton, MI.",
  alternates: { canonical: "/add-ons" },
};

const categories = [
  {
    name: "Entertainment",
    items: [
      { item: "Gaming bundle", bestFor: "Birthdays, corporate, family events", price: "$250" },
      { item: "BYO console hookup + waiver", bestFor: "Hardcore gamers bringing their own gear", price: "$75" },
      { item: "Second feature or extended runtime", bestFor: "Double features, long events", price: "$99" },
      { item: "Live TV or sports streaming upgrade", bestFor: "Sports nights, live event watch parties", price: "$149" },
    ],
  },
  {
    name: "Audio and Lighting",
    items: [
      { item: "Extra Soundboks zone", bestFor: "Larger layouts, multi-area events", price: "$149" },
      { item: "Extra DFB MK2 subwoofer", bestFor: "Bass-heavy events, dance floors", price: "$199" },
      { item: "Lightboks pair", bestFor: "Night mood, dance floor energy", price: "$99" },
      { item: "Wireless mic pair", bestFor: "Speeches, ceremonies, karaoke", price: "$89" },
      { item: "Fog machine", bestFor: "Dramatic moments, dance floor", price: "$69" },
    ],
  },
  {
    name: "Wedding Specific",
    items: [
      { item: "Ceremony sound setup", bestFor: "Clean vows audio and processional music", price: "$299" },
      { item: "First dance projected film", bestFor: "Love-story reel during first dance", price: "$249" },
      { item: "Reception dance floor Soundboks + Lightboks zone", bestFor: "Premium dance floor", price: "$349" },
      { item: "Late night after-party bass drop", bestFor: "After-dinner energy shift", price: "$399" },
      { item: "Brunch projection loop", bestFor: "Next-day brunch recap loops", price: "$199" },
    ],
  },
  {
    name: "Concessions",
    items: [
      { item: "Popcorn station", bestFor: "Movie nights", price: "$129" },
      { item: "Canned drinks (50 ct)", bestFor: "Any event with refreshments", price: "$99" },
      { item: "Packaged candy bar", bestFor: "Birthdays, family events", price: "$89" },
      { item: "Concession combo", bestFor: "Turnkey food and drink setup", price: "$279" },
    ],
  },
  {
    name: "Party Extras",
    items: [
      { item: "Glow kit (sticks + glow balloons + blacklight)", bestFor: "Teen and tween parties", price: "$149" },
      { item: "Yard games", bestFor: "Pre-event and daytime activation", price: "$99" },
      { item: "Early setup (+2 hr)", bestFor: "Tight venues, complex layouts", price: "$129" },
    ],
  },
];

const bundles = [
  {
    name: "Wedding Reception Pro",
    includes: "Ceremony sound + first dance film + dance floor zone + late night bass",
    list: "$1,296",
    bundle: "$1,166",
  },
  {
    name: "Sports Night Premium",
    includes: "Extra DFB MK2 + live TV upgrade + concession combo",
    list: "$627",
    bundle: "$564",
  },
  {
    name: "Gaming Party Max",
    includes: "Gaming bundle + BYO hookup + glow kit + extra Soundboks zone",
    list: "$623",
    bundle: "$561",
  },
  {
    name: "Karaoke Premium",
    includes: "Wireless mic pair + Lightboks pair + fog machine",
    list: "$257",
    bundle: "$231",
  },
  {
    name: "Backyard Family Combo",
    includes: "Popcorn + canned drinks + yard games + glow kit",
    list: "$476",
    bundle: "$428",
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
                <th className="px-5 py-3 text-steel font-semibold hidden sm:table-cell">Best for</th>
                <th className="px-5 py-3 text-steel font-semibold text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {category.items.map((row, i) => (
                <tr
                  key={row.item}
                  className={`border-b border-white/5 ${i % 2 === 1 ? "bg-charcoal/50" : ""}`}
                >
                  <td className="px-5 py-3.5 text-projector font-medium">{row.item}</td>
                  <td className="px-5 py-3.5 text-steel hidden sm:table-cell">{row.bestFor}</td>
                  <td className="px-5 py-3.5 text-oxblood font-semibold text-right whitespace-nowrap">{row.price}</td>
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
      <Nav />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h1 className="font-display text-5xl sm:text-6xl text-projector tracking-wider mb-2">
                ADD-ON CATALOG
              </h1>
              <span className="oxblood-rule" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-steel text-lg leading-relaxed mt-6">
                Every add-on is quoted with your package. No automatic pricing -- contact Blake for a real total.
              </p>
              <div className="mt-4">
                <EstimateNote />
              </div>
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

        {/* Signature Bundles */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="bundles-heading">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 id="bundles-heading" className="font-heading text-2xl text-projector mb-2">
                Signature Bundles
              </h2>
              <p className="text-steel text-sm mb-8">10% bundle savings applied automatically.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bundles.map((b, i) => (
                <FadeIn key={b.name} delay={i * 0.06}>
                  <div className="bg-screening rounded-lg p-6 border border-white/10 hover:border-oxblood/30 transition-colors">
                    <h3 className="font-heading text-base text-projector mb-1">{b.name}</h3>
                    <p className="text-steel text-xs mb-3 leading-relaxed">{b.includes}</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-oxblood font-bold text-lg">{b.bundle}</span>
                      <span className="text-steel text-sm line-through">List {b.list}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="mt-6">
              <EstimateNote />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="font-heading text-2xl text-projector mb-4">Ready to build your event?</h2>
              <p className="text-steel mb-8 text-sm leading-relaxed">
                Add-ons are quoted with your package. Tell Blake what you are thinking.
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
