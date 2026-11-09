"use client";

import { useMemo, useState } from "react";
import { PublicSpace } from "@/app/data/publicSpaces";
import { accessSignals } from "@/app/libs/accessSignal";
import PublicSpaceCard from "./PublicSpaceCard";

type FilterKey = "all" | "free" | "noPermit" | "drones";

const FILTERS: { key: FilterKey; label: string; hint: string }[] = [
   { key: "all", label: "All", hint: "Every listed place" },
   { key: "free", label: "No entry fee", hint: "Places that cost nothing to enter" },
   { key: "noPermit", label: "No permit", hint: "Shoot without applying for a permit" },
   { key: "drones", label: "Drone friendly", hint: "Drones allowed without a permit" },
];

const matches = (space: PublicSpace, filter: FilterKey) => {
   switch (filter) {
      // Uses the same verdict the card chip shows, so a place labelled "Free in
      // part" does not quietly pass a filter that promises no entry fee.
      case "free":
         return accessSignals(space).some((signal) => signal.label === "Free entry");
      case "noPermit":
         return !space.permitRequired;
      case "drones":
         return space.droneRule === "ALLOWED";
      default:
         return true;
   }
};

/**
 * Listing grid with access filters.
 *
 * The catalogue's real value is the permit / fee / drone data, but browsing
 * previously offered no way to use it: visitors had to open each place in turn
 * to find out whether they could legally fly a drone there. Filtering is
 * client-side because the full set is small and already in memory, so results
 * are instant and no round trip is needed.
 */
const SpaceGrid = ({
   spaces,
   showFilters = true,
}: {
   spaces: PublicSpace[];
   showFilters?: boolean;
}) => {
   const [filter, setFilter] = useState<FilterKey>("all");

   // A filter that can only ever return nothing is noise; offer the ones the
   // current set actually supports.
   const available = useMemo(
      () => FILTERS.filter((entry) => entry.key === "all" || spaces.some((s) => matches(s, entry.key))),
      [spaces]
   );

   const visible = useMemo(
      () => spaces.filter((space) => matches(space, filter)),
      [spaces, filter]
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

         <p className="sr-only" role="status">
            {visible.length} places shown
         </p>

         {visible.length === 0 ? (
            <div className="rounded-panel bg-ink-raised px-6 py-14 text-center shadow-raised">
               <h3 className="text-lg font-semibold text-cream">Nothing matches that filter</h3>
               <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cream-muted">
                  No place in this list meets that condition yet. Clear the filter to see
                  everything here.
               </p>
               <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="mt-6 rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.97]"
               >
                  Show all places
               </button>
            </div>
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
