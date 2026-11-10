/**
 * Seeds the batched place JSON into MongoDB.
 *
 * Usage: node --env-file=.env scripts/seed-places.mjs
 *
 * Place names and locations were used as research leads; all descriptive copy
 * here is original and every lead image is a CC-licensed Wikimedia Commons file
 * whose filename was cross-checked against the place name.
 */
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const slugify = (value) =>
   value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

const places = ["a", "b", "c"].flatMap((batch) =>
   JSON.parse(readFileSync(`scripts/places-batch-${batch}.json`, "utf8"))
);

const prisma = new PrismaClient();

let upserted = 0;
for (const place of places) {
   const { slug, city, district, province, ...rest } = place;

   const data = {
      ...rest,
      // locationLabel stays "<Province>, <City>" so the city-derived area chips
      // keep working for rows that predate the structured columns.
      locationLabel: `${province}, ${city}`,
      city,
      citySlug: slugify(city),
      district,
      districtSlug: slugify(district),
      province,
      provinceSlug: slugify(province),
      images: rest.images ?? [],
      bestTimeOfDay: rest.bestTimeOfDay ?? [],
      bestMonths: rest.bestMonths ?? [],
      isFree: rest.isFree ?? true,
      permitRequired: rest.permitRequired ?? false,
      droneRule: rest.droneRule ?? "UNKNOWN",
      status: "PUBLISHED",
      sourceAttribution: "Lead image from Wikimedia Commons.",
   };

   await prisma.publicSpace.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
   });
   upserted++;
}

console.log(`upserted: ${upserted}`);
console.log(`total rows: ${await prisma.publicSpace.count()}`);
await prisma.$disconnect();
