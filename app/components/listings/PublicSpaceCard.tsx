import { PublicSpace } from "@/app/data/publicSpaces";
import PlaceImage from "@/app/components/PlaceImage";
import SpaceCard from "./SpaceCard";

interface PublicSpaceCardProps {
   data: PublicSpace;
   dark?: boolean;
   priority?: boolean;
}

const PublicSpaceCard: React.FC<PublicSpaceCardProps> = ({
   data,
   dark = false,
   priority = false,
}) => {
   return (
      <SpaceCard
         href={`/community/${data.id}`}
         image={
            <PlaceImage
               alt={data.name}
               src={data.imageSrc}
               fill
               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
               priority={priority}
               className="object-cover h-full w-full group-hover:scale-110 transition"
            />
         }
         overlay={
            <span className="absolute top-3 left-3 rounded-full bg-[#dcff1a] px-2.5 py-1 text-[10px] font-bold text-[#0a0a0a]">
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
