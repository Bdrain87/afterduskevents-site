import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";
import FilmStrip from "@/components/film-strip";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildArticle, buildBreadcrumbList, buildFAQPage } from "@/lib/schema";

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
    a: "The 30 ft inflatable screen still handles the visual side. At 100 guests and above, the Two Speakers + Death From Below subwoofer tier is the call: bass that carries across a wider crowd, clean high-end for dialogue.",
  },
  {
    q: "What size screen do I need for 200+ guests?",
    a: "The 30 ft inflatable screen handles visuals for 200+ guests. Sound is the deciding factor: Two Speakers + Death From Below subwoofer is the right tier. Larger crowds also benefit from early setup and late teardown add-ons for smoother flow.",
  },
];

const sizingTable = [
  { guests: "Under 25", tier: "Single Speaker", note: "Backyard movie nights, family events" },
  { guests: "25–50", tier: "Two Speakers", note: "Tight backyards, birthdays, smaller gatherings" },
  { guests: "50–100", tier: "Two Speakers + Sub", note: "Block parties, larger backyards, dance-floor events" },
  { guests: "100–250", tier: "Two Speakers + Sub", note: "Community events, fight nights, sports watch parties" },
  { guests: "250+", tier: "Two Speakers + Sub", note: "Custom quote — contact for larger crowds" },
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
              "Match guest count to audio tier for outdoor movie nights, sports watch parties, and private events. One screen size, three audio tiers.",
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
      <main className="flex-1">
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-10">
          <div className="mx-auto max-w-3xl">
            <p className="serial text-tail mb-6">Guide · Sizing</p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-none">
              What size outdoor screen do I need?
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
                S
              </span>
              hort answer: the 30 ft inflatable screen fits every private
              event we run, from a 25-guest backyard to a 250-guest
              community night. What scales instead is audio — we offer
              three tiers so the sound matches your crowd size.
            </p>

            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] uppercase leading-none mt-14 mb-6">
              Audio tier by guest count.
            </h2>
            <ul className="divide-y-2 divide-ink border-y-2 border-ink">
              {sizingTable.map((row) => (
                <li
                  key={row.guests}
                  className="grid grid-cols-[auto_1fr_auto] gap-4 sm:gap-8 items-baseline py-4"
                >
                  <span className="font-display text-2xl uppercase leading-none text-tail">
                    {row.guests}
                  </span>
                  <span className="font-display text-lg sm:text-xl uppercase leading-none">
                    {row.tier}
                  </span>
                  <span className="font-mono text-xs text-concrete hidden sm:inline">
                    {row.note}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] uppercase leading-none mt-14 mb-6">
              Why one screen size works.
            </h2>
            <p>
              A 30 ft inflatable screen is the right visual scale for
              every private event we run. Backyard movie nights feel
              cinematic at that size without overwhelming the space.
              Larger community events, fight nights, and sports watch
              parties all benefit from the same screen. The screen is
              the &ldquo;wow&rdquo; that makes a backyard feel like an
              amphitheater. The variable is sound.
            </p>
            <p className="mt-4">
              Pick the single speaker tier for intimate gatherings where
              dialogue carries best at conversational volume. Pick two
              speakers for standard outdoor events — most bookings land
              here. Pick two speakers plus the Death From Below subwoofer
              for anything bass-driven: fight nights, heavy soundtracks,
              or any event with 100+ guests where you want sound that
              fills the yard.
            </p>

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
          <p className="serial text-bulb mb-4">Need a Recommendation?</p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-none mb-6">
            Tell us the crowd.
          </h2>
          <p className="font-body text-paper/80 max-w-lg mx-auto mb-10">
            Guest count + event type — we&apos;ll match the right tier.
          </p>
          <BulbButton href="/contact">Get a Quote</BulbButton>
        </section>
      </main>
      <Footer />
    </>
  );
}
