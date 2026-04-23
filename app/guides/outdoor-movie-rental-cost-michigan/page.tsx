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
const UPDATED = "2026-04-22";

export const metadata: Metadata = {
  title:
    "How Much Does an Outdoor Movie Rental Cost in Michigan? (2026 Guide)",
  description:
    "What outdoor movie and inflatable cinema rentals actually cost in metro Detroit and Southeast Michigan. Package tiers, what changes the price, and what to expect on your quote.",
  alternates: { canonical: SLUG },
  openGraph: {
    title: "Outdoor Movie Rental Cost in Michigan (2026)",
    description:
      "What outdoor cinema rentals actually cost in Southeast Michigan, from backyard parties to weddings.",
    url: `https://afterduskevents.com${SLUG}`,
  },
};

const guideFaqs = [
  {
    q: "What is the average cost of an outdoor movie rental in Michigan?",
    a: "Outdoor cinema rentals in Southeast Michigan typically run between $400 and $1,800 for residential events, depending on screen size, equipment, runtime, and add-ons. Weddings and large corporate events fall between $1,200 and $3,500 once dance floor audio, ceremony sound, and on-site crew are included. Every After Dusk Events booking is quoted custom around the event.",
  },
  {
    q: "What changes the price of a backyard movie rental?",
    a: "The biggest factors are screen size (20 ft vs 30 ft), audio coverage (number of Soundboks zones plus subwoofer), runtime (3 hour vs 4-6 hour event), distance from Canton MI, and add-ons (popcorn station, gaming bundle, Lightboks lighting, wireless mics). Indoor versus outdoor changes the screen and projector setup but not always the price.",
  },
  {
    q: "Do you charge a deposit?",
    a: "Yes. Every booking requires a deposit to lock the date, with the balance due before the event. Specific deposit amounts are spelled out in the Service Agreement that comes with your quote.",
  },
  {
    q: "Is there a travel fee?",
    a: "Inside 60 miles of Canton, MI, no separate travel fee is added to the package price. Beyond 60 miles, contact Blake for a custom quote with a travel line item.",
  },
  {
    q: "Do you publish a price list?",
    a: "Not in fixed-price form. Every event is different and benefits from a real conversation about screen size, layout, audio coverage, and add-ons. We respond to every inquiry within 24 hours with a real number tied to your specific event.",
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
                By <Link href="/about" className="text-ember hover:text-projector transition-colors">Blake Drain</Link>
                {" · "}
                Updated{" "}
                <time dateTime={UPDATED}>April 2026</time>
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <p className="text-steel text-lg leading-relaxed mt-8">
                Outdoor cinema rentals in Southeast Michigan typically run between
                <strong className="text-projector"> $400 and $1,800 </strong>
                for private residential events, and between
                <strong className="text-projector"> $1,200 and $3,500 </strong>
                for weddings and corporate gatherings. Final pricing depends on
                screen size, audio coverage, runtime, and add-ons.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-heading text-2xl text-projector mt-12 mb-4">
                Typical price ranges by event type
              </h2>
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left bg-charcoal">
                      <th className="px-5 py-3 text-steel font-semibold">Event type</th>
                      <th className="px-5 py-3 text-steel font-semibold">Typical range</th>
                      <th className="px-5 py-3 text-steel font-semibold">Recommended setup</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: "Backyard movie night (under 25 guests)", range: "$400–$650", rec: "Intimate 20 ft" },
                      { type: "Block party / HOA night (25–75)", range: "$650–$1,100", rec: "Community 30 ft" },
                      { type: "Larger community event (75–250)", range: "$900–$1,800", rec: "Community 30 ft + add-ons" },
                      { type: "Sports watch party", range: "$700–$1,400", rec: "Community 30 ft + DFB MK2" },
                      { type: "Indoor winter event", range: "$450–$900", rec: "Indoor Winter (120\" Da-Lite)" },
                      { type: "Wedding elopement / micro", range: "$900–$1,500", rec: "Elopement / Micro-Wedding" },
                      { type: "Wedding reception cinema", range: "$1,500–$2,800", rec: "Wedding Reception Cinema" },
                      { type: "Wedding full day", range: "$2,400–$3,500+", rec: "Wedding Full Day" },
                    ].map((row, i) => (
                      <tr key={row.type} className={`border-b border-white/5 ${i % 2 === 1 ? "bg-charcoal/40" : ""}`}>
                        <td className="px-5 py-3.5 text-projector font-medium">{row.type}</td>
                        <td className="px-5 py-3.5 text-ember font-semibold">{row.range}</td>
                        <td className="px-5 py-3.5 text-steel">{row.rec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-steel text-xs italic mt-3">
                Ranges reflect After Dusk Events 2026 quote averages across Wayne, Oakland, Washtenaw, and Macomb counties. Every event is quoted individually.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-heading text-2xl text-projector mt-12 mb-4">
                What changes the price
              </h2>
              <ul className="space-y-3 text-steel leading-relaxed">
                {[
                  ["Screen size", "20 ft (Intimate) is the entry tier. 30 ft (Community) handles up to about 250 guests. Larger crowds usually push you toward 30 ft plus add-on audio."],
                  ["Audio coverage", "Two Soundboks 4 speakers are standard on smaller packages. Four-speaker dual zones plus a DFB MK2 subwoofer are standard on 30 ft setups for larger crowds and dance floors."],
                  ["Runtime", "3 hour vs 4 hour vs 6+ hour events scale price with technician time on site."],
                  ["Distance from Canton", "Inside 60 miles, no travel fee. Beyond, a travel line is added."],
                  ["Add-ons", "Popcorn station, gaming bundle, wireless mics, Lightboks LED lighting, fog, and concession combos all add line items."],
                  ["Indoor vs outdoor", "Indoor uses a different screen (120\" Da-Lite fast-fold) but pricing is similar to the Intimate outdoor tier."],
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
