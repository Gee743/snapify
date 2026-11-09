"use client";

import Link from "next/link";

const ownersUrl = "/list-your-space";

const UserMenu = () => {
   return (
      <div className="flex flex-row items-center gap-3">
         <Link
            href="/photo-spots"
            className="whitespace-nowrap text-[11px] font-semibold text-[#f5f5f5]/80 transition hover:text-[#dcff1a] sm:text-[13px]"
         >
            Browse by area
         </Link>
         <Link
            href="/community"
            className="hidden whitespace-nowrap text-[11px] font-semibold text-[#f5f5f5]/80 transition hover:text-[#dcff1a] sm:inline sm:text-[13px]"
         >
            All spaces
         </Link>
         <Link
            href={ownersUrl}
            className="whitespace-nowrap rounded-xl bg-[#dcff1a] px-3 py-2 text-center text-[11px] font-semibold text-[#0a0a0a] transition hover:brightness-105 sm:px-4 sm:text-[13px]"
         >
            Owners, Join Us!
         </Link>
      </div>
   );
};
export default UserMenu;
