import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList, buildPerson } from "@/lib/schema";
import PageAtmosphere from "@/components/atmosphere/page-atmosphere";

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
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-charcoal overflow-hidden">
          <PageAtmosphere variant="space" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="font-serif italic text-steel/60 text-lg mb-4 tracking-[0.04em]">
              Veteran-owned. Canton, MI.
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-projector tracking-wider leading-none mb-6">
              MISSION-READY CINEMA.
            </h1>
            <p className="text-cream/65 text-lg leading-relaxed max-w-[52ch]">
              Built on the idea that your event deserves the same attention to detail as any indoor production.
            </p>
          </div>
        </section>

        {/* Story + sidebar */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Body copy */}
              <div className="lg:col-span-2 space-y-6 text-cream/60 leading-relaxed text-base max-w-prose">
                <p>
                  After Dusk Events was built on one idea: outdoor events deserve the same attention
                  to detail as any indoor production. A good movie night is not just a projector on
                  a sheet. It is audio you can hear clearly in the back row, a screen big enough
                  that no one strains, lighting that holds the mood without blowing out the picture,
                  and an operator who has already tested everything before you arrive.
                </p>
                <p>
                  The company is owner-operated by Blake, a U.S. Air Force veteran based in
                  Canton. Military field service teaches you to plan for every failure mode: weather,
                  power, equipment, logistics. That mindset is what you hire when you hire After
                  Dusk Events. Every event runs off a checklist. Every piece of gear has a backup.
                  Every arrival is 3 hours before the first guest walks in.
                </p>
                <p>
                  We serve private residential events, graduation parties, and
                  get-togethers of all kinds across the greater Detroit and Ann Arbor area. Movie
                  nights, gaming nights, sports watch parties, fight nights, anywhere within
                  60 miles of Canton. Proudly veteran-owned.
                </p>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="border-l-2 border-white/10 pl-5 space-y-5">
                  <h2 className="font-display text-xs text-steel tracking-[0.25em] uppercase mb-4">
                    Quick facts
                  </h2>
                  {[
                    { label: "Service area", value: "60 miles of Canton, MI" },
                    { label: "Ownership", value: "Veteran-owned and operated" },
                    { label: "Coverage", value: "Insured. COI on request" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-steel text-xs uppercase tracking-[0.18em] mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-projector text-sm font-medium">{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Pull quote */}
                <div className="border-l-2 border-oxblood/50 pl-5 pt-1">
                  <p className="font-serif italic text-cream/70 text-lg leading-snug mb-3">
                    &ldquo;Every piece of gear has a backup. Every arrival is 3 hours before
                    the first guest walks in.&rdquo;
                  </p>
                  <p className="font-display text-steel tracking-[0.2em] text-xs">
                    BLAKE — OWNER
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-4xl sm:text-5xl text-projector tracking-wider leading-none mb-4">
              LET US RUN YOUR NEXT EVENT.
            </h2>
            <p className="text-cream/55 mb-8 leading-relaxed">
              Tell us what you are planning and we will put together a real quote within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(107,31,31,0.4)] transition-all duration-300 min-h-[44px]"
            >
              Get a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
