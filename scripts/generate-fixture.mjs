/**
 * Regenerates app/data/publicSpaces.ts from the live PublicSpace collection.
 *
 * Usage: node --env-file=.env scripts/generate-fixture.mjs
 *
 * The fixture is the fallback getPublicSpaces() serves when the database is
 * empty, and the source importInitialSpacesOnce() seeds a fresh database from.
 * Keeping it in step with the DB means a cold start reproduces production
 * rather than an older, smaller subset.
 *
 * Only the array body is generated; the exported type and the helper functions
 * below it are preserved verbatim from the existing file.
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync, writeFileSync } from "fs";

const FIXTURE = "app/data/publicSpaces.ts";
const IND = "   ";

const q = (s) => JSON.stringify(s);

/** Emits `key: value` lines, skipping anything null/undefined/empty. */
function field(key, value, depth = 2) {
   const pad = IND.repeat(depth);
   if (value === null || value === undefined) return null;
   if (Array.isArray(value)) {
      if (value.length === 0) return null;
      const items = value.map((v) => `${pad}${IND}${typeof v === "number" ? v : q(v)},`);
      return `${pad}${key}: [\n${items.join("\n")}\n${pad}],`;
   }
   if (typeof value === "boolean" || typeof value === "number") {
      return `${pad}${key}: ${value},`;
   }
   const text = String(value);
   // Long strings go on their own continuation line, matching the hand-written
   // entries that preceded this generator.
   return text.length > 60
      ? `${pad}${key}:\n${pad}${IND}${q(text)},`
      : `${pad}${key}: ${q(text)},`;
}

const prisma = new PrismaClient();
const rows = await prisma.publicSpace.findMany({ orderBy: { createdAt: "asc" } });

const entries = rows.map((r) => {
   const lines = [
      field("id", r.slug),
      field("name", r.name),
      field("type", r.type),
      field("locationLabel", r.locationLabel),
      `${IND.repeat(2)}latlng: [${r.latlng.join(", ")}],`,
      field("description", r.description),
      field("directions", r.directions),
      field("tips", r.tips),
      field("imageSrc", r.imageSrc),
      field("city", r.city),
      field("citySlug", r.citySlug),
      field("district", r.district),
      field("districtSlug", r.districtSlug),
      field("province", r.province),
      field("provinceSlug", r.provinceSlug),
      field("category", r.category),
      field("images", r.images),
      field("bestTimeOfDay", r.bestTimeOfDay),
      field("bestMonths", r.bestMonths),
      field("shootingNotes", r.shootingNotes),
      field("entryFee", r.entryFee),
      // isFree defaults true in the schema, so only emit the meaningful false.
      r.isFree === false ? field("isFree", false) : null,
      r.permitRequired === true ? field("permitRequired", true) : null,
      field("permitAuthority", r.permitAuthority),
      field("permitNotes", r.permitNotes),
      r.droneRule && r.droneRule !== "UNKNOWN" ? field("droneRule", r.droneRule) : null,
      field("droneNotes", r.droneNotes),
      field("openingHours", r.openingHours),
      r.tripodAllowed === null ? null : field("tripodAllowed", r.tripodAllowed),
   ].filter(Boolean);
   return `${IND}{\n${lines.join("\n")}\n${IND}},`;
});

const src = readFileSync(FIXTURE, "utf8");
const startMarker = "const publicSpaces: PublicSpace[] = [";
const start = src.indexOf(startMarker);
if (start === -1) throw new Error("could not locate the publicSpaces array");

// The array ends at the first "\n];" after the start marker.
const endIdx = src.indexOf("\n];", start);
if (endIdx === -1) throw new Error("could not locate the end of the publicSpaces array");

const header = src.slice(0, start + startMarker.length);
const footer = src.slice(endIdx + 3); // everything after "\n];"

writeFileSync(FIXTURE, `${header}\n${entries.join("\n")}\n];${footer}`, "utf8");

console.log(`wrote ${rows.length} entries to ${FIXTURE}`);
await prisma.$disconnect();
