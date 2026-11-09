import { SpaceCategory } from "@prisma/client";

/**
 * Maps the freeform `type` descriptor onto the controlled category enum used by
 * the category hub pages. `type` stays human-readable ("Clifftop Temple");
 * `category` is the machine axis, because slugifying raw types would produce
 * one-item pages like /type/historic-viaduct.
 */
const TYPE_TO_CATEGORY: Record<string, SpaceCategory> = {
   "public beach": SpaceCategory.BEACH,
   "surf beach": SpaceCategory.BEACH,
   "coastal promenade": SpaceCategory.BEACH,
   "coastal lagoon": SpaceCategory.BEACH,
   // Inland lakes are not beaches -- they shoot as urban waterfront.
   "lakeside walk": SpaceCategory.URBAN,
   "urban lake": SpaceCategory.URBAN,
   waterfall: SpaceCategory.WATERFALL,
   "hill viewpoint": SpaceCategory.VIEWPOINT,
   "hill trail": SpaceCategory.NATURE_TRAIL,
   "public landmark": SpaceCategory.TEMPLE_LANDMARK,
   "historic walls": SpaceCategory.TEMPLE_LANDMARK,
   "historic viaduct": SpaceCategory.TEMPLE_LANDMARK,
   "clifftop temple": SpaceCategory.TEMPLE_LANDMARK,
   "ancient stupa": SpaceCategory.TEMPLE_LANDMARK,
};

/** Keyword fallback so new/unseen type strings still land in a sensible bucket. */
const KEYWORD_RULES: [RegExp, SpaceCategory][] = [
   [/lake|reservoir|tank/i, SpaceCategory.URBAN],
   [/beach|lagoon|promenade|bay|coast/i, SpaceCategory.BEACH],
   [/waterfall|falls/i, SpaceCategory.WATERFALL],
   [/viewpoint|view|peak|rock|summit/i, SpaceCategory.VIEWPOINT],
   [/temple|stupa|shrine|fort|walls|landmark|monument|viaduct|bridge|tower/i, SpaceCategory.TEMPLE_LANDMARK],
   [/trail|forest|park|hike|nature|garden/i, SpaceCategory.NATURE_TRAIL],
   [/market|street|city|urban/i, SpaceCategory.URBAN],
];

export const categoryForType = (type: string): SpaceCategory => {
   const direct = TYPE_TO_CATEGORY[type.trim().toLowerCase()];
   if (direct) return direct;
   for (const [pattern, category] of KEYWORD_RULES) {
      if (pattern.test(type)) return category;
   }
   return SpaceCategory.URBAN;
};

/** Hub slug and display label per category. */
export const CATEGORY_META: Record<SpaceCategory, { slug: string; label: string; plural: string }> = {
   [SpaceCategory.BEACH]: { slug: "beaches", label: "Beach", plural: "Beaches" },
   [SpaceCategory.WATERFALL]: { slug: "waterfalls", label: "Waterfall", plural: "Waterfalls" },
   [SpaceCategory.VIEWPOINT]: { slug: "viewpoints", label: "Viewpoint", plural: "Viewpoints" },
   [SpaceCategory.TEMPLE_LANDMARK]: {
      slug: "temples-and-landmarks",
      label: "Temple or landmark",
      plural: "Temples & landmarks",
   },
   [SpaceCategory.NATURE_TRAIL]: {
      slug: "trails-and-nature",
      label: "Trail or nature spot",
      plural: "Trails & nature",
   },
   [SpaceCategory.URBAN]: { slug: "urban", label: "Urban spot", plural: "Urban spots" },
};

export const categoryBySlug = (slug: string): SpaceCategory | undefined =>
   (Object.keys(CATEGORY_META) as SpaceCategory[]).find(
      (category) => CATEGORY_META[category].slug === slug
   );

/**
 * City -> district for the seeded places. Sri Lanka has 25 districts, and
 * shothotspot ranks on a province/district/spot hierarchy, so district is the
 * geo tier worth matching. Cities not listed fall back to the city name.
 */
const CITY_TO_DISTRICT: Record<string, string> = {
   colombo: "Colombo",
   negombo: "Gampaha",
   galle: "Galle",
   unawatuna: "Galle",
   hikkaduwa: "Galle",
   mirissa: "Matara",
   kandy: "Kandy",
   ella: "Badulla",
   haputale: "Badulla",
   jaffna: "Jaffna",
   trincomalee: "Trincomalee",
   "arugam bay": "Ampara",
   anuradhapura: "Anuradhapura",
   kalpitiya: "Puttalam",
   ratnapura: "Ratnapura",
   dambulla: "Matale",
   sigiriya: "Matale",
   koggala: "Galle",
   ahangama: "Galle",
   weligama: "Matara",
   polonnaruwa: "Polonnaruwa",
   matara: "Matara",
   nuwaraeliya: "Nuwara Eliya",
   "nuwara eliya": "Nuwara Eliya",
   tangalle: "Hambantota",
   bentota: "Galle",
   kalutara: "Kalutara",
   dikwella: "Matara",
};

export const districtForCity = (city: string): string =>
   CITY_TO_DISTRICT[city.trim().toLowerCase()] ?? city.trim();
