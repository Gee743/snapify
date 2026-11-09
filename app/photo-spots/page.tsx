import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema } from "@/app/libs/structuredData";
import { getPublishedHubs, Hub } from "@/app/libs/hubs";

export const revalidate = 3600;

export const metadata: Metadata = {
   title: "Photo Spots in Sri Lanka by Region and Type",
   description:
      "Browse Sri Lankan photo and film locations by province, district, city or kind of place — beaches, viewpoints, waterfalls, temples and urban streets.",
   alternates: { canonical: "/photo-spots" },
};

const HubGroup = ({
   title,
   description,
   hubs,
   suffix = "",
}: {
   title: string;
   description: string;
   hubs: Hub[];
   suffix?: string;
}) => {
   if (hubs.length === 0) return null;

   return (
      <section className="mb-12">
         <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
         <p className="mb-4 mt-1 text-sm text-[#929292]">{description}</p>
         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((hub) => (
               <Link
                  key={hub.path}
                  href={hub.path}
                  className="flex items-baseline justify-between rounded-xl border border-white/10 bg-[#101010] px-4 py-3 transition hover:border-[#dcff1a]"
               >
                  <span className="text-sm font-medium text-[#f5f5f5]">
                     {hub.name}
                     {suffix}
                  </span>
                  <span className="text-[12px] text-[#6f6f6f]">{hub.spaces.length}</span>
               </Link>
            ))}
         </div>
      </section>
   );
};

const PhotoSpotsIndex = async () => {
   const [provinces, districts, cities, categories] = await Promise.all([
      getPublishedHubs("province"),
      getPublishedHubs("district"),
      getPublishedHubs("city"),
      getPublishedHubs("category"),
   ]);

   return (
      <main className="-mt-6 min-h-screen bg-[#0a0a0a] pb-16 pt-10 text-[#f5f5f5]">
         <JsonLd
            data={breadcrumbSchema([
               { name: "Home", path: "/" },
               { name: "Photo spots", path: "/photo-spots" },
            ])}
         />
         <Container>
            <div className="mb-10 border-b border-white/10 pb-6">
               <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
                  Photo Spots in Sri Lanka
               </h1>
               <p className="mt-4 max-w-2xl text-sm leading-6 text-[#c4c4c4]">
                  Every location on Snapify, grouped by where it is and what kind of place it is.
                  Each listing carries directions, entry fees, permit requirements and the drone
                  rules that actually apply — the details that decide whether a shoot is possible
                  before you travel.
               </p>
            </div>

            <HubGroup
               title="By kind of place"
               description="Beaches, viewpoints, waterfalls, temples and urban streets across the country."
               hubs={categories}
            />
            <HubGroup
               title="By city"
               description="Cities with enough listed locations to plan a day around."
               hubs={cities}
            />
            <HubGroup
               title="By district"
               description="The administrative tier between province and city."
               hubs={districts}
               suffix=" District"
            />
            <HubGroup
               title="By province"
               description="Broadest view, useful when planning a route rather than a single shoot."
               hubs={provinces}
            />
         </Container>
      </main>
   );
};

export default PhotoSpotsIndex;
