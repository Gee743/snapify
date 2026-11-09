import { PublicSpace, getPublicSpaceCity } from "@/app/data/publicSpaces";
import PlaceImage from "@/app/components/PlaceImage";
import { accessSignals } from "@/app/libs/accessSignal";
import SpaceCard from "./SpaceCard";

interface PublicSpaceCardProps {
   data: PublicSpace;
   priority?: boolean;
   index?: number;
}

const PublicSpaceCard: React.FC<PublicSpaceCardProps> = ({
   data,
   priority = false,
   index = 0,
}) => {
   const signals = accessSignals(data);

   return (
      <SpaceCard
         href={`/community/${data.id}`}
         index={index}
         image={
            <PlaceImage
               alt={data.name}
               src={data.imageSrc}
               fill
               sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
               priority={priority}
               className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
         }
         overlay={
            <span className="absolute left-2.5 top-2.5 rounded-full bg-ink/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-cream backdrop-blur-sm">
               {data.type}
            </span>
         }
         title={data.name}
         subtitle={getPublicSpaceCity(data)}
         signals={signals.map((signal) => (
            <span
               key={signal.label}
               title={signal.title}
               className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11.5px] font-medium ${signal.tone}`}
            >
               <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
               {signal.label}
            </span>
         ))}
      />
   );
};

export default PublicSpaceCard;
