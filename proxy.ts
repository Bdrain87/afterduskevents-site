import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 proxy (successor to middleware.ts). Reads Vercel geo headers
 * and writes a small ade-geo cookie so server components can personalize
 * the hero without another network call.
 *
 * CSP is set as a static header in next.config.ts so layout/pages can stay
 * statically prerendered. Promoting CSP from Report-Only to enforcing with
 * per-request nonces would force dynamic rendering on every route — a real
 * cost for marginal hardening when 'unsafe-inline' is already report-flagged.
 */
export function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const city = req.headers.get("x-vercel-ip-city") ?? "";
  const lat = req.headers.get("x-vercel-ip-latitude");
  const lng = req.headers.get("x-vercel-ip-longitude");
  const region = req.headers.get("x-vercel-ip-country-region") ?? "";

  if (lat && lng) {
    const value = JSON.stringify({
      city: decodeURIComponent(city),
      region,
      lat: Number(lat),
      lng: Number(lng),
    });
    res.cookies.set("ade-geo", value, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });
  }

  return res;
}

export const config = {
  matcher: [
    // Run on HTML routes only. skip API, static assets, Next.js internals.
    "/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
