"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type PlaceImageProps = Omit<ImageProps, "onError"> & {
   /** Shown instead of the photo if the upstream image fails. */
   fallbackLabel?: string;
};

/**
 * Location photograph with a graceful failure state.
 *
 * Photos are hotlinked from Wikimedia, which rate-limits (HTTP 429) under load.
 * Without this a throttled response renders as a broken image on a card that is
 * otherwise fine. A branded placeholder keeps the grid intact and keeps the
 * surrounding text -- name, type, access notes -- readable, which is where the
 * actual value of the listing is.
 */
const PlaceImage = ({ fallbackLabel, alt, ...props }: PlaceImageProps) => {
   const [failed, setFailed] = useState(false);

   if (failed) {
      return (
         <div className="flex h-full w-full items-center justify-center bg-[#141414] px-3 text-center">
            <span className="text-[11px] leading-4 text-[#6f6f6f]">
               {fallbackLabel ?? alt ?? "Photo unavailable"}
            </span>
         </div>
      );
   }

   return <Image alt={alt} {...props} onError={() => setFailed(true)} />;
};

export default PlaceImage;
