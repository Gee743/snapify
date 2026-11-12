# Snapify

> Places to shoot in Sri Lanka, with the access detail other directories leave out.

Snapify is a directory for Sri Lanka's photography and filming community. It
lists public places to shoot — beaches, viewpoints, waterfalls, temples, streets
— and for each one carries the information that actually decides whether a shoot
happens: entry fees, which of the six permitting authorities applies, whether
drones are allowed, whether a tripod needs its own permit, and the golden hour
computed for that specific location.

It also carries the paid side: bookable studios, villas, rooftops and
warehouses at `/studios`, with rates, capacity, amenities and enquiries that go
straight to the owner. No studio is listed until a real owner has confirmed it,
so that section shows a waitlist empty state until the first one is published.
The owner waitlist is live at `/list-your-space`.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma and MongoDB.

## Features

- **84 public locations** at `/community/<slug>`, each with directions, shooting
  tips, permit and drone rules, computed sunrise/sunset/golden hour, and the four
  nearest other places.
- **Faceted browsing** at `/community` — search by name, type or town, and
  filter by province, district, category and access (no entry fee, no permit,
  drone friendly, tripod OK). Filter state lives in the query string, so a
  filtered view is shareable and the back button works. Facet counts
  cross-filter: choosing a district narrows the province and category options
  to what exists inside it, so the controls cannot build an empty result.
  Filtered views are `noindex` — the facets multiply into thousands of
  near-identical URLs, and the curated hubs below are the indexable surface.
- **Browse by area** at `/photo-spots` — hub pages by city, district, province
  and category. A hub is only published once it has at least
  `MIN_PLACES_FOR_HUB` (3) places; anything thinner returns 404 rather than
  shipping a near-empty page. Most cities sit below that line, so links to a
  city resolve through `getCityFallbackPath` to the nearest published tier
  instead of pointing at a 404.
- **Three cornerstone guides** at `/guides` covering drone law, the permit
  landscape, and which coast is shootable in which month. Each carries a visible
  last-reviewed date and its sources.
- **Bookable studios** at `/studios` and `/studios/<slug>` — a separate
  `Studio` model for paid spaces, with hourly/half-day/full-day rates, capacity,
  floor area, a closed amenity vocabulary, equipment lists and booking terms.
  Faceted browsing by province, type, budget band and capacity; eight type hubs
  at `/studios/type/<type>`. A blank rate means "on request" and is never
  rendered as free or sorted as the cheapest. Enquiries post to
  `/api/studio-inquiries` so the owner's email never reaches the client.
- **Owner waitlist and place submissions** — `/list-your-space` and `/submit`
  write to the database behind rate-limited public endpoints.
- **Newsletter capture** in the footer.
- **Admin dashboard** (`/admin`) — password-protected CRUD for locations. On
  first load the built-in seed places in `app/data/publicSpaces.ts` are imported
  once, after which the database is the source of truth.
- **SEO**: per-page metadata and canonicals, `TouristAttraction` /
  `ItemList` / `BreadcrumbList` / `Article` JSON-LD, a generated sitemap and
  robots.txt, and ISR on every public route.

## Tech stack

| Area      | Choice                                    |
| :-------- | :---------------------------------------- |
| Framework | Next.js 14.2 (App Router) + React 18      |
| Language  | TypeScript                                |
| Styling   | Tailwind CSS                              |
| Database  | MongoDB via Prisma                        |
| Auth      | NextAuth (credentials, Google, GitHub)    |
| Maps      | Leaflet / react-leaflet                   |
| State     | Zustand, react-hook-form, react-hot-toast |

## Getting started

### Prerequisites

- Node.js 18.17 or newer
- A MongoDB database (Prisma's MongoDB connector requires a replica set, so
  Atlas or a self-hosted replica set)

### Install

```shell
git clone <your-repo-url>
cd snapify
npm install
```

`postinstall` runs `prisma generate` automatically.

### Configure environment

Copy `.env.example` to `.env` and fill it in. See that file for the full list
and notes; the variables are:

| Variable | Purpose |
| :------- | :------ |
| `DATABASE_URL` | MongoDB connection string |
| `NEXT_PUBLIC_SITE_URL` | Absolute public origin, no trailing slash. Required for `metadataBase`, canonicals, sitemap and robots — social scrapers reject relative OG URLs |
| `NEXTAUTH_SECRET` | Signs NextAuth JWT sessions |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth sign-in |
| `GITHUB_ID` / `GITHUB_SECRET` | GitHub OAuth sign-in |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Shared credentials for `/admin` |
| `ADMIN_SESSION_SECRET` | Signs the admin session cookie — **at least 32 characters** |

Generate a separate random `ADMIN_SESSION_SECRET` (`openssl rand -hex 32`); do
not reuse `NEXTAUTH_SECRET`. If any of the three admin variables is missing or
the secret is too short, admin login is disabled and `/admin` returns a "not
configured" error rather than falling back to an open dashboard.

Remote image hosts are allow-listed in [next.config.js](next.config.js); add any
new image domain there.

### Set up the database

```shell
npx prisma db push
node --env-file=.env scripts/seed-places.mjs
```

`seed-places.mjs` upserts the batched JSON in `scripts/places-batch-*.json` by
slug, so it is idempotent and safe to re-run. It is the one seeding step a
fresh clone needs — the batches carry the structured location, category and
access fields already derived.

You can skip it entirely if you prefer: with an empty database the app serves
the built-in array in `app/data/publicSpaces.ts`, and the first authenticated
`/admin` load imports that array once (see **Seeding and the fixture** below).

The older `scripts/*.ts` seeders (`seedLandmarks`, `seedAccessData`,
`backfillPlaces`, `normalizeImages`) are kept for reference but are **not**
part of first-run setup: their places are already in the fixture, and they need
a TypeScript runner (`tsx`) that is not a dependency of this project.

### Run

```shell
npm run dev
```

The app starts at http://localhost:3000.

## Available commands

| command | description |
| :------ | :---------- |
| `dev`   | Starts a development instance |
| `build` | Generates the Prisma client and builds for production |
| `start` | Serves the production build |
| `lint`  | Runs ESLint via `next lint` |

Useful scripts. These are plain `.mjs` and run on Node with no extra tooling —
pass `--env-file=.env` so they can reach the database:

| script | purpose |
| :----- | :------ |
| `scripts/seed-places.mjs` | Upsert `places-batch-*.json` into the database (idempotent) |
| `scripts/generate-fixture.mjs` | Regenerate `app/data/publicSpaces.ts` from the database |
| `scripts/sync-hub-gate.mjs` | Rewrite the published-hub mirror in `middleware.ts`; `--check` verifies without writing and exits non-zero on drift |

Legacy TypeScript seeders (`backfillPlaces.ts`, `seedLandmarks.ts`,
`seedAccessData.ts`, `normalizeImages.ts`) predate the batch seeder and need a
`tsx`-style runner that is not installed. Keep them for reference; do not use
them to set up a new database.

## Project structure

```
app/
  actions/        Server-side data fetchers
  admin/          Admin dashboard route
  api/            Route handlers (admin CRUD, leads, newsletter, register)
  community/      Location directory and detail pages
  components/     UI — navbar, modals, cards, hub page, access/timing panels
  data/           Fallback location array (generated) and guide content
  guides/         Cornerstone guides
  libs/           Prisma client, admin auth, validation, hubs, filters, sun times, taxonomy
  photo-spots/    pSEO hub pages (city, district, province, category)
  studios/        Paid, bookable spaces — index, detail and type hubs
middleware.ts     Canonicalises legacy ?area= URLs; holds the generated hub mirror
prisma/           Prisma schema (MongoDB)
scripts/          Seed batches, generators and consistency scripts
```

Two files under `app/libs/` carry the browsing logic: `spaceFilters.ts` (facet
matching, counting and query-string parsing, shared by the server render and
the client filter bar so the two cannot disagree) and `spaceSpecs.ts` (derives
the short values for the detail-page spec rows, since `entryFee` and
`openingHours` are stored as full sentences).

## Data model

| Model | Purpose |
| :---- | :------ |
| `PublicSpace` | A location, keyed by URL `slug`. Carries structured location (city/district/province + slugs), a `category` enum, access fields (fees, permits, `droneRule`), timing fields and a submission `status` |
| `PublicSpaceBootstrap` | One-time marker for the seed import |
| `SpaceOwnerLead` | Owner waitlist and place submissions |
| `Studio` | A paid, bookable space keyed by URL `slug`. Rates, capacity, amenities, equipment, owner contact and a review `status` |
| `SpaceInquiry` | Enquiries about a studio. `spaceSlug` holds the `Studio` slug |
| `NewsletterSubscriber` | Footer email capture |
| `User` / `Account` | NextAuth accounts |

`locationLabel` is stored as `"Province, City"`. Read city and province through
`getPublicSpaceCity` / `getPublicSpaceProvince` rather than parsing it — the two
are easy to transpose, and every hub URL, breadcrumb and JSON-LD address depends
on telling them apart.

### Two kinds of place

`PublicSpace` and `Studio` are separate models rather than one model with a
`kind` discriminator, because they share almost no decision-making fields. A
public space is chosen on permits, drone rules, entry fees and golden hour; a
studio is chosen on rate, capacity, amenities and kit. One table would leave
roughly a dozen columns null on every row in both directions and make every
validator and form conditional on `kind`.

What they do share is location: `Studio` carries the same
city/district/province (+ slug) columns and is derived through the same
`deriveSpaceFields` helper, so a studio and a public space in the same town
resolve to identical slugs.

Two consequences worth knowing:

- **There is no studio fixture.** `getPublicSpaces()` falls back to the
  built-in array when the database is empty; `getStudios()` deliberately does
  not. Public spaces are a seeded catalogue of facts, but studios are real
  businesses that opt in — an empty database means genuinely zero listings, and
  `/studios` renders its waitlist empty state rather than inventing inventory.
- **New studios default to `PENDING`.** Only `PUBLISHED` rows reach the public
  reader, the sitemap, `generateStaticParams` or the enquiry endpoint. Publishing
  by default would make an unreviewed owner submission easy to miss.

Owner contact (`ownerName`/`ownerEmail`/`ownerPhone`) is stripped in
`toStudio()` before a studio reaches any component, which is why enquiries go
through `/api/studio-inquiries` instead of a `mailto:` link on the page.

### Seeding and the fixture

`app/data/publicSpaces.ts` is not dead demo data. It plays two roles:

1. `getPublicSpaces()` serves it whenever the database returns zero rows.
2. `importInitialSpacesOnce()` seeds a fresh database from it on the first
   authenticated `/admin` load, then sets a `PublicSpaceBootstrap` marker.

So the fixture is what a cold start or an unreachable database falls back to.
Once rows exist, the database wins and the fixture is ignored — which means
editing the fixture alone changes nothing on a populated instance, and letting
it fall behind means a cold start quietly serves an older, smaller catalogue.

Keep them in step: seed or edit the database, then run

```shell
node --env-file=.env scripts/generate-fixture.mjs
```

which rewrites the array from the live rows and leaves the exported type and
helper functions untouched. Run it *after* seeding — it treats the database as
the source of truth and overwrites the file.

## Routes

### Pages

| Route | Access | Description |
| :---- | :----- | :---------- |
| `/` | Public | Landing page, guides strip and location grid |
| `/community` | Public | Full location directory with faceted search and filters |
| `/community/[spaceId]` | Public | Location detail — access, timing, map, nearby |
| `/photo-spots` | Public | Browse index for all hub tiers |
| `/photo-spots/[city]` | Public | City hub (published tiers only) |
| `/photo-spots/district/[district]` | Public | District hub |
| `/photo-spots/province/[province]` | Public | Province hub |
| `/photo-spots/category/[category]` | Public | Category hub |
| `/studios` | Public | Bookable studios with faceted filters |
| `/studios/[slug]` | Public | Studio detail — rates, amenities, enquiry form |
| `/studios/type/[type]` | Public | Studio type hub (daylight, cyclorama, villa...) |
| `/guides`, `/guides/[slug]` | Public | Cornerstone guides |
| `/about`, `/contact`, `/privacy` | Public | Static pages |
| `/list-your-space`, `/submit` | Public | Owner waitlist and submissions |
| `/admin` | Admin password | Location management (noindex) |

### API

| Route | Description |
| :---- | :---------- |
| `POST /api/leads` | Owner waitlist / place submission (rate limited) |
| `POST /api/newsletter` | Newsletter subscribe (rate limited) |
| `POST /api/register` | Create an account |
| `/api/auth/[...nextauth]` | NextAuth sign-in, sign-out, session |
| `GET /api/public-spaces`, `/api/public-spaces/areas` | Read locations and areas |
| `GET /api/public-spaces/search` | Trimmed index (id, name, type, city, category) for the navbar typeahead, cached for an hour |
| `GET`/`POST`/`DELETE /api/admin/session` | Admin session |
| `GET`/`POST /api/admin/public-spaces` | List and create locations |
| `PUT`/`DELETE /api/admin/public-spaces/[slug]` | Update and delete a location |
| `POST /api/studio-inquiries` | Studio enquiry (rate limited, published studios only) |
| `GET`/`POST /api/admin/studios` | List and create studios |
| `PUT`/`DELETE /api/admin/studios/[slug]` | Update and delete a studio |
| `GET /api/admin/leads` | Read captured owner leads and studio enquiries (admin session) |

Admin write endpoints require a valid signed session cookie **and** a
same-origin request, and validate every field through
[app/libs/publicSpaceValidation.ts](app/libs/publicSpaceValidation.ts). They also
re-derive the structured location fields and call `revalidatePath`, so edits
appear without waiting out the ISR window.

## Known issues

- **Soft 404 on unknown location slugs.** With `dynamicParams = true` on
  `/community/[spaceId]`, `notFound()` renders the 404 UI but Next responds
  `200` for slugs that were never prerendered. Verified on 14.2.35 by
  instrumenting the component. Setting `dynamicParams = false` returns a correct
  404 but makes admin-added locations 404 until the next build, so we keep
  `true` and mark unknown slugs `noindex`. Revisit on the next major upgrade.
- **No generated OG images.** `@vercel/og` 14.2.35 throws `Invalid URL` while
  rendering on Node 26 in both `next dev` and `next start`, with and without an
  explicit font and with no remote image. Detail pages fall back to the location
  photograph as the social card.
- **Location photos are hotlinked from Wikimedia.** Mitigated rather than
  solved: stored URLs point at the `/thumb/` CDN, the optimiser generates a
  narrow set of widths and caches for 30 days, `sharp` does the encoding, and
  `PlaceImage` shows a placeholder if an image still fails. Self-hosting the
  images (Cloudinary or similar) remains the real fix and is needed anyway for
  galleries.
- **Rate limiting is in-memory.** `app/libs/rateLimit.ts` is a single-instance
  guard against casual spam; it resets on deploy and does not coordinate across
  serverless instances.
- **No test suite.** Verification is currently manual.

## Content and licensing notes

Descriptions, directions and shooting notes are written for Snapify. Location
names and coordinates are facts. Lead photographs come from Wikimedia Commons
under their respective licences and are recorded per record in
`sourceAttribution` — do not add images from other location directories, which
hold no right to sublicense the photographers' work.

Permit, fee and drone information is quasi-YMYL regulatory content. Verify
figures against the issuing authority (caa.lk, mfa.gov.lk, ccf.gov.lk,
galleheritage.gov.lk) before changing them, keep each guide's `reviewedOn` date
current, and describe an unconfirmed rule as unconfirmed rather than guessing.

## Deployment

Deploys as a standard Next.js application. Set every variable from
`.env.example` in your host's environment, then build with `npm run build` — it
runs `prisma generate` first. Make sure the deployment's IP range can reach your
MongoDB cluster, and that `NEXT_PUBLIC_SITE_URL` is the real public origin.

After the first deploy, submit the sitemap in Google Search Console.

Whenever the place count changes, re-sync the two generated mirrors of the
database — both fail silently rather than loudly if they go stale:

```shell
node --env-file=.env scripts/sync-hub-gate.mjs    # published-hub list in middleware.ts
node --env-file=.env scripts/generate-fixture.mjs # fallback array in app/data/publicSpaces.ts
```

`sync-hub-gate.mjs --check` is the CI-friendly form: it writes nothing and
exits non-zero on drift. Middleware runs on the edge and cannot query Prisma,
which is why the hub list has to be mirrored there at all — and it has already
gone stale once, redirecting `?area=Jaffna` to the generic index while a
working Jaffna hub sat one URL away.
