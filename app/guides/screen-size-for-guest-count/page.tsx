import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FadeIn from "@/components/fade-in";
import MagneticButton from "@/components/magnetic-button";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildArticle, buildBreadcrumbList, buildFAQPage } from "@/lib/schema";

const SLUG = "/guides/screen-size-for-guest-count";
const PUBLISHED = "2026-04-22";
const UPDATED = "2026-04-22";

export const metadata: Metadata = {
  title: "What Size Outdoor Movie Screen Do I Need for My Guest Count? (2026)",
  description:
    "Match guest count to screen size and audio coverage for backyard movie nights, weddings, and outdoor events. Plain-language guide from After Dusk Events.",
  alternates: { canonical: SLUG },
};

const guideFaqs = [
  {
    q: "What size screen do I need for 25 guests?",
    a: "For 25 guests, a 20 ft inflatable screen with two Soundboks 4 speakers is the right setup. Sightlines are clean from 8 to 40 feet of throw distance, and the audio covers a typical residential backyard with room for chatter.",
  },
  {
    q: "What size screen do I need for 50 guests?",
    a: "For 50 guests, a 20 ft screen still works but you should add a second Soundboks zone for even audio coverage. If your layout is wider than 60 feet, the 30 ft Community screen is more comfortable for back-row viewing.",
  },
  {
    q: "What size screen do I need for 100 guests?",
    a: "For 100 guests, the 30 ft Community screen with four Soundboks 4 speakers across two zones plus a DFB MK2 subwoofer is the right setup. This is the most-booked configuration for HOA nights, larger backyards, and church events.",
  },
  {
    q: "What size screen do I need for 200+ guests?",
    a: "For 200+ guests, the 30 ft Community screen handles the visual side, but plan for additional Soundboks zones to keep the audio clean across a wider crowd. Once you cross about 250 guests, a custom multi-zone audio plan is the right call.",
  },
];

const sizingTable = [
  { guests: "Under 25", screen: "20 ft (Intimate)", audio: "2 Soundboks 4", note: "Backyard movie nights, family events" },
  { guests: "25–50", screen: "20 ft (Intimate)", audio: "2 Soundboks 4 + optional 3rd zone", note: "Tight backyards, birthdays" },
  { guests: "50–100", screen: "30 ft (Community)", audio: "4 Soundboks 4 + DFB MK2 subwoofer", note: "Block parties, HOA nights" },
  { guests: "100–250", screen: "30 ft (Community)", audio: "4+ Soundboks 4 + DFB MK2", note: "Large community events, schools" },
  { guests: "250+", screen: "30 ft (Community)", audio: "Custom multi-zone + extra subwoofer", note: "Custom quote required" },
  { guests: "Indoor (any)", screen: "120\" Da-Lite fast-fold", audio: "2 Soundboks 4", note: "Halls, gyms, barns, large rooms" },
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
              "Match guest count to screen size and audio coverage for backyard movie nights, weddings, and outdoor events.",
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
              <p className="text-oxblood text-xs tracking-[0.2em] uppercase mb-3">Guide</p>
              <h1 className="font-heading text-4xl sm:text-5xl text-projector mb-4 leading-tight">
                What size outdoor movie screen do I need for my guest count?
              </h1>
              <p className="text-steel text-xs uppercase tracking-wider">
                By <Link href="/about" className="text-oxblood hover:text-projector transition-colors">Blake Drain</Link>
                {" · "}
                Updated <time dateTime={UPDATED}>April 2026</time>
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p className="text-steel text-lg leading-relaxed mt-8">
                Choose a 20 ft screen for crowds under 50 and a 30 ft screen for crowds of 50 to 250.
                Audio coverage scales separately. The full sizing chart is below.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-heading text-2xl text-projector mt-12 mb-4">Sizing chart</h2>
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left bg-charcoal">
                      <th className="px-5 py-3 text-steel font-semibold">Guest count</th>
                      <th className="px-5 py-3 text-steel font-semibold">Screen</th>
                      <th className="px-5 py-3 text-steel font-semibold">Audio</th>
                      <th className="px-5 py-3 text-steel font-semibold">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizingTable.map((row, i) => (
                      <tr key={row.guests} className={`border-b border-white/5 ${i % 2 === 1 ? "bg-charcoal/40" : ""}`}>
                        <td className="px-5 py-3.5 text-projector font-medium">{row.guests}</td>
                        <td className="px-5 py-3.5 text-oxblood">{row.screen}</td>
                        <td className="px-5 py-3.5 text-steel">{row.audio}</td>
                        <td className="px-5 py-3.5 text-steel">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
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

            <FadeIn delay={0.2}>
              <div className="mt-16 text-center">
                <h2 className="font-heading text-2xl text-projector mb-4">
                  Not sure which fits?
                </h2>
                <p className="text-steel mb-8 text-sm leading-relaxed max-w-xl mx-auto">
                  Tell us your guest count and venue. We will recommend the right screen and audio.
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
