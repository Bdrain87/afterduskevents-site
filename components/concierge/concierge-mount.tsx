"use client";

import dynamic from "next/dynamic";

const ConciergeDrawer = dynamic(() => import("./drawer"), {
  ssr: false,
});

/**
 * Env-gated mount. The concierge + its deps only load on the client when
 * NEXT_PUBLIC_CONCIERGE_ENABLED === "true". On a pre-launch site without
 * the key, the bundle doesn't even include the drawer.
 */
export default function ConciergeMount() {
  if (process.env.NEXT_PUBLIC_CONCIERGE_ENABLED !== "true") return null;
  return <ConciergeDrawer />;
}
