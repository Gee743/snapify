import Link from "next/link";
import PlaceImage from "@/app/components/PlaceImage";
import { PublicSpace } from "@/app/data/publicSpaces";

interface NearbyPlacesProps {
   places: { space: PublicSpace; km: number }[];
}

const NearbyPlaces = ({ places }: NearbyPlacesProps) => {
   if (places.length === 0) return null;

   return (
      <section>
         <h2 className="mb-1.5 text-[21px] font-semibold tracking-[-0.02em] text-cream">
            Nearby places to shoot
         </h2>
         <p className="mb-6 text-[14px] text-cream-muted">
            Close enough to pair with this location in a single trip.
         </p>
         <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
            {places.map(({ space, km }) => (
               <Link
                  key={space.id}
                  href={`/community/${space.id}`}
                  className="group overflow-hidden rounded-card bg-ink-raised shadow-raised transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lifted"
               >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-overlay">
                     <PlaceImage
                        alt={space.name}
                        src={space.imageSrc}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                     />
                  </div>
                  <div className="p-3">
                     <div className="truncate text-[14px] font-semibold text-cream transition-colors duration-200 group-hover:text-lime">
                        {space.name}
                     </div>
                     <div className="tabular mt-0.5 text-[12px] text-cream-muted">
                        {km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`} away
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
};

export default NearbyPlaces;
