const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;

// In-memory only — resets on cold start, so this is a basic spam deterrent,
// not a hard guarantee. Swap for Upstash Redis if abuse becomes a problem.
const hits = new Map();

export function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}
