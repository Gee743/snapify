# Snapify

> Discover free public spaces for your next shoot.

Snapify helps photographers, videographers, and creators in Sri Lanka find
places to shoot. Today that means a curated, community-maintained directory of
**free public spaces** — parks, viewpoints, promenades, murals — with
directions, shooting tips, and a map pin for each one. Bookable paid
locations (studios, homes, unique venues) are built into the data model and
marked "coming soon" in the UI.

Built with Next.js 13 (App Router), TypeScript, Tailwind CSS, Prisma, MongoDB,
and NextAuth.

## Features

- **Free public spaces** — browse at `/` and `/community`, filter by area, and
  open any space at `/community/<slug>` for its description, directions, tips,
  and Leaflet map.
- **Admin dashboard** (`/admin`) — a password-protected area for the team to
  add, edit, and remove public spaces. On first load, the built-in seed spaces
  in `app/data/publicSpaces.ts` are imported into the database once, after
  which the database is the source of truth.
- **Accounts** — email/password registration plus Google and GitHub OAuth via
  NextAuth (JWT sessions).
- **Listings & hourly reservations** — authenticated users can create listings
  and book them in hourly slots (8:00–18:00). Overlapping and past slots are
  rejected server-side; non-adjacent hours are split into separate reservations.
- **Favorites, trips, properties, reservations** — per-user pages, protected by
  middleware.

## Tech stack

| Area     | Choice                                        |
| :------- | :-------------------------------------------- |
| Framework | Next.js 13.4 (App Router) + React 18          |
| Language | TypeScript                                     |
| Styling  | Tailwind CSS                                   |
| Database | MongoDB via Prisma                             |
| Auth     | NextAuth (credentials, Google, GitHub)         |
| Maps     | Leaflet / react-leaflet                        |
| Images   | Cloudinary (`next-cloudinary`)                 |
| State    | Zustand, react-hook-form, react-hot-toast      |

## Getting started

### Prerequisites

- Node.js 18 or newer
- A MongoDB database (Atlas or self-hosted — Prisma's MongoDB connector
  requires a replica set)

### Install

```shell
git clone <your-repo-url>
cd snapify
npm install
```

`postinstall` runs `prisma generate` automatically.

### Configure environment

Create a `.env` file in the project root:

```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

| Variable | Purpose |
| :------- | :------ |
| `DATABASE_URL` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth sign-in |
| `GITHUB_ID` / `GITHUB_SECRET` | GitHub OAuth sign-in |
| `NEXTAUTH_SECRET` | Signs NextAuth JWT sessions |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Shared credentials for `/admin` |
| `ADMIN_SESSION_SECRET` | Signs the admin session cookie — **at least 32 characters** |

`ADMIN_USERNAME` and `ADMIN_PASSWORD` are shared credentials for `/admin`. Keep
them private and configure them in your deployment environment. Generate a
separate random `ADMIN_SESSION_SECRET` (for example, `openssl rand -hex 32`) —
do not reuse `NEXTAUTH_SECRET`. If any of the three admin variables is missing
or the secret is too short, admin login is disabled and `/admin` returns a
"not configured" error rather than falling back to an open dashboard.

Remote image hosts are allow-listed in [next.config.js](next.config.js); add
any new image domain there.

### Set up the database

```shell
npx prisma db push
```

### Run

```shell
npm run dev
```

The app starts at http://localhost:3000.

On the first successful admin dashboard load, the built-in public spaces are
imported into the database once. From then on, the team can add, edit, and
remove public spaces at `/admin`; each one appears at `/community/<slug>`.

## Available commands

Run with `npm run [command]`.

| command | description                                        |
| :------ | :------------------------------------------------- |
| `dev`   | Starts a development instance of the app           |
| `build` | Generates the Prisma client and builds for production |
| `start` | Serves the production build                        |
| `lint`  | Runs ESLint via `next lint`                        |

## Project structure

```
app/
  actions/        Server-side data fetchers (listings, reservations, spaces)
  admin/          Admin dashboard route
  api/            Route handlers (listings, reservations, favorites, admin)
  community/      Public space browse + detail pages
  components/     UI — navbar, modals, inputs, listings, admin, community
  data/           Seed public spaces and Sri Lanka location list
  hooks/          Zustand stores and client hooks
  libs/           Prisma client, admin auth, validation, time-slot logic
  types/          Shared types (SafeUser, SafeListing, …)
pages/api/auth/   NextAuth catch-all handler
prisma/           Prisma schema (MongoDB)
```

## Data model

| Model | Purpose |
| :---- | :------ |
| `User` | Account, hashed password, favorite listing IDs |
| `Account` | OAuth provider links (NextAuth adapter) |
| `Listing` | A bookable location with a price and category |
| `Reservation` | An hourly booking of a listing by a user |
| `PublicSpace` | A free public space, keyed by a URL `slug` |
| `PublicSpaceBootstrap` | One-time marker for the seed-space import |

## Routes

### Pages

| Route | Access | Description |
| :---- | :----- | :---------- |
| `/` | Public | Landing page and free public space grid |
| `/community` | Public | Public space directory, filterable by `?area=` |
| `/community/[spaceId]` | Public | Space detail — directions, tips, map |
| `/listings/[listingId]` | Public | Listing detail with hourly booking |
| `/trips`, `/reservations`, `/properties`, `/favorites` | Signed in | Protected by [middleware.ts](middleware.ts) |
| `/admin` | Admin password | Public space management dashboard |

### API

| Route | Description |
| :---- | :---------- |
| `POST /api/register` | Create an account with email and password |
| `/api/auth/[...nextauth]` | NextAuth sign-in, sign-out, session |
| `POST /api/listings`, `DELETE /api/listings/[listingId]` | Create and delete listings |
| `POST /api/reservations`, `DELETE /api/reservations/[reservationId]` | Book and cancel slots |
| `POST`/`DELETE /api/favorites/[listingId]` | Add and remove favorites |
| `GET /api/public-spaces`, `GET /api/public-spaces/areas` | Read public spaces and their areas |
| `GET`/`POST`/`DELETE /api/admin/session` | Admin session check, login, logout |
| `GET`/`POST /api/admin/public-spaces` | List and create public spaces |
| `PUT`/`DELETE /api/admin/public-spaces/[slug]` | Update and delete a public space |

Admin write endpoints require a valid signed session cookie **and** a
same-origin request, and validate every field through
[app/libs/publicSpaceValidation.ts](app/libs/publicSpaceValidation.ts)
(slug format, coordinate ranges, length limits, HTTPS-only image URLs).

## Deployment

The app deploys as a standard Next.js application (Vercel or any Node host).
Set every variable from the `.env` table in your host's environment, then build
with `npm run build` — it runs `prisma generate` first. Make sure the
deployment's IP range can reach your MongoDB cluster.
