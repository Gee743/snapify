/**
 * Rewrites stored Wikimedia image URLs to the /thumb/ CDN form at a fixed width.
 *
 * Why: several records were seeded with full-resolution originals (one is 4.1 MB).
 * Next's image optimizer downloads the whole original to produce each size
 * variant, which is slow and got us rate-limited (HTTP 429) by Wikimedia.
 * Thumbnails are roughly a tenth of the bytes and are already served from their
 * CDN edge.
 *
 * Every candidate URL is verified to return 200 before it is written, so a
 * failed conversion leaves the original in place rather than breaking the image.
 *
 *   npx tsx scripts/normalizeImages.ts [--dry] [--width 1280]
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry");
const widthArg = process.argv.indexOf("--width");
const WIDTH = widthArg > -1 ? Number(process.argv[widthArg + 1]) : 1280;

// Wikimedia asks for a descriptive User-Agent and returns 429 without one.
const UA = "Snapify/1.0 (https://snapify.lk; hello@snapify.lk) image-normalizer";

/**
 * /commons/a/a8/Name.jpg            -> /commons/thumb/a/a8/Name.jpg/1280px-Name.jpg
 * /commons/thumb/a/a8/Name.jpg/900px-Name.jpg -> ...1280px-Name.jpg (re-width)
 * Returns null when the URL is not a convertible Wikimedia commons file.
 */
export const toThumbUrl = (raw: string, width = WIDTH): string | null => {
   let url: URL;
   try {
      url = new URL(raw);
   } catch {
      return null;
   }
   if (url.hostname !== "upload.wikimedia.org") return null;

   const parts = url.pathname.split("/").filter(Boolean);
   // ["wikipedia", "commons", ...]
   if (parts[0] !== "wikipedia") return null;
   const project = parts[1];
   // Only /commons/ is reliably freely licensed; /en/ holds non-free fair use.
   if (project !== "commons") return null;

   const rest = parts.slice(2);
   const isThumb = rest[0] === "thumb";
   const segments = isThumb ? rest.slice(1) : rest;

   // Expect [hash1, hash2, filename, (existing thumb name)]
   const [hash1, hash2, filename] = segments;
   if (!hash1 || !hash2 || !filename) return null;

   const thumbName = `${width}px-${filename}`;
   const candidate = `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash1}/${hash2}/${filename}/${thumbName}`;

   return candidate === raw ? null : candidate;
};

const resolves = async (url: string) => {
   try {
      const response = await fetch(url, {
         method: "HEAD",
         redirect: "follow",
         headers: { "User-Agent": UA },
      });
      return response.ok;
   } catch {
      return false;
   }
};

async function main() {
   const spaces = await prisma.publicSpace.findMany({
      select: { id: true, slug: true, imageSrc: true },
   });
   console.log(`Checking ${spaces.length} places at ${WIDTH}px. dry=${dryRun}\n`);

   let converted = 0;
   let skipped = 0;
   let failed = 0;

   for (const space of spaces) {
      const candidate = toThumbUrl(space.imageSrc);
      if (!candidate) {
         skipped += 1;
         continue;
      }

      if (!(await resolves(candidate))) {
         console.log(`  FAIL    ${space.slug} (thumb did not resolve, leaving original)`);
         failed += 1;
         continue;
      }

      console.log(`  CONVERT ${space.slug}`);
      if (!dryRun) {
         await prisma.publicSpace.update({
            where: { id: space.id },
            data: { imageSrc: candidate },
         });
      }
      converted += 1;

      // Be a good citizen: this is the behaviour that got us throttled.
      await new Promise((resolve) => setTimeout(resolve, 250));
   }

   console.log(
      `\n${dryRun ? "Would convert" : "Converted"} ${converted}, already thumbnails ${skipped}, failed ${failed}.`
   );
}

main()
   .catch((error) => {
      console.error(error);
      process.exitCode = 1;
   })
   .finally(() => prisma.$disconnect());
