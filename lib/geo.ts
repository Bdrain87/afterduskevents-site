import { cookies } from "next/headers";
import { findNearestCity, type NearestCityResult } from "./nearest-city";

type GeoCookie = {
  city?: string;
  region?: string;
  lat?: number;
  lng?: number;
};

/**
 * Server-side: read the `ade-geo` cookie set by proxy.ts and resolve it
 * to a nearest-city classification. Returns null if the cookie is missing
 * or malformed. Safe to call from any server component.
 */
export async function getVisitorGeo(): Promise<NearestCityResult | null> {
  try {
    const store = await cookies();
    const raw = store.get("ade-geo")?.value;
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GeoCookie;
    if (parsed.lat == null || parsed.lng == null) return null;
    return findNearestCity(parsed.lat, parsed.lng);
  } catch {
    return null;
  }
}
