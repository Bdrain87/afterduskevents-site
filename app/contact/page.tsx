import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ContactForm from "./contact-form";
import FormSkeleton from "@/components/skeletons/form-skeleton";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList } from "@/lib/schema";
import { BookingStep, FunnelSection, SectionHeader } from "@/components/funnel/layout";
import ByocPanel from "@/components/funnel/byoc-panel";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a custom quote for a private outdoor cinema event. After Dusk Events serves Southeast Michigan within 40 miles of Canton, with travel charges beyond. Response within 24 hours.",
  alternates: { canonical: "/contact" },
};

const quoteSteps = [
  {
    title: "Event basics",
    body: "Date, location, event type, and guest count tell us the scale of the night.",
  },
  {
    title: "Setup match",
    body: "The form recommends an audio tier and lets you flag useful add-ons.",
  },
  {
    title: "Real quote",
    body: "We review the details and reply with a custom quote within 24 hours.",
  },
];

export default function ContactPage() {
  return (
    <>
      <SchemaMarkup
        id="contact-breadcrumb"
        data={buildBreadcrumbList([
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ])}
      />
      <Nav />
      <main className="flex-1 pt-16">
        <FunnelSection className="pt-20 lg:pt-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Get a quote"
                title="BUILD THE NIGHT."
                body="Send the facts that affect the setup: date, city, guest count, event type, audio interest, and add-ons. We respond within 24 hours with a real quote."
                className="mb-8"
              />
              <div className="space-y-4">
                {quoteSteps.map((step, index) => (
                  <BookingStep
                    key={step.title}
                    number={`0${index + 1}`}
                    title={step.title}
                    body={step.body}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-lg border border-white/10 bg-charcoal/50 p-5 sm:p-7">
                <PrivateEventsNotice />
                <div className="mt-8">
                  <Suspense fallback={<FormSkeleton />}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </FunnelSection>

        <ByocPanel />
      </main>
      <Footer />
    </>
  );
}
