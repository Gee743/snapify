import prisma from "@/app/libs/prismadb";
import publicSpaces, {
   PublicSpace,
   getPublicSpaceCity,
   getPublicSpaceProvince,
} from "@/app/data/publicSpaces";

type PublicSpaceRow = {
   slug: string;
   name: string;
   type: string;
   locationLabel: string;
   latlng: number[];
   description: string;
   directions: string;
   tips: string[];
   imageSrc: string;
   city?: string | null;
   citySlug?: string | null;
   district?: string | null;
   districtSlug?: string | null;
   province?: string | null;
   provinceSlug?: string | null;
   category?: string | null;
   images?: string[];
   bestTimeOfDay?: string[];
   bestMonths?: number[];
   shootingNotes?: string | null;
   entryFee?: string | null;
   isFree?: boolean;
   permitRequired?: boolean;
   permitAuthority?: string | null;
   permitNotes?: string | null;
   droneRule?: string | null;
   droneNotes?: string | null;
   openingHours?: string | null;
   tripodAllowed?: boolean | null;
};

const toPublicSpace = (space: PublicSpaceRow): PublicSpace => ({
   id: space.slug,
   name: space.name,
   type: space.type,
   locationLabel: space.locationLabel,
   latlng: space.latlng,
   description: space.description,
   directions: space.directions,
   tips: space.tips,
   imageSrc: space.imageSrc,
   city: space.city,
   citySlug: space.citySlug,
   district: space.district,
   districtSlug: space.districtSlug,
   province: space.province,
   provinceSlug: space.provinceSlug,
   category: space.category,
   images: space.images ?? [],
   bestTimeOfDay: space.bestTimeOfDay ?? [],
   bestMonths: space.bestMonths ?? [],
   shootingNotes: space.shootingNotes,
   entryFee: space.entryFee,
   isFree: space.isFree ?? true,
   permitRequired: space.permitRequired ?? false,
   permitAuthority: space.permitAuthority,
   permitNotes: space.permitNotes,
   droneRule: space.droneRule,
   droneNotes: space.droneNotes,
   openingHours: space.openingHours,
   tripodAllowed: space.tripodAllowed,
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
