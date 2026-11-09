/**
 * Reports drift between the PUBLISHED_CITY_HUBS list hard-coded in
 * middleware.ts and what the database actually qualifies. Middleware runs on
 * the edge and cannot reach Prisma, so the list has to be mirrored -- this
 * makes the mirror checkable instead of a silent trap.
 *
 *   npx tsx scripts/checkHubGate.ts
 */
import io from "node:fs";
import { getPublishedHubs } from "../app/libs/hubs";

async function main() {
   const cities = (await getPublishedHubs("city")).map((hub) => hub.slug).sort();
   const source = io.readFileSync("middleware.ts", "utf8");
   const match = source.match(/PUBLISHED_CITY_HUBS = new Set\(\[([^\]]*)\]\)/);
   const listed = (match?.[1].match(/"([^"]+)"/g) ?? [])
      .map((entry) => entry.replace(/"/g, ""))
      .sort();

   const missing = cities.filter((slug) => !listed.includes(slug));
   const extra = listed.filter((slug) => !cities.includes(slug));

   console.log("qualifying in DB :", cities.join(", ") || "(none)");
   console.log("listed in middleware:", listed.join(", ") || "(none)");

   if (missing.length === 0 && extra.length === 0) {
      console.log("\nIn sync.");
      return;
   }
   if (missing.length) console.log("\nMISSING from middleware:", missing.join(", "));
   if (extra.length) console.log("STALE in middleware:", extra.join(", "));
   process.exitCode = 1;
}

main();
