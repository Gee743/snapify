export const dynamic = "force-dynamic";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import PublicSpaceCard from "./components/listings/PublicSpaceCard";
import { getPublicSpaces } from "./actions/getPublicSpaces";
import { getPublicSpaceArea } from "./data/publicSpaces";

interface HomeProps {
   searchParams: {
      area?: string;
   };
}

const Home = async ({ searchParams }: HomeProps) => {
   const publicSpaces = await getPublicSpaces();
   const spaces = searchParams.area
      ? publicSpaces.filter((space) => getPublicSpaceArea(space) === searchParams.area)
      : publicSpaces;

   return (
      <ClientOnly>
         <main className="relative isolate -mt-6 min-h-screen overflow-hidden bg-[#0a0a0a] pb-16 text-[#f5f5f5]">
            <div
               className="pointer-events-none absolute inset-0 -z-10"
               style={{
                  background:
                     "radial-gradient(520px 420px at 0% 26%, rgba(220,255,26,.14), transparent 70%)",
               }}
            />
            <svg
               className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
               viewBox="0 0 1200 1000"
               preserveAspectRatio="xMidYMin slice"
               aria-hidden="true"
            >
               <path
                  d="M-60 640C220 560 420 720 700 580S1100 430 1280 300M-60 700C240 620 440 780 720 640S1120 490 1280 370M300 -40C420 140 640 120 780 260S1000 420 1280 380M520 -40C640 120 820 100 940 220S1120 330 1280 300"
                  fill="none"
                  stroke="rgba(255,255,255,.055)"
                  strokeWidth="1"
               />
            </svg>
            <Container>
               <section className="mx-auto flex max-w-4xl flex-col items-center py-16 text-center sm:py-24">
                  <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-[#d4d4d4]">
                     <span className="h-2 w-2 rounded-full bg-[#dcff1a] shadow-[0_0_10px_#dcff1a]" />
                     Free places to create across Sri Lanka
                  </div>
                  <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
                     Your next great shot starts{" "}
                     <span className="text-[#dcff1a]">somewhere.</span>
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-7 text-[#929292] sm:text-lg">
                     Find inspiring public places to shoot, explore, and create — no booking and
                     no fees.
                  </p>
                  <a
                     href="#free-spaces"
                     className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#dcff1a] px-6 py-3.5 text-sm font-semibold text-[#0a0a0a] shadow-[0_0_28px_rgba(220,255,26,.14)] transition hover:brightness-105"
                  >
                     Explore free spaces
                     <span aria-hidden="true">↓</span>
                  </a>
               </section>

               <section className="relative mb-16 overflow-hidden rounded-2xl border border-white/10 bg-[#101010] px-7 py-8 sm:px-10 sm:py-10">
                  <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full border-[24px] border-[#dcff1a]/[0.07]" />
                  <div className="relative max-w-2xl">
                     <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#dcff1a]">
                        COMING SOON
                     </span>
                     <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                        Paid spaces are on the way
                     </h2>
                     <p className="mt-2 max-w-xl text-sm leading-6 text-[#929292]">
                        Bookable studios, homes, and unique shoot locations are coming. Until then,
                        find your next frame in one of these free public spaces.
                     </p>
                  </div>
               </section>

               <section id="free-spaces" className="scroll-mt-8">
                  <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                     <div>
                        <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-[#dcff1a]">
                           MADE FOR YOUR NEXT FRAME
                        </p>
                        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                           Free public spaces
                        </h2>
                     </div>
                     <p className="text-sm text-[#929292]">
                        {spaces.length} {spaces.length === 1 ? "place" : "places"} to explore
                     </p>
                  </div>
                  {spaces.length === 0 ? (
                     <div className="rounded-2xl border border-white/10 bg-[#101010] px-6 py-12 text-center">
                        <h3 className="text-lg font-semibold">No free spaces in this area yet.</h3>
                        <p className="mt-2 text-sm text-[#929292]">
                           Choose another area to explore public locations.
                        </p>
                        <a
                           href="/"
                           className="mt-5 inline-flex rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
                        >
                           Show all spaces
                        </a>
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {spaces.map((space) => (
                           <PublicSpaceCard key={space.id} data={space} dark />
                        ))}
                     </div>
                  )}
               </section>
            </Container>
         </main>
      </ClientOnly>
   );
};

export default Home;
