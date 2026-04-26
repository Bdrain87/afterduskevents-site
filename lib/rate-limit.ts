/**
 * In-memory token-bucket rate limiter keyed by IP. Works on Fluid Compute
 * because instances are reused across concurrent requests; on cold starts
 * the bucket resets, which is acceptable for naive abuse prevention.
 *
 * Not a substitute for Upstash + a global counter when traffic scales —
 * queued for the follow-up pass.
 */

type Bucket = { tokens: number; lastRefill: number };
type Limiter = (ip: string) => { ok: boolean; retryAfter?: number };

const STORE: Map<string, Map<string, Bucket>> = new Map();

function makeLimiter(name: string, capacity: number, refillPerMs: number): Limiter {
  if (!STORE.has(name)) STORE.set(name, new Map());
  const buckets = STORE.get(name)!;
  return (ip: string) => {
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
    // Cap map size; opportunistic cleanup of stale entries.
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) {
        if (now - v.lastRefill > 60 * 60 * 1000) buckets.delete(k);
      }
    }
    return { ok: true };
  };
}

// 10 req / 10 min => refill = 10 / 600_000 tokens per ms
export const aiLimit = makeLimiter("ai", 10, 10 / (10 * 60 * 1000));
// 3 req / hour => 3 / 3_600_000
export const inquiryLimit = makeLimiter("inquiry", 3, 3 / (60 * 60 * 1000));

export function getClientIp(req: { headers: Headers | { get: (k: string) => string | null } }): string {
  const headers = req.headers as Headers;
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = headers.get("x-real-ip");
  if (real) return real;
  return "anonymous";
}
