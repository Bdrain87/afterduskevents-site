"use client";

import Script from "next/script";

/**
 * Cloudflare Turnstile widget. Renders only when
 * NEXT_PUBLIC_TURNSTILE_SITEKEY is set. The hidden input named
 * `cf-turnstile-response` is what the server reads via verifyTurnstile().
 *
 * The widget injects its own input on success — there's nothing to wire
 * up beyond rendering this inside the form.
 */
export default function Turnstile() {
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;
  if (!sitekey) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        async
        defer
      />
      <div
        className="cf-turnstile"
        data-sitekey={sitekey}
        data-theme="dark"
        data-size="flexible"
      />
    </>
  );
}
