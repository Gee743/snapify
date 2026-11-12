import {
   STUDIO_AMENITIES,
   STUDIO_STATUSES,
   STUDIO_TYPES,
   StudioStatusValue,
   StudioTypeValue,
} from "./studioTaxonomy";

/**
 * Validation for Studio writes, mirroring publicSpaceValidation.ts: every
 * optional field is absent-or-valid and never silently coerced, so a partial
 * admin payload cannot blank stored data and a bad value rejects the request.
 */
export interface StudioInput {
   slug: string;
   name: string;
   tagline: string;
   type: string;
   description: string;
   locationLabel: string;
   imageSrc: string;
   studioType: StudioTypeValue;
   latlng?: number[];
   images?: string[];
   currency?: string;
   hourlyRate?: number;
   halfDayRate?: number;
   fullDayRate?: number;
   minimumHours?: number;
   rateNotes?: string;
   capacity?: number;
   floorAreaSqft?: number;
   ceilingHeightFt?: number;
   amenities?: string[];
   equipment?: string[];
   availabilityNotes?: string;
   openingHours?: string;
   ownerName?: string;
   ownerEmail?: string;
   ownerPhone?: string;
   bookingNotes?: string;
   cancellationPolicy?: string;
   metaTitle?: string;
   metaDescription?: string;
   status?: StudioStatusValue;
}

/** Rates are whole rupees. The ceiling rejects a stray extra digit rather than
 *  publishing a ten-million-rupee hourly rate. */
const MAX_RATE = 10_000_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const isNonEmptyString = (value: unknown): value is string =>
   typeof value === "string" && value.trim().length > 0;

const isValidText = (value: unknown, maxLength: number): value is string =>
   isNonEmptyString(value) && value.trim().length <= maxLength;

const isLatitudeLongitude = (value: unknown): value is [number, number] =>
   Array.isArray(value) &&
   value.length === 2 &&
   typeof value[0] === "number" &&
   Number.isFinite(value[0]) &&
   value[0] >= -90 &&
   value[0] <= 90 &&
   typeof value[1] === "number" &&
   Number.isFinite(value[1]) &&
   value[1] >= -180 &&
   value[1] <= 180;

const isHttpsUrl = (value: string) => {
   try {
      return new URL(value).protocol === "https:";
   } catch {
      return false;
   }
};

export const parseStudioInput = (body: unknown): StudioInput | null => {
   if (!body || typeof body !== "object") return null;
   const value = body as Record<string, unknown>;

   if (
      !isValidText(value.slug, 120) ||
      !SLUG_PATTERN.test(value.slug) ||
      !isValidText(value.name, 160) ||
      !isValidText(value.tagline, 200) ||
      !isValidText(value.type, 100) ||
      !isValidText(value.description, 5000) ||
      !isValidText(value.locationLabel, 200) ||
      !isValidText(value.imageSrc, 2048) ||
      !isHttpsUrl(value.imageSrc.trim())
   ) {
      return null;
   }

   if (
      typeof value.studioType !== "string" ||
      !(STUDIO_TYPES as readonly string[]).includes(value.studioType)
   ) {
      return null;
   }

   // Sentinel so the happy path stays typed as `T | undefined`: absent means
   // "leave the stored value alone", INVALID means "reject the whole request".
   const INVALID = Symbol("invalid");

   const optionalText = (raw: unknown, maxLength: number) => {
      if (raw === undefined || raw === null || raw === "") return undefined;
      return isValidText(raw, maxLength) ? raw.trim() : INVALID;
   };

   /** Whole, non-negative and bounded. A numeric string is rejected: the admin
    *  form is responsible for sending real numbers. */
   const optionalInt = (raw: unknown, max: number) => {
      if (raw === undefined || raw === null || raw === "") return undefined;
      if (typeof raw !== "number" || !Number.isInteger(raw) || raw < 0 || raw > max) {
         return INVALID;
      }
      return raw;
   };

   const optionalStringList = (
      raw: unknown,
      maxItems: number,
      maxLength: number,
      allowed?: readonly string[]
   ) => {
      if (raw === undefined) return undefined;
      if (!Array.isArray(raw) || raw.length > maxItems) return INVALID;
      const cleaned: string[] = [];
      for (const entry of raw) {
         if (!isValidText(entry, maxLength)) return INVALID;
         const trimmed = entry.trim();
         if (allowed && !allowed.includes(trimmed)) return INVALID;
         cleaned.push(trimmed);
      }
      return Array.from(new Set(cleaned));
   };

   const rateNotes = optionalText(value.rateNotes, 500);
   const availabilityNotes = optionalText(value.availabilityNotes, 1000);
   const openingHours = optionalText(value.openingHours, 300);
   const ownerName = optionalText(value.ownerName, 160);
   const ownerPhone = optionalText(value.ownerPhone, 40);
   const bookingNotes = optionalText(value.bookingNotes, 2000);
   const cancellationPolicy = optionalText(value.cancellationPolicy, 2000);
   const metaTitle = optionalText(value.metaTitle, 200);
   const metaDescription = optionalText(value.metaDescription, 400);
   const currency = optionalText(value.currency, 8);

   const ownerEmailText = optionalText(value.ownerEmail, 254);
   const ownerEmail =
      typeof ownerEmailText === "string" && !EMAIL_PATTERN.test(ownerEmailText)
         ? INVALID
         : ownerEmailText;

   const hourlyRate = optionalInt(value.hourlyRate, MAX_RATE);
   const halfDayRate = optionalInt(value.halfDayRate, MAX_RATE);
   const fullDayRate = optionalInt(value.fullDayRate, MAX_RATE);
   const minimumHours = optionalInt(value.minimumHours, 24);
   const capacity = optionalInt(value.capacity, 10_000);
   const floorAreaSqft = optionalInt(value.floorAreaSqft, 1_000_000);
   const ceilingHeightFt = optionalInt(value.ceilingHeightFt, 200);

   const amenities = optionalStringList(value.amenities, 40, 60, STUDIO_AMENITIES);
   const equipment = optionalStringList(value.equipment, 40, 200);
   const images = optionalStringList(value.images, 24, 2048);

   const optionals: unknown[] = [
      rateNotes,
      availabilityNotes,
      openingHours,
      ownerName,
      ownerEmail,
      ownerPhone,
      bookingNotes,
      cancellationPolicy,
      metaTitle,
      metaDescription,
      currency,
      hourlyRate,
      halfDayRate,
      fullDayRate,
      minimumHours,
      capacity,
      floorAreaSqft,
      ceilingHeightFt,
      amenities,
      equipment,
      images,
   ];
   if (optionals.some((entry) => entry === INVALID)) return null;

   // Gallery images go through the same https gate as the hero, since they are
   // rendered by next/image against the allow-list in next.config.js.
   if (Array.isArray(images) && !images.every(isHttpsUrl)) return null;

   let latlng: number[] | undefined;
   if (value.latlng !== undefined && value.latlng !== null) {
      // An empty array is how the admin form says "publish no pin".
      if (Array.isArray(value.latlng) && value.latlng.length === 0) {
         latlng = [];
      } else if (isLatitudeLongitude(value.latlng)) {
         latlng = value.latlng;
      } else {
         return null;
      }
   }

   let status: StudioStatusValue | undefined;
   if (value.status !== undefined) {
      if (
         typeof value.status !== "string" ||
         !(STUDIO_STATUSES as readonly string[]).includes(value.status)
      ) {
         return null;
      }
      status = value.status as StudioStatusValue;
   }

   return {
      slug: value.slug,
      name: value.name.trim(),
      tagline: value.tagline.trim(),
      type: value.type.trim(),
      description: value.description.trim(),
      locationLabel: value.locationLabel.trim(),
      imageSrc: value.imageSrc.trim(),
      studioType: value.studioType as StudioTypeValue,
      ...(latlng !== undefined && { latlng }),
      ...(images !== undefined && { images: images as string[] }),
      ...(currency !== undefined && { currency: (currency as string).toUpperCase() }),
      ...(hourlyRate !== undefined && { hourlyRate: hourlyRate as number }),
      ...(halfDayRate !== undefined && { halfDayRate: halfDayRate as number }),
      ...(fullDayRate !== undefined && { fullDayRate: fullDayRate as number }),
      ...(minimumHours !== undefined && { minimumHours: minimumHours as number }),
      ...(rateNotes !== undefined && { rateNotes: rateNotes as string }),
      ...(capacity !== undefined && { capacity: capacity as number }),
      ...(floorAreaSqft !== undefined && { floorAreaSqft: floorAreaSqft as number }),
      ...(ceilingHeightFt !== undefined && { ceilingHeightFt: ceilingHeightFt as number }),
      ...(amenities !== undefined && { amenities: amenities as string[] }),
      ...(equipment !== undefined && { equipment: equipment as string[] }),
      ...(availabilityNotes !== undefined && { availabilityNotes: availabilityNotes as string }),
      ...(openingHours !== undefined && { openingHours: openingHours as string }),
      ...(ownerName !== undefined && { ownerName: ownerName as string }),
      ...(ownerEmail !== undefined && { ownerEmail: ownerEmail as string }),
      ...(ownerPhone !== undefined && { ownerPhone: ownerPhone as string }),
      ...(bookingNotes !== undefined && { bookingNotes: bookingNotes as string }),
      ...(cancellationPolicy !== undefined && { cancellationPolicy: cancellationPolicy as string }),
      ...(metaTitle !== undefined && { metaTitle: metaTitle as string }),
      ...(metaDescription !== undefined && { metaDescription: metaDescription as string }),
      ...(status !== undefined && { status }),
   };
};

/** Validation for the public studio enquiry form. Unauthenticated, so
 *  length-capped and shape-checked like the other public lead endpoints. */
export interface StudioInquiryInput {
   spaceSlug: string;
   spaceName?: string;
   name: string;
   email: string;
   phone?: string;
   shootDate?: Date;
   crewSize?: number;
   message?: string;
}

export const parseStudioInquiry = (body: unknown): StudioInquiryInput | null => {
   if (!body || typeof body !== "object") return null;
   const value = body as Record<string, unknown>;

   if (!isValidText(value.spaceSlug, 120) || !SLUG_PATTERN.test(value.spaceSlug.trim())) {
      return null;
   }
   if (!isValidText(value.name, 120) || !isValidText(value.email, 254)) return null;

   const email = value.email.trim();
   if (!EMAIL_PATTERN.test(email)) return null;

   const phone =
      value.phone === undefined || value.phone === null || value.phone === ""
         ? undefined
         : isValidText(value.phone, 40)
           ? value.phone.trim()
           : null;
   if (phone === null) return null;

   const message =
      value.message === undefined || value.message === null || value.message === ""
         ? undefined
         : isValidText(value.message, 2000)
           ? value.message.trim()
           : null;
   if (message === null) return null;

   const spaceName =
      value.spaceName === undefined || value.spaceName === null || value.spaceName === ""
         ? undefined
         : isValidText(value.spaceName, 200)
           ? value.spaceName.trim()
           : null;
   if (spaceName === null) return null;

   let crewSize: number | undefined;
   if (value.crewSize !== undefined && value.crewSize !== null && value.crewSize !== "") {
      const raw = typeof value.crewSize === "string" ? Number(value.crewSize) : value.crewSize;
      if (typeof raw !== "number" || !Number.isInteger(raw) || raw < 1 || raw > 1000) return null;
      crewSize = raw;
   }

   // A shoot date is a hint for the owner, not a booking. Parsed leniently but
   // rejected outright if unparseable, so the inbox never shows "Invalid Date".
   let shootDate: Date | undefined;
   if (value.shootDate !== undefined && value.shootDate !== null && value.shootDate !== "") {
      if (typeof value.shootDate !== "string") return null;
      const parsed = new Date(value.shootDate);
      if (Number.isNaN(parsed.getTime())) return null;
      shootDate = parsed;
   }

   return {
      spaceSlug: value.spaceSlug.trim(),
      name: value.name.trim(),
      email,
      ...(spaceName && { spaceName }),
      ...(phone && { phone }),
      ...(crewSize !== undefined && { crewSize }),
      ...(shootDate && { shootDate }),
      ...(message && { message }),
   };
};
