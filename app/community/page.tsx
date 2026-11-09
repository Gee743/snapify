import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container";
import SpaceGrid from "../components/listings/SpaceGrid";
import { getPublicSpaces } from "../actions/getPublicSpaces";
import { getPublicSpaceCity } from "../data/publicSpaces";
import JsonLd from "../components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "../libs/structuredData";

export const revalidate = 3600;

export const metadata: Metadata = {
   title: "Free Public Photo & Film Locations in Sri Lanka",
   description:
      "Browse free public places to shoot across Sri Lanka - parks, beaches, viewpoints and landmarks. No booking, no fee: just directions, access notes and tips from local creators.",
   alternates: { canonical: "/community" },
   openGraph: {
      title: "Free Public Photo & Film Locations in Sri Lanka",
      description:
         "Browse free public places to shoot across Sri Lanka. No booking, no fee: just directions, access notes and tips from local creators.",
      url: "/community",
   },
};

interface CommunityPageProps {
   searchParams: {
      area?: string;
   };
}

const CommunityPage = async ({ searchParams }: CommunityPageProps) => {
   const area = searchParams.area;
   const publicSpaces = await getPublicSpaces();
   const spaces = area
      ? publicSpaces.filter((space) => getPublicSpaceCity(space) === area)
      : publicSpaces;

   return (
      <main className="bg-ink pb-24 pt-10">
         <JsonLd
            data={[
               itemListSchema(
                  spaces,
                  area ? `Free photo spots in ${area}, Sri Lanka` : "Free photo spots in Sri Lanka"
               ),
               breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Free public spaces", path: "/community" },
               ]),
            ]}
         />
         <Container>
            <div className="mb-9 max-w-3xl">
               <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-cream sm:text-[2.75rem]">
                  Free public spaces
               </h1>
               <p className="mt-4 max-w-[60ch] text-[16px] leading-7 text-cream-soft">
                  Open locations anyone can shoot at — parks, viewpoints, beaches and murals. No
                  booking or fee, just directions, access rules and tips from other creators.
               </p>
               {area && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/[0.05] py-1.5 pl-3.5 pr-2 text-[13px] text-cream-soft">
                     Filtered to <span className="font-medium text-lime">{area}</span>
                     <Link
                        href="/community"
                        aria-label={`Clear the ${area} filter`}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-cream-muted transition-colors hover:bg-white/20 hover:text-cream"
                     >
                        <svg
                           width="10"
                           height="10"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="3"
                           strokeLinecap="round"
                           aria-hidden="true"
                        >
                           <line x1="5" y1="5" x2="19" y2="19" />
                           <line x1="19" y1="5" x2="5" y2="19" />
                        </svg>
                     </Link>
                  </p>
               )}
            </div>

            {spaces.length > 0 ? (
               <SpaceGrid spaces={spaces} />
            ) : (
               <div className="rounded-panel bg-ink-raised px-6 py-14 text-center shadow-raised">
                  <h2 className="text-lg font-semibold text-cream">
                     No free spaces in this area yet
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cream-muted">
                     Nothing is listed for that area so far. Browse every location instead, or
                     tell us about a place you know.
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
            )}
         </Container>
      </main>
   );
};

export default CommunityPage;
