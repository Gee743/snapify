import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema } from "@/app/libs/structuredData";
import { absoluteUrl } from "@/app/libs/site";
import guides from "@/app/data/guides";

export const revalidate = 3600;

export const metadata: Metadata = {
   title: "Guides for Photographers Shooting in Sri Lanka",
   description:
      "Practical guides to shooting in Sri Lanka: drone law, permit requirements across the six authorities that issue them, and which coast is shootable in which month.",
   alternates: { canonical: "/guides" },
};

const GuidesIndex = () => (
   <main className="bg-ink pb-24 pt-10">
      <JsonLd
         data={[
            breadcrumbSchema([
               { name: "Home", path: "/" },
               { name: "Guides", path: "/guides" },
            ]),
            {
               "@context": "https://schema.org",
               "@type": "ItemList",
               name: "Snapify guides for photographers in Sri Lanka",
               numberOfItems: guides.length,
               itemListElement: guides.map((guide, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: guide.title,
                  url: absoluteUrl(`/guides/${guide.slug}`),
               })),
            },
         ]}
      />
      <Container>
         <div className="mb-10 max-w-3xl">
            <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-cream sm:text-[2.75rem]">
               Guides
            </h1>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-7 text-cream-soft">
               The things that decide whether a shoot in Sri Lanka actually happens: what the
               drone rules require, which of the six permitting authorities applies to your
               location, and which coast is worth travelling to in a given month.
            </p>
         </div>

         <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {guides.map((guide) => (
               <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group flex flex-col rounded-card bg-ink-raised p-6 shadow-raised transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lifted"
               >
                  <h2 className="text-[17px] font-semibold leading-snug tracking-[-0.015em] text-cream transition-colors duration-200 group-hover:text-lime">
                     {guide.title}
                  </h2>
                  <p className="mt-3 grow text-[14px] leading-6 text-cream-muted">{guide.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-lime">
                     Read the guide
                     <span
                        aria-hidden="true"
                        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                     >
                        &rarr;
                     </span>
                  </span>
               </Link>
            ))}
         </div>
      </Container>
   </main>
);

export default GuidesIndex;
