import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";
import JsonLd from "../components/JsonLd";
import StudioGrid from "../components/listings/StudioGrid";
import StudioFilters from "../components/listings/StudioFilters";
import StudioEmptyState from "../components/StudioEmptyState";
import { getStudios } from "../actions/getStudios";
import { breadcrumbSchema } from "../libs/structuredData";
import { studioListSchema } from "../libs/studioStructuredData";
import {
   RawSearchParams,
   applyStudioFilters,
   buildStudioFacets,
   hasActiveStudioFilters,
   parseStudioFilters,
} from "../libs/studioFilters";
import { STUDIO_TYPES, STUDIO_TYPE_LABELS, STUDIO_TYPE_SLUGS } from "../libs/studioTaxonomy";

export const revalidate = 3600;

const TITLE = "Photo & Film Studios to Hire in Sri Lanka";
const DESCRIPTION =
   "Browse bookable studios, villas, rooftops and warehouses for photo and film shoots across Sri Lanka. Rates, capacity, amenities and kit, with enquiries straight to the owner.";

interface StudiosPageProps {
   searchParams: RawSearchParams;
}

/**
 * Filtered views carry noindex for the same reason /community's do: the facets
 * multiply into thousands of near-identical URLs. The type hubs under
 * /studios/type are the indexable surface.
 */
export function generateMetadata({ searchParams }: StudiosPageProps): Metadata {
   const filtered = hasActiveStudioFilters(parseStudioFilters(searchParams));

   return {
      title: TITLE,
      description: DESCRIPTION,
      alternates: { canonical: "/studios" },
      ...(filtered ? { robots: { index: false, follow: true } } : {}),
      openGraph: {
         title: TITLE,
         description:
            "Bookable studios, villas, rooftops and warehouses for shoots across Sri Lanka, with rates and capacity up front.",
         url: "/studios",
      },
   };
}

const StudiosPage = async ({ searchParams }: StudiosPageProps) => {
   const filters = parseStudioFilters(searchParams);
   const allStudios = await getStudios();

   const studios = applyStudioFilters(allStudios, filters);
   const facets = buildStudioFacets(allStudios, filters);
   const filtered = hasActiveStudioFilters(filters);

   // Nothing published yet is the expected state before owners onboard, and it
   // is a different page from "your filters matched nothing" — one recruits an
   // owner, the other offers to widen a search.
   const catalogueEmpty = allStudios.length === 0;

   return (
      <main className="bg-ink pb-24 pt-10">
         <JsonLd
            data={[
               ...(studios.length
                  ? [studioListSchema(studios, "Studios to hire in Sri Lanka")]
                  : []),
               breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Studios", path: "/studios" },
               ]),
            ]}
         />
         <Container>
            <div className="mb-7 max-w-3xl">
               <span className="inline-flex rounded-full border border-ink-line bg-white/[0.03] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-lime">
                  PAID &amp; BOOKABLE
               </span>
               <h1 className="mt-4 text-[2rem] font-semibold tracking-[-0.03em] text-cream sm:text-[2.75rem]">
                  Studios and spaces to hire
               </h1>
               <p className="mt-4 max-w-[60ch] text-[16px] leading-7 text-cream-soft">
                  Professional spaces you book and pay for — daylight studios, cycloramas, villas,
                  rooftops and warehouses. Rates, capacity and kit up front, with enquiries going
                  straight to the owner.{" "}
                  <Link
                     href="/community"
                     className="text-lime underline decoration-lime/40 underline-offset-4 transition-colors hover:decoration-lime"
                  >
                     Looking for free public spots instead?
                  </Link>
               </p>
            </div>

            {catalogueEmpty ? (
               <StudioEmptyState />
            ) : (
               <>
                  <StudioFilters
                     filters={filters}
                     facets={facets}
                     resultCount={studios.length}
                     basePath="/studios"
                  />

                  <StudioGrid
                     studios={studios}
                     emptyState={
                        <div className="rounded-panel bg-ink-raised px-6 py-14 text-center shadow-raised">
                           <h2 className="text-lg font-semibold text-cream">
                              {filtered ? "Nothing matches those filters" : "No studios listed yet"}
                           </h2>
                           <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cream-muted">
                              {filtered
                                 ? "Try widening the budget or removing a filter. Studios quoting on request are hidden while a budget filter is active."
                                 : "Paid, bookable spaces are opening soon."}
                           </p>
                           <div className="mt-6 flex flex-wrap justify-center gap-3">
                              <Link
                                 href="/studios"
                                 className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.97]"
                              >
                                 Show all studios
                              </Link>
                              <Link
                                 href="/list-your-space"
                                 className="rounded-xl border border-ink-lineStrong px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-200 hover:border-lime hover:text-lime"
                              >
                                 List your space
                              </Link>
                           </div>
                        </div>
                     }
                  />

                  <section className="mt-16 border-t border-ink-line pt-9">
                     <h2 className="text-lg font-semibold tracking-[-0.01em] text-cream">
                        Browse by type
                     </h2>
                     <div className="mt-4 flex flex-wrap gap-2.5">
                        {STUDIO_TYPES.map((type) => (
                           <Link
                              key={type}
                              href={`/studios/type/${STUDIO_TYPE_SLUGS[type]}`}
                              className="rounded-full border border-ink-lineStrong px-4 py-2 text-[13px] font-medium text-cream-soft transition-colors duration-200 hover:border-lime hover:text-lime"
                           >
                              {STUDIO_TYPE_LABELS[type]}
                           </Link>
                        ))}
                     </div>
                  </section>
               </>
            )}
         </Container>
      </main>
   );
};

export default StudiosPage;
