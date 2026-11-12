"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
   { label: "Browse", href: "/photo-spots" },
   // "Free spaces" and "Studios" are named by what they cost, not by what they
   // are: the free/paid split is the first thing a visitor needs to understand
   // about the directory, and "All spaces" next to "Studios" would not convey it.
   { label: "Free spaces", href: "/community" },
   { label: "Studios", href: "/studios" },
   { label: "Guides", href: "/guides" },
];

/**
 * Desktop navigation. Marks the current section so a visitor three levels deep
 * in a hub can still tell where they are -- the previous navbar gave no
 * indication of the active route anywhere.
 */
const NavLinks = () => {
   const pathname = usePathname();

   return (
      <nav className="hidden items-center gap-1 md:flex">
         {links.map((link) => {
            const current =
               pathname === link.href || (pathname?.startsWith(`${link.href}/`) ?? false);
            return (
               <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                     current ? "text-lime" : "text-cream-soft hover:text-cream"
                  }`}
               >
                  {link.label}
                  {current && (
                     <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-lime"
                     />
                  )}
               </Link>
            );
         })}
         <Link
            href="/list-your-space"
            className="ml-2 whitespace-nowrap rounded-xl bg-lime px-4 py-2.5 text-[13px] font-semibold text-ink transition-all duration-200 ease-out hover:shadow-glow hover:brightness-105 active:scale-[0.97]"
         >
            List your space
         </Link>
      </nav>
   );
};

export default NavLinks;
