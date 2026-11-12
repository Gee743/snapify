import prisma from "@/app/libs/prismadb";
import { StudioTypeValue } from "@/app/libs/studioTaxonomy";

/**
 * Studio reads.
 *
 * Unlike getPublicSpaces there is no fixture fallback. Public spaces ship with
 * a seeded catalogue; studios are real businesses that opt in, so an empty
 * database means genuinely zero listings and the pages render their empty
 * state. Inventing placeholder studios would publish fictional businesses.
 */

export interface Studio {
   id: string;
   slug: string;
   name: string;
   tagline: string;
   type: string;
   description: string;
   locationLabel: string;
   city?: string | null;
   citySlug?: string | null;
   district?: string | null;
   districtSlug?: string | null;
   province?: string | null;
   provinceSlug?: string | null;
   latlng: number[];
   imageSrc: string;
   images: string[];
   studioType: string;
   currency: string;
   hourlyRate?: number | null;
   halfDayRate?: number | null;
   fullDayRate?: number | null;
   minimumHours?: number | null;
   rateNotes?: string | null;
   capacity?: number | null;
   floorAreaSqft?: number | null;
   ceilingHeightFt?: number | null;
   amenities: string[];
   equipment: string[];
   availabilityNotes?: string | null;
   openingHours?: string | null;
   bookingNotes?: string | null;
   cancellationPolicy?: string | null;
   metaTitle?: string | null;
   metaDescription?: string | null;
   status: string;
}

type StudioRow = Omit<Studio, "images" | "amenities" | "equipment" | "latlng" | "currency"> & {
   images?: string[];
   amenities?: string[];
   equipment?: string[];
   latlng?: number[];
   currency?: string | null;
   ownerName?: string | null;
   ownerEmail?: string | null;
   ownerPhone?: string | null;
};

/**
 * Owner contact is deliberately dropped here rather than filtered in each
 * component. Enquiries route through /api/studio-inquiries, so an email or
 * phone number must never reach the client bundle to be scraped off the page.
 */
const toStudio = (row: StudioRow): Studio => ({
   id: row.id,
   slug: row.slug,
   name: row.name,
   tagline: row.tagline,
   type: row.type,
   description: row.description,
   locationLabel: row.locationLabel,
   city: row.city,
   citySlug: row.citySlug,
   district: row.district,
   districtSlug: row.districtSlug,
   province: row.province,
   provinceSlug: row.provinceSlug,
   latlng: row.latlng ?? [],
   imageSrc: row.imageSrc,
   images: row.images ?? [],
   studioType: row.studioType,
   currency: row.currency ?? "LKR",
   hourlyRate: row.hourlyRate,
   halfDayRate: row.halfDayRate,
   fullDayRate: row.fullDayRate,
   minimumHours: row.minimumHours,
   rateNotes: row.rateNotes,
   capacity: row.capacity,
   floorAreaSqft: row.floorAreaSqft,
   ceilingHeightFt: row.ceilingHeightFt,
   amenities: row.amenities ?? [],
   equipment: row.equipment ?? [],
   availabilityNotes: row.availabilityNotes,
   openingHours: row.openingHours,
   bookingNotes: row.bookingNotes,
   cancellationPolicy: row.cancellationPolicy,
   metaTitle: row.metaTitle,
   metaDescription: row.metaDescription,
   status: row.status,
});

/**
 * Published studios only. A PENDING studio is an owner submission that has not
 * been reviewed, and must not appear on a public page, in the sitemap, or in
 * generateStaticParams.
 */
export const getStudios = async (): Promise<Studio[]> => {
   try {
      const rows = await prisma.studio.findMany({
         where: { status: "PUBLISHED" },
         orderBy: { createdAt: "desc" },
      });
      return rows.map(toStudio);
   } catch {
      // A studio page must not take the whole site down if Mongo is briefly
      // unreachable -- it renders the empty state instead, as it would with
      // genuinely zero listings.
      return [];
   }
};

export const getStudioBySlug = async (slug: string): Promise<Studio | undefined> => {
   try {
      const row = await prisma.studio.findUnique({ where: { slug } });
      if (!row || row.status !== "PUBLISHED") return undefined;
      return toStudio(row);
   } catch {
      return undefined;
   }
};

/** Owner contact for the enquiry notification path, which runs server-side
 *  only. Separate from getStudioBySlug so contact details cannot leak into a
 *  page payload by accident. */
export const getStudioOwnerContact = async (slug: string) => {
   try {
      return await prisma.studio.findUnique({
         where: { slug },
         select: { slug: true, name: true, ownerName: true, ownerEmail: true, ownerPhone: true },
      });
   } catch {
      return null;
   }
};

/** Shape the admin dashboard reads: every editable column, timestamps as ISO
 *  strings, and owner contact included since /admin is authenticated. */
export const toStudioRecord = (
   row: StudioRow & { createdAt: Date; updatedAt: Date }
) => ({
   ...row,
   latlng: row.latlng ?? [],
   images: row.images ?? [],
   amenities: row.amenities ?? [],
   equipment: row.equipment ?? [],
   currency: row.currency ?? "LKR",
   createdAt: row.createdAt.toISOString(),
   updatedAt: row.updatedAt.toISOString(),
});

/** Lowest published rate, used for sorting and the "from" price on a card.
 *  Null rates mean "on request" and sort last rather than as free. */
export const lowestRate = (studio: Studio): number | null => {
   const rates = [studio.hourlyRate, studio.halfDayRate, studio.fullDayRate].filter(
      (rate): rate is number => typeof rate === "number" && rate > 0
   );
   return rates.length ? Math.min(...rates) : null;
};

export const studioCity = (studio: Studio) =>
   studio.city?.trim() || studio.locationLabel.split(",").at(-1)?.trim() || studio.locationLabel;

export const studioProvince = (studio: Studio) =>
   studio.province?.trim() || studio.locationLabel.split(",")[0]?.trim() || studio.locationLabel;

export const isStudioType = (value: string): value is StudioTypeValue =>
   ["DAYLIGHT", "BLACKOUT", "CYCLORAMA", "VILLA", "ROOFTOP", "WAREHOUSE", "HERITAGE", "EVENT_VENUE"].includes(
      value
   );
