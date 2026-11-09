import {
   PublicSpace,
   getPublicSpaceCity,
   getPublicSpaceProvince,
} from "@/app/data/publicSpaces";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "./site";

/**
 * schema.org builders. Kept separate from the components that render them so
 * the pSEO hub pages (Plan 2.1-2.3) can reuse the same shapes.
 *
 * Type choices:
 * - TouristAttraction, not Place: Place is the abstract parent and earns nothing
 *   in rich results. Not LocalBusiness either -- these are public spaces, not
 *   businesses, and we would be asserting openingHours we do not have.
 * - No aggregateRating until real reviews exist. Rating markup without
 *   underlying data risks a manual action.
 */

export const organizationSchema = () => ({
   "@context": "https://schema.org",
   "@type": "Organization",
   name: SITE_NAME,
   url: SITE_URL,
   description: SITE_DESCRIPTION,
   areaServed: { "@type": "Country", name: "Sri Lanka" },
});

export const touristAttractionSchema = (space: PublicSpace) => {
   const city = getPublicSpaceCity(space);
   const province = getPublicSpaceProvince(space);

   return {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: space.name,
      description: space.description,
      url: absoluteUrl(`/community/${space.id}`),
      image: [space.imageSrc],
      // The core of the "free, no booking" positioning -- and the single fact an
      // AI answer engine is most likely to quote.
      isAccessibleForFree: true,
      publicAccess: true,
      touristType: ["Photographers", "Filmmakers", "Content creators"],
      geo: {
         "@type": "GeoCoordinates",
         latitude: space.latlng[0],
         longitude: space.latlng[1],
      },
      address: {
         "@type": "PostalAddress",
         addressLocality: city,
         // Needs province AND city kept distinct -- see getPublicSpaceProvince.
         addressRegion: province,
         addressCountry: "LK",
      },
   };
};

/** Enumerated list for directory/hub pages. Answer engines read this as a clean
 *  answer to "best photo spots in <place>". */
export const itemListSchema = (spaces: PublicSpace[], name: string) => ({
   "@context": "https://schema.org",
   "@type": "ItemList",
   name,
   numberOfItems: spaces.length,
   itemListElement: spaces.map((space, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: space.name,
      url: absoluteUrl(`/community/${space.id}`),
   })),
});

/** Rewrites the SERP URL line as Snapify > Colombo > Galle Face Green. */
export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
   "@context": "https://schema.org",
   "@type": "BreadcrumbList",
   itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
   })),
});
