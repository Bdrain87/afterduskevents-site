import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Shield, MapPin, FileCheck } from "lucide-react";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList, buildPerson } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "After Dusk Events is owner-operated by Blake Drain, a U.S. Air Force veteran based in Canton, MI. Military precision applied to outdoor cinema.",
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl text-projector mb-4">
              Mission-ready cinema for Michigan nights.
            </h1>
            <p className="text-steel text-lg leading-relaxed">
              Veteran-owned. Canton, MI. Built on the idea that your event deserves the same
              attention to detail as any indoor production.
            </p>
          </div>
        </section>

        {/* Story + sidebar */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Body copy */}
              <div className="lg:col-span-2 space-y-6 text-steel leading-relaxed text-base max-w-prose">
                <p>
                  After Dusk Events was built on one idea: outdoor events deserve the same attention
                  to detail as any indoor production. A good movie night is not just a projector on
                  a sheet. It is audio you can hear clearly in the back row, a screen big enough
                  that no one strains, lighting that holds the mood without blowing out the picture,
                  and an operator who has already tested everything before you arrive.
                </p>
                <p>
                  The company is owner-operated by Blake Drain, a U.S. Air Force veteran based in
                  Canton. Military field service teaches you to plan for every failure mode: weather,
                  power, equipment, logistics. That mindset is what you hire when you hire After
                  Dusk Events. Every event runs off a checklist. Every piece of gear has a backup.
                  Every arrival is 3 hours before the first guest walks in.
                </p>
                <p>
                  We serve private residential events, wedding receptions, graduation parties, and
                  get-togethers of all kinds across the greater Detroit and Ann Arbor area. Movie
                  nights, gaming nights, sports watch parties, fight nights — anywhere within
                  60 miles of Canton. Proudly veteran-owned.
                </p>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-charcoal rounded-lg p-6 border border-white/10">
                  <h2 className="font-heading text-sm text-projector mb-4 uppercase tracking-wider">
                    Quick facts
                  </h2>
                  <ul className="space-y-4">
                    {[
                      {
                        icon: <MapPin size={16} className="text-ember shrink-0 mt-0.5" aria-hidden="true" />,
                        label: "Service area",
                        value: "60 miles of Canton, MI",
                      },
                      {
                        icon: <Shield size={16} className="text-ember shrink-0 mt-0.5" aria-hidden="true" />,
                        label: "Ownership",
                        value: "Veteran-owned and operated",
                      },
                      {
                        icon: <FileCheck size={16} className="text-ember shrink-0 mt-0.5" aria-hidden="true" />,
                        label: "Coverage",
                        value: "Insured. COI on request",
                      },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        {item.icon}
                        <div>
                          <div className="text-steel text-xs uppercase tracking-wider mb-0.5">
                            {item.label}
                          </div>
                          <div className="text-projector text-sm font-medium">{item.value}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-charcoal rounded-lg p-6 border border-white/10">
                  <p className="text-steel text-sm leading-relaxed italic">
                    "Every piece of gear has a backup. Every arrival is 3 hours before
                    the first guest walks in."
                  </p>
                  <p className="text-steel text-xs mt-3 not-italic">Blake Drain, Owner</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl text-projector mb-4">
              Let us run your next event.
            </h2>
            <p className="text-steel mb-8 leading-relaxed">
              Tell us what you are planning and we will put together a real quote within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(107,31,31,0.4)] transition-all duration-300 min-h-[44px]"
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
