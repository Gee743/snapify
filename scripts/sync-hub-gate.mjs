/**
 * Rewrites the PUBLISHED_CITY_HUBS mirror in middleware.ts from the database.
 *
 *   node --env-file=.env scripts/sync-hub-gate.mjs          # write
 *   node --env-file=.env scripts/sync-hub-gate.mjs --check  # verify only
 *
 * Middleware runs on the edge and cannot reach Prisma, so the list of cities
 * that clear MIN_PLACES_FOR_HUB has to be duplicated there. Hand-maintaining
 * it failed once already — the list still read three cities after the
 * catalogue grew to seven, so ?area=Jaffna redirected to the generic index
 * while a working Jaffna hub sat one URL away. Generating it makes the
 * duplication safe; --check in CI makes drift loud.
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync, writeFileSync } from "fs";

const MIN_PLACES_FOR_HUB = 3;
const FILE = "middleware.ts";
const START = "// hub-gate:start";
const END = "// hub-gate:end";

const slugify = (value) =>
   value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

const cityOf = (row) => row.city?.trim() || row.locationLabel.split(",").at(-1)?.trim() || "";

const prisma = new PrismaClient();
const rows = await prisma.publicSpace.findMany();
await prisma.$disconnect();

const counts = new Map();
for (const row of rows) {
   const slug = slugify(cityOf(row));
   if (slug) counts.set(slug, (counts.get(slug) ?? 0) + 1);
}

const qualifying = [...counts.entries()]
   .filter(([, count]) => count >= MIN_PLACES_FOR_HUB)
   .map(([slug]) => slug)
   .sort();

const block = [
   START,
   "const PUBLISHED_CITY_HUBS = new Set([",
   ...qualifying.map((slug) => `   ${JSON.stringify(slug)},`),
   "]);",
   END,
].join("\n");

const source = readFileSync(FILE, "utf8");
const startIdx = source.indexOf(START);
const endIdx = source.indexOf(END);
if (startIdx === -1 || endIdx === -1) {
   console.error(`${FILE}: missing ${START} / ${END} markers`);
   process.exit(1);
}

const next = source.slice(0, startIdx) + block + source.slice(endIdx + END.length);
const unchanged = next === source;

console.log(`qualifying cities (>=${MIN_PLACES_FOR_HUB} places): ${qualifying.join(", ") || "(none)"}`);

if (process.argv.includes("--check")) {
   console.log(unchanged ? "middleware.ts is in sync." : "DRIFT: middleware.ts is stale — run without --check.");
   process.exit(unchanged ? 0 : 1);
}

if (unchanged) {
   console.log("middleware.ts already in sync; nothing written.");
} else {
   writeFileSync(FILE, next, "utf8");
   console.log("middleware.ts updated.");
}
