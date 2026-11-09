import prisma from "@/app/libs/prismadb";
import publicSpaces, {
   PublicSpace,
   getPublicSpaceCity,
   getPublicSpaceProvince,
} from "@/app/data/publicSpaces";

const toPublicSpace = (space: {
   slug: string;
   name: string;
   type: string;
   locationLabel: string;
   latlng: number[];
   description: string;
   directions: string;
   tips: string[];
   imageSrc: string;
}): PublicSpace => ({
   id: space.slug,
   name: space.name,
   type: space.type,
   locationLabel: space.locationLabel,
   latlng: space.latlng,
   description: space.description,
   directions: space.directions,
   tips: space.tips,
   imageSrc: space.imageSrc,
});

export const getPublicSpaces = async () => {
   const [spaces, bootstrap] = await Promise.all([
      prisma.publicSpace.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.publicSpaceBootstrap.findUnique({
         where: { key: "initial-public-spaces-imported" },
      }),
   ]);
   if (spaces.length > 0) return spaces.map(toPublicSpace);
   return bootstrap?.completed ? [] : publicSpaces;
};

export const getPublicSpaceBySlug = async (slug: string) => {
   const space = await prisma.publicSpace.findUnique({ where: { slug } });
   if (space) return toPublicSpace(space);

   const [hasStoredSpaces, bootstrap] = await Promise.all([
      prisma.publicSpace.count(),
      prisma.publicSpaceBootstrap.findUnique({
         where: { key: "initial-public-spaces-imported" },
      }),
   ]);
   return hasStoredSpaces > 0 || bootstrap?.completed
      ? undefined
      : publicSpaces.find((legacySpace) => legacySpace.id === slug);
};

/** Distinct cities, for the area filter. Reuses the shared helper rather than
 *  re-implementing the locationLabel parse. */
export const getPublicSpaceAreas = async () =>
   Array.from(new Set((await getPublicSpaces()).map(getPublicSpaceCity))).sort();

/** Distinct provinces, for the province hubs in Plan 2.1. */
export const getPublicSpaceProvinces = async () =>
   Array.from(new Set((await getPublicSpaces()).map(getPublicSpaceProvince))).sort();

export const toPublicSpaceRecord = (space: {
   id: string;
   slug: string;
   name: string;
   type: string;
   locationLabel: string;
   latlng: number[];
   description: string;
   directions: string;
   tips: string[];
   imageSrc: string;
   createdAt: Date;
   updatedAt: Date;
}) => ({
   ...space,
   createdAt: space.createdAt.toISOString(),
   updatedAt: space.updatedAt.toISOString(),
});
