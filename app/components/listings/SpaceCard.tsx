import Link from "next/link";
import { ReactNode } from "react";

interface SpaceCardProps {
   image: ReactNode;
   title: string;
   subtitle: string;
   /** Access chips: fee, permit, drone rule. */
   signals?: ReactNode;
   overlay?: ReactNode;
   href: string;
   /** Stagger position for the grid entrance. */
   index?: number;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
   image,
   title,
   subtitle,
   signals,
   overlay,
   href,
   index = 0,
}) => {
   return (
      <Link
         href={href}
         style={{ ["--i" as string]: index }}
         // The lift is on the whole card, so the shadow reads as the card
         // rising off the page rather than the image growing inside a frame.
         className="group relative flex flex-col overflow-hidden rounded-card bg-ink-raised shadow-raised transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lifted focus-visible:-translate-y-1"
      >
         <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-overlay">
            {image}
            {/* Scrim: card titles sit on photographs of every exposure, and
                without it a bright sky leaves the FREE chip unreadable. */}
            <div
               aria-hidden="true"
               className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20"
            />
            {overlay}
         </div>
         <div className="flex grow flex-col gap-1 p-3.5">
            {/* Two lines reserved for the name so a one-word place and a
                three-word one put their chips on the same baseline. */}
            <h3 className="line-clamp-2 min-h-[2.6em] text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-cream transition-colors duration-200 group-hover:text-lime">
               {title}
            </h3>
            <p className="text-[12.5px] leading-5 text-cream-muted">{subtitle}</p>
            {signals && (
               // Chips sit on one row and scroll rather than stacking, so a
               // place with three rules does not grow taller than its neighbours.
               <div className="scrollbar-hide mt-auto flex gap-x-2.5 overflow-x-auto pt-2.5">
                  {signals}
               </div>
            )}
         </div>
      </Link>
   );
};

export default SpaceCard;
