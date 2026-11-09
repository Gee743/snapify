import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HubPage from "@/app/components/HubPage";
import { getHub, getPublishedHubs, MIN_PLACES_FOR_HUB } from "@/app/libs/hubs";
import { buildHubIntro } from "@/app/libs/hubCopy";

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
   return (await getPublishedHubs("province")).map((hub) => ({ province: hub.slug }));
}

interface Params {
   province: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
   const hub = await getHub("province", params.province);
   if (!hub || hub.spaces.length < MIN_PLACES_FOR_HUB) {
      return { title: "Not found", robots: { index: false, follow: true } };
   }

   const title = `${hub.spaces.length} Photo Spots in ${hub.name}, Sri Lanka`;
   return {
      title,
      description: `Public places to photograph and film across ${hub.name}, with directions, entry fees, permit requirements and drone rules for each one.`,
      alternates: { canonical: hub.path },
      openGraph: { title, url: hub.path },
   };
}

const ProvinceHub = async ({ params }: { params: Params }) => {
   const hub = await getHub("province", params.province);
   if (!hub || hub.spaces.length < MIN_PLACES_FOR_HUB) notFound();

   const siblings = (await getPublishedHubs("province")).filter((item) => item.slug !== hub.slug);

   return (
      <HubPage
         hub={hub}
         heading={`Photo Spots in ${hub.name}`}
         intro={buildHubIntro({ name: hub.name, spaces: hub.spaces, kind: "province" }).map(
            (paragraph) => (
               <p key={paragraph}>{paragraph}</p>
            )
         )}
         breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Photo spots", path: "/photo-spots" },
            { name: hub.name, path: hub.path },
         ]}
         related={siblings.map((item) => ({
            name: item.name,
            path: item.path,
            count: item.spaces.length,
         }))}
         relatedLabel="Other provinces"
      />
   );
};

export default ProvinceHub;
