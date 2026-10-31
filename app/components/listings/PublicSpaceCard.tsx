"use client";

import { PublicSpace } from "@/app/data/publicSpaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SpaceCard from "./SpaceCard";

interface PublicSpaceCardProps {
   data: PublicSpace;
   dark?: boolean;
}

const PublicSpaceCard: React.FC<PublicSpaceCardProps> = ({ data, dark = false }) => {
   const router = useRouter();

   return (
      <SpaceCard
         onClick={() => router.push(`/community/${data.id}`)}
         image={
            <Image
               alt={data.name}
               src={data.imageSrc}
               fill
               unoptimized
               className="object-cover h-full w-full group-hover:scale-110 transition"
            />
         }
         overlay={
            <span
               className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  dark ? "bg-[#dcff1a] text-[#0a0a0a]" : "bg-white text-[#2fa35d]"
               }`}
            >
               FREE
            </span>
         }
         title={data.name}
         subtitle={data.type}
         footer={<div className="font-bold">Free · No booking needed</div>}
         dark={dark}
      />
   );
};

export default PublicSpaceCard;
