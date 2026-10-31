"use client";

import { ReactNode } from "react";

interface SpaceCardProps {
   image: ReactNode;
   title: string;
   subtitle: string;
   footer: ReactNode;
   overlay?: ReactNode;
   action?: ReactNode;
   onClick: () => void;
   dark?: boolean;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
   image,
   title,
   subtitle,
   footer,
   overlay,
   action,
   onClick,
   dark = false,
}) => {
   return (
      <div onClick={onClick} className="col-span-1 cursor-pointer group">
         <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square w-full relative overflow-hidden rounded-[14px]">
               {image}
               {overlay}
            </div>
            <div className={`font-semibold text-sm ${dark ? "text-[#f5f5f5]" : "text-[#222]"}`}>
               {title}
            </div>
            <div className={`text-[13px] ${dark ? "text-[#929292]" : "text-[#717171]"}`}>
               {subtitle}
            </div>
            <div className={`text-sm ${dark ? "text-[#d4d4d4]" : "text-[#222]"}`}>{footer}</div>
            {action}
         </div>
      </div>
   );
};

export default SpaceCard;
