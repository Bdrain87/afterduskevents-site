import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ContactForm from "./contact-form";
import { PrivateEventsNotice } from "@/components/private-events-notice";
import SchemaMarkup from "@/components/seo/schema-markup";
import { buildBreadcrumbList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a quote for your private outdoor cinema event. After Dusk Events serves Southeast Michigan within 60 miles of Canton. Response within 24 hours.",
  alternates: { canonical: "/contact" },
};

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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-5xl sm:text-6xl text-projector tracking-wider mb-2">
              GET A QUOTE
            </h1>
            <span className="oxblood-rule mx-auto" />
            <p className="text-steel text-lg leading-relaxed mt-6">
              Fill out the form and we will respond within 24 hours with availability and a real quote.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-8">
            <PrivateEventsNotice />
            <Suspense fallback={<div className="text-steel text-sm">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
