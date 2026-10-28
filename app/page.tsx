export const dynamic = "force-dynamic";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import PublicSpaceCard from "./components/listings/PublicSpaceCard";
import publicSpaces, { getPublicSpaceArea } from "./data/publicSpaces";

interface HomeProps {
   searchParams: {
      area?: string;
   };
}

const Home = async ({ searchParams }: HomeProps) => {
   const spaces = searchParams.area
      ? publicSpaces.filter((space) => getPublicSpaceArea(space) === searchParams.area)
      : publicSpaces;

   return (
      <ClientOnly>
         <Container>
            <section className="relative mt-12 mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#183b2c] via-[#236447] to-[#2fa35d] px-7 py-8 text-white sm:px-10 sm:py-10">
               <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border-[24px] border-white/10" />
               <div className="absolute right-24 -bottom-16 h-40 w-40 rounded-full bg-white/5" />
               <div className="relative max-w-2xl">
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold tracking-[0.16em]">
                     COMING SOON
                  </span>
                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                     Paid spaces are on the way
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">
                     We’re bringing you a handpicked collection of bookable studios, homes, and
                     unique shoot locations. For now, explore the best spots that are free to visit.
                  </p>
               </div>
            </section>
            <h2 className="text-[13px] font-bold tracking-wide text-[#444] uppercase mb-3.5 mt-4">
               Free Public Spaces
            </h2>
            <p className="text-[13px] text-[#5c5c5c] max-w-[560px] mb-6">
               Discover open locations for your next shoot — no booking or fee required.
            </p>
            {spaces.length === 0 ? (
               <EmptyState
                  title="No free spaces in this area yet."
                  subTitle="Choose another area to explore public locations."
                  showReset
               />
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {spaces.map((space) => (
                     <PublicSpaceCard key={space.id} data={space} />
                  ))}
               </div>
            )}
            
         </Container>
      </ClientOnly>
   );
};

export default Home;
