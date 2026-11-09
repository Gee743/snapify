import type { Metadata } from "next";
import Container from "../components/Container";
import PublicSpaceCard from "../components/listings/PublicSpaceCard";
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
      <main className="bg-[#0a0a0a] pb-16 pt-4 text-[#f5f5f5]">
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
               <div className="mb-6 border-b border-white/10 pb-5">
                  <div className="mb-2 flex items-center gap-2.5">
                     <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Free public spaces
                     </h1>
                     <span className="rounded-full bg-[#dcff1a] px-2.5 py-[3px] text-[10px] font-bold tracking-wide text-[#0a0a0a]">
                        COMMUNITY
                     </span>
                  </div>
                  <p className="max-w-[560px] text-sm leading-6 text-[#929292]">
                     Open locations anyone can shoot at — parks, viewpoints, murals. No booking or
                     fee, just directions and tips from other creators.
                  </p>
                  {area && (
                     <p className="mt-3 text-sm text-[#929292]">
                        Showing {spaces.length} {spaces.length === 1 ? "place" : "places"} in{" "}
                        <span className="text-[#dcff1a]">{area}</span>.
                     </p>
                  )}
               </div>
               {spaces.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                     {spaces.map((space, index) => (
                        <PublicSpaceCard
                           key={space.id}
                           data={space}
                           dark
                           priority={index < 4}
                        />
                     ))}
                  </div>
               ) : (
                  <div className="rounded-2xl border border-white/10 bg-[#101010] px-6 py-12 text-center">
                     <h2 className="text-lg font-semibold">No free spaces in this area yet.</h2>
                     <p className="mt-2 text-sm text-[#929292]">
                        Choose another area to explore public locations.
                     </p>
                     <a
                        href="/community"
                        className="mt-5 inline-flex rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
                     >
                        Show all spaces
                     </a>
                  </div>
               )}
            </Container>
      </main>
   );
};

export default CommunityPage;
