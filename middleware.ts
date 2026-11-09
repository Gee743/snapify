import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Canonicalises the legacy ?area= URLs.
 *
 * This runs in middleware rather than in the page because a redirect returned
 * from an ISR page gets cached as a 200 HTML response at build time -- the same
 * Next behaviour that makes notFound() serve a soft 404 on non-prerendered
 * paths. Middleware runs before the cache, so the 308 is real.
 *
 */
/**
 * Cities with a published hub. Middleware runs on the edge and cannot query the
 * database, so this mirrors the MIN_PLACES_FOR_HUB gate. Keep it in step when
 * the place count changes -- `npx tsx scripts/checkHubGate.ts` reports drift.
 */
const PUBLISHED_CITY_HUBS = new Set(["colombo", "kandy", "ella"]);

export function middleware(request: NextRequest) {
   const area = request.nextUrl.searchParams.get("area");
   if (!area) return NextResponse.next();

   const slug = area
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

   if (!slug) return NextResponse.next();

   const url = request.nextUrl.clone();
   // Only cities with a published hub have a /photo-spots/<city> page. Anything
   // else goes to the browse index, which lists every tier -- better than
   // redirecting into a 404.
   url.pathname = PUBLISHED_CITY_HUBS.has(slug) ? `/photo-spots/${slug}` : "/photo-spots";
   url.search = "";
   return NextResponse.redirect(url, 308);
}

export const config = {
   matcher: ["/", "/community"],
};
