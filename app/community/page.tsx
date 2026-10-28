import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import PublicSpaceCard from "../components/listings/PublicSpaceCard";
import publicSpaces, { getPublicSpaceArea } from "../data/publicSpaces";

export const dynamic = "force-dynamic";

interface CommunityPageProps {
   searchParams: {
      area?: string;
   };
}

const CommunityPage = ({ searchParams }: CommunityPageProps) => {
   const area = searchParams.area;
   const spaces = area
      ? publicSpaces.filter((space) => getPublicSpaceArea(space) === area)
      : publicSpaces;

   return (
      <ClientOnly>
         <Container>
            <div className="flex items-center gap-2.5 mb-1.5">
               <h1 className="text-[15px] font-bold text-[#222]">Free Public Spaces</h1>
               <span className="bg-[#2fa35d] text-white text-[10px] font-bold tracking-wide px-2.5 py-[3px] rounded-full">
                  COMMUNITY
               </span>
            </div>
            <p className="text-[13px] text-[#5c5c5c] max-w-[560px] mb-6">
               Open locations anyone can shoot at — parks, viewpoints, murals. No booking or fee,
               just directions and tips from other creators.
            </p>
            {spaces.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {spaces.map((space) => (
                     <PublicSpaceCard key={space.id} data={space} />
                  ))}
               </div>
            ) : (
               <p className="py-10 text-center text-sm text-[#717171]">
                  No free spaces in this area yet. Choose another area to explore.
               </p>
            )}
         </Container>
      </ClientOnly>
   );
};

export default CommunityPage;
