"use client";

import Link from "next/link";

// TODO: point this at the real owner-waitlist form once it exists.
// Previously "host-waitlist.html" — a relative path to a file that was never
// added to public/, so the link 404'd and resolved differently per route.
const ownersUrl = "mailto:hello@snapify.lk?subject=Owners%2C%20Join%20Us";

const UserMenu = () => {
   return (
      <div className="flex flex-row items-center gap-3">
         <Link
            href="/community"
            className="whitespace-nowrap text-[11px] font-semibold text-[#f5f5f5]/80 transition hover:text-[#dcff1a] sm:text-[13px]"
         >
            Community spaces
         </Link>
         <a
            href={ownersUrl}
            className="whitespace-nowrap rounded-xl bg-[#dcff1a] px-3 py-2 text-center text-[11px] font-semibold text-[#0a0a0a] transition hover:brightness-105 sm:px-4 sm:text-[13px]"
         >
            Owners, Join Us!
         </a>
      </div>
   );
};
export default UserMenu;
