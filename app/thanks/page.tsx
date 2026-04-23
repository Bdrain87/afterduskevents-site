import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import NeonSign from "@/components/neon-sign";
import TicketStub from "@/components/ticket-stub";
import FilmStrip from "@/components/film-strip";

export const metadata: Metadata = {
  title: "Inquiry Received",
  description: "We received your inquiry and will respond within 24 hours.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="bg-paper px-4 sm:px-10 pt-16 sm:pt-24 pb-12 text-center">
          <p className="serial text-tail mb-6">Admit One · Ticket Confirmed</p>
          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-none">
            <NeonSign>Got it.</NeonSign>
          </h1>
        </section>

        <FilmStrip tone="ink" />

        <section className="bg-paper px-4 sm:px-10 py-14">
          <div className="mx-auto max-w-md">
            <TicketStub
              tone="paper"
              serial="ADM-001"
              stamp="Admit One"
            >
              <p className="font-display text-2xl uppercase leading-tight mb-4">
                We&apos;ll respond within 24 hours with availability and a real quote.
              </p>
              <p className="serial text-tail">— Blake</p>
            </TicketStub>
          </div>
        </section>

        <section className="bg-paper px-4 sm:px-10 pb-20 text-center">
          <Link
            href="/"
            className="serial border-b-2 border-ink pb-0.5 hover:text-tail hover:border-tail transition-colors"
          >
            ← Back to Home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
