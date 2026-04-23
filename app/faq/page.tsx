import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Link from "next/link";
import FaqAccordion from "./faq-accordion";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList, buildFAQPage } from "@/lib/schema";
import PageAtmosphere from "@/components/atmosphere/page-atmosphere";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about outdoor cinema rentals: travel distance, weather, power, deposit, insurance, and more. After Dusk Events, Canton, MI.",
  alternates: { canonical: "/faq" },
};

const UPDATED = "2026-04-22";

export default function FaqPage() {
  return (
    <>
      <SchemaMarkup
        id="faq-schema"
        data={[
          buildFAQPage(),
          buildBreadcrumbList([
            { name: "Home", href: "/" },
            { name: "FAQ", href: "/faq" },
          ]),
        ]}
      />
      <Nav />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-charcoal overflow-hidden">
          <PageAtmosphere variant="dusk" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="font-editorial text-4xl sm:text-5xl text-projector mb-4">
              Frequently asked questions.
            </h1>
            <p className="text-steel text-lg leading-relaxed">
              Everything you need to know before booking. Still have a question?{" "}
              <Link
                href="/contact"
                className="text-projector underline hover:text-steel transition-colors"
              >
                Send us a message.
              </Link>
            </p>
            <p className="text-steel text-xs uppercase tracking-wider mt-6">
              Updated{" "}
              <time dateTime={UPDATED} className="text-steel">
                April 2026
              </time>
            </p>
          </div>
        </section>

        {/* Accordion */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <FaqAccordion />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl sm:text-3xl text-projector mb-4">
              Ready to get a quote?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood/90 transition-colors"
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
