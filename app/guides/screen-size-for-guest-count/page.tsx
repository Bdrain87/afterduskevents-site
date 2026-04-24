import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import MagneticButton from "@/components/magnetic-button";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildArticle, buildBreadcrumbList, buildFAQPage } from "@/lib/schema";
import Balancer from "react-wrap-balancer";

const SLUG = "/guides/screen-size-for-guest-count";
const PUBLISHED = "2026-04-22";
const UPDATED = "2026-04-23";

export const metadata: Metadata = {
  title: "What Size Outdoor Movie Screen Do I Need for My Guest Count? (2026)",
  description:
    "Answer: 30 ft fits every private event we run, from intimate backyards to 250-guest gatherings. What scales is audio tier, not screen size.",
  alternates: { canonical: SLUG },
};

const guideFaqs = [
  {
    q: "What size screen do I need for 25 guests?",
    a: "The 30 ft inflatable screen works for 25 guests and looks cinematic at that scale. For a smaller backyard, the 30 ft + Single Speaker tier usually fits. Audio stays intimate without overpowering the space.",
  },
  {
    q: "What size screen do I need for 50 guests?",
    a: "The 30 ft inflatable screen. With 50 guests, the 30 ft + Two Speakers tier is the standard recommendation so everyone hears cleanly from the back row.",
  },
  {
    q: "What size screen do I need for 100 guests?",
    a: "The 30 ft inflatable screen still handles the visual side. At 100 guests, two speakers plus a subwoofer is usually the call: bass that carries across a wider crowd, clean high-end for dialogue.",
  },
  {
    q: "What size screen do I need for 200+ guests?",
    a: "The 30 ft inflatable screen handles visuals for 200+ guests. Sound is the deciding factor: four speakers plus two subwoofers gives larger layouts the coverage they need. Larger crowds also benefit from early setup and late teardown add-ons for smoother flow.",
  },
];

const sizingTable = [
  { guests: "Under 25", tier: "30 ft + Single Speaker", note: "Backyard movie nights, family events" },
  { guests: "25–50", tier: "30 ft + Two Speakers", note: "Tight backyards, birthdays, smaller gatherings" },
  { guests: "50–100", tier: "30 ft + Two Speakers + Subwoofer", note: "Block parties, larger backyards, dance-floor events" },
  { guests: "100–150", tier: "30 ft + Two Speakers + Subwoofer", note: "Community events, fight nights, sports watch parties" },
  { guests: "150+", tier: "30 ft + Four Speakers + Two Subwoofers", note: "Large yards, fields, high-energy events, bigger crowds" },
];

export default function GuidePage() {
  return (
    <>
      <SchemaMarkup
        id="guide-sizing-schema"
        data={[
          buildArticle({
            headline: "What Size Outdoor Movie Screen Do I Need for My Guest Count? (2026)",
            description:
              "Match guest count to audio tier for outdoor movie nights, sports watch parties, and private events. One screen size, four audio tiers.",
            slug: SLUG,
            datePublished: PUBLISHED,
            dateModified: UPDATED,
          }),
          buildFAQPage(guideFaqs),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "Guides", href: "/guides" },
            { name: "Screen Size by Guest Count", href: SLUG },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1 pt-16">
        <article className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <p className="text-ember text-xs tracking-[0.2em] uppercase mb-3">Guide</p>
              <h1 className="font-heading text-4xl sm:text-5xl text-projector mb-4 leading-tight">
                <Balancer>What size outdoor movie screen do I need for my guest count?</Balancer>
              </h1>
              <p className="text-steel text-xs uppercase tracking-wider">
                Updated <time dateTime={UPDATED}>April 2026</time>
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p className="text-silver text-lg leading-relaxed mt-8">
                Short answer: the 30 ft inflatable screen fits every private event we run, from
                a 25-guest backyard to a 250-guest community night. What scales instead is
                audio: we offer four tiers so the sound matches your crowd size and event type.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-heading text-2xl text-projector mt-12 mb-4">Audio tier by guest count</h2>
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left bg-charcoal">
                      <th className="px-5 py-3 text-steel font-semibold">Guest count</th>
                      <th className="px-5 py-3 text-steel font-semibold">Recommended tier</th>
                      <th className="px-5 py-3 text-steel font-semibold">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizingTable.map((row, i) => (
                      <tr key={row.guests} className={`border-b border-white/5 ${i % 2 === 1 ? "bg-charcoal/40" : ""}`}>
                        <td className="px-5 py-3.5 text-projector font-medium">{row.guests}</td>
                        <td className="px-5 py-3.5 text-ember">{row.tier}</td>
                        <td className="px-5 py-3.5 text-steel">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-steel text-[11px] mt-2 sm:hidden">Swipe to see all columns.</p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-heading text-2xl text-projector mt-12 mb-4">
                Why one screen size works
              </h2>
              <p className="text-steel leading-relaxed">
                A 30 ft inflatable screen is the right visual scale for the entire spectrum of
                private events we run. Backyard movie nights feel cinematic at that size without
                overwhelming the space. Larger community events, fight nights, and sports watch parties all
                benefit from the same screen. The screen is the "wow" that makes a backyard
                feel like an amphitheater. The variable is sound.
              </p>
              <p className="text-steel leading-relaxed mt-4">
                Pick the single speaker tier for intimate gatherings where dialogue carries best
                at conversational volume. Pick two speakers for standard outdoor events (most
                bookings land here). Pick two speakers plus the subwoofer for bass-driven events.
                Pick four speakers plus two subwoofers for larger layouts where coverage matters
                from the screen to the back row.
              </p>
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
                  Not sure which tier fits?
                </h2>
                <p className="text-steel mb-8 text-sm leading-relaxed max-w-xl mx-auto">
                  Tell us your guest count and event type. We will recommend the right audio tier.
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
