"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
   { label: "Browse by area", href: "/photo-spots", hint: "Province, district, city or type" },
   { label: "All free spaces", href: "/community", hint: "Public places, no booking or fee" },
   { label: "Studios to hire", href: "/studios", hint: "Paid, bookable spaces" },
   { label: "Guides", href: "/guides", hint: "Permits, drone law, seasons" },
   { label: "Submit a place", href: "/submit", hint: "Add a spot you know" },
   { label: "About", href: "/about", hint: "What Snapify is for" },
];

/**
 * Mobile navigation.
 *
 * The navbar previously put the logo, the search control and three links on one
 * row at every width; below ~420px they collided and the "All spaces" link was
 * hidden outright, leaving no way to reach it on a phone.
 */
const MobileMenu = () => {
   const [open, setOpen] = useState(false);
   const pathname = usePathname();

   // Route change closes the sheet; without this the panel stays open over the
   // page the visitor just navigated to.
   useEffect(() => setOpen(false), [pathname]);

   // A scrollable page behind a full-screen sheet is a well-known source of
   // "the wrong thing scrolled" on touch.
   useEffect(() => {
      document.body.style.overflow = open ? "hidden" : "";
      return () => {
         document.body.style.overflow = "";
      };
   }, [open]);

   useEffect(() => {
      const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
   }, []);

   return (
      <div className="md:hidden">
         <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            // 44px square: the minimum comfortable touch target.
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-line text-cream transition-colors duration-200 hover:border-ink-lineStrong active:scale-95"
         >
            <svg
               width="18"
               height="18"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               aria-hidden="true"
            >
               {open ? (
                  <>
                     <line x1="6" y1="6" x2="18" y2="18" />
                     <line x1="18" y1="6" x2="6" y2="18" />
                  </>
               ) : (
                  <>
                     <line x1="3" y1="7" x2="21" y2="7" />
                     <line x1="3" y1="12" x2="21" y2="12" />
                     <line x1="3" y1="17" x2="21" y2="17" />
                  </>
               )}
            </svg>
         </button>

         {/* The panel needs an explicit height: as a flex item's child it
             otherwise collapses to one row even though it is `fixed`. The
             125px offset is the navbar plus the mobile search row. The ground
             is fully opaque -- at 98% the hero headline read through it and
             competed with the menu labels. */}
         {open && (
            <div
               id="mobile-menu"
               style={{ height: "calc(100dvh - 125px)" }}
               className="fixed inset-x-0 top-[125px] z-40 animate-sheet overflow-y-auto border-t border-ink-line bg-ink"
            >
               <nav className="px-4 py-4">
                  <ul className="flex flex-col">
                     {links.map((link) => {
                        const current = pathname === link.href;
                        return (
                           <li key={link.href}>
                              <Link
                                 href={link.href}
                                 aria-current={current ? "page" : undefined}
                                 className="flex items-center justify-between gap-4 border-b border-ink-line py-4 transition-colors duration-200"
                              >
                                 <span>
                                    <span
                                       className={`block text-[17px] font-medium ${
                                          current ? "text-lime" : "text-cream"
                                       }`}
                                    >
                                       {link.label}
                                    </span>
                                    <span className="mt-0.5 block text-[13px] text-cream-muted">
                                       {link.hint}
                                    </span>
                                 </span>
                                 <svg
                                    className="h-4 w-4 shrink-0 text-cream-faint"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                 >
                                    <path d="M9 6l6 6-6 6" />
                                 </svg>
                              </Link>
                           </li>
                        );
                     })}
                  </ul>

                  <Link
                     href="/list-your-space"
                     className="mt-6 flex items-center justify-center rounded-xl bg-lime px-5 py-3.5 text-[15px] font-semibold text-ink shadow-glow transition-transform duration-200 active:scale-[0.98]"
                  >
                     List your space
                  </Link>
                  <p className="mt-3 px-1 text-center text-[13px] leading-5 text-cream-muted">
                     Own a studio, villa or venue? Join the waitlist for paid bookings.
                  </p>
               </nav>
            </div>
         )}
      </div>
   );
};

export default MobileMenu;
