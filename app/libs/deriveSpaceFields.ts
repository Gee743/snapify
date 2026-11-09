import { categoryForType, districtForCity } from "./placeTaxonomy";
import { slugifyPlace } from "@/app/data/publicSpaces";

/**
 * Derives the structured location + taxonomy columns from the fields an admin
 * actually types. Keeps /admin a short form while still populating everything
 * the hub URLs, breadcrumbs and JSON-LD address depend on.
 *
 * locationLabel is "Province, City" -- last part is the city, first the province.
 */
export const deriveSpaceFields = (input: { locationLabel: string; type: string }) => {
   const parts = input.locationLabel.split(",");
   const city = parts.at(-1)?.trim() || input.locationLabel.trim();
   const province = parts[0]?.trim() || input.locationLabel.trim();
   const district = districtForCity(city);

   return {
      city,
      citySlug: slugifyPlace(city),
      district,
      districtSlug: slugifyPlace(district),
      province,
      provinceSlug: slugifyPlace(province),
      category: categoryForType(input.type),
   };
};
