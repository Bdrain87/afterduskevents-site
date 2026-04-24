import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Link from "next/link";
import FaqAccordion from "./faq-accordion";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList, buildFAQPage } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about outdoor cinema rentals: travel distance, weather, power, deposit, insurance, and more. After Dusk Events, Canton, MI.",
  alternates: { canonical: "/faq" },
};

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
        <section
          className="relative overflow-hidden px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "96px", paddingBottom: "48px" }}
        >
          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="text-caption text-ember mb-4">Before you book</p>
            <h1 className="font-display text-projector text-display-lg tracking-wider leading-none mb-6">
              QUESTIONS. ANSWERED.
            </h1>
            <p className="text-silver text-body-lg leading-relaxed max-w-[56ch]">
              The things people ask most. If your question is not here, the contact form goes straight to us.
            </p>
          </div>
        </section>

        {/* Accordion */}
        <section
          className="px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "48px", paddingBottom: "96px" }}
        >
          <div className="mx-auto max-w-3xl">
            <FaqAccordion />
          </div>
        </section>

        {/* Still have a question? */}
        <section
          className="relative px-6 sm:px-10 lg:px-16 border-t border-white/8"
          style={{ paddingTop: "96px", paddingBottom: "128px" }}
        >
          <div className="mx-auto max-w-2xl">
            <p className="text-caption text-ember mb-4">Still curious</p>
            <h2 className="font-display text-projector text-display-md tracking-wider leading-none mb-6">
              STILL HAVE A QUESTION?
            </h2>
            <p className="text-silver text-body-lg leading-relaxed mb-10 max-w-[46ch]">
              Send it over. We usually reply within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center px-7 py-4 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors"
            >
              Contact us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
