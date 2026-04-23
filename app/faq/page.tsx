import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";
import FilmStrip from "@/components/film-strip";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList, buildFAQPage } from "@/lib/schema";
import { faqs } from "@/lib/faqs";

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
      <main className="flex-1">
        {/* Header */}
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-14">
          <div className="mx-auto max-w-5xl">
            <p className="serial text-tail mb-6">№ 007 · The Program</p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-none">
              Questions
              <br />
              &amp; answers.
            </h1>
            <p className="mt-8 font-body text-lg max-w-2xl">
              Before the reel runs — here&apos;s what to know.
            </p>
            <p className="serial text-concrete mt-6">
              Updated <time dateTime={UPDATED}>April 2026</time>
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        {/* Folder-tab Q&A list */}
        <section className="bg-paper px-4 sm:px-10 py-16">
          <div className="mx-auto max-w-3xl">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="folder-tab"
                name="faqs"
              >
                <summary>
                  <span>
                    <span className="serial text-tail mr-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {faq.q}
                  </span>
                </summary>
                <div className="font-body text-base leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink text-paper px-4 sm:px-10 py-24 text-center">
          <p className="serial text-bulb mb-4">Got a Date?</p>
          <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-none mb-6">
            Ready to quote?
          </h2>
          <p className="font-body text-paper/80 max-w-lg mx-auto mb-10">
            Still have a question? Send a message.
          </p>
          <BulbButton href="/contact">Request a Quote</BulbButton>
        </section>
      </main>
      <Footer />
    </>
  );
}
