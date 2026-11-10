"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/** /admin is a full-screen tool with its own sidebar navigation, so it opts out
 *  of the marketing header and footer. Everything else keeps the site chrome.
 *
 *  This is a client component because the root layout is static: a route group
 *  would mean moving every public page, and middleware cannot vary layouts. */
const isBareRoute = (pathname: string | null) =>
   Boolean(pathname && (pathname === "/admin" || pathname.startsWith("/admin/")));

export const SiteHeader = ({ children }: { children: ReactNode }) =>
   isBareRoute(usePathname()) ? null : <>{children}</>;

export const SiteFooter = ({ children }: { children: ReactNode }) =>
   isBareRoute(usePathname()) ? null : <>{children}</>;

/** Offsets content below the fixed header -- 72px on desktop, ~125px on mobile
 *  where search takes a second row. Admin has no header, so it gets no offset. */
export const SiteMain = ({ children }: { children: ReactNode }) => (
   <div
      id="main"
      className={isBareRoute(usePathname()) ? "grow" : "grow pt-[125px] md:pt-[72px]"}
   >
      {children}
   </div>
);
