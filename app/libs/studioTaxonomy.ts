/**
 * Controlled vocabularies for the paid, bookable side of the directory.
 *
 * Kept separate from placeTaxonomy.ts rather than merged into it: the two
 * describe different decisions. A public space is categorised by what it *is*
 * (beach, waterfall); a studio is categorised by what it *does for a shoot*
 * (holds daylight, kills it, has a cyc wall). Merging them would produce a
 * single filter list where half the options never apply.
 */

export const STUDIO_TYPES = [
   "DAYLIGHT",
   "BLACKOUT",
   "CYCLORAMA",
   "VILLA",
   "ROOFTOP",
   "WAREHOUSE",
   "HERITAGE",
   "EVENT_VENUE",
] as const;

export type StudioTypeValue = (typeof STUDIO_TYPES)[number];

export const STUDIO_TYPE_LABELS: Record<StudioTypeValue, string> = {
   DAYLIGHT: "Daylight studio",
   BLACKOUT: "Blackout studio",
   CYCLORAMA: "Cyclorama",
   VILLA: "Villa",
   ROOFTOP: "Rooftop",
   WAREHOUSE: "Warehouse",
   HERITAGE: "Heritage property",
   EVENT_VENUE: "Event venue",
};

/** Short descriptors for the filter bar and type hub intros. */
export const STUDIO_TYPE_BLURBS: Record<StudioTypeValue, string> = {
   DAYLIGHT: "Large windows and north light. Best for portrait and product work shot without flash.",
   BLACKOUT: "Controllable, light-sealed rooms for strobe and continuous lighting setups.",
   CYCLORAMA: "A curved infinity wall for clean seamless backgrounds, fashion and motion.",
   VILLA: "A residential property rented for shoots — rooms, grounds and often a pool.",
   ROOFTOP: "Open-air terraces with skyline backdrops, usually hired by the hour.",
   WAREHOUSE: "Raw industrial volume with height and vehicle access for large builds.",
   HERITAGE: "Colonial and period buildings with original architectural detail.",
   EVENT_VENUE: "Halls and function spaces that also take photo and film bookings.",
};

export const STUDIO_TYPE_SLUGS: Record<StudioTypeValue, string> = {
   DAYLIGHT: "daylight-studios",
   BLACKOUT: "blackout-studios",
   CYCLORAMA: "cyclorama-studios",
   VILLA: "villas",
   ROOFTOP: "rooftops",
   WAREHOUSE: "warehouses",
   HERITAGE: "heritage-properties",
   EVENT_VENUE: "event-venues",
};

export const studioTypeFromSlug = (slug: string): StudioTypeValue | undefined =>
   STUDIO_TYPES.find((type) => STUDIO_TYPE_SLUGS[type] === slug);

export const studioTypeLabel = (value?: string | null) =>
   value && value in STUDIO_TYPE_LABELS
      ? STUDIO_TYPE_LABELS[value as StudioTypeValue]
      : "Studio";

/**
 * Amenity vocabulary. Free text would fragment instantly ("A/C", "AC",
 * "air con"), and these drive filter chips, so they are a closed list.
 */
export const STUDIO_AMENITIES = [
   "air-conditioning",
   "parking",
   "changing-room",
   "makeup-station",
   "wifi",
   "kitchen",
   "bathroom",
   "blackout-blinds",
   "natural-light",
   "power-three-phase",
   "loading-access",
   "green-room",
   "pool",
   "garden",
   "generator-backup",
   "wheelchair-access",
] as const;

export type StudioAmenityValue = (typeof STUDIO_AMENITIES)[number];

export const STUDIO_AMENITY_LABELS: Record<StudioAmenityValue, string> = {
   "air-conditioning": "Air conditioning",
   parking: "Parking",
   "changing-room": "Changing room",
   "makeup-station": "Makeup station",
   wifi: "Wi-Fi",
   kitchen: "Kitchen",
   bathroom: "Bathroom",
   "blackout-blinds": "Blackout blinds",
   "natural-light": "Natural light",
   "power-three-phase": "Three-phase power",
   "loading-access": "Loading access",
   "green-room": "Green room",
   pool: "Pool",
   garden: "Garden",
   // Grid cuts are routine outside Colombo; for a paid day this is a real
   // differentiator, not a nicety.
   "generator-backup": "Generator backup",
   "wheelchair-access": "Step-free access",
};

export const amenityLabel = (value: string) =>
   value in STUDIO_AMENITY_LABELS
      ? STUDIO_AMENITY_LABELS[value as StudioAmenityValue]
      : value.split("-").join(" ");

export const STUDIO_STATUSES = ["PUBLISHED", "PENDING", "REJECTED"] as const;
export type StudioStatusValue = (typeof STUDIO_STATUSES)[number];
