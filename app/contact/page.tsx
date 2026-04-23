import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ContactForm from "./contact-form";
import FormSkeleton from "@/components/skeletons/form-skeleton";
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
        {/* Header */}
        <section
          className="relative overflow-hidden px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "96px", paddingBottom: "48px" }}
        >
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="text-caption text-ember mb-4">Book the night</p>
            <h1 className="font-display text-projector text-display-md tracking-wider leading-none mb-6">
              LET US RUN YOUR NIGHT.
            </h1>
            <p className="text-silver text-body-lg leading-relaxed max-w-[48ch]">
              We respond within 24 hours with a real quote.
            </p>
          </div>
        </section>

        {/* Form */}
        <section
          className="relative px-6 sm:px-10 lg:px-16"
          style={{ paddingTop: "24px", paddingBottom: "128px" }}
        >
          <div className="mx-auto max-w-2xl space-y-8">
            <PrivateEventsNotice />
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
