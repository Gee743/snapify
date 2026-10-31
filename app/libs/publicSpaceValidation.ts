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
}

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
   };
};
