import type { Metadata } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import FilmGrain from "@/components/film-grain";
import HalftoneOverlay from "@/components/halftone-overlay";
import LightLeak from "@/components/light-leak";
import ConciergeMount from "@/components/concierge/concierge-mount";
import MicrosoftClarity from "@/components/microsoft-clarity";
import SchemaMarkup from "@/components/seo/schema-markup";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import {
  buildLocalBusiness,
  buildOrganization,
  buildPerson,
  buildWebSite,
} from "@/lib/schema";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Outdoor Cinema for Private Events | After Dusk Events | Canton, MI",
    template: "%s | After Dusk Events",
  },
  description:
    "Private outdoor cinema in Southeast Michigan. 30-foot inflatable screen, three audio tiers, veteran-owned. 60 miles of Canton, MI.",
  keywords: [
    "outdoor movie rental Michigan",
    "backyard movie night Canton",
    "inflatable screen rental Detroit",
    "corporate outdoor movie Michigan",
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
    title: "Outdoor Cinema for Private Events | After Dusk Events | Canton, MI",
    description:
      "Private outdoor cinema in Southeast Michigan. 30-foot inflatable screen, three audio tiers, veteran-owned.",
    images: [{ url: "/og-image.png", width: 1282, height: 836, alt: "After Dusk Events" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outdoor Cinema for Private Events | After Dusk Events | Canton, MI",
    description: "Private outdoor cinema in Southeast Michigan. Veteran-owned.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <SchemaMarkup
          id="site-schema"
          data={[
            buildOrganization(),
            buildLocalBusiness(),
            buildPerson(),
            buildWebSite(),
          ]}
        />
        <HalftoneOverlay />
        <FilmGrain />
        <LightLeak />
        <NuqsAdapter>{children}</NuqsAdapter>
        <ConciergeMount />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0E0A08",
              border: "2px solid #E8B84C",
              color: "#F0E5D0",
              borderRadius: 0,
              fontFamily: "var(--font-mono), monospace",
              letterSpacing: "0.04em",
            },
          }}
        />
        <MicrosoftClarity />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
