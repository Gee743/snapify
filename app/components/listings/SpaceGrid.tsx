"use client";

import { useMemo, useState } from "react";
import { PublicSpace } from "@/app/data/publicSpaces";
import { ACCESS_FILTERS, AccessKey, matchesFilters, EMPTY_FILTERS } from "@/app/libs/spaceFilters";
import PublicSpaceCard from "./PublicSpaceCard";

const matches = (space: PublicSpace, filter: AccessKey | "all") =>
   filter === "all" ? true : matchesFilters(space, { ...EMPTY_FILTERS, access: [filter] });

/**
 * Listing grid.
 *
 * Two modes. On pages that own a full faceted filter bar (/community), the
 * caller filters upstream and passes `showFilters={false}` so there is one set
 * of controls, not two. Everywhere else — the home page, the hub pages — the
 * grid keeps its own lightweight single-select access chips, which is all
 * those pages need and avoids forcing URL state onto them.
 */
const SpaceGrid = ({
   spaces,
   showFilters = true,
   emptyState,
}: {
   spaces: PublicSpace[];
   showFilters?: boolean;
   emptyState?: React.ReactNode;
}) => {
   const [filter, setFilter] = useState<AccessKey | "all">("all");

   // A filter that can only ever return nothing is noise; offer the ones the
   // current set actually supports.
   const available = useMemo(
      () =>
         [{ key: "all" as const, label: "All", hint: "Every listed place" }, ...ACCESS_FILTERS].filter(
            (entry) => entry.key === "all" || spaces.some((s) => matches(s, entry.key))
         ),
      [spaces]
   );

   const visible = useMemo(
      () => (showFilters ? spaces.filter((space) => matches(space, filter)) : spaces),
      [spaces, filter, showFilters]
   );

   return (
      <div>
         {showFilters && available.length > 1 && (
            <div
               role="group"
               aria-label="Filter places"
               className="scrollbar-hide mb-6 flex gap-2 overflow-x-auto pb-1"
            >
               {available.map((entry) => {
                  const active = filter === entry.key;
                  const count = spaces.filter((space) => matches(space, entry.key)).length;
                  return (
                     <button
                        key={entry.key}
                        type="button"
                        onClick={() => setFilter(entry.key)}
                        aria-pressed={active}
                        title={entry.hint}
                        className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ease-out active:scale-[0.97] ${
                           active
                              ? "bg-lime text-ink"
                              : "bg-white/[0.05] text-cream-soft hover:bg-white/[0.09] hover:text-cream"
                        }`}
                     >
                        {entry.label}
                        <span
                           className={`tabular text-[11.5px] ${
                              active ? "text-ink/55" : "text-cream-faint"
                           }`}
                        >
                           {count}
                        </span>
                     </button>
                  );
               })}
            </div>
         )}

         {showFilters && (
            <p className="sr-only" role="status">
               {visible.length} places shown
            </p>
         )}

         {visible.length === 0 ? (
            emptyState ?? (
               <div className="rounded-panel bg-ink-raised px-6 py-14 text-center shadow-raised">
                  <h3 className="text-lg font-semibold text-cream">Nothing matches that filter</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cream-muted">
                     No place in this list meets that condition yet. Clear the filter to see
                     everything here.
                  </p>
                  {showFilters && (
                     <button
                        type="button"
                        onClick={() => setFilter("all")}
                        className="mt-6 rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.97]"
                     >
                        Show all places
                     </button>
                  )}
               </div>
            )
         ) : (
            <div
               // key on the filter so the stagger replays when the set changes,
               // making it obvious the grid responded.
               key={filter}
               className="stagger grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4"
            >
               {/* No priority hint: the grid always sits below a hero or a page
                   header, so no card image is ever the LCP element. Eager-loading
                   the first row only competes with the content above it. */}
               {visible.map((space, index) => (
                  <PublicSpaceCard key={space.id} data={space} index={index} />
               ))}
            </div>
         )}
      </div>
   );
};

export default SpaceGrid;
