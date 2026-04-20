import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Shield, MapPin, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "After Dusk Events is owner-operated by Blake Drain, a U.S. Air Force veteran based in Canton, MI. Military precision applied to outdoor cinema.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-charcoal">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl text-brand-white mb-4">
              Mission-ready cinema for Michigan nights.
            </h1>
            <p className="text-brand-gray text-lg leading-relaxed">
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
              <div className="lg:col-span-2 space-y-6 text-brand-gray leading-relaxed text-base">
                <p>
                  After Dusk Events was built on one idea: outdoor events deserve the same attention
                  to detail as any indoor production. A good movie night is not just a projector on
                  a sheet -- it is audio you can hear clearly in the back row, a screen big enough
                  that no one strains, lighting that holds the mood without blowing out the picture,
                  and an operator who has already tested everything before you arrive.
                </p>
                <p>
                  The company is owner-operated by Blake Drain, a U.S. Air Force veteran based in
                  Canton. Military field service teaches you to plan for every failure mode: weather,
                  power, equipment, logistics. That mindset is what you hire when you hire After
                  Dusk Events. Every event runs off a checklist. Every piece of gear has a backup.
                  Every arrival is 2.5 to 3 hours before the first guest walks in.
                </p>
                <p>
                  We serve residential, HOA, school, corporate, and wedding clients across the greater
                  Detroit and Ann Arbor area. If it is within 60 miles of Canton, we can be there.
                  Proudly veteran-owned.
                </p>
              </div>

              {/* Sidebar card */}
              <div className="space-y-4">
                <div className="bg-brand-charcoal rounded-lg p-6 border border-white/10">
                  <h2 className="font-heading text-base text-brand-white mb-4 uppercase tracking-wider text-sm">
                    Quick facts
                  </h2>
                  <ul className="space-y-4">
                    {[
                      {
                        icon: <MapPin size={16} className="text-brand-red shrink-0 mt-0.5" aria-hidden="true" />,
                        label: "Service area",
                        value: "60 miles of Canton, MI",
                      },
                      {
                        icon: <Shield size={16} className="text-brand-red shrink-0 mt-0.5" aria-hidden="true" />,
                        label: "Ownership",
                        value: "Veteran-owned and operated",
                      },
                      {
                        icon: <FileCheck size={16} className="text-brand-red shrink-0 mt-0.5" aria-hidden="true" />,
                        label: "Coverage",
                        value: "Insured -- COI on request",
                      },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        {item.icon}
                        <div>
                          <div className="text-brand-gray text-xs uppercase tracking-wider mb-0.5">
                            {item.label}
                          </div>
                          <div className="text-brand-white text-sm font-medium">{item.value}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-charcoal rounded-lg p-6 border border-white/10">
                  <p className="text-brand-gray text-sm leading-relaxed italic">
                    "Every piece of gear has a backup. Every arrival is 2.5 to 3 hours before
                    the first guest walks in."
                  </p>
                  <p className="text-brand-gray text-xs mt-3 not-italic">-- Blake Drain, Owner</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-charcoal py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl text-brand-white mb-4">
              Let us run your next event.
            </h2>
            <p className="text-brand-gray mb-8 leading-relaxed">
              Tell us what you are planning and we will send a tailored quote within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-brand-white bg-brand-red hover:bg-brand-red/90 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
