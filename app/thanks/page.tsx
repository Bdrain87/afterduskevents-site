import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Inquiry Received",
  description: "We received your inquiry and will respond within 24 hours.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="px-4 py-20 text-center max-w-xl mx-auto">
          <div className="flex justify-center mb-6">
            <CheckCircle size={56} className="text-ember" aria-hidden="true" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-projector mb-4">Got it.</h1>
          <p className="text-silver text-lg leading-relaxed mb-10">
            We will respond within 24 hours with availability and a tailored quote.
            <br />
            <span className="text-projector font-medium">- Blake</span>
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-projector border border-white/30 hover:border-white/60 hover:bg-white/5 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
