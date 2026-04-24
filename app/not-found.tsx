import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)] relative overflow-hidden">
        <span aria-hidden="true" className="signal-scanlines motion-reduce:hidden" />
        <div className="px-4 py-20 text-center max-w-xl mx-auto">
          <p
            className="projector-flicker font-display text-[8rem] text-white/[0.08] leading-none select-none mb-4"
            aria-hidden="true"
          >
            404
          </p>
          <h1 className="font-heading text-3xl text-projector mb-4">Signal lost.</h1>
          <p className="text-silver text-base leading-relaxed mb-10">
            That page does not exist. If you were looking for a package or quote, try the links below.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-projector bg-oxblood hover:bg-oxblood-deep transition-colors min-h-[44px]"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-ember border border-ember hover:bg-oxblood hover:border-oxblood hover:text-projector transition-colors min-h-[44px]"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
