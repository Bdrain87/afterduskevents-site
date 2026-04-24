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
    "After Dusk Events is a one-person, veteran-owned outdoor cinema outfit based in Canton, MI. Blake owns the gear, drives the truck, runs the show.",
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
            <p className="text-ember text-xs tracking-[0.3em] uppercase mb-4">
              Veteran-owned · Canton, MI
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-projector tracking-wider leading-none mb-6">
              WE ARE ONE GUY AND A TRUCK.
            </h1>
            <p className="text-silver text-lg leading-relaxed max-w-[52ch]">
              After Dusk Events is a one-person outfit based in Canton, Michigan. Blake runs it.
            </p>
          </div>
        </section>

        {/* Story + sidebar */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Body copy */}
              <div className="lg:col-span-2 space-y-6 text-silver leading-relaxed text-base max-w-prose">
                <p>
                  Blake owns the gear, drives the truck, sets up the screen and sound, runs the show,
                  and tears it down.
                  No subcontractors on your lawn.
                </p>
                <p>
                  Most backyard movie setups are a projector on a sheet. This is not that. The screen is
                  thirty feet of real inflatable cinema. The audio is concert-grade, tuned to the space.
                  Everything gets a systems test before your first guest arrives.
                </p>
                <p>
                  We run private events only, anywhere inside 60 miles of Canton. If you are outside
                  that ring and still want to talk, we can usually make it work.
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
            <p className="text-silver mb-8 leading-relaxed">
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
