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
   <main className="bg-[#0a0a0a] pb-16 pt-4 text-[#f5f5f5]">
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
         <div className="mb-10 border-b border-white/10 pb-6">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Guides</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#c4c4c4]">
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
                  className="group flex flex-col rounded-2xl border border-white/10 bg-[#101010] p-6 transition hover:border-[#dcff1a]"
               >
                  <h2 className="text-lg font-semibold leading-snug tracking-tight text-[#f5f5f5] group-hover:text-[#dcff1a]">
                     {guide.title}
                  </h2>
                  <p className="mt-3 grow text-sm leading-6 text-[#929292]">{guide.summary}</p>
                  <span className="mt-5 text-[12px] font-semibold text-[#dcff1a]">
                     Read the guide →
                  </span>
               </Link>
            ))}
         </div>
      </Container>
   </main>
);

export default GuidesIndex;
