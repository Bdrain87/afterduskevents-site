import Script from "next/script";

/**
 * Microsoft Clarity heatmaps + session recordings.
 * Free forever, no traffic limits, GDPR-aligned (no PII captured by default).
 *
 * Set NEXT_PUBLIC_CLARITY_ID in Vercel env vars (sign up at https://clarity.microsoft.com)
 * to enable. Safely no-ops if the env var is unset (e.g. local dev).
 */
export default function MicrosoftClarity({ nonce }: { nonce?: string }) {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (!id) return null;
  return (
    <Script id="ms-clarity" strategy="lazyOnload" nonce={nonce}>
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${id}");
      `}
    </Script>
  );
}
