import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/app/components/Container";
import JsonLd from "@/app/components/JsonLd";
import StudioGrid from "@/app/components/listings/StudioGrid";
import StudioFilters from "@/app/components/listings/StudioFilters";
import { getStudios } from "@/app/actions/getStudios";
import { breadcrumbSchema } from "@/app/libs/structuredData";
import { studioListSchema } from "@/app/libs/studioStructuredData";
import {
   RawSearchParams,
   applyStudioFilters,
   buildStudioFacets,
   hasActiveStudioFilters,
   parseStudioFilters,
} from "@/app/libs/studioFilters";
import {
   STUDIO_TYPES,
   STUDIO_TYPE_BLURBS,
   STUDIO_TYPE_LABELS,
   STUDIO_TYPE_SLUGS,
   studioTypeFromSlug,
} from "@/app/libs/studioTaxonomy";

export const revalidate = 3600;
export const dynamicParams = true;

/**
 * Type hubs: /studios/type/daylight-studios and friends.
 *
 * Unlike the /photo-spots hubs there is no MIN_PLACES_FOR_HUB gate. Those hubs
 * are generated per city/district and would otherwise ship hundreds of
 * near-empty pages; here there are exactly eight, each a genuine category a
 * crew searches for ("cyclorama studio Colombo"). An empty one explains what
 * the type is and recruits owners, which is worth more than a 404 — but it
 * carries noindex until it has something to show.
 */
export async function generateStaticParams() {
   return STUDIO_TYPES.map((type) => ({ type: STUDIO_TYPE_SLUGS[type] }));
}

interface TypePageProps {
   params: { type: string };
   searchParams: RawSearchParams;
}

export async function generateMetadata({
   params,
   searchParams,
}: TypePageProps): Promise<Metadata> {
   const studioType = studioTypeFromSlug(params.type);
   if (!studioType) {
      return { title: "Studio type not found", robots: { index: false, follow: true } };
   }

   const label = STUDIO_TYPE_LABELS[studioType];
   const plural = label.endsWith("s") ? label : `${label}s`;
   const title = `${plural} to Hire in Sri Lanka`;
   const description = `${STUDIO_TYPE_BLURBS[studioType]} Compare rates, capacity and kit, and enquire with the owner directly.`;
   const path = `/studios/type/${params.type}`;

   const studios = await getStudios();
   const inType = studios.filter((studio) => studio.studioType === studioType);
   const filtered = hasActiveStudioFilters(parseStudioFilters(searchParams));

   return {
      title,
      description,
      alternates: { canonical: path },
      // noindex while the hub is empty or filtered: an empty hub has nothing
      // to rank for, and filtered views multiply into near-identical URLs.
      ...(inType.length === 0 || filtered ? { robots: { index: false, follow: true } } : {}),
      openGraph: { title, description, url: path },
   };
}

const StudioTypePage = async ({ params, searchParams }: TypePageProps) => {
   const studioType = studioTypeFromSlug(params.type);
   if (!studioType) {
      notFound();
   }

   const label = STUDIO_TYPE_LABELS[studioType];
   const plural = label.endsWith("s") ? label : `${label}s`;

   const all = await getStudios();
   const inType = all.filter((studio) => studio.studioType === studioType);

   // The page's own type is fixed, so it is forced into the filter state
   // rather than read from the query string — the facets then count within
   // this type instead of across the whole catalogue.
   const filters = {
      ...parseStudioFilters(searchParams),
      type: STUDIO_TYPE_SLUGS[studioType],
   };

   const studios = applyStudioFilters(all, filters);
   const facets = buildStudioFacets(inType, filters);
   const basePath = `/studios/type/${params.type}`;

   return (
      <main className="bg-ink pb-24 pt-10">
         <JsonLd
            data={[
               ...(studios.length ? [studioListSchema(studios, `${plural} in Sri Lanka`)] : []),
               breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Studios", path: "/studios" },
                  { name: plural, path: basePath },
               ]),
            ]}
         />
         <Container>
            <nav aria-label="Breadcrumb" className="mb-6">
               <ol className="flex flex-wrap items-center gap-x-1.5 text-[12.5px] text-cream-faint">
                  <li>
                     <Link href="/" className="transition-colors duration-200 hover:text-lime">
                        Home
                     </Link>
                  </li>
                  <li aria-hidden="true" className="text-cream-faint/60">
                     /
                  </li>
                  <li>
                     <Link
                        href="/studios"
                        className="transition-colors duration-200 hover:text-lime"
                     >
                        Studios
                     </Link>
                  </li>
                  <li aria-hidden="true" className="text-cream-faint/60">
                     /
                  </li>
                  <li aria-current="page" className="text-cream-muted">
                     {plural}
                  </li>
               </ol>
            </nav>

            <div className="mb-7 max-w-3xl">
               <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-cream sm:text-[2.75rem]">
                  {plural} in Sri Lanka
               </h1>
               <p className="mt-4 max-w-[60ch] text-[16px] leading-7 text-cream-soft">
                  {STUDIO_TYPE_BLURBS[studioType]}
               </p>
            </div>

            {inType.length > 0 && (
               <StudioFilters
                  filters={filters}
                  facets={facets}
                  resultCount={studios.length}
                  basePath={basePath}
                  showTypeFilter={false}
               />
            )}

            <StudioGrid
               studios={studios}
               emptyState={
                  <div className="rounded-panel bg-ink-raised px-6 py-14 text-center shadow-raised">
                     <h2 className="text-lg font-semibold text-cream">
                        {inType.length === 0
                           ? `No ${plural.toLowerCase()} listed yet`
                           : "Nothing matches those filters"}
                     </h2>
                     <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cream-muted">
                        {inType.length === 0
                           ? "We are onboarding owners now. If you run one, list it and we will come to you first."
                           : "Try widening the budget or removing a filter."}
                     </p>
                     <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                           href={basePath}
                           className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.97]"
                        >
                           {inType.length === 0 ? "Browse all studios" : `Show all ${plural.toLowerCase()}`}
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
                  Other types of space
               </h2>
               <div className="mt-4 flex flex-wrap gap-2.5">
                  {STUDIO_TYPES.filter((type) => type !== studioType).map((type) => (
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
         </Container>
      </main>
   );
};

export default StudioTypePage;
