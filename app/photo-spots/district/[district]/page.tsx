import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HubPage from "@/app/components/HubPage";
import { getHub, getPublishedHubs, MIN_PLACES_FOR_HUB } from "@/app/libs/hubs";
import { buildHubIntro } from "@/app/libs/hubCopy";
import { getPublicSpaceProvince, slugifyPlace } from "@/app/data/publicSpaces";

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
   return (await getPublishedHubs("district")).map((hub) => ({ district: hub.slug }));
}

interface Params {
   district: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
   const hub = await getHub("district", params.district);
   if (!hub || hub.spaces.length < MIN_PLACES_FOR_HUB) {
      return { title: "Not found", robots: { index: false, follow: true } };
   }

   const title = `${hub.spaces.length} Photo Spots in ${hub.name} District, Sri Lanka`;
   return {
      title,
      description: `Places to photograph and film in ${hub.name} District — directions, entry fees, permit requirements and drone rules for every location.`,
      alternates: { canonical: hub.path },
      openGraph: { title, url: hub.path },
   };
}

const DistrictHub = async ({ params }: { params: Params }) => {
   const hub = await getHub("district", params.district);
   if (!hub || hub.spaces.length < MIN_PLACES_FOR_HUB) notFound();

   const province = getPublicSpaceProvince(hub.spaces[0]);
   const provinceSlug = slugifyPlace(province);
   const publishedProvinces = await getPublishedHubs("province");
   const hasProvinceHub = publishedProvinces.some((item) => item.slug === provinceSlug);

   const siblings = (await getPublishedHubs("district")).filter((item) => item.slug !== hub.slug);

   return (
      <HubPage
         hub={hub}
         heading={`Photo Spots in ${hub.name} District`}
         intro={buildHubIntro({ name: hub.name, spaces: hub.spaces, kind: "district" }).map(
            (paragraph) => (
               <p key={paragraph}>{paragraph}</p>
            )
         )}
         breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Photo spots", path: "/photo-spots" },
            ...(hasProvinceHub
               ? [{ name: province, path: `/photo-spots/province/${provinceSlug}` }]
               : []),
            { name: `${hub.name} District`, path: hub.path },
         ]}
         related={siblings.map((item) => ({
            name: `${item.name} District`,
            path: item.path,
            count: item.spaces.length,
         }))}
         relatedLabel="Other districts"
      />
   );
};

export default DistrictHub;
