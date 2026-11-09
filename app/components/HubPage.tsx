import Link from "next/link";
import Container from "./Container";
import SpaceGrid from "./listings/SpaceGrid";
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
      <main className="bg-ink pb-24 pt-8">
         <JsonLd
            data={[
               itemListSchema(spaces, `${heading}, Sri Lanka`),
               breadcrumbSchema(breadcrumbs),
            ]}
         />
         <Container>
            <nav aria-label="Breadcrumb" className="mb-6">
               <ol className="flex flex-wrap items-center gap-x-1.5 text-[12.5px] text-cream-faint">
                  {breadcrumbs.map((crumb, index) => (
                     <li key={crumb.path} className="flex items-center gap-1.5">
                        {index > 0 && (
                           <span aria-hidden="true" className="text-cream-faint/60">
                              /
                           </span>
                        )}
                        {index === breadcrumbs.length - 1 ? (
                           <span aria-current="page" className="text-cream-muted">
                              {crumb.name}
                           </span>
                        ) : (
                           <Link
                              href={crumb.path}
                              className="inline-flex min-h-[32px] items-center transition-colors duration-200 hover:text-lime"
                           >
                              {crumb.name}
                           </Link>
                        )}
                     </li>
                  ))}
               </ol>
            </nav>

            <div className="mb-9 max-w-3xl">
               <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-cream sm:text-[2.75rem]">
                  {heading}
               </h1>
               <div className="mt-4 max-w-[62ch] space-y-3 text-[15.5px] leading-7 text-cream-soft">
                  {intro}
               </div>
               <p className="mt-5 text-[13px] text-cream-muted">
                  <span className="tabular font-medium text-cream">{spaces.length}</span>{" "}
                  {spaces.length === 1 ? "place" : "places"} listed
               </p>
            </div>

            <SpaceGrid spaces={spaces} />

            {children}

            {related.length > 0 && (
               <section className="mt-20 border-t border-ink-line pt-9">
                  <h2 className="mb-5 text-[19px] font-semibold tracking-[-0.02em] text-cream">
                     {relatedLabel}
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                     {related.map((item) => (
                        <Link
                           key={item.path}
                           href={item.path}
                           className="group inline-flex items-center gap-2 rounded-xl bg-white/[0.05] px-4 py-2.5 text-sm text-cream-soft transition-all duration-200 ease-out hover:bg-white/[0.09] hover:text-cream active:scale-[0.98]"
                        >
                           {item.name}
                           <span className="tabular text-[12px] text-cream-faint">
                              {item.count}
                           </span>
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
