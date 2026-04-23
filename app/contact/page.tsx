import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ContactForm from "./contact-form";
import FormSkeleton from "@/components/skeletons/form-skeleton";
import FilmStrip from "@/components/film-strip";
import NeonSign from "@/components/neon-sign";
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
      <main className="flex-1">
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="serial text-tail mb-6">Admit One · Request a Quote</p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-none">
              <NeonSign>Book it.</NeonSign>
            </h1>
            <p className="mt-10 font-body text-lg">
              Fill out the order below. Real quote back inside 24 hours.
            </p>
          </div>
        </section>

        <FilmStrip tone="ink" />

        <section className="bg-paper px-4 sm:px-10 py-14">
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
