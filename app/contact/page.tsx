import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a quote for your outdoor cinema event. After Dusk Events serves Southeast Michigan within 60 miles of Canton. Response within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-charcoal">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl sm:text-5xl text-brand-white mb-4">
              Request a Quote
            </h1>
            <p className="text-brand-gray text-lg leading-relaxed">
              Fill out the form below and we will respond within 24 hours with availability and a
              tailored quote.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Suspense fallback={<div className="text-brand-gray text-sm">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
