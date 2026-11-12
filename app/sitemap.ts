import type { MetadataRoute } from "next";
import prisma from "@/app/libs/prismadb";
import { getPublicSpaces } from "@/app/actions/getPublicSpaces";
import { getStudios } from "@/app/actions/getStudios";
import { getAllPublishedHubPaths } from "@/app/libs/hubs";
import guides from "@/app/data/guides";
import { SITE_URL } from "@/app/libs/site";
import { STUDIO_TYPES, STUDIO_TYPE_SLUGS } from "@/app/libs/studioTaxonomy";

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

/** Same reasoning as getLastModifiedBySlug: toStudio drops the timestamps, so
 *  read them separately rather than stamping every studio URL with "now". */
const getStudioLastModified = async () => {
   try {
      const rows = await prisma.studio.findMany({
         where: { status: "PUBLISHED" },
         select: { slug: true, updatedAt: true },
      });
      return new Map(rows.map((row) => [row.slug, row.updatedAt]));
   } catch {
      return new Map<string, Date>();
   }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const [spaces, lastModifiedBySlug, hubs, studios, studioLastModified] = await Promise.all([
      getPublicSpaces(),
      getLastModifiedBySlug(),
      getAllPublishedHubPaths(),
      getStudios(),
      getStudioLastModified(),
   ]);
   const now = new Date();

   // Type hubs are only worth submitting once they have something to show; an
   // empty hub carries noindex, and listing it here would contradict that.
   const populatedTypes = new Set(studios.map((studio) => studio.studioType));

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
      {
         url: `${SITE_URL}/photo-spots`,
         lastModified: now,
         changeFrequency: "weekly",
         priority: 0.9,
      },
      // Cornerstone guides are the backlink targets and rank for informational
      // head terms the hub pages cannot.
      {
         url: `${SITE_URL}/guides`,
         lastModified: now,
         changeFrequency: "monthly",
         priority: 0.8,
      },
      ...guides.map((guide) => ({
         url: `${SITE_URL}/guides/${guide.slug}`,
         lastModified: new Date(guide.reviewedOn),
         changeFrequency: "monthly" as const,
         priority: 0.85,
      })),
      ...["/about", "/contact", "/submit", "/list-your-space", "/privacy"].map((path) => ({
         url: `${SITE_URL}${path}`,
         lastModified: now,
         changeFrequency: "yearly" as const,
         priority: path === "/privacy" ? 0.2 : 0.5,
      })),
      // Hub pages rank for the "photo spots in X" queries, so they sit above
      // individual places in priority.
      ...hubs.map((hub) => ({
         url: `${SITE_URL}${hub.path}`,
         lastModified: now,
         changeFrequency: "weekly" as const,
         priority: 0.85,
      })),
      ...spaces.map((space) => ({
         url: `${SITE_URL}/community/${space.id}`,
         lastModified: lastModifiedBySlug.get(space.id) ?? now,
         changeFrequency: "monthly" as const,
         priority: 0.8,
      })),
      // The studios index stays in the sitemap even at zero listings: it is a
      // real page that explains the offer and recruits owners.
      {
         url: `${SITE_URL}/studios`,
         lastModified: now,
         changeFrequency: "weekly" as const,
         priority: 0.9,
      },
      ...STUDIO_TYPES.filter((type) => populatedTypes.has(type)).map((type) => ({
         url: `${SITE_URL}/studios/type/${STUDIO_TYPE_SLUGS[type]}`,
         lastModified: now,
         changeFrequency: "weekly" as const,
         priority: 0.85,
      })),
      ...studios.map((studio) => ({
         url: `${SITE_URL}/studios/${studio.slug}`,
         lastModified: studioLastModified.get(studio.slug) ?? now,
         changeFrequency: "weekly" as const,
         // Above a public space: a bookable listing is a commercial page whose
         // rates and availability change more often.
         priority: 0.85,
      })),
   ];
}
