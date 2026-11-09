/**
 * Minimal in-memory rate limiter for the public form endpoints.
 *
 * Deliberately simple: this is a single-instance guard against casual spam and
 * accidental double-submits, not a distributed solution. It resets on deploy and
 * does not coordinate across serverless instances -- if these endpoints start
 * attracting real abuse, move to a durable store or a platform-level rule.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export const isRateLimited = (key: string) => {
   const now = Date.now();
   const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

   if (recent.length >= MAX_REQUESTS) {
      hits.set(key, recent);
      return true;
   }

   recent.push(now);
   hits.set(key, recent);

   // Opportunistic cleanup so the map cannot grow without bound.
   if (hits.size > 5000) {
      for (const [entry, times] of Array.from(hits.entries())) {
         if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entry);
      }
   }

   return false;
};

/** Best-effort client identity from proxy headers. */
export const clientKey = (request: Request) =>
   request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
   request.headers.get("x-real-ip") ||
   "unknown";
