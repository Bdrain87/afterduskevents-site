/**
 * Open dates for booking. Blake maintains this manually for now  
 * when he adds Google Calendar MCP sync later, this file becomes the
 * cache/source of truth.
 *
 * Dates are ISO strings in local (Eastern) time. Keep the array sorted
 * ascending. `getUpcomingOpenDates` filters out past dates and returns the
 * next N.
 */

export type OpenDate = {
  date: string; // YYYY-MM-DD
  note?: string; // optional blurb like "Saturday night" or "Spring favorite"
};

export const openDates: OpenDate[] = [
  // Placeholder entries. Blake replaces these with real open weekends.
  // The card on the homepage renders nothing if the array is empty.
];

/** Returns the next N open dates (from today forward). */
export function getUpcomingOpenDates(n = 3): OpenDate[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return openDates
    .filter((d) => new Date(d.date + "T00:00:00").getTime() >= today.getTime())
    .slice(0, n);
}

/** Formats a YYYY-MM-DD string as e.g. "Saturday, June 14". */
export function formatOpenDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
