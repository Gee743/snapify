import { Studio, studioCity } from "@/app/actions/getStudios";
import PlaceImage from "@/app/components/PlaceImage";
import { capacityLabel, fromPriceLabel } from "@/app/libs/studioRates";
import { STUDIO_TYPE_LABELS, StudioTypeValue } from "@/app/libs/studioTaxonomy";
import SpaceCard from "./SpaceCard";

interface StudioCardProps {
   data: Studio;
   priority?: boolean;
   index?: number;
}

/**
 * Reuses SpaceCard so a studio and a public space sit on the same grid without
 * two competing card shapes. The signals row differs: a public space shows
 * access rules, a studio shows the two facts that decide a shortlist — what it
 * costs and how many people it holds.
 */
const StudioCard: React.FC<StudioCardProps> = ({ data, priority = false, index = 0 }) => {
   const typeLabel =
      data.studioType in STUDIO_TYPE_LABELS
         ? STUDIO_TYPE_LABELS[data.studioType as StudioTypeValue]
         : "Studio";
   const size = capacityLabel(data);

   return (
      <SpaceCard
         href={`/studios/${data.slug}`}
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
               {typeLabel}
            </span>
         }
         title={data.name}
         subtitle={studioCity(data)}
         signals={
            <>
               <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11.5px] font-semibold text-lime">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
                  {fromPriceLabel(data)}
               </span>
               {size && (
                  <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11.5px] font-medium text-cream-muted">
                     <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
                     {size}
                  </span>
               )}
            </>
         }
      />
   );
};

export default StudioCard;
