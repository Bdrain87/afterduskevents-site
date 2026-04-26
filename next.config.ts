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
    return [
      {
        source:
          "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|mp4|css|js)).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
