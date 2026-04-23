import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BulbButton from "@/components/bulb-button";

export const metadata: Metadata = {
  title: "No Reel Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1 flex flex-col justify-center min-h-[calc(100vh-4rem)] bg-paper px-4 sm:px-10 py-24 text-center">
        <p className="serial text-tail mb-6">Error · 404</p>
        <p
          className="font-display text-[clamp(6rem,22vw,18rem)] text-ink/15 leading-none select-none"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-none -mt-8 sm:-mt-14">
          No reel found.
        </h1>
        <p className="font-body text-lg text-concrete max-w-lg mx-auto mt-8 mb-10">
          That page doesn&apos;t exist. If you were after a tier or a
          quote, try the links below.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <BulbButton href="/">Back to Home</BulbButton>
          <Link
            href="/contact"
            className="serial border-2 border-ink px-5 py-3 hover:bg-ink hover:text-paper transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
