export interface PublicSpaceInput {
   slug: string;
   name: string;
   type: string;
   locationLabel: string;
   latlng: number[];
   description: string;
   directions: string;
   tips: string[];
   imageSrc: string;
   // Access intelligence (Plan 3.2). All optional: existing admin clients that
   // do not send them keep working, and the fields stay undefined rather than
   // overwriting stored values with blanks.
   entryFee?: string;
   isFree?: boolean;
   permitRequired?: boolean;
   permitAuthority?: string;
   permitNotes?: string;
   droneRule?: DroneRuleValue;
   droneNotes?: string;
   openingHours?: string;
   tripodAllowed?: boolean;
   shootingNotes?: string;
   bestTimeOfDay?: string[];
   bestMonths?: number[];
}

export const DRONE_RULES = ["ALLOWED", "PERMIT_REQUIRED", "PROHIBITED", "UNKNOWN"] as const;
export type DroneRuleValue = (typeof DRONE_RULES)[number];

export const BEST_TIMES = [
   "sunrise",
   "golden-hour-am",
   "midday",
   "golden-hour-pm",
   "sunset",
   "blue-hour",
   "night",
] as const;

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

export const parsePublicSpaceInput = (body: unknown): PublicSpaceInput | null => {
   if (!body || typeof body !== "object") return null;
   const value = body as Record<string, unknown>;

   if (
      !isValidText(value.slug, 120) ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug) ||
      !isValidText(value.name, 160) ||
      !isValidText(value.type, 100) ||
      !isValidText(value.locationLabel, 200) ||
      !isValidText(value.description, 5000) ||
      !isValidText(value.directions, 5000) ||
      !isValidText(value.imageSrc, 2048) ||
      !isLatitudeLongitude(value.latlng) ||
      !Array.isArray(value.tips) ||
      value.tips.length > 30 ||
      !value.tips.every((tip) => isValidText(tip, 500))
   ) {
      return null;
   }

   let imageUrl: URL;
   try {
      imageUrl = new URL(value.imageSrc);
   } catch {
      return null;
   }
   if (imageUrl.protocol !== "https:") return null;

   // Optional fields: absent stays undefined so a partial payload never clears
   // stored data, and an invalid value rejects the whole request rather than
   // being silently coerced. INVALID is a sentinel so the happy path can stay
   // typed as `string | undefined`.
   const INVALID = Symbol("invalid");

   const optionalText = (raw: unknown, maxLength: number) => {
      if (raw === undefined) return undefined;
      return isValidText(raw, maxLength) ? raw.trim() : INVALID;
   };

   const optionalBool = (raw: unknown) => {
      if (raw === undefined) return undefined;
      return typeof raw === "boolean" ? raw : INVALID;
   };

   const entryFeeRaw = optionalText(value.entryFee, 200);
   const permitAuthorityRaw = optionalText(value.permitAuthority, 200);
   const permitNotesRaw = optionalText(value.permitNotes, 2000);
   const droneNotesRaw = optionalText(value.droneNotes, 2000);
   const openingHoursRaw = optionalText(value.openingHours, 300);
   const shootingNotesRaw = optionalText(value.shootingNotes, 2000);
   const isFreeRaw = optionalBool(value.isFree);
   const permitRequiredRaw = optionalBool(value.permitRequired);
   const tripodAllowedRaw = optionalBool(value.tripodAllowed);

   if (
      entryFeeRaw === INVALID ||
      permitAuthorityRaw === INVALID ||
      permitNotesRaw === INVALID ||
      droneNotesRaw === INVALID ||
      openingHoursRaw === INVALID ||
      shootingNotesRaw === INVALID ||
      isFreeRaw === INVALID ||
      permitRequiredRaw === INVALID ||
      tripodAllowedRaw === INVALID
   ) {
      return null;
   }

   const entryFee = entryFeeRaw;
   const permitAuthority = permitAuthorityRaw;
   const permitNotes = permitNotesRaw;
   const droneNotes = droneNotesRaw;
   const openingHours = openingHoursRaw;
   const shootingNotes = shootingNotesRaw;
   const isFree = isFreeRaw;
   const permitRequired = permitRequiredRaw;
   const tripodAllowed = tripodAllowedRaw;

   let droneRule: DroneRuleValue | undefined;
   if (value.droneRule !== undefined) {
      if (typeof value.droneRule !== "string" || !DRONE_RULES.includes(value.droneRule as DroneRuleValue)) {
         return null;
      }
      droneRule = value.droneRule as DroneRuleValue;
   }

   let bestTimeOfDay: string[] | undefined;
   if (value.bestTimeOfDay !== undefined) {
      if (
         !Array.isArray(value.bestTimeOfDay) ||
         value.bestTimeOfDay.length > 7 ||
         !value.bestTimeOfDay.every(
            (entry) => typeof entry === "string" && (BEST_TIMES as readonly string[]).includes(entry)
         )
      ) {
         return null;
      }
      bestTimeOfDay = value.bestTimeOfDay as string[];
   }

   let bestMonths: number[] | undefined;
   if (value.bestMonths !== undefined) {
      if (
         !Array.isArray(value.bestMonths) ||
         value.bestMonths.length > 12 ||
         !value.bestMonths.every(
            (month) => typeof month === "number" && Number.isInteger(month) && month >= 1 && month <= 12
         )
      ) {
         return null;
      }
      bestMonths = value.bestMonths as number[];
   }

   return {
      slug: value.slug,
      name: value.name.trim(),
      type: value.type.trim(),
      locationLabel: value.locationLabel.trim(),
      latlng: value.latlng,
      description: value.description.trim(),
      directions: value.directions.trim(),
      tips: value.tips.map((tip) => tip.trim()).filter(Boolean),
      imageSrc: imageUrl.toString(),
      ...(entryFee !== undefined && { entryFee }),
      ...(isFree !== undefined && { isFree }),
      ...(permitRequired !== undefined && { permitRequired }),
      ...(permitAuthority !== undefined && { permitAuthority }),
      ...(permitNotes !== undefined && { permitNotes }),
      ...(droneRule !== undefined && { droneRule }),
      ...(droneNotes !== undefined && { droneNotes }),
      ...(openingHours !== undefined && { openingHours }),
      ...(tripodAllowed !== undefined && { tripodAllowed }),
      ...(shootingNotes !== undefined && { shootingNotes }),
      ...(bestTimeOfDay !== undefined && { bestTimeOfDay }),
      ...(bestMonths !== undefined && { bestMonths }),
   };
};
