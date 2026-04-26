/**
 * Rate limiting with two backends:
 *   - Upstash Redis (global, durable) when UPSTASH_REDIS_REST_URL +
 *     UPSTASH_REDIS_REST_TOKEN are set.
 *   - In-memory token bucket as a fallback for local dev and as a safety
 *     net during deploys before env vars propagate.
 *
 * Both backends share the same async signature so callers don't branch.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type RateResult = { ok: boolean; retryAfter?: number };

const HAS_UPSTASH =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = HAS_UPSTASH ? Redis.fromEnv() : null;

const upstashAi = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "10 m"),
      analytics: true,
      prefix: "ade:ai",
    })
  : null;

const upstashInquiry = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      analytics: true,
      prefix: "ade:inquiry",
    })
  : null;

// In-memory fallback. Token-bucket keyed by IP. Per-instance, so on Fluid
// Compute it covers warm requests; cold starts reset.
type Bucket = { tokens: number; lastRefill: number };
const STORE: Map<string, Map<string, Bucket>> = new Map();
function makeMemoryLimiter(name: string, capacity: number, refillPerMs: number) {
  if (!STORE.has(name)) STORE.set(name, new Map());
  const buckets = STORE.get(name)!;
  return (ip: string): RateResult => {
    const now = Date.now();
    let b = buckets.get(ip);
    if (!b) {
      b = { tokens: capacity, lastRefill: now };
      buckets.set(ip, b);
    }
    const elapsed = now - b.lastRefill;
    b.tokens = Math.min(capacity, b.tokens + elapsed * refillPerMs);
    b.lastRefill = now;
    if (b.tokens < 1) {
      const retryAfter = Math.ceil((1 - b.tokens) / refillPerMs / 1000);
      return { ok: false, retryAfter: Math.max(1, retryAfter) };
    }
    b.tokens -= 1;
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) {
        if (now - v.lastRefill > 60 * 60 * 1000) buckets.delete(k);
      }
    }
    return { ok: true };
  };
}

const memoryAi = makeMemoryLimiter("ai", 10, 10 / (10 * 60 * 1000));
const memoryInquiry = makeMemoryLimiter("inquiry", 3, 3 / (60 * 60 * 1000));

export async function aiLimit(ip: string): Promise<RateResult> {
  if (upstashAi) {
    const res = await upstashAi.limit(ip);
    if (res.success) return { ok: true };
    const retryAfter = Math.max(1, Math.ceil((res.reset - Date.now()) / 1000));
    return { ok: false, retryAfter };
  }
  return memoryAi(ip);
}

export async function inquiryLimit(ip: string): Promise<RateResult> {
  if (upstashInquiry) {
    const res = await upstashInquiry.limit(ip);
    if (res.success) return { ok: true };
    const retryAfter = Math.max(1, Math.ceil((res.reset - Date.now()) / 1000));
    return { ok: false, retryAfter };
  }
  return memoryInquiry(ip);
}

export function getClientIp(req: { headers: Headers | { get: (k: string) => string | null } }): string {
  const headers = req.headers as Headers;
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = headers.get("x-real-ip");
  if (real) return real;
  return "anonymous";
}

/**
 * Cloudflare Turnstile token verifier. Returns true when the token is valid
 * for the configured CLOUDFLARE_TURNSTILE_SECRET; returns true (skip) when no
 * secret is configured so local dev keeps working.
 */
export async function verifyTurnstile(
  token: string | null | undefined,
  remoteIp?: string,
): Promise<{ ok: boolean; error?: string }> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET;
  if (!secret) return { ok: true };
  if (!token) return { ok: false, error: "Missing captcha token." };
  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (remoteIp) body.set("remoteip", remoteIp);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (data.success) return { ok: true };
    return { ok: false, error: data["error-codes"]?.[0] ?? "captcha failed" };
  } catch {
    return { ok: false, error: "captcha verification network error" };
  }
}
