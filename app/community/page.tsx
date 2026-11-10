import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";
import SpaceGrid from "../components/listings/SpaceGrid";
import SpaceFilters from "../components/listings/SpaceFilters";
import { getPublicSpaces } from "../actions/getPublicSpaces";
import JsonLd from "../components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "../libs/structuredData";
import {
   RawSearchParams,
   applyFilters,
   buildFacets,
   hasActiveFilters,
   parseFilters,
} from "../libs/spaceFilters";

export const revalidate = 3600;

const TITLE = "Free Public Photo & Film Locations in Sri Lanka";
const DESCRIPTION =
   "Browse free public places to shoot across Sri Lanka - parks, beaches, viewpoints and landmarks. No booking, no fee: just directions, access notes and tips from local creators.";

interface CommunityPageProps {
   searchParams: RawSearchParams;
}

/**
 * Filtered views are real pages for a visitor but not pages worth indexing:
 * the facets multiply into thousands of near-identical URLs. They canonicalise
 * to the bare listing and carry noindex, while the curated province/district/
 * category hubs under /photo-spots remain the indexable surface.
 */
export function generateMetadata({ searchParams }: CommunityPageProps): Metadata {
   const filtered = hasActiveFilters(parseFilters(searchParams));

   return {
      title: TITLE,
      description: DESCRIPTION,
      alternates: { canonical: "/community" },
      ...(filtered ? { robots: { index: false, follow: true } } : {}),
      openGraph: {
         title: TITLE,
         description:
            "Browse free public places to shoot across Sri Lanka. No booking, no fee: just directions, access notes and tips from local creators.",
         url: "/community",
      },
   };
}

const CommunityPage = async ({ searchParams }: CommunityPageProps) => {
   const filters = parseFilters(searchParams);
   const publicSpaces = await getPublicSpaces();

   const spaces = applyFilters(publicSpaces, filters);
   const facets = buildFacets(publicSpaces, filters);
   const filtered = hasActiveFilters(filters);

   return (
      <main className="bg-ink pb-24 pt-10">
         <JsonLd
            data={[
               itemListSchema(spaces, "Free photo spots in Sri Lanka"),
               breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Free public spaces", path: "/community" },
               ]),
            ]}
         />
         <Container>
            <div className="mb-7 max-w-3xl">
               <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-cream sm:text-[2.75rem]">
                  Free public spaces
               </h1>
               <p className="mt-4 max-w-[60ch] text-[16px] leading-7 text-cream-soft">
                  Open locations anyone can shoot at — parks, viewpoints, beaches and murals. No
                  booking or fee, just directions, access rules and tips from other creators.
               </p>
            </div>

            <SpaceFilters
               filters={filters}
               facets={facets}
               resultCount={spaces.length}
               basePath="/community"
            />

            <SpaceGrid
               spaces={spaces}
               showFilters={false}
               emptyState={
                  <div className="rounded-panel bg-ink-raised px-6 py-14 text-center shadow-raised">
                     <h2 className="text-lg font-semibold text-cream">
                        {filtered ? "Nothing matches those filters" : "No free spaces listed yet"}
                     </h2>
                     <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cream-muted">
                        {filtered
                           ? "Try removing a filter or widening the area. Or tell us about a place you know."
                           : "Nothing is listed so far. Tell us about a place you know."}
                     </p>
                     <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                           href="/community"
                           className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.97]"
                        >
                           Show all spaces
                        </Link>
                        <Link
                           href="/submit"
                           className="rounded-xl border border-ink-lineStrong px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-200 hover:border-lime hover:text-lime"
                        >
                           Suggest a place
                        </Link>
                     </div>
                  </div>
               }
            />
         </Container>
      </main>
   );
};

export default CommunityPage;
