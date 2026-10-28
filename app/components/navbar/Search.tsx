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
         className="border border-[#ddd] w-full md:w-auto pl-[18px] pr-1.5 py-1.5 rounded-full shadow-[0_1px_4px_rgba(0,0,0,.08)] hover:shadow-md transition cursor-pointer"
      >
         <div className="flex flex-row items-center justify-between">
            <div className="pr-4">
               <div className="text-[12px] font-semibold">Area</div>
               <div className="text-[12px] text-[#717171]">
                  {area || "Anywhere"}
               </div>
            </div>
            <div className="pl-3 flex flex-row items-center">
               <div className="w-7 h-7 bg-[#2fa35d] rounded-full text-white flex items-center justify-center">
                  <svg
                     width="14"
                     height="14"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="#fff"
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
