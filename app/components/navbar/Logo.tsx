"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
   const router = useRouter();

   return (
      <div
         onClick={() => router.push("/")}
         className="flex items-center gap-2 font-bold text-[20px] text-[#222] cursor-pointer"
      >
         {/* <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            aria-hidden="true"
         >
            <path d="M4 8h3l2-3h6l2 3h3v12H4z" />
            <circle cx="12" cy="14" r="3.5" />
         </svg> */}
         Snapify
      </div>
   );
};

export default Logo;
