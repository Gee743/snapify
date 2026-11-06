import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import PublicSpaceCard from "../components/listings/PublicSpaceCard";
import { getPublicSpaces } from "../actions/getPublicSpaces";
import { getPublicSpaceArea } from "../data/publicSpaces";

export const dynamic = "force-dynamic";

interface CommunityPageProps {
   searchParams: {
      area?: string;
   };
}

const CommunityPage = async ({ searchParams }: CommunityPageProps) => {
   const area = searchParams.area;
   const publicSpaces = await getPublicSpaces();
   const spaces = area
      ? publicSpaces.filter((space) => getPublicSpaceArea(space) === area)
      : publicSpaces;

   return (
      <ClientOnly>
         <main className="-mt-6 min-h-screen bg-[#0a0a0a] pb-16 pt-10 text-[#f5f5f5]">
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
                     {spaces.map((space) => (
                        <PublicSpaceCard key={space.id} data={space} dark />
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
      </ClientOnly>
   );
};

export default CommunityPage;
