import type { Metadata } from "next";
import HomeClient from "./home-client";
import { getVisitorGeo } from "@/lib/geo";

export const metadata: Metadata = {
  title: "Outdoor Cinema Rental for Private Events | After Dusk Events | Canton, MI",
  description:
    "We show up to your backyard, venue, or field with a 30-foot inflatable screen and concert-grade sound. Private outdoor cinema rental in Southeast Michigan. Veteran-owned.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const geo = await getVisitorGeo();
  return <HomeClient geo={geo} />;
}
