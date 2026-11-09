import Link from "next/link";
import Container from "./components/Container";
import SpaceGrid from "./components/listings/SpaceGrid";
import { getPublicSpaces } from "./actions/getPublicSpaces";
import { getPublicSpaceCity } from "./data/publicSpaces";
import guides from "./data/guides";
import JsonLd from "./components/JsonLd";
import { itemListSchema } from "./libs/structuredData";

export const revalidate = 3600;

interface HomeProps {
   searchParams: {
      area?: string;
   };
}

const Home = async ({ searchParams }: HomeProps) => {
   const publicSpaces = await getPublicSpaces();
   const spaces = searchParams.area
      ? publicSpaces.filter((space) => getPublicSpaceCity(space) === searchParams.area)
      : publicSpaces;

   const cities = Array.from(new Set(publicSpaces.map(getPublicSpaceCity))).sort();
   const droneFriendly = publicSpaces.filter((space) => space.droneRule === "ALLOWED").length;

   return (
      <main className="relative isolate overflow-hidden bg-ink pb-24">
         <JsonLd data={itemListSchema(spaces, "Free photo spots in Sri Lanka")} />

         {/* A single warm pool behind the hero, fading before the grid starts.
             Gives the first screen depth without putting a texture under the
             whole page. */}
         <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px]"
            style={{
               background:
                  "radial-gradient(900px 480px at 15% 0%, rgba(220,255,26,.10), transparent 68%), radial-gradient(700px 400px at 85% 10%, rgba(220,255,26,.05), transparent 70%)",
            }}
         />

         <Container>
            <section className="animate-enter py-16 sm:py-24">
               <div className="max-w-3xl">
                  <h1 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-cream sm:text-6xl lg:text-[4.25rem]">
                     Your next great shot starts{" "}
                     <span className="text-lime">somewhere.</span>
                  </h1>
                  {/* Measure held near 60ch so the line does not run the full
                      1280px container. */}
                  <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-cream-soft sm:text-lg">
                     {publicSpaces.length} free public places across Sri Lanka to shoot, explore
                     and create — each with directions, entry fees, permit rules and the drone
                     law that actually applies.
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                     <a
                        href="#free-spaces"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-6 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 ease-out hover:shadow-glow hover:brightness-105 active:scale-[0.98]"
                     >
                        Explore free spaces
                        <svg
                           className="h-4 w-4"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2.2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           aria-hidden="true"
                        >
                           <path d="M12 5v14M6 13l6 6 6-6" />
                        </svg>
                     </a>
                     <Link
                        href="/photo-spots"
                        className="inline-flex items-center justify-center rounded-xl border border-ink-lineStrong px-6 py-3.5 text-[15px] font-medium text-cream transition-colors duration-300 hover:border-lime hover:text-lime"
                     >
                        Browse by area
                     </Link>
                  </div>

                  {/* Three facts that answer "is this worth my time", in text
                      rather than as a row of stat cards. */}
                  <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-ink-line pt-7">
                     {[
                        { value: publicSpaces.length, label: "Free locations" },
                        { value: cities.length, label: "Cities and towns" },
                        { value: droneFriendly, label: "Drone friendly" },
                     ].map((stat) => (
                        <div key={stat.label}>
                           <dt className="sr-only">{stat.label}</dt>
                           <dd>
                              <span className="tabular block text-[26px] font-semibold leading-none tracking-[-0.02em] text-cream">
                                 {stat.value}
                              </span>
                              <span className="mt-1.5 block text-[13px] text-cream-muted">
                                 {stat.label}
                              </span>
                           </dd>
                        </div>
                     ))}
                  </dl>
               </div>
            </section>

            <section id="free-spaces" className="scroll-mt-32 pt-4">
               <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                     <h2 className="text-[27px] font-semibold tracking-[-0.025em] text-cream sm:text-[32px]">
                        Free public spaces
                     </h2>
                     <p className="mt-2 max-w-[56ch] text-[15px] leading-6 text-cream-muted">
                        Open locations anyone can shoot at. No booking, no fee — filter by what
                        the rules let you do.
                     </p>
                  </div>
                  <Link
                     href="/community"
                     className="shrink-0 text-sm font-medium text-lime transition-opacity duration-200 hover:opacity-75"
                  >
                     View all {publicSpaces.length} &rarr;
                  </Link>
               </div>

               {spaces.length === 0 ? (
                  <div className="rounded-panel bg-ink-raised px-6 py-14 text-center shadow-raised">
                     <h3 className="text-lg font-semibold text-cream">
                        No free spaces in this area yet
                     </h3>
                     <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cream-muted">
                        Nothing is listed for that area so far. Browse every location instead, or
                        tell us about a place you know.
                     </p>
                     <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                           href="/"
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
               ) : (
                  <SpaceGrid spaces={spaces} />
               )}
            </section>

            <section className="mt-24">
               <div className="mb-7">
                  <h2 className="text-[27px] font-semibold tracking-[-0.025em] text-cream sm:text-[32px]">
                     Permits, drones and the right season
                  </h2>
                  <p className="mt-2 max-w-[56ch] text-[15px] leading-6 text-cream-muted">
                     The things that decide whether a shoot happens at all — worth reading before
                     you book the travel.
                  </p>
               </div>
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {guides.map((guide) => (
                     <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="group flex flex-col rounded-card bg-ink-raised p-6 shadow-raised transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lifted"
                     >
                        <h3 className="text-[16px] font-semibold leading-snug text-cream transition-colors duration-200 group-hover:text-lime">
                           {guide.title}
                        </h3>
                        <p className="mt-2.5 grow text-[13.5px] leading-6 text-cream-muted">
                           {guide.summary}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-lime">
                           Read the guide
                           <span
                              aria-hidden="true"
                              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                           >
                              &rarr;
                           </span>
                        </span>
                     </Link>
                  ))}
               </div>
            </section>

            <section className="relative mt-24 overflow-hidden rounded-panel bg-ink-raised px-7 py-10 shadow-raised sm:px-12 sm:py-14">
               <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-lime/[0.06] blur-2xl"
               />
               <div className="relative max-w-2xl">
                  <h2 className="text-[25px] font-semibold tracking-[-0.025em] text-cream sm:text-[30px]">
                     Paid spaces are on the way
                  </h2>
                  <p className="mt-3 max-w-[54ch] text-[15px] leading-7 text-cream-muted">
                     Bookable studios, homes and unique shoot locations are coming to Snapify. If
                     you own a space worth shooting in, join the waitlist and we will come to you
                     first.
                  </p>
                  <Link
                     href="/list-your-space"
                     className="mt-7 inline-flex rounded-xl bg-lime px-5 py-3 text-[14px] font-semibold text-ink transition-all duration-300 ease-out hover:shadow-glow hover:brightness-105 active:scale-[0.98]"
                  >
                     Join the owner waitlist
                  </Link>
               </div>
            </section>
         </Container>
      </main>
   );
};

export default Home;
