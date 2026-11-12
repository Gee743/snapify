import Link from "next/link";
import Container from "@/app/components/Container";
import MapSection from "@/app/components/MapSection";
import PlaceImage from "@/app/components/PlaceImage";
import StudioInquiryForm from "@/app/components/StudioInquiryForm";
import StudioCard from "@/app/components/listings/StudioCard";
import { Studio, studioCity } from "@/app/actions/getStudios";
import { capacityLabel, rateLines } from "@/app/libs/studioRates";
import { STUDIO_TYPE_LABELS, StudioTypeValue, amenityLabel } from "@/app/libs/studioTaxonomy";

interface StudioClientProps {
   studio: Studio;
   /** Other published studios in the same city, resolved on the server. */
   alsoNearby?: Studio[];
}

const Spec = ({ label, value }: { label: string; value: string }) => (
   <div className="border-t border-ink-line py-3">
      <dt className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-cream-faint">
         {label}
      </dt>
      <dd className="mt-1 text-[14px] leading-6 text-cream">{value}</dd>
   </div>
);

const StudioClient: React.FC<StudioClientProps> = ({ studio, alsoNearby = [] }) => {
   const city = studioCity(studio);
   const typeLabel =
      studio.studioType in STUDIO_TYPE_LABELS
         ? STUDIO_TYPE_LABELS[studio.studioType as StudioTypeValue]
         : "Studio";
   const rates = rateLines(studio);
   const size = capacityLabel(studio);
   const gallery = [studio.imageSrc, ...studio.images].slice(0, 5);

   return (
      <main className="bg-ink pb-24 pt-8">
         <Container>
            <div className="mx-auto max-w-screen-lg">
               <nav aria-label="Breadcrumb" className="mb-6">
                  <ol className="flex flex-wrap items-center gap-x-1.5 text-[12.5px] text-cream-faint">
                     <li>
                        <Link
                           href="/"
                           className="inline-flex min-h-[32px] items-center transition-colors duration-200 hover:text-lime"
                        >
                           Home
                        </Link>
                     </li>
                     <li aria-hidden="true" className="text-cream-faint/60">
                        /
                     </li>
                     <li>
                        <Link
                           href="/studios"
                           className="inline-flex min-h-[32px] items-center transition-colors duration-200 hover:text-lime"
                        >
                           Studios
                        </Link>
                     </li>
                     {/* Skip a city crumb that only repeats the studio name. */}
                     {city !== studio.name && (
                        <>
                           <li aria-hidden="true" className="text-cream-faint/60">
                              /
                           </li>
                           <li>
                              <Link
                                 href={`/studios?city=${encodeURIComponent(studio.citySlug ?? "")}`}
                                 className="inline-flex min-h-[32px] items-center transition-colors duration-200 hover:text-lime"
                              >
                                 {city}
                              </Link>
                           </li>
                        </>
                     )}
                     <li aria-hidden="true" className="text-cream-faint/60">
                        /
                     </li>
                     <li aria-current="page" className="text-cream-muted">
                        {studio.name}
                     </li>
                  </ol>
               </nav>

               <header className="mb-7">
                  <span className="inline-flex rounded-full border border-ink-line bg-white/[0.03] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-lime">
                     {typeLabel.toUpperCase()}
                  </span>
                  <h1 className="mt-4 text-[2rem] font-semibold tracking-[-0.03em] text-cream sm:text-[2.5rem]">
                     {studio.name}
                  </h1>
                  <p className="mt-2 text-[15px] leading-6 text-cream-soft">{studio.tagline}</p>
                  <p className="mt-1 text-[13.5px] text-cream-muted">{studio.locationLabel}</p>
               </header>

               <div className="overflow-hidden rounded-card bg-ink-overlay">
                  <div className="relative aspect-[16/9] w-full">
                     <PlaceImage
                        alt={studio.name}
                        src={studio.imageSrc}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="h-full w-full object-cover"
                     />
                  </div>
               </div>

               {gallery.length > 1 && (
                  <div className="scrollbar-hide mt-3 flex gap-3 overflow-x-auto pb-1">
                     {gallery.slice(1).map((src, index) => (
                        <div
                           key={src}
                           className="relative aspect-[4/3] w-40 shrink-0 overflow-hidden rounded-lg bg-ink-overlay"
                        >
                           <PlaceImage
                              alt={`${studio.name} — photo ${index + 2}`}
                              src={src}
                              fill
                              sizes="160px"
                              className="h-full w-full object-cover"
                           />
                        </div>
                     ))}
                  </div>
               )}

               <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
                  <div className="lg:col-span-3">
                     <section>
                        <h2 className="text-lg font-semibold tracking-[-0.01em] text-cream">
                           About this space
                        </h2>
                        <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-cream-soft">
                           {studio.description}
                        </p>
                     </section>

                     <section className="mt-9">
                        <h2 className="text-lg font-semibold tracking-[-0.01em] text-cream">
                           The space
                        </h2>
                        <dl className="mt-3">
                           <Spec label="Type" value={typeLabel} />
                           {size && <Spec label="Size" value={size} />}
                           {studio.ceilingHeightFt ? (
                              <Spec label="Ceiling height" value={`${studio.ceilingHeightFt} ft`} />
                           ) : null}
                           {studio.openingHours && (
                              <Spec label="Hours" value={studio.openingHours} />
                           )}
                           {studio.availabilityNotes && (
                              <Spec label="Availability" value={studio.availabilityNotes} />
                           )}
                        </dl>
                     </section>

                     {studio.amenities.length > 0 && (
                        <section className="mt-9">
                           <h2 className="text-lg font-semibold tracking-[-0.01em] text-cream">
                              Amenities
                           </h2>
                           <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                              {studio.amenities.map((amenity) => (
                                 <li
                                    key={amenity}
                                    className="flex items-center gap-2 text-[14px] leading-6 text-cream-soft"
                                 >
                                    <span
                                       aria-hidden="true"
                                       className="h-1 w-1 shrink-0 rounded-full bg-lime"
                                    />
                                    {amenityLabel(amenity)}
                                 </li>
                              ))}
                           </ul>
                        </section>
                     )}

                     {studio.equipment.length > 0 && (
                        <section className="mt-9">
                           <h2 className="text-lg font-semibold tracking-[-0.01em] text-cream">
                              Equipment included
                           </h2>
                           <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                              {studio.equipment.map((item) => (
                                 <li
                                    key={item}
                                    className="flex items-start gap-2 text-[14px] leading-6 text-cream-soft"
                                 >
                                    <span
                                       aria-hidden="true"
                                       className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-lime"
                                    />
                                    {item}
                                 </li>
                              ))}
                           </ul>
                        </section>
                     )}

                     {(studio.bookingNotes || studio.cancellationPolicy) && (
                        <section className="mt-9">
                           <h2 className="text-lg font-semibold tracking-[-0.01em] text-cream">
                              Booking terms
                           </h2>
                           {studio.bookingNotes && (
                              <p className="mt-3 whitespace-pre-line text-[14px] leading-6 text-cream-soft">
                                 {studio.bookingNotes}
                              </p>
                           )}
                           {studio.cancellationPolicy && (
                              <>
                                 <h3 className="mt-5 text-[13px] font-semibold text-cream">
                                    Cancellation
                                 </h3>
                                 <p className="mt-1.5 whitespace-pre-line text-[14px] leading-6 text-cream-muted">
                                    {studio.cancellationPolicy}
                                 </p>
                              </>
                           )}
                        </section>
                     )}

                     {studio.latlng.length === 2 && (
                        <section className="mt-9">
                           <h2 className="text-lg font-semibold tracking-[-0.01em] text-cream">
                              Where it is
                           </h2>
                           <div className="mt-3 overflow-hidden rounded-card">
                              <MapSection center={studio.latlng} />
                           </div>
                        </section>
                     )}
                  </div>

                  <aside className="lg:col-span-2">
                     <div className="lg:sticky lg:top-6">
                        <div className="rounded-2xl border border-ink-line bg-ink-raised p-6">
                           <h2 className="text-base font-semibold text-cream">Rates</h2>
                           {rates.length > 0 ? (
                              <dl className="mt-3">
                                 {rates.map((line) => (
                                    <div
                                       key={line.label}
                                       className="flex items-baseline justify-between gap-3 border-t border-ink-line py-3"
                                    >
                                       <dt className="text-[13.5px] text-cream-muted">
                                          {line.label}
                                          {line.note && (
                                             <span className="mt-0.5 block text-[11.5px] text-cream-faint">
                                                {line.note}
                                             </span>
                                          )}
                                       </dt>
                                       <dd className="shrink-0 text-[15px] font-semibold text-lime">
                                          {line.value}
                                       </dd>
                                    </div>
                                 ))}
                              </dl>
                           ) : (
                              <p className="mt-3 text-[14px] leading-6 text-cream-muted">
                                 This owner quotes per shoot. Send an enquiry with your dates and
                                 crew size for a rate.
                              </p>
                           )}
                           {studio.rateNotes && (
                              <p className="mt-3 border-t border-ink-line pt-3 text-[12.5px] leading-5 text-cream-muted">
                                 {studio.rateNotes}
                              </p>
                           )}
                        </div>

                        <div className="mt-5">
                           <StudioInquiryForm studioSlug={studio.slug} studioName={studio.name} />
                        </div>
                     </div>
                  </aside>
               </div>

               {alsoNearby.length > 0 && (
                  <section className="mt-16 border-t border-ink-line pt-9">
                     <h2 className="text-lg font-semibold tracking-[-0.01em] text-cream">
                        Other spaces in {city}
                     </h2>
                     <div className="stagger mt-5 grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4">
                        {alsoNearby.map((other, index) => (
                           <StudioCard key={other.slug} data={other} index={index} />
                        ))}
                     </div>
                  </section>
               )}
            </div>
         </Container>
      </main>
   );
};

export default StudioClient;
