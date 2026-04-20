import type { Metadata } from "next";
import { Inter, Montserrat, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import FilmGrain from "@/components/film-grain";
import CursorSpotlight from "@/components/cursor-spotlight";
import ScrollProgress from "@/components/scroll-progress";
import LoadingScreen from "@/components/loading-screen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
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
    default: "Outdoor Movie Rentals & Event Cinema | After Dusk Events | Canton, MI",
    template: "%s | After Dusk Events",
  },
  description:
    "Premium outdoor cinema and event rental. 30-foot screen, concert-grade sound, veteran-owned. Serving Canton, Ann Arbor, Detroit, and Southeast Michigan within 60 miles.",
  keywords: [
    "outdoor movie rental Michigan",
    "backyard movie night Canton",
    "inflatable screen rental Detroit",
    "wedding outdoor cinema Ann Arbor",
    "corporate outdoor movie Michigan",
    "outdoor cinema rental Southeast Michigan",
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
    title: "Outdoor Movie Rentals & Event Cinema | After Dusk Events | Canton, MI",
    description:
      "Premium outdoor cinema and event rental. 30-foot screen, concert-grade sound, veteran-owned. Serving Canton, Ann Arbor, Detroit, and Southeast Michigan within 60 miles.",
    images: [{ url: "/og-image.png", width: 1282, height: 836, alt: "After Dusk Events - Outdoor Cinema Michigan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outdoor Movie Rentals & Event Cinema | After Dusk Events | Canton, MI",
    description:
      "Premium outdoor cinema and event rental. 30-foot screen, concert-grade sound, veteran-owned. Serving Canton, Ann Arbor, Detroit, and Southeast Michigan.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-screening text-projector">
        <LoadingScreen />
        <ScrollProgress />
        <CursorSpotlight />
        <FilmGrain />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1A1A1A",
              border: "1px solid #2a2a2a",
              color: "#FAFAFA",
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
