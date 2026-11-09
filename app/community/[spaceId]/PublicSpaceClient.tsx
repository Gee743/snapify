import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import MapSection from "@/app/components/MapSection";
import AccessPanel from "@/app/components/AccessPanel";
import ShootTiming from "@/app/components/ShootTiming";
import NearbyPlaces from "@/app/components/NearbyPlaces";
import { PublicSpace } from "@/app/data/publicSpaces";
import PlaceImage from "@/app/components/PlaceImage";

interface PublicSpaceClientProps {
   space: PublicSpace;
   nearby?: { space: PublicSpace; km: number }[];
}

const PublicSpaceClient: React.FC<PublicSpaceClientProps> = ({ space, nearby = [] }) => {
   const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${space.latlng[0]},${space.latlng[1]}`;

   return (
      <main className="bg-[#0a0a0a] pb-16 pt-4 text-[#f5f5f5]">
         <Container>
         <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
               <div className="flex items-center gap-2">
                  <Heading title={space.name} subtitle={space.locationLabel} />
               </div>
               <div className="w-full h-[60vh] overflow-hidden rounded-[14px] relative">
                  <PlaceImage
                     alt={space.name}
                     src={space.imageSrc}
                     fill
                     sizes="(max-width: 1024px) 100vw, 1024px"
                     priority
                     className="object-cover"
                  />
                  <span className="absolute top-5 left-5 bg-[#dcff1a] text-[#0a0a0a] text-[10px] font-bold px-2.5 py-1 rounded-full">
                     FREE
                  </span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-2">
                  <div className="col-span-4 flex flex-col gap-6">
                     <div>
                        <div className="text-[13px] text-[#929292]">{space.type}</div>
                        <div className="text-[13px] font-bold text-[#dcff1a] mt-1">
                           Free · No booking needed
                        </div>
                     </div>
                     <p className="text-[#c4c4c4]">{space.description}</p>
                     <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-[#dcff1a] mb-2">
                           Directions
                        </h3>
                        <p className="text-[#c4c4c4]">{space.directions}</p>
                     </div>
                     <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-[#dcff1a] mb-2">
                           Tips from creators
                        </h3>
                        <ul className="list-disc pl-5 text-[#c4c4c4] space-y-1">
                           {space.tips.map((tip) => (
                              <li key={tip}>{tip}</li>
                           ))}
                        </ul>
                     </div>
                     <ShootTiming space={space} />
                     <AccessPanel space={space} />
                     <MapSection center={space.latlng} />
                  </div>
                  <div className="order-first mb-10 md:order-last md:col-span-3">
                     <div className="bg-[#101010] rounded-[14px] border border-white/10 overflow-hidden p-5 flex flex-col gap-4">
                        <div className="text-2xl font-semibold text-[#dcff1a]">Free</div>
                        <p className="text-sm text-[#929292]">
                           This is a community location. Anyone can shoot here — no reservation,
                           no fee.
                        </p>
                        <a
                           href={mapsUrl}
                           target="_blank"
                           rel="noreferrer"
                           className="block text-center py-3 rounded-lg bg-[#dcff1a] text-[#0a0a0a] font-semibold hover:brightness-105 transition"
                        >
                           Get directions
                        </a>
                     </div>
                  </div>
               </div>
               <div className="mt-12">
                  <NearbyPlaces places={nearby} />
               </div>
            </div>
         </div>
         </Container>
      </main>
   );
};

export default PublicSpaceClient;
