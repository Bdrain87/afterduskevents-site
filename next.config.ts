import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Silence the workspace-root warning by pinning Turbopack to the cwd at startup.
  // (Stays a string literal to avoid runtime APIs in next.config.)
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80, 90],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Cache policy: HTML documents never cache in the browser so deploys are
  // visible on the next request. Hashed static assets (/_next/static/, image
  // optimizer output, public/ files with extensions) keep a long cache because
  // their URLs change on every deploy.
  async headers() {
    // CSP runs in Report-Only mode for now so we can observe inline-script /
    // analytics violations without breaking Clarity, Vercel Live, or the
    // JSON-LD <script> tag. Promote to enforcing once telemetry is clean.
    const cspReportOnly = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "form-action 'self'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms https://*.clarity.ms https://va.vercel-scripts.com https://vercel.live",
      "connect-src 'self' https://www.clarity.ms https://*.clarity.ms https://api.resend.com https://api.anthropic.com https://*.vercel.app https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "media-src 'self' data: blob:",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join("; ");

    const securityHeaders = [
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
      { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
    ];

    return [
      {
        source:
          "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|mp4|css|js)).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, max-age=0",
          },
          ...securityHeaders,
        ],
      },
      {
        // Static assets: long cache + minimal security headers.
        source: "/:path*\\.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|mp4|css|js)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
