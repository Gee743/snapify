# Snapify

> Places to shoot in Sri Lanka, with the access detail other directories leave out.

Snapify is a directory for Sri Lanka's photography and filming community. It
lists public places to shoot — beaches, viewpoints, waterfalls, temples, streets
— and for each one carries the information that actually decides whether a shoot
happens: entry fees, which of the six permitting authorities applies, whether
drones are allowed, whether a tripod needs its own permit, and the golden hour
computed for that specific location.

Paid, bookable locations are next; the owner waitlist is live at
`/list-your-space`.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma and MongoDB.

## Features

- **34 public locations** at `/community/<slug>`, each with directions, shooting
  tips, permit and drone rules, computed sunrise/sunset/golden hour, and the four
  nearest other places.
- **Browse by area** at `/photo-spots` — hub pages by city, district, province
  and category. A hub is only published once it has at least
  `MIN_PLACES_FOR_HUB` (3) places; anything thinner returns 404 rather than
  shipping a near-empty page.
- **Three cornerstone guides** at `/guides` covering drone law, the permit
  landscape, and which coast is shootable in which month. Each carries a visible
  last-reviewed date and its sources.
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
npx tsx scripts/seedLandmarks.ts    # 11 iconic landmarks
npx tsx scripts/seedAccessData.ts   # permit/fee/drone data
npx tsx scripts/backfillPlaces.ts   # derive city/district/province/category
```

The seed scripts are idempotent — `seedLandmarks` skips places that already
exist, and `backfillPlaces` only writes fields that are still empty unless you
pass `--force`. All three accept `--dry` to preview.

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

Useful scripts:

| script | purpose |
| :----- | :------ |
| `scripts/backfillPlaces.ts` | Derive structured location + category for existing rows |
| `scripts/seedLandmarks.ts` | Add the iconic landmark locations |
| `scripts/seedAccessData.ts` | Populate permit / fee / drone fields |
| `scripts/checkHubGate.ts` | Report drift between the published-hub list in `middleware.ts` and the database |

## Project structure

```
app/
  actions/        Server-side data fetchers
  admin/          Admin dashboard route
  api/            Route handlers (admin CRUD, leads, newsletter, register)
  community/      Location directory and detail pages
  components/     UI — navbar, modals, cards, hub page, access/timing panels
  data/           Seed locations and guide content
  guides/         Cornerstone guides
  libs/           Prisma client, admin auth, validation, hubs, sun times, taxonomy
  photo-spots/    pSEO hub pages (city, district, province, category)
middleware.ts     Canonicalises legacy ?area= URLs
prisma/           Prisma schema (MongoDB)
scripts/          One-off seed, backfill and consistency scripts
```

## Data model

| Model | Purpose |
| :---- | :------ |
| `PublicSpace` | A location, keyed by URL `slug`. Carries structured location (city/district/province + slugs), a `category` enum, access fields (fees, permits, `droneRule`), timing fields and a submission `status` |
| `PublicSpaceBootstrap` | One-time marker for the seed import |
| `SpaceOwnerLead` | Owner waitlist and place submissions |
| `SpaceInquiry` | Enquiries about a paid space (model ready, UI pending) |
| `NewsletterSubscriber` | Footer email capture |
| `User` / `Account` | NextAuth accounts |

`locationLabel` is stored as `"Province, City"`. Read city and province through
`getPublicSpaceCity` / `getPublicSpaceProvince` rather than parsing it — the two
are easy to transpose, and every hub URL, breadcrumb and JSON-LD address depends
on telling them apart.

## Routes

### Pages

| Route | Access | Description |
| :---- | :----- | :---------- |
| `/` | Public | Landing page, guides strip and location grid |
| `/community` | Public | Full location directory |
| `/community/[spaceId]` | Public | Location detail — access, timing, map, nearby |
| `/photo-spots` | Public | Browse index for all hub tiers |
| `/photo-spots/[city]` | Public | City hub (published tiers only) |
| `/photo-spots/district/[district]` | Public | District hub |
| `/photo-spots/province/[province]` | Public | Province hub |
| `/photo-spots/category/[category]` | Public | Category hub |
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
| `GET`/`POST`/`DELETE /api/admin/session` | Admin session |
| `GET`/`POST /api/admin/public-spaces` | List and create locations |
| `PUT`/`DELETE /api/admin/public-spaces/[slug]` | Update and delete a location |

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

After the first deploy: submit the sitemap in Google Search Console, and if the
place count changes enough to cross a hub threshold, run
`npx tsx scripts/checkHubGate.ts` and update the list in `middleware.ts`.
