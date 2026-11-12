import { Studio, lowestRate, studioCity, studioProvince } from "@/app/actions/getStudios";
import { STUDIO_TYPE_LABELS, StudioTypeValue, amenityLabel } from "./studioTaxonomy";
import { absoluteUrl } from "./site";

/**
 * schema.org for the paid side.
 *
 * Type choice: LocalBusiness, not TouristAttraction. A studio *is* a business —
 * it has an address, hours and a price — and the opposite choice would assert
 * public access we cannot promise. Public spaces stay TouristAttraction for the
 * mirror-image reason (see structuredData.ts).
 *
 * No aggregateRating here either: there are no reviews, and rating markup
 * without underlying data risks a manual action.
 */
export const studioSchema = (studio: Studio) => {
   const city = studioCity(studio);
   const province = studioProvince(studio);
   const rate = lowestRate(studio);
   const typeLabel =
      studio.studioType in STUDIO_TYPE_LABELS
         ? STUDIO_TYPE_LABELS[studio.studioType as StudioTypeValue]
         : "Studio";

   return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      additionalType: "https://schema.org/PhotographStudio",
      name: studio.name,
      description: studio.description,
      url: absoluteUrl(`/studios/${studio.slug}`),
      image: [studio.imageSrc, ...studio.images].slice(0, 6),
      ...(studio.openingHours && { openingHours: studio.openingHours }),
      address: {
         "@type": "PostalAddress",
         addressLocality: city,
         addressRegion: province,
         addressCountry: "LK",
      },
      // Only publish geo when an owner actually gave a pin; an absent latlng is
      // a deliberate choice, not missing data to paper over with a city centroid.
      ...(studio.latlng.length === 2 && {
         geo: {
            "@type": "GeoCoordinates",
            latitude: studio.latlng[0],
            longitude: studio.latlng[1],
         },
      }),
      // priceRange is the loose SERP hint; the offer below carries the real
      // number. Both are omitted when the studio quotes on request rather than
      // implying a price we do not have.
      ...(rate !== null && {
         priceRange: `${studio.currency} ${rate.toLocaleString("en-LK")}+`,
         makesOffer: {
            "@type": "Offer",
            name: `${typeLabel} hire`,
            priceCurrency: studio.currency,
            price: rate,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/studios/${studio.slug}`),
         },
      }),
      ...(studio.amenities.length && {
         amenityFeature: studio.amenities.map((amenity) => ({
            "@type": "LocationFeatureSpecification",
            name: amenityLabel(amenity),
            value: true,
         })),
      }),
      ...(studio.capacity && {
         maximumAttendeeCapacity: studio.capacity,
      }),
      knowsAbout: ["Photography", "Film production", "Content production"],
   };
};

/** Enumerated list for the studios index and the type hubs. */
export const studioListSchema = (studios: Studio[], name: string) => ({
   "@context": "https://schema.org",
   "@type": "ItemList",
   name,
   numberOfItems: studios.length,
   itemListElement: studios.map((studio, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: studio.name,
      url: absoluteUrl(`/studios/${studio.slug}`),
   })),
});
