import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns the current production build identifier so open tabs can detect a
 * new deploy and reload themselves. Vercel sets VERCEL_GIT_COMMIT_SHA at
 * build time; falls back to a deploy-unique hash or "dev" locally.
 */
const BUILD_ID =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.VERCEL_DEPLOYMENT_ID ??
  "dev";

export async function GET() {
  return NextResponse.json(
    { buildId: BUILD_ID },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    },
  );
}
