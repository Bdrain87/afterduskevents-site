"use client";

import { useEffect, useRef } from "react";

/**
 * Polls /api/build-id and auto-reloads when the deployed build id no longer
 * matches the one baked in at render time.
 *
 * Reload safety: we never reload while the user is mid-form. If the active
 * element is inside a form and the form has any non-empty input, we defer
 * the reload until the tab is hidden (or the form is empty / blurred).
 */
export default function BuildRefreshWatcher({ buildId }: { buildId: string }) {
  const pendingRef = useRef(false);

  useEffect(() => {
    if (!buildId || buildId === "dev") return;

    let cancelled = false;
    let reloading = false;

    function isFormDirty(): boolean {
      const active = document.activeElement as HTMLElement | null;
      const form = active?.closest("form");
      if (!form) return false;
      const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        "input, textarea, select",
      );
      for (const f of fields) {
        if (f.type === "checkbox" || f.type === "radio") {
          if ((f as HTMLInputElement).checked) return true;
        } else if (f.value && f.value.trim() !== "") {
          return true;
        }
      }
      return false;
    }

    function safeReload() {
      if (reloading) return;
      // If user is mid-form, defer until tab is hidden (effectively the next
      // time they leave / lock the screen). They keep their work.
      if (isFormDirty()) {
        pendingRef.current = true;
        return;
      }
      reloading = true;
      window.location.reload();
    }

    async function check() {
      if (cancelled || reloading) return;
      try {
        const res = await fetch("/api/build-id", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { buildId?: string };
        if (data.buildId && data.buildId !== buildId) {
          safeReload();
        }
      } catch {
        // Network flakiness is ignored. Next tick will retry.
      }
    }

    check();
    const interval = window.setInterval(check, 60_000);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden" && pendingRef.current && !reloading) {
        // Safe window: tab is hidden, no UI to interrupt.
        reloading = true;
        window.location.reload();
        return;
      }
      if (document.visibilityState === "visible") check();
    };
    const onFocus = () => check();

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onFocus);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onFocus);
    };
  }, [buildId]);

  return null;
}
