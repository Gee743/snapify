import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HubPage from "@/app/components/HubPage";
import { getHub, getPublishedHubs, MIN_PLACES_FOR_HUB } from "@/app/libs/hubs";
import { buildHubIntro } from "@/app/libs/hubCopy";
import { getPublicSpaceDistrict, slugifyPlace } from "@/app/data/publicSpaces";

export const revalidate = 3600;
// Only cities that clear the threshold get a URL here. Anything else 404s
// rather than publishing a one-item page.
//
// A redirect was tried first and reverted: a redirect returned from an ISR page
// is cached as a 200 HTML body at build time, so below-threshold cities served
// "Not found" with a success status. Restricting the param space is both
// simpler and gives honest status codes.
export const dynamicParams = false;

export async function generateStaticParams() {
   return (await getPublishedHubs("city")).map((hub) => ({ city: hub.slug }));
}

interface Params {
   city: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
   const hub = await getHub("city", params.city);
   if (!hub || hub.spaces.length < MIN_PLACES_FOR_HUB) {
      return { title: "Not found", robots: { index: false, follow: true } };
   }

   const title = `${hub.spaces.length} Best Photo Spots in ${hub.name}, Sri Lanka (2026)`;
   return {
      title,
      description: `Where to shoot in ${hub.name}: ${hub.spaces.length} public locations with directions, fees, permit requirements and drone rules, plus the light that works at each.`,
      alternates: { canonical: hub.path },
      openGraph: { title, url: hub.path },
   };
}

const CityHub = async ({ params }: { params: Params }) => {
   const hub = await getHub("city", params.city);
   if (!hub || hub.spaces.length < MIN_PLACES_FOR_HUB) notFound();

   const district = getPublicSpaceDistrict(hub.spaces[0]);
   const districtSlug = slugifyPlace(district);
   const publishedDistricts = await getPublishedHubs("district");
   const hasDistrictHub = publishedDistricts.some((item) => item.slug === districtSlug);

   const siblings = (await getPublishedHubs("city")).filter((item) => item.slug !== hub.slug);

   return (
      <HubPage
         hub={hub}
         heading={`Photo Spots in ${hub.name}`}
         intro={buildHubIntro({ name: hub.name, spaces: hub.spaces, kind: "city" }).map(
            (paragraph) => (
               <p key={paragraph}>{paragraph}</p>
            )
         )}
         breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Photo spots", path: "/photo-spots" },
            ...(hasDistrictHub
               ? [
                    {
                       name: `${district} District`,
                       path: `/photo-spots/district/${districtSlug}`,
                    },
                 ]
               : []),
            { name: hub.name, path: hub.path },
         ]}
         related={siblings.map((item) => ({
            name: item.name,
            path: item.path,
            count: item.spaces.length,
         }))}
         relatedLabel="Other cities"
      />
   );
};

export default CityHub;
