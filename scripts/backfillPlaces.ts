/**
 * One-time backfill for the structured fields added in Plan 3.1.
 *
 * MongoDB + Prisma has no migrations, so existing documents simply lack the new
 * keys and read as null. This derives city/district/province/category from the
 * data already present and fills them in. Safe to re-run: it only writes fields
 * that are still empty unless --force is passed.
 *
 *   npx tsx scripts/backfillPlaces.ts [--force] [--dry]
 */
import { PrismaClient } from "@prisma/client";
import { categoryForType, districtForCity } from "../app/libs/placeTaxonomy";
import { slugifyPlace } from "../app/data/publicSpaces";

const prisma = new PrismaClient();

const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry");

const parseCity = (label: string) => label.split(",").at(-1)?.trim() ?? label;
const parseProvince = (label: string) => label.split(",")[0]?.trim() ?? label;

async function main() {
   const spaces = await prisma.publicSpace.findMany();
   console.log(`Found ${spaces.length} places. force=${force} dry=${dryRun}\n`);

   let updated = 0;
   let skipped = 0;

   for (const space of spaces) {
      const needsBackfill =
         force || !space.city || !space.province || !space.district || !space.category;

      if (!needsBackfill) {
         skipped += 1;
         continue;
      }

      const city = parseCity(space.locationLabel);
      const province = parseProvince(space.locationLabel);
      const district = districtForCity(city);
      const category = categoryForType(space.type);

      const data = {
         city,
         citySlug: slugifyPlace(city),
         district,
         districtSlug: slugifyPlace(district),
         province,
         provinceSlug: slugifyPlace(province),
         category,
      };

      console.log(
         `${space.slug.padEnd(26)} ${city.padEnd(14)} ${district.padEnd(14)} ${province.padEnd(24)} ${category}`
      );

      if (!dryRun) {
         await prisma.publicSpace.update({ where: { id: space.id }, data });
      }
      updated += 1;
   }

   console.log(`\n${dryRun ? "Would update" : "Updated"} ${updated}, skipped ${skipped}.`);
}

main()
   .catch((error) => {
      console.error(error);
      process.exitCode = 1;
   })
   .finally(() => prisma.$disconnect());
