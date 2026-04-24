"use client";

import { useEffect } from "react";

/**
 * Polls /api/build-id and auto-reloads the page when the deployed build id
 * no longer matches the one that was baked into this page at render time.
 *
 * This means Blake never has to hard-refresh after a deploy — any open tab
 * detects the new version within ~60s and reloads itself.
 *
 * Triggers a check on mount, every 60 seconds on interval, and whenever the
 * tab regains focus / the document becomes visible.
 */
export default function BuildRefreshWatcher({ buildId }: { buildId: string }) {
  useEffect(() => {
    if (!buildId || buildId === "dev") return;

    let cancelled = false;
    let reloading = false;

    async function check() {
      if (cancelled || reloading) return;
      try {
        const res = await fetch("/api/build-id", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { buildId?: string };
        if (data.buildId && data.buildId !== buildId) {
          reloading = true;
          // Use replace so the old HTML is discarded from the history entry.
          window.location.reload();
        }
      } catch {
        // Network flakiness is ignored. Next tick will retry.
      }
    }

    // Kick off an immediate check so a tab that was in the background when a
    // new deploy landed reloads the moment the user returns to it.
    check();

    const interval = window.setInterval(check, 60_000);

    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    const onFocus = () => check();

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onFocus);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onFocus);
    };
  }, [buildId]);

  return null;
}
