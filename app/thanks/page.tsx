import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Inquiry Received",
  description: "We received your inquiry and will respond within 24 hours.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)] relative overflow-hidden">
        {/* Dusk moment: a darker radial pulls the eye in. AmbientSky and
            Starfield are already rendering in the background. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 35% at 50% 48%, rgba(221,84,84,0.06) 0%, rgba(5,5,8,0.85) 60%, #050508 100%)",
          }}
        />
        <div className="relative z-10 px-6 py-24 text-center max-w-2xl mx-auto thanks-fade">
          <p className="text-caption text-ember mb-6">Received</p>
          <h1 className="font-display text-projector text-display-lg tracking-wider leading-none mb-6">
            GOT IT.
          </h1>
          <p className="text-silver text-body-lg leading-relaxed mb-12">
            Blake will reply within 24 hours with availability and a real quote.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-silver border border-white/20 hover:border-ember hover:text-ember transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
