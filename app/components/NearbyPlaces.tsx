import Link from "next/link";
import Image from "next/image";
import { PublicSpace } from "@/app/data/publicSpaces";

interface NearbyPlacesProps {
   places: { space: PublicSpace; km: number }[];
}

const NearbyPlaces = ({ places }: NearbyPlacesProps) => {
   if (places.length === 0) return null;

   return (
      <section>
         <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#dcff1a]">
            Nearby places to shoot
         </h2>
         <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {places.map(({ space, km }) => (
               <Link key={space.id} href={`/community/${space.id}`} className="group">
                  <div className="relative aspect-square w-full overflow-hidden rounded-[12px]">
                     <Image
                        alt={space.name}
                        src={space.imageSrc}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition group-hover:scale-105"
                     />
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[#f5f5f5]">{space.name}</div>
                  <div className="text-[12px] text-[#929292]">
                     {km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`} away
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
};

export default NearbyPlaces;
