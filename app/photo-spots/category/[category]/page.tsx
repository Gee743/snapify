import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HubPage from "@/app/components/HubPage";
import { getHub, getPublishedHubs, MIN_PLACES_FOR_HUB } from "@/app/libs/hubs";
import { buildHubIntro } from "@/app/libs/hubCopy";

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
   return (await getPublishedHubs("category")).map((hub) => ({ category: hub.slug }));
}

interface Params {
   category: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
   const hub = await getHub("category", params.category);
   if (!hub || hub.spaces.length < MIN_PLACES_FOR_HUB) {
      return { title: "Not found", robots: { index: false, follow: true } };
   }

   // "Best Beaches in Sri Lanka for Photography" targets a far larger query
   // than any single city hub.
   const title = `Best ${hub.name} in Sri Lanka for Photography (${hub.spaces.length} Spots)`;
   return {
      title,
      description: `${hub.spaces.length} ${hub.name.toLowerCase()} across Sri Lanka worth shooting, with directions, access rules, drone policy and the best light for each.`,
      alternates: { canonical: hub.path },
      openGraph: { title, url: hub.path },
   };
}

const CategoryHub = async ({ params }: { params: Params }) => {
   const hub = await getHub("category", params.category);
   if (!hub || hub.spaces.length < MIN_PLACES_FOR_HUB) notFound();

   const siblings = (await getPublishedHubs("category")).filter((item) => item.slug !== hub.slug);

   return (
      <HubPage
         hub={hub}
         heading={`${hub.name} to Photograph in Sri Lanka`}
         intro={buildHubIntro({ name: hub.name, spaces: hub.spaces, kind: "category" }).map(
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
         relatedLabel="Other kinds of place"
      />
   );
};

export default CategoryHub;
