import type { Metadata } from "next";
import { Inter, Montserrat, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import FilmGrain from "@/components/film-grain";
import CursorBeam from "@/components/cursor-beam";
import BuildRefreshWatcher from "@/components/build-refresh-watcher";
import StickyCTA from "@/components/sticky-cta";
import ConciergeMount from "@/components/concierge/concierge-mount";
import MicrosoftClarity from "@/components/microsoft-clarity";
import SchemaMarkup from "@/components/seo/schema-markup";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import TimeOfDayProvider from "@/components/atmosphere/time-of-day-provider";
import AmbientSky from "@/components/atmosphere/ambient-sky";
import {
  buildLocalBusiness,
  buildOrganization,
  buildWebSite,
} from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  // Trimmed from 5 weights to 3 — semibold/bold cover heading + button copy,
  // regular covers body. 600 is synthesized from 500+700 if a stray utility
  // class hits it; the visual delta is imperceptible in this stack.
  weight: ["400", "500", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: "Outdoor Cinema and Event Rentals | After Dusk Events | Canton, MI",
    template: "%s | After Dusk Events",
  },
  description:
    "Premium outdoor cinema and event rentals for private events in Southeast Michigan. 4K theater-quality projection, 30-foot screen, concert-grade sound, veteran-owned. 40 miles of Canton, MI with travel beyond by quote.",
  keywords: [
    "outdoor movie rental Michigan",
    "backyard movie night Canton",
    "inflatable screen rental Detroit",
    "corporate outdoor movie Michigan",
    "outdoor cinema rental Southeast Michigan",
    "private outdoor cinema Michigan",
  ],
  authors: [{ name: "After Dusk Events LLC" }],
  creator: "After Dusk Events LLC",
  publisher: "After Dusk Events LLC",
  metadataBase: new URL("https://afterduskevents.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://afterduskevents.com",
    siteName: "After Dusk Events",
    title: "Outdoor Cinema and Event Rentals | After Dusk Events | Canton, MI",
    description:
      "Premium outdoor cinema and event rentals for private events in Southeast Michigan. 4K theater-quality projection, 30-foot screen, concert-grade sound, veteran-owned.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "After Dusk Events" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outdoor Cinema and Event Rentals | After Dusk Events | Canton, MI",
    description: "Premium outdoor cinema and event rentals for private events in Southeast Michigan. Veteran-owned.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const BUILD_ID =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.VERCEL_DEPLOYMENT_ID ??
  "dev";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-build-id={BUILD_ID}
      className={`${inter.variable} ${montserrat.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden flex flex-col bg-screening text-projector">
        <SchemaMarkup
          id="site-schema"
          data={[
            buildOrganization(),
            buildLocalBusiness(),
            buildWebSite(),
          ]}
        />
        <TimeOfDayProvider />
        <AmbientSky />
        <FilmGrain />
        <CursorBeam />
        <BuildRefreshWatcher buildId={BUILD_ID} />
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
        <StickyCTA />
        <ConciergeMount />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: { background: "#1A1A1A", border: "1px solid #2a2a2a", color: "#FAFAFA" },
          }}
        />
        <MicrosoftClarity />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
