/**
 * Single source of truth for the public origin and site-wide copy.
 *
 * metadataBase, canonical URLs, sitemap.xml, robots.txt and JSON-LD all need an
 * absolute origin. Falling back to localhost keeps local builds working, but any
 * deployed environment must set NEXT_PUBLIC_SITE_URL or OG/canonical URLs will
 * point at the wrong host.
 */
export const SITE_URL = (
   process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const SITE_NAME = "Snapify";

export const SITE_DESCRIPTION =
   "Find free public places to shoot across Sri Lanka — beaches, viewpoints, waterfalls and landmarks — with directions, access notes and tips from local photographers.";

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = "/") =>
   `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
