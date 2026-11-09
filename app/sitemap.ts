import type { MetadataRoute } from "next";
import prisma from "@/app/libs/prismadb";
import { getPublicSpaces } from "@/app/actions/getPublicSpaces";
import { SITE_URL } from "@/app/libs/site";

export const revalidate = 3600;

/**
 * toPublicSpace() drops createdAt/updatedAt, so fetch the timestamps separately
 * to get a real lastModified instead of "now" for every URL.
 */
const getLastModifiedBySlug = async () => {
   try {
      const rows = await prisma.publicSpace.findMany({
         select: { slug: true, updatedAt: true },
      });
      return new Map(rows.map((row) => [row.slug, row.updatedAt]));
   } catch {
      // Sitemap generation must not fail the build if the DB is unreachable.
      return new Map<string, Date>();
   }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const [spaces, lastModifiedBySlug] = await Promise.all([
      getPublicSpaces(),
      getLastModifiedBySlug(),
   ]);
   const now = new Date();

   return [
      {
         url: `${SITE_URL}/`,
         lastModified: now,
         changeFrequency: "weekly",
         priority: 1,
      },
      {
         url: `${SITE_URL}/community`,
         lastModified: now,
         changeFrequency: "weekly",
         priority: 0.9,
      },
      ...spaces.map((space) => ({
         url: `${SITE_URL}/community/${space.id}`,
         lastModified: lastModifiedBySlug.get(space.id) ?? now,
         changeFrequency: "monthly" as const,
         priority: 0.8,
      })),
   ];
}
