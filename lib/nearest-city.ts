import { cities, type City } from "./cities";

/** Great-circle distance in miles between two lat/lng pairs. */
export function haversineMiles(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 3958.8; // Earth radius, miles
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export type NearestCityResult = {
  city: City;
  milesFromVisitor: number;
  /** in-radius = within the 60-mile Canton service circle. */
  inRadius: boolean;
  /** travel-zone = 60–90 miles (travel fee expected). */
  travelZone: boolean;
};

/**
 * Given a visitor's lat/lng (from Vercel geo headers), find the nearest
 * service-area city and classify the visitor: in-radius, travel-zone, or
 * out-of-scope. Returns null if coords are missing/invalid.
 */
export function findNearestCity(lat: number | null, lng: number | null): NearestCityResult | null {
  if (lat == null || lng == null || Number.isNaN(lat) || Number.isNaN(lng)) return null;
  let best: City | null = null;
  let bestMiles = Infinity;
  for (const c of cities) {
    const m = haversineMiles(lat, lng, c.lat, c.lng);
    if (m < bestMiles) {
      bestMiles = m;
      best = c;
    }
  }
  if (!best) return null;
  return {
    city: best,
    milesFromVisitor: bestMiles,
    inRadius: bestMiles <= 60,
    travelZone: bestMiles > 60 && bestMiles <= 90,
  };
}
