import { Studio, lowestRate, studioCity, studioProvince } from "@/app/actions/getStudios";
import { slugifyPlace } from "@/app/data/publicSpaces";
import {
   STUDIO_AMENITY_LABELS,
   STUDIO_TYPES,
   STUDIO_TYPE_LABELS,
   STUDIO_TYPE_SLUGS,
   StudioAmenityValue,
   StudioTypeValue,
   studioTypeFromSlug,
} from "./studioTaxonomy";

/**
 * Filtering for the /studios browser.
 *
 * Structurally parallel to spaceFilters.ts — same plain-functions-over-the-
 * in-memory-set approach, same cross-filtered facet counts — but the facets
 * themselves differ, because the decision differs. Nobody shortlists a studio
 * by drone policy; they shortlist by budget, capacity and what the room does
 * to light.
 */

export type StudioFilterState = {
   q: string;
   province: string;
   district: string;
   city: string;
   /** Slug from STUDIO_TYPE_SLUGS, e.g. "daylight-studios". */
   type: string;
   amenities: string[];
   /** Upper bound on the lowest published rate, in whole rupees. */
   maxRate: number | null;
   /** Minimum people the space must hold. */
   minCapacity: number | null;
};

export const EMPTY_STUDIO_FILTERS: StudioFilterState = {
   q: "",
   province: "",
   district: "",
   city: "",
   type: "",
   amenities: [],
   maxRate: null,
   minCapacity: null,
};

/**
 * Budget bands rather than a free numeric input. A slider over an empty or
 * two-studio catalogue is noise; bands stay meaningful at any inventory size
 * and map to how crews actually describe a budget.
 */
export const RATE_BANDS: { value: number; label: string }[] = [
   { value: 5000, label: "Under Rs 5,000/hr" },
   { value: 10000, label: "Under Rs 10,000/hr" },
   { value: 25000, label: "Under Rs 25,000/hr" },
   { value: 50000, label: "Under Rs 50,000/hr" },
];

export const CAPACITY_BANDS: { value: number; label: string }[] = [
   { value: 5, label: "5+ people" },
   { value: 10, label: "10+ people" },
   { value: 25, label: "25+ people" },
   { value: 50, label: "50+ people" },
];

export const normalise = (value: string) =>
   value
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();

export const studioTypeSlugOf = (studio: Studio) =>
   studio.studioType && studio.studioType in STUDIO_TYPE_SLUGS
      ? STUDIO_TYPE_SLUGS[studio.studioType as StudioTypeValue]
      : "";

export const studioDistrict = (studio: Studio) =>
   studio.district?.trim() || studioCity(studio);

const matchesQuery = (studio: Studio, term: string) => {
   if (!term) return true;
   const haystack = normalise(
      [
         studio.name,
         studio.type,
         studio.tagline,
         studioCity(studio),
         studioDistrict(studio),
         studioProvince(studio),
         ...studio.equipment,
      ].join(" ")
   );
   return normalise(term)
      .split(/\s+/)
      .every((word) => haystack.includes(word));
};

/** True when a studio satisfies every active facet. */
export const matchesStudioFilters = (studio: Studio, filters: StudioFilterState) => {
   if (filters.province && slugifyPlace(studioProvince(studio)) !== filters.province) return false;
   if (filters.district && slugifyPlace(studioDistrict(studio)) !== filters.district) return false;
   if (filters.city && slugifyPlace(studioCity(studio)) !== filters.city) return false;
   if (filters.type && studioTypeSlugOf(studio) !== filters.type) return false;

   if (filters.amenities.length) {
      const owned = new Set(studio.amenities);
      // AND, not OR: picking "parking" and "changing room" means a studio must
      // have both, which is what someone ticking two boxes is asking for.
      if (!filters.amenities.every((amenity) => owned.has(amenity))) return false;
   }

   if (filters.maxRate !== null) {
      const rate = lowestRate(studio);
      // A studio quoting "on request" has no published rate to compare, so it
      // cannot honestly be claimed to fit a budget filter. Excluded rather
      // than shown, or the filter would promise a price it has not verified.
      if (rate === null || rate > filters.maxRate) return false;
   }

   if (filters.minCapacity !== null) {
      if (typeof studio.capacity !== "number" || studio.capacity < filters.minCapacity) return false;
   }

   return matchesQuery(studio, filters.q);
};

export const applyStudioFilters = (studios: Studio[], filters: StudioFilterState) =>
   studios.filter((studio) => matchesStudioFilters(studio, filters));

export type FacetOption = { value: string; label: string; count: number };

/**
 * Options for one facet, counted against the set every *other* facet already
 * narrowed — same reasoning as spaceFilters.facetFor: count against the
 * unfiltered list and you offer dead ends; count against the fully filtered
 * list and the facet collapses to the single chosen value.
 */
const facetFor = (
   studios: Studio[],
   filters: StudioFilterState,
   key: keyof StudioFilterState,
   valueOf: (studio: Studio) => string,
   labelOf: (studio: Studio) => string
): FacetOption[] => {
   const base = applyStudioFilters(studios, { ...filters, [key]: "" } as StudioFilterState);
   const counts = new Map<string, { label: string; count: number }>();

   for (const studio of base) {
      const value = valueOf(studio);
      if (!value) continue;
      const entry = counts.get(value);
      if (entry) entry.count += 1;
      else counts.set(value, { label: labelOf(studio), count: 1 });
   }

   const options = Array.from(counts, ([value, { label, count }]) => ({ value, label, count }));

   // Keep the active value visible at zero, or it cannot be cleared once
   // another facet excludes everything it covers.
   const active = filters[key] as string;
   if (active && !options.some((option) => option.value === active)) {
      options.push({ value: active, label: active, count: 0 });
   }

   return options.sort((a, b) => a.label.localeCompare(b.label));
};

export type StudioFacets = {
   provinces: FacetOption[];
   districts: FacetOption[];
   types: FacetOption[];
   amenities: FacetOption[];
   rates: FacetOption[];
   capacities: FacetOption[];
};

export const buildStudioFacets = (
   studios: Studio[],
   filters: StudioFilterState
): StudioFacets => ({
   provinces: facetFor(studios, filters, "province", (s) => slugifyPlace(studioProvince(s)), studioProvince),
   districts: facetFor(studios, filters, "district", (s) => slugifyPlace(studioDistrict(s)), studioDistrict),
   types: facetFor(studios, filters, "type", studioTypeSlugOf, (s) =>
      s.studioType in STUDIO_TYPE_LABELS
         ? STUDIO_TYPE_LABELS[s.studioType as StudioTypeValue]
         : "Studio"
   ),
   // Amenities are multi-select, so each option counts against the other
   // facets plus the *other* ticked amenities — the number shown is what
   // ticking this one would actually yield.
   amenities: Object.keys(STUDIO_AMENITY_LABELS)
      .map((amenity) => {
         const others = filters.amenities.filter((entry) => entry !== amenity);
         const base = applyStudioFilters(studios, { ...filters, amenities: others });
         return {
            value: amenity,
            label: STUDIO_AMENITY_LABELS[amenity as StudioAmenityValue],
            count: base.filter((studio) => studio.amenities.includes(amenity)).length,
         };
      })
      // An amenity nobody offers is a dead control; hide it unless it is the
      // one currently ticked.
      .filter((option) => option.count > 0 || filters.amenities.includes(option.value))
      .sort((a, b) => a.label.localeCompare(b.label)),
   rates: RATE_BANDS.map((band) => {
      const base = applyStudioFilters(studios, { ...filters, maxRate: null });
      return {
         value: String(band.value),
         label: band.label,
         count: base.filter((studio) => {
            const rate = lowestRate(studio);
            return rate !== null && rate <= band.value;
         }).length,
      };
   }),
   capacities: CAPACITY_BANDS.map((band) => {
      const base = applyStudioFilters(studios, { ...filters, minCapacity: null });
      return {
         value: String(band.value),
         label: band.label,
         count: base.filter(
            (studio) => typeof studio.capacity === "number" && studio.capacity >= band.value
         ).length,
      };
   }),
});

const firstParam = (value: string | string[] | undefined) =>
   (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

export type RawSearchParams = Record<string, string | string[] | undefined>;

const positiveInt = (raw: string): number | null => {
   if (!/^\d+$/.test(raw)) return null;
   const parsed = Number(raw);
   return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
};

export const parseStudioFilters = (params: RawSearchParams): StudioFilterState => {
   const rawAmenities = params.amenities;
   const amenityValues = (
      Array.isArray(rawAmenities) ? rawAmenities : rawAmenities ? [rawAmenities] : []
   )
      .flatMap((value) => value.split(","))
      .map((value) => value.trim())
      .filter((value) => value in STUDIO_AMENITY_LABELS);

   const typeSlug = slugifyPlace(firstParam(params.type));

   return {
      q: firstParam(params.q),
      province: slugifyPlace(firstParam(params.province)),
      district: slugifyPlace(firstParam(params.district)),
      city: slugifyPlace(firstParam(params.city)),
      // Only a slug that maps to a real studio type survives, so a junk ?type=
      // yields the unfiltered list rather than an empty one.
      type: studioTypeFromSlug(typeSlug) ? typeSlug : "",
      amenities: Array.from(new Set(amenityValues)),
      maxRate: positiveInt(firstParam(params.maxRate)),
      minCapacity: positiveInt(firstParam(params.minCapacity)),
   };
};

export const serializeStudioFilters = (filters: StudioFilterState) => {
   const params = new URLSearchParams();
   if (filters.q) params.set("q", filters.q);
   if (filters.province) params.set("province", filters.province);
   if (filters.district) params.set("district", filters.district);
   if (filters.city) params.set("city", filters.city);
   if (filters.type) params.set("type", filters.type);
   if (filters.amenities.length) params.set("amenities", filters.amenities.join(","));
   if (filters.maxRate !== null) params.set("maxRate", String(filters.maxRate));
   if (filters.minCapacity !== null) params.set("minCapacity", String(filters.minCapacity));
   return params.toString();
};

export const hasActiveStudioFilters = (filters: StudioFilterState) =>
   Boolean(
      filters.q ||
         filters.province ||
         filters.district ||
         filters.city ||
         filters.type ||
         filters.amenities.length ||
         filters.maxRate !== null ||
         filters.minCapacity !== null
   );

export const countActiveStudioFilters = (filters: StudioFilterState) =>
   (filters.q ? 1 : 0) +
   (filters.province ? 1 : 0) +
   (filters.district ? 1 : 0) +
   (filters.city ? 1 : 0) +
   (filters.type ? 1 : 0) +
   filters.amenities.length +
   (filters.maxRate !== null ? 1 : 0) +
   (filters.minCapacity !== null ? 1 : 0);

/** Human-readable chips for the active filters, each with the state that clears it. */
export const describeStudioFilters = (
   filters: StudioFilterState,
   facets: StudioFacets
): { key: string; label: string; next: StudioFilterState }[] => {
   const labelFor = (options: FacetOption[], value: string) =>
      options.find((option) => option.value === value)?.label ?? value;

   const chips: { key: string; label: string; next: StudioFilterState }[] = [];

   if (filters.q) chips.push({ key: "q", label: `“${filters.q}”`, next: { ...filters, q: "" } });
   if (filters.province)
      chips.push({
         key: "province",
         label: labelFor(facets.provinces, filters.province),
         next: { ...filters, province: "" },
      });
   if (filters.district)
      chips.push({
         key: "district",
         label: labelFor(facets.districts, filters.district),
         next: { ...filters, district: "" },
      });
   if (filters.city)
      chips.push({ key: "city", label: filters.city, next: { ...filters, city: "" } });
   if (filters.type)
      chips.push({
         key: "type",
         label: labelFor(facets.types, filters.type),
         next: { ...filters, type: "" },
      });
   for (const amenity of filters.amenities) {
      chips.push({
         key: `amenity:${amenity}`,
         label: STUDIO_AMENITY_LABELS[amenity as StudioAmenityValue] ?? amenity,
         next: { ...filters, amenities: filters.amenities.filter((entry) => entry !== amenity) },
      });
   }
   if (filters.maxRate !== null)
      chips.push({
         key: "maxRate",
         label:
            RATE_BANDS.find((band) => band.value === filters.maxRate)?.label ??
            `Under Rs ${filters.maxRate.toLocaleString("en-LK")}/hr`,
         next: { ...filters, maxRate: null },
      });
   if (filters.minCapacity !== null)
      chips.push({
         key: "minCapacity",
         label:
            CAPACITY_BANDS.find((band) => band.value === filters.minCapacity)?.label ??
            `${filters.minCapacity}+ people`,
         next: { ...filters, minCapacity: null },
      });

   return chips;
};

/** All studio type slugs, for generateStaticParams on the type hubs. */
export const allStudioTypeSlugs = () => STUDIO_TYPES.map((type) => STUDIO_TYPE_SLUGS[type]);
