"use client";

import useSearchModal from "@/app/hooks/useSearch";
import { useSearchParams } from "next/navigation";

const Search = () => {
   const searchModal = useSearchModal();
   const params = useSearchParams();
   const area = params?.get("area");

   return (
      <div
         role="button"
         tabIndex={0}
         onClick={searchModal.onOpen}
         onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
               event.preventDefault();
               searchModal.onOpen();
            }
         }}
         className="w-full cursor-pointer rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-[18px] pr-1.5 transition hover:border-white/20 hover:bg-white/[0.07] md:w-auto md:min-w-48"
      >
         <div className="flex flex-row items-center justify-between">
            <div className="pr-4">
               <div className="text-[11px] font-semibold text-[#f5f5f5]">Area</div>
               <div className="text-[12px] text-[#929292]">
                  {area || "Anywhere"}
               </div>
            </div>
            <div className="pl-3 flex flex-row items-center">
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dcff1a] text-[#0a0a0a]">
                  <svg
                     width="14"
                     height="14"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="#0a0a0a"
                     strokeWidth="2.5"
                     aria-hidden="true"
                  >
                     <circle cx="11" cy="11" r="7" />
                     <line x1="21" y1="21" x2="16.6" y2="16.6" />
                  </svg>
               </div>
            </div>
         </div>
      </div>
   );
};
export default Search;
