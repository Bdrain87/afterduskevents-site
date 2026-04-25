import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FaqAccordion from "./faq-accordion";
import SchemaMarkup from "@/components/seo/schema-markup";
import {
  ActionBar,
  FunnelSection,
  PrimaryCta,
  SectionHeader,
} from "@/components/funnel/layout";
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
        <FunnelSection className="pt-20 lg:pt-28">
          <div className="mx-auto max-w-5xl">
            <p className="text-caption text-ember mb-4">Before you book</p>
            <h1 className="font-display text-projector text-display-lg tracking-wider leading-none">
              QUESTIONS. ANSWERED.
            </h1>
            <p className="mt-6 max-w-[56ch] text-body-lg leading-relaxed text-silver">
              The things people ask most. If your question is not here, the contact form goes straight to us.
            </p>
          </div>
        </FunnelSection>

        <FunnelSection>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion />
          </div>
        </FunnelSection>

        <FunnelSection labelledBy="faq-cta-heading" tone="band">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              id="faq-cta-heading"
              eyebrow="Still curious"
              title="STILL HAVE A QUESTION?"
              body="Send it over. We usually reply within 24 hours."
              className="mb-8"
            />
            <ActionBar>
              <PrimaryCta href="/contact">Contact us</PrimaryCta>
            </ActionBar>
          </div>
        </FunnelSection>
      </main>
      <Footer />
    </>
  );
}
