import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";
import TicketStub from "@/components/ticket-stub";
import FilmStrip from "@/components/film-strip";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList, buildPerson } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "After Dusk Events is owner-operated by Blake, a U.S. Air Force veteran based in Canton, MI. Military precision applied to outdoor cinema.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup
        id="about-schema"
        data={[
          buildPerson(),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-14">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">№ 006 · Who&apos;s Running the Reel</p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-none">
              Mission-ready
              <br />
              cinema.
            </h1>
            <p className="mt-8 font-body text-lg max-w-2xl">
              Veteran-owned. Canton, Michigan. Built on the idea that your
              event deserves the same attention to detail as any indoor
              production.
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        {/* Editorial body + pull-quote stub */}
        <section className="bg-paper px-4 sm:px-10 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20">
              <article className="font-body text-lg leading-relaxed max-w-prose space-y-6">
                <p>
                  <span className="float-left font-display text-[clamp(5rem,12vw,9rem)] leading-[0.8] mr-3 mt-1 text-tail">
                    A
                  </span>
                  fter Dusk Events was built on one idea: outdoor events
                  deserve the same attention to detail as any indoor
                  production. A good movie night is not just a projector
                  on a sheet. It is audio you can hear clearly in the
                  back row, a screen big enough that no one strains,
                  lighting that holds the mood without blowing out the
                  picture, and an operator who has already tested
                  everything before you arrive.
                </p>
                <p>
                  The company is owner-operated by Blake, a U.S. Air
                  Force veteran based in Canton. Military field service
                  teaches you to plan for every failure mode: weather,
                  power, equipment, logistics. That mindset is what you
                  hire when you hire After Dusk Events. Every event runs
                  off a checklist. Every piece of gear has a backup.
                  Every arrival is three hours before the first guest
                  walks in.
                </p>
                <p>
                  We serve private residential events, graduation
                  parties, and get-togethers of all kinds across the
                  greater Detroit and Ann Arbor area. Movie nights,
                  gaming nights, sports watch parties, fight nights —
                  anywhere within 60 miles of Canton.
                </p>
                <p className="serial text-tail pt-4">
                  Proudly veteran-owned.
                </p>
              </article>

              <aside className="space-y-6 lg:pt-8">
                <TicketStub
                  tone="ink"
                  serial="Q-001"
                  stamp="Word From The Owner"
                >
                  <p className="font-display text-xl uppercase leading-tight mb-4">
                    &ldquo;Every piece of gear has a backup. Every arrival
                    is three hours before the first guest walks in.&rdquo;
                  </p>
                  <p className="serial text-bulb">Blake · Owner · USAF</p>
                </TicketStub>

                <div className="border-2 border-ink p-5">
                  <p className="serial text-tail mb-3">Quick Facts</p>
                  <dl className="space-y-3 text-sm font-mono">
                    <div className="flex justify-between gap-4">
                      <dt className="text-concrete">Service Area</dt>
                      <dd>60 mi of Canton, MI</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-concrete">Ownership</dt>
                      <dd>Veteran-owned</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-concrete">Coverage</dt>
                      <dd>Insured · COI on request</dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink text-paper px-4 sm:px-10 py-24 text-center">
          <p className="serial text-bulb mb-4">Book the Night</p>
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-none mb-6">
            Let us run your next event.
          </h2>
          <p className="font-body text-paper/80 max-w-xl mx-auto mb-10">
            Tell us what you&apos;re planning. Real quote inside 24 hours.
          </p>
          <BulbButton href="/contact">Get a Quote</BulbButton>
        </section>
      </main>
      <Footer />
    </>
  );
}
