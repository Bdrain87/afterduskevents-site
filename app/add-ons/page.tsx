import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import MagneticButton from "@/components/magnetic-button";

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
      { item: "Gaming bundle", bestFor: "Birthdays, corporate, family events" },
      { item: "BYO console hookup plus waiver", bestFor: "Hardcore gamers bringing their own gear" },
      { item: "Second feature or extended runtime", bestFor: "Double features, long events" },
      { item: "Live TV or sports streaming upgrade", bestFor: "Sports nights, live event watch parties" },
    ],
  },
  {
    name: "Audio and Lighting",
    items: [
      { item: "Extra Soundboks zone", bestFor: "Larger layouts, multi-area events" },
      { item: "Extra DFB MK2 subwoofer", bestFor: "Bass-heavy events, dance floors" },
      { item: "Lightboks pair", bestFor: "Night mood, dance floor energy" },
      { item: "Wireless mic pair", bestFor: "Speeches, ceremonies, karaoke" },
      { item: "Fog machine", bestFor: "Dramatic moments, dance floor" },
    ],
  },
  {
    name: "Wedding Specific",
    items: [
      { item: "Ceremony sound setup", bestFor: "Clean vows audio and processional music" },
      { item: "First dance projected film", bestFor: "Love-story reel during first dance" },
      { item: "Reception dance floor Soundboks and Lightboks zone", bestFor: "Premium dance floor" },
      { item: "Late night after-party bass drop", bestFor: "After-dinner energy shift" },
      { item: "Brunch projection loop", bestFor: "Next-day brunch recap loops" },
    ],
  },
  {
    name: "Concessions",
    items: [
      { item: "Popcorn station", bestFor: "Movie nights" },
      { item: "Canned drinks (50 ct)", bestFor: "Any event with refreshments" },
      { item: "Packaged candy bar", bestFor: "Birthdays, family events" },
      { item: "Concession combo", bestFor: "Turnkey food and drink setup" },
    ],
  },
  {
    name: "Party Extras",
    items: [
      { item: "Glow kit (sticks, glow balloons, blacklight)", bestFor: "Teen and tween parties" },
      { item: "Yard games", bestFor: "Pre-event and daytime activation" },
      { item: "Early setup (2 hr)", bestFor: "Tight venues, complex layouts" },
    ],
  },
];

const bundles = [
  {
    name: "Wedding Reception Pro",
    includes: "Ceremony sound, first dance film, dance floor zone, late night bass",
  },
  {
    name: "Sports Night Premium",
    includes: "Extra DFB MK2, live TV upgrade, concession combo",
  },
  {
    name: "Gaming Party Max",
    includes: "Gaming bundle, BYO hookup, glow kit, extra Soundboks zone",
  },
  {
    name: "Karaoke Premium",
    includes: "Wireless mic pair, Lightboks pair, fog machine",
  },
  {
    name: "Backyard Family Combo",
    includes: "Popcorn, canned drinks, yard games, glow kit",
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
      <Nav />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-oxblood relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-oxblood to-oxblood-deep" aria-hidden="true" />
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
                Every add-on is quoted with your package. Contact Blake for a real total.
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

        {/* Signature Bundles */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal" aria-labelledby="bundles-heading">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h2 id="bundles-heading" className="font-heading text-2xl text-projector mb-2">
                Signature Bundles
              </h2>
              <p className="text-steel text-sm mb-8">
                Pre-built combinations. Ask Blake for bundle pricing.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bundles.map((b, i) => (
                <FadeIn key={b.name} delay={i * 0.06}>
                  <div className="bg-screening rounded-lg p-6 border border-white/10 hover:border-oxblood/30 transition-colors h-full">
                    <h3 className="font-heading text-base text-projector mb-2">{b.name}</h3>
                    <p className="text-steel text-sm leading-relaxed">{b.includes}</p>
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
