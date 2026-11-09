import Link from "next/link";
import Container from "./Container";
import PublicSpaceCard from "./listings/PublicSpaceCard";
import JsonLd from "./JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/app/libs/structuredData";
import { PublicSpace } from "@/app/data/publicSpaces";
import { Hub } from "@/app/libs/hubs";

interface HubPageProps {
   hub: Hub;
   /** H1 copy, e.g. "Photo Spots in Colombo". */
   heading: string;
   /** Location-specific intro. Never templated -- thin doorway pages get filtered. */
   intro: React.ReactNode;
   breadcrumbs: { name: string; path: string }[];
   /** Sibling hubs for lateral internal linking. */
   related?: { name: string; path: string; count: number }[];
   relatedLabel?: string;
   /** Extra blocks under the grid (e.g. best-time guidance). */
   children?: React.ReactNode;
}

const HubPage = ({
   hub,
   heading,
   intro,
   breadcrumbs,
   related = [],
   relatedLabel = "Explore nearby",
   children,
}: HubPageProps) => {
   const spaces: PublicSpace[] = hub.spaces;

   return (
      <main className="bg-[#0a0a0a] pb-16 pt-4 text-[#f5f5f5]">
         <JsonLd
            data={[
               itemListSchema(spaces, `${heading}, Sri Lanka`),
               breadcrumbSchema(breadcrumbs),
            ]}
         />
         <Container>
            <nav aria-label="Breadcrumb" className="mb-5 text-[12px] text-[#6f6f6f]">
               {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.path}>
                     {index > 0 && <span className="px-1.5">/</span>}
                     {index === breadcrumbs.length - 1 ? (
                        <span className="text-[#929292]">{crumb.name}</span>
                     ) : (
                        <Link href={crumb.path} className="transition hover:text-[#dcff1a]">
                           {crumb.name}
                        </Link>
                     )}
                  </span>
               ))}
            </nav>

            <div className="mb-6 border-b border-white/10 pb-6">
               <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">{heading}</h1>
               <div className="mt-4 max-w-2xl space-y-3 text-sm leading-6 text-[#c4c4c4]">
                  {intro}
               </div>
               <p className="mt-4 text-sm text-[#929292]">
                  {spaces.length} {spaces.length === 1 ? "place" : "places"} listed
               </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
               {spaces.map((space, index) => (
                  <PublicSpaceCard key={space.id} data={space} dark priority={index < 4} />
               ))}
            </div>

            {children}

            {related.length > 0 && (
               <section className="mt-14 border-t border-white/10 pt-7">
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#dcff1a]">
                     {relatedLabel}
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                     {related.map((item) => (
                        <Link
                           key={item.path}
                           href={item.path}
                           className="rounded-lg border border-white/15 px-3.5 py-2 text-sm text-[#d4d4d4] transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
                        >
                           {item.name}
                           <span className="ml-1.5 text-[#6f6f6f]">{item.count}</span>
                        </Link>
                     ))}
                  </div>
               </section>
            )}
         </Container>
      </main>
   );
};

export default HubPage;
