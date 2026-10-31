import Link from "next/link";
import { getPublicSpaces } from "@/app/actions/getPublicSpaces";
import Container from "../Container";
import PublicSpaceCard from "../listings/PublicSpaceCard";

const CommunitySection = async () => {
   const publicSpaces = await getPublicSpaces();

   return (
      <section className="bg-[#f1f8f2] mt-10 py-7">
         <Container>
            <div className="flex items-center gap-2.5 mb-1.5">
               <h2 className="text-[15px] font-bold m-0 text-[#222]">Free Public Spaces</h2>
               <span className="bg-[#2fa35d] text-white text-[10px] font-bold tracking-wide px-2.5 py-[3px] rounded-full">
                  COMMUNITY
               </span>
            </div>
            <p className="text-[13px] text-[#5c5c5c] max-w-[560px] mb-[18px]">
               Open locations anyone can shoot at — parks, viewpoints, murals. No booking or fee,
               just directions and tips from other creators.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               {publicSpaces.slice(0, 5).map((space) => (
                  <PublicSpaceCard key={space.id} data={space} />
               ))}
            </div>
            <Link
               href="/community"
               className="mt-5 text-[13px] font-semibold text-[#2fa35d] hover:underline"
            >
               See all free spaces
            </Link>
         </Container>
      </section>
   );
};

export default CommunitySection;
