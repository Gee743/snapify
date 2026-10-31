"use client";

import { useRouter } from "next/navigation";

const Logo = () => {
   const router = useRouter();

   return (
      <div
         onClick={() => router.push("/")}
         className="flex shrink-0 cursor-pointer items-center gap-2.5 text-[20px] font-semibold tracking-tight text-[#f5f5f5]"
      >
         <svg width="32" height="32" viewBox="0 0 56 56" aria-hidden="true">
            <rect width="56" height="56" rx="16" fill="#dcff1a" />
            <path
               d="M17 24v-7h7M39 24v-7h-7M17 32v7h7M39 32v7h-7"
               stroke="#0a0a0a"
               strokeWidth="3.5"
               strokeLinecap="round"
               strokeLinejoin="round"
               fill="none"
            />
            <circle cx="28" cy="28" r="4" fill="#0a0a0a" />
         </svg>
         Snapify
      </div>
   );
};

export default Logo;
