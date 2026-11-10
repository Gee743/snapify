import Link from "next/link";
import Container from "@/app/components/Container";
import MapSection from "@/app/components/MapSection";
import AccessPanel from "@/app/components/AccessPanel";
import SpaceSummaryPanel from "@/app/components/SpaceSummaryPanel";
import ShootTiming from "@/app/components/ShootTiming";
import NearbyPlaces from "@/app/components/NearbyPlaces";
import { PublicSpace, getPublicSpaceCity, slugifyPlace } from "@/app/data/publicSpaces";
import PlaceImage from "@/app/components/PlaceImage";
import { accessSignals } from "@/app/libs/accessSignal";

interface PublicSpaceClientProps {
   space: PublicSpace;
   nearby?: { space: PublicSpace; km: number }[];
   /** Resolved on the server: the nearest published hub for this city. */
   cityPath: string;
}

const PublicSpaceClient: React.FC<PublicSpaceClientProps> = ({
   space,
   nearby = [],
   cityPath,
}) => {
   const city = getPublicSpaceCity(space);
   const signals = accessSignals(space);

   return (
      <main className="bg-ink pb-24 pt-8">
         <Container>
            <div className="mx-auto max-w-screen-lg">
               <nav aria-label="Breadcrumb" className="mb-6">
                  <ol className="flex flex-wrap items-center gap-x-1.5 text-[12.5px] text-cream-faint">
                     <li>
                        <Link href="/" className="inline-flex min-h-[32px] items-center transition-colors duration-200 hover:text-lime">
                           Home
                        </Link>
                     </li>
                     {/* A one-place city reads "Home / Arugam Bay / Arugam Bay".
                         Drop the crumb when it only repeats the page title. */}
                     {city !== space.name && (
                        <>
                           <li aria-hidden="true" className="text-cream-faint/60">/</li>
                           <li>
                              <Link
                                 href={cityPath}
                                 className="inline-flex min-h-[32px] items-center transition-colors duration-200 hover:text-lime"
                              >
                                 {city}
                              </Link>
                           </li>
                        </>
                     )}
                     <li aria-hidden="true" className="text-cream-faint/60">/</li>
                     <li aria-current="page" className="text-cream-muted">
                        {space.name}
                     </li>
                  </ol>
               </nav>

               <header className="mb-7">
                  <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-cream sm:text-[2.75rem]">
                     {space.name}
                  </h1>
                  <p className="mt-3 text-[15px] text-cream-muted">
                     {space.type} · {space.locationLabel}
                  </p>
                  {/* The access facts sit above the fold, next to the name:
                      they decide whether the rest of the page is worth reading. */}
                  {signals.length > 0 && (
                     <div className="mt-5 flex flex-wrap gap-2">
                        {signals.map((signal) => (
                           <span
                              key={signal.label}
                              title={signal.title}
                              className={`inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1.5 text-[13px] font-medium ${signal.tone}`}
                           >
                              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                              {signal.label}
                           </span>
                        ))}
                     </div>
                  )}
               </header>

               <div className="relative h-[clamp(260px,46vh,520px)] w-full overflow-hidden rounded-panel bg-ink-raised">
                  <PlaceImage
                     alt={space.name}
                     src={space.imageSrc}
                     fill
                     sizes="(max-width: 1024px) 100vw, 1024px"
                     priority
                     className="object-cover"
                  />
               </div>

               <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-7">
                  <div className="flex flex-col gap-9 md:col-span-4">
                     <p className="max-w-[68ch] text-[16px] leading-[1.75] text-cream-soft">
                        {space.description}
                     </p>

                     <section>
                        <h2 className="mb-2.5 text-[19px] font-semibold tracking-[-0.02em] text-cream">
                           Getting there
                        </h2>
                        <p className="max-w-[68ch] text-[15px] leading-7 text-cream-soft">
                           {space.directions}
                        </p>
                     </section>

                     <section>
                        <h2 className="mb-3 text-[19px] font-semibold tracking-[-0.02em] text-cream">
                           Tips from creators
                        </h2>
                        <ul className="flex flex-col gap-3">
                           {space.tips.map((tip) => (
                              <li
                                 key={tip}
                                 className="flex max-w-[66ch] gap-3 text-[15px] leading-7 text-cream-soft"
                              >
                                 <span
                                    aria-hidden="true"
                                    className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-lime"
                                 />
                                 {tip}
                              </li>
                           ))}
                        </ul>
                     </section>

                     <ShootTiming space={space} />
                     <AccessPanel space={space} />

                     <section>
                        <h2 className="mb-3 text-[19px] font-semibold tracking-[-0.02em] text-cream">
                           On the map
                        </h2>
                        <MapSection center={space.latlng} />
                     </section>
                  </div>

                  <aside className="order-first md:order-last md:col-span-3">
                     {/* Sticky on desktop: the cost, hours and rules stay
                         reachable through a long page instead of scrolling away
                         at the top and leaving the column empty. */}
                     <SpaceSummaryPanel space={space} />
                  </aside>
               </div>

               <div className="mt-20">
                  <NearbyPlaces places={nearby} />
               </div>
            </div>
         </Container>
      </main>
   );
};

export default PublicSpaceClient;
