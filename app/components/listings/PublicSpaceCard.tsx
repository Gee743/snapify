"use client";

import { PublicSpace } from "@/app/data/publicSpaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SpaceCard from "./SpaceCard";

interface PublicSpaceCardProps {
   data: PublicSpace;
}

const PublicSpaceCard: React.FC<PublicSpaceCardProps> = ({ data }) => {
   const router = useRouter();

   return (
      <SpaceCard
         onClick={() => router.push(`/community/${data.id}`)}
         image={
            <Image
               alt={data.name}
               src={data.imageSrc}
               fill
               className="object-cover h-full w-full group-hover:scale-110 transition"
            />
         }
         overlay={
            <span className="absolute top-3 left-3 bg-white text-[#2fa35d] text-[10px] font-bold px-2.5 py-1 rounded-full">
               FREE
            </span>
         }
         title={data.name}
         subtitle={data.type}
         footer={<div className="font-bold">Free · No booking needed</div>}
      />
   );
};

export default PublicSpaceCard;
