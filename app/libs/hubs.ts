import { getPublicSpaces } from "@/app/actions/getPublicSpaces";
import {
   PublicSpace,
   getPublicSpaceCity,
   getPublicSpaceDistrict,
   getPublicSpaceProvince,
   slugifyPlace,
} from "@/app/data/publicSpaces";
import { CATEGORY_META, categoryBySlug } from "./placeTaxonomy";

/**
 * Shared data layer for the pSEO hub pages.
 *
 * A hub only exists once it has MIN_PLACES_FOR_HUB places. Thin pages get
 * filtered on a new domain, and a directory that ships 90 near-empty
 * combinations reads as a doorway farm. Everything below that threshold
 * redirects up a tier instead (city -> district -> province).
 */
export const MIN_PLACES_FOR_HUB = 3;

export type HubKind = "province" | "district" | "city" | "category";

export interface Hub {
   kind: HubKind;
   slug: string;
   /** Display name, e.g. "Colombo" or "Beaches". */
   name: string;
   path: string;
   spaces: PublicSpace[];
}

// Categories sit under /photo-spots/category/<slug> rather than a bare
// /photo-spots/<slug>-in-sri-lanka, so they never collide with the [city]
// catch-all segment.
const hubPath = (kind: HubKind, slug: string) => `/photo-spots/${kind}/${slug}`;

/** City hubs live at the short /photo-spots/<city> form -- the shape people link to. */
export const cityPath = (slug: string) => `/photo-spots/${slug}`;

const groupBy = (spaces: PublicSpace[], label: (space: PublicSpace) => string) => {
   const groups = new Map<string, { name: string; spaces: PublicSpace[] }>();
   for (const space of spaces) {
      const name = label(space);
      if (!name) continue;
      const slug = slugifyPlace(name);
      const group = groups.get(slug) ?? { name, spaces: [] };
      group.spaces.push(space);
      groups.set(slug, group);
   }
   return groups;
};

/** Every hub of a kind, including those below the threshold. */
export const getAllHubs = async (kind: HubKind): Promise<Hub[]> => {
   const spaces = await getPublicSpaces();

   if (kind === "category") {
      const groups = new Map<string, { name: string; spaces: PublicSpace[] }>();
      for (const space of spaces) {
         if (!space.category) continue;
         const meta = CATEGORY_META[space.category as keyof typeof CATEGORY_META];
         if (!meta) continue;
         const group = groups.get(meta.slug) ?? { name: meta.plural, spaces: [] };
         group.spaces.push(space);
         groups.set(meta.slug, group);
      }
      return Array.from(groups.entries()).map(([slug, group]) => ({
         kind,
         slug,
         name: group.name,
         path: hubPath(kind, slug),
         spaces: group.spaces,
      }));
   }

   const label =
      kind === "province"
         ? getPublicSpaceProvince
         : kind === "district"
           ? getPublicSpaceDistrict
           : getPublicSpaceCity;

   return Array.from(groupBy(spaces, label).entries()).map(([slug, group]) => ({
      kind,
      slug,
      name: group.name,
      path: kind === "city" ? cityPath(slug) : hubPath(kind, slug),
      spaces: group.spaces,
   }));
};

/** Only hubs that clear the threshold -- these are the pages we publish. */
export const getPublishedHubs = async (kind: HubKind) =>
   (await getAllHubs(kind))
      .filter((hub) => hub.spaces.length >= MIN_PLACES_FOR_HUB)
      .sort((a, b) => b.spaces.length - a.spaces.length || a.name.localeCompare(b.name));

export const getHub = async (kind: HubKind, slug: string) =>
   (await getAllHubs(kind)).find((hub) => hub.slug === slug);

/**
 * Where a below-threshold city should send its traffic: its district hub if
 * that is published, else its province hub, else the full directory. Keeps the
 * URL space honest without 404ing a real place name.
 */
export const getCityFallbackPath = async (citySlug: string) => {
   const city = await getHub("city", citySlug);
   const space = city?.spaces[0];
   if (!space) return "/community";

   const [districts, provinces] = await Promise.all([
      getPublishedHubs("district"),
      getPublishedHubs("province"),
   ]);

   const districtSlug = slugifyPlace(getPublicSpaceDistrict(space));
   if (districts.some((hub) => hub.slug === districtSlug)) {
      return `/photo-spots/district/${districtSlug}`;
   }

   const provinceSlug = slugifyPlace(getPublicSpaceProvince(space));
   if (provinces.some((hub) => hub.slug === provinceSlug)) {
      return `/photo-spots/province/${provinceSlug}`;
   }

   return "/community";
};

/** All published hub URLs, for the sitemap and the /photo-spots index. */
export const getAllPublishedHubPaths = async () => {
   const [provinces, districts, cities, categories] = await Promise.all([
      getPublishedHubs("province"),
      getPublishedHubs("district"),
      getPublishedHubs("city"),
      getPublishedHubs("category"),
   ]);
   return [...provinces, ...districts, ...cities, ...categories];
};

export { CATEGORY_META, categoryBySlug };
