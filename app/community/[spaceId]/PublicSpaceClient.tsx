"use client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { PublicSpace } from "@/app/data/publicSpaces";
import dynamic from "next/dynamic";
import Image from "next/image";

const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });

interface PublicSpaceClientProps {
   space: PublicSpace;
}

const PublicSpaceClient: React.FC<PublicSpaceClientProps> = ({ space }) => {
   const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${space.latlng[0]},${space.latlng[1]}`;

   return (
      <Container>
         <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
               <div className="flex items-center gap-2">
                  <Heading title={space.name} subtitle={space.locationLabel} />
               </div>
               <div className="w-full h-[60vh] overflow-hidden rounded-[14px] relative">
                  <Image
                     alt={space.name}
                     src={space.imageSrc}
                     fill
                     unoptimized
                     className="object-cover"
                  />
                  <span className="absolute top-5 left-5 bg-white text-[#2fa35d] text-[10px] font-bold px-2.5 py-1 rounded-full">
                     FREE
                  </span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-2">
                  <div className="col-span-4 flex flex-col gap-6">
                     <div>
                        <div className="text-[13px] text-[#717171]">{space.type}</div>
                        <div className="text-[13px] font-bold text-[#2fa35d] mt-1">
                           Free · No booking needed
                        </div>
                     </div>
                     <p className="text-[#5c5c5c]">{space.description}</p>
                     <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-[#444] mb-2">
                           Directions
                        </h3>
                        <p className="text-[#5c5c5c]">{space.directions}</p>
                     </div>
                     <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-[#444] mb-2">
                           Tips from creators
                        </h3>
                        <ul className="list-disc pl-5 text-[#5c5c5c] space-y-1">
                           {space.tips.map((tip) => (
                              <li key={tip}>{tip}</li>
                           ))}
                        </ul>
                     </div>
                     <Map center={space.latlng} />
                  </div>
                  <div className="order-first mb-10 md:order-last md:col-span-3">
                     <div className="bg-[#f1f8f2] rounded-[14px] border border-[#d7eadc] overflow-hidden p-5 flex flex-col gap-4">
                        <div className="text-2xl font-semibold text-[#2fa35d]">Free</div>
                        <p className="text-sm text-[#5c5c5c]">
                           This is a community location. Anyone can shoot here — no reservation,
                           no fee.
                        </p>
                        <a
                           href={mapsUrl}
                           target="_blank"
                           rel="noreferrer"
                           className="block text-center py-3 rounded-lg bg-[#2fa35d] text-white font-semibold hover:opacity-80 transition"
                        >
                           Get directions
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
};

export default PublicSpaceClient;
