import { PublicSpace, getPublicSpaceCity, getPublicSpaceDistrict, getPublicSpaceProvince, slugifyPlace } from "@/app/data/publicSpaces";
import { accessSignals } from "@/app/libs/accessSignal";
import { CATEGORY_META } from "@/app/libs/placeTaxonomy";

/**
 * Filtering for the /community browser.
 *
 * The catalogue passed 80 places, where scanning a single flat grid stopped
 * working: finding "a waterfall in Kandy district I can fly a drone at" meant
 * reading every card. These are plain functions over the in-memory set rather
 * than Prisma queries — the full list is already loaded for the grid, the set
 * is small, and keeping one implementation means the server render and the
 * client re-filter can never disagree about what matches.
 */

export type AccessKey = "free" | "noPermit" | "drones" | "tripod";

export const ACCESS_FILTERS: { key: AccessKey; label: string; hint: string }[] = [
   { key: "free", label: "No entry fee", hint: "Places that cost nothing to enter" },
   { key: "noPermit", label: "No permit", hint: "Shoot without applying for a permit" },
   { key: "drones", label: "Drone friendly", hint: "Drones allowed without a permit" },
   { key: "tripod", label: "Tripod OK", hint: "Tripods are not prohibited" },
];

const ACCESS_KEYS = new Set<string>(ACCESS_FILTERS.map((f) => f.key));

export type SpaceFilterState = {
   q: string;
   province: string;
   district: string;
   city: string;
   category: string;
   access: AccessKey[];
};

export const EMPTY_FILTERS: SpaceFilterState = {
   q: "",
   province: "",
   district: "",
   city: "",
   category: "",
   access: [],
};

/** Diacritic-insensitive, case-insensitive comparison key. Mirrors navbar Search. */
export const normalise = (value: string) =>
   value
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();

const matchesAccess = (space: PublicSpace, key: AccessKey) => {
   switch (key) {
      // Reuses the verdict the card chip shows, so a place labelled "Free in
      // part" does not quietly pass a filter that promises no entry fee.
      case "free":
         return accessSignals(space).some((signal) => signal.label === "Free entry");
      case "noPermit":
         return !space.permitRequired;
      case "drones":
         return space.droneRule === "ALLOWED";
      // Unknown (null) is not a promise of "no" — only an explicit false excludes.
      case "tripod":
         return space.tripodAllowed !== false;
      default:
         return true;
   }
};

const matchesQuery = (space: PublicSpace, term: string) => {
   if (!term) return true;
   const haystack = normalise(
      `${space.name} ${space.type} ${getPublicSpaceCity(space)} ${getPublicSpaceDistrict(space)} ${getPublicSpaceProvince(space)}`
   );
   // Every word must appear somewhere, so "kandy waterfall" narrows rather than
   // widening the way a plain substring match on the joined phrase would.
   return term.split(/\s+/).every((word) => haystack.includes(word));
};

export const categorySlugOf = (space: PublicSpace) => {
   const meta = space.category ? CATEGORY_META[space.category as keyof typeof CATEGORY_META] : null;
   return meta?.slug ?? "";
};

/** True when a single place satisfies every active facet. */
export const matchesFilters = (space: PublicSpace, filters: SpaceFilterState) => {
   if (filters.province && slugifyPlace(getPublicSpaceProvince(space)) !== filters.province) return false;
   if (filters.district && slugifyPlace(getPublicSpaceDistrict(space)) !== filters.district) return false;
   if (filters.city && slugifyPlace(getPublicSpaceCity(space)) !== filters.city) return false;
   if (filters.category && categorySlugOf(space) !== filters.category) return false;
   // Access filters intersect: picking two means "both must hold".
   if (!filters.access.every((key) => matchesAccess(space, key))) return false;
   return matchesQuery(space, normalise(filters.q));
};

export const applyFilters = (spaces: PublicSpace[], filters: SpaceFilterState) =>
   spaces.filter((space) => matchesFilters(space, filters));

export type FacetOption = { value: string; label: string; count: number };

/**
 * Options for one facet, counted against the set that every *other* facet
 * already narrowed. Counting against the unfiltered list would offer
 * districts that return nothing once the active category is applied; counting
 * against the fully filtered list would collapse the facet to the one value
 * already chosen. Excluding only the facet's own key is what keeps the
 * remaining choices live.
 */
const facetFor = (
   spaces: PublicSpace[],
   filters: SpaceFilterState,
   key: keyof SpaceFilterState,
   valueOf: (space: PublicSpace) => string,
   labelOf: (space: PublicSpace) => string
): FacetOption[] => {
   const base = applyFilters(spaces, { ...filters, [key]: "" } as SpaceFilterState);
   const counts = new Map<string, { label: string; count: number }>();

   for (const space of base) {
      const value = valueOf(space);
      if (!value) continue;
      const entry = counts.get(value);
      if (entry) entry.count += 1;
      else counts.set(value, { label: labelOf(space), count: 1 });
   }

   const options = Array.from(counts, ([value, { label, count }]) => ({ value, label, count }));

   // Keep the active value visible even at zero, or clearing it becomes
   // impossible once another facet excludes everything it covers.
   const active = filters[key] as string;
   if (active && !options.some((option) => option.value === active)) {
      options.push({ value: active, label: active, count: 0 });
   }

   return options.sort((a, b) => a.label.localeCompare(b.label));
};

export type SpaceFacets = {
   provinces: FacetOption[];
   districts: FacetOption[];
   categories: FacetOption[];
   access: (FacetOption & { key: AccessKey; hint: string })[];
};

export const buildFacets = (spaces: PublicSpace[], filters: SpaceFilterState): SpaceFacets => ({
   provinces: facetFor(spaces, filters, "province", (s) => slugifyPlace(getPublicSpaceProvince(s)), getPublicSpaceProvince),
   districts: facetFor(spaces, filters, "district", (s) => slugifyPlace(getPublicSpaceDistrict(s)), getPublicSpaceDistrict),
   categories: facetFor(
      spaces,
      filters,
      "category",
      categorySlugOf,
      (s) => CATEGORY_META[s.category as keyof typeof CATEGORY_META]?.plural ?? "Other"
   ),
   access: ACCESS_FILTERS.map((entry) => {
      // An access toggle counts against the other facets plus the other access
      // toggles, so the number shown is what clicking it would actually yield.
      const others = filters.access.filter((key) => key !== entry.key);
      const base = applyFilters(spaces, { ...filters, access: others });
      return {
         key: entry.key,
         label: entry.label,
         hint: entry.hint,
         value: entry.key,
         count: base.filter((space) => matchesAccess(space, entry.key)).length,
      };
   }),
});

const firstParam = (value: string | string[] | undefined) =>
   (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

export type RawSearchParams = Record<string, string | string[] | undefined>;

/**
 * Reads filter state out of the query string.
 *
 * Note `area` is deliberately absent: middleware.ts intercepts that legacy
 * param on / and /community and 308s to the matching /photo-spots hub, so it
 * never reaches a page. Reading it here would be dead code implying a
 * fallback that cannot run.
 */
export const parseFilters = (params: RawSearchParams): SpaceFilterState => {
   const rawAccess = params.access;
   const accessValues = (Array.isArray(rawAccess) ? rawAccess : rawAccess ? [rawAccess] : [])
      .flatMap((value) => value.split(","))
      .map((value) => value.trim())
      .filter((value): value is AccessKey => ACCESS_KEYS.has(value));

   return {
      q: firstParam(params.q),
      province: slugifyPlace(firstParam(params.province)),
      district: slugifyPlace(firstParam(params.district)),
      city: slugifyPlace(firstParam(params.city)),
      category: slugifyPlace(firstParam(params.category)),
      access: Array.from(new Set(accessValues)),
   };
};

/** Query string for a filter state, omitting empty values so URLs stay short. */
export const serializeFilters = (filters: SpaceFilterState) => {
   const params = new URLSearchParams();
   if (filters.q) params.set("q", filters.q);
   if (filters.province) params.set("province", filters.province);
   if (filters.district) params.set("district", filters.district);
   if (filters.city) params.set("city", filters.city);
   if (filters.category) params.set("category", filters.category);
   if (filters.access.length) params.set("access", filters.access.join(","));
   return params.toString();
};

export const hasActiveFilters = (filters: SpaceFilterState) =>
   Boolean(
      filters.q ||
         filters.province ||
         filters.district ||
         filters.city ||
         filters.category ||
         filters.access.length
   );

export const countActiveFilters = (filters: SpaceFilterState) =>
   (filters.q ? 1 : 0) +
   (filters.province ? 1 : 0) +
   (filters.district ? 1 : 0) +
   (filters.city ? 1 : 0) +
   (filters.category ? 1 : 0) +
   filters.access.length;

/** Human-readable chips for the active filters, each with the URL that clears it. */
export const describeFilters = (
   filters: SpaceFilterState,
   facets: SpaceFacets
): { key: string; label: string; next: SpaceFilterState }[] => {
   const labelFor = (options: FacetOption[], value: string) =>
      options.find((option) => option.value === value)?.label ?? value;

   const chips: { key: string; label: string; next: SpaceFilterState }[] = [];

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
         label: `${labelFor(facets.districts, filters.district)} District`,
         next: { ...filters, district: "" },
      });
   if (filters.city)
      chips.push({ key: "city", label: filters.city.replace(/-/g, " "), next: { ...filters, city: "" } });
   if (filters.category)
      chips.push({
         key: "category",
         label: labelFor(facets.categories, filters.category),
         next: { ...filters, category: "" },
      });

   for (const key of filters.access) {
      const entry = ACCESS_FILTERS.find((filter) => filter.key === key);
      if (!entry) continue;
      chips.push({
         key: `access-${key}`,
         label: entry.label,
         next: { ...filters, access: filters.access.filter((value) => value !== key) },
      });
   }

   return chips;
};
