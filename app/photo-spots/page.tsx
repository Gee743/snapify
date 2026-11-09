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
      <section className="mb-14">
         <h2 className="text-[21px] font-semibold tracking-[-0.02em] text-cream">{title}</h2>
         <p className="mb-5 mt-1.5 max-w-[60ch] text-[14px] leading-6 text-cream-muted">
            {description}
         </p>
         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((hub) => (
               <Link
                  key={hub.path}
                  href={hub.path}
                  className="group flex items-center justify-between gap-3 rounded-xl bg-ink-raised px-4 py-3.5 shadow-raised transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lifted"
               >
                  <span className="text-[14.5px] font-medium text-cream transition-colors duration-200 group-hover:text-lime">
                     {hub.name}
                     {suffix}
                  </span>
                  <span className="tabular shrink-0 text-[12.5px] text-cream-faint">
                     {hub.spaces.length}
                  </span>
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
      <main className="bg-ink pb-24 pt-10">
         <JsonLd
            data={breadcrumbSchema([
               { name: "Home", path: "/" },
               { name: "Photo spots", path: "/photo-spots" },
            ])}
         />
         <Container>
            <div className="mb-12 max-w-3xl">
               <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-cream sm:text-[2.75rem]">
                  Photo Spots in Sri Lanka
               </h1>
               <p className="mt-4 max-w-[62ch] text-[16px] leading-7 text-cream-soft">
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
