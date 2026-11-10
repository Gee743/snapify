"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
   SpaceFacets,
   SpaceFilterState,
   countActiveFilters,
   describeFilters,
   hasActiveFilters,
   serializeFilters,
} from "@/app/libs/spaceFilters";

/**
 * Faceted filter bar for the listing grid.
 *
 * State lives in the URL rather than component state so a filtered view can be
 * shared, bookmarked and reached with the back button — the thing a local
 * `useState` version could never do. The server re-renders the grid for each
 * change, which keeps one filtering implementation instead of a server copy
 * and a client copy that can drift.
 */

const SELECT_CLASS =
   "w-full appearance-none rounded-xl border border-ink-lineStrong bg-ink-raised px-3.5 py-2.5 pr-9 text-[13.5px] text-cream outline-none transition-colors duration-200 hover:border-white/20 focus-visible:border-lime focus-visible:ring-1 focus-visible:ring-lime";

const Chevron = () => (
   <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cream-faint"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <polyline points="6 9 12 15 18 9" />
   </svg>
);

const SpaceFilters = ({
   filters,
   facets,
   resultCount,
   basePath,
}: {
   filters: SpaceFilterState;
   facets: SpaceFacets;
   resultCount: number;
   basePath: string;
}) => {
   const router = useRouter();
   const pathname = usePathname();
   const [isPending, startTransition] = useTransition();
   const [draftQuery, setDraftQuery] = useState(filters.q);
   const path = basePath || pathname || "/community";

   const push = useCallback(
      (next: SpaceFilterState) => {
         const query = serializeFilters(next);
         startTransition(() => {
            // scroll:false keeps the viewport on the filter bar; jumping to the
            // top on every toggle makes the grid feel like it reloaded.
            router.replace(query ? `${path}?${query}` : path, { scroll: false });
         });
      },
      [path, router]
   );

   // Keep the input in step when the URL changes from outside this component —
   // back/forward, or a cleared chip.
   useEffect(() => {
      setDraftQuery(filters.q);
   }, [filters.q]);

   // Debounce typing: one navigation per pause, not one per keystroke.
   const committed = useRef(filters.q);
   useEffect(() => {
      if (draftQuery === committed.current) return;
      const timer = setTimeout(() => {
         committed.current = draftQuery;
         push({ ...filters, q: draftQuery });
      }, 250);
      return () => clearTimeout(timer);
   }, [draftQuery, filters, push]);

   const chips = useMemo(() => describeFilters(filters, facets), [filters, facets]);
   const activeCount = countActiveFilters(filters);
   const anyActive = hasActiveFilters(filters);

   const setFacet = (key: "province" | "district" | "category", value: string) => {
      // Province and district are hierarchical: changing the province strands
      // any district that no longer sits inside it, so clear the narrower one.
      const next: SpaceFilterState =
         key === "province"
            ? { ...filters, province: value, district: "", city: "" }
            : key === "district"
            ? { ...filters, district: value, city: "" }
            : { ...filters, category: value };
      push(next);
   };

   const toggleAccess = (key: SpaceFilterState["access"][number]) => {
      const active = filters.access.includes(key);
      push({
         ...filters,
         access: active
            ? filters.access.filter((value) => value !== key)
            : [...filters.access, key],
      });
   };

   return (
      <div className="mb-7">
         <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
               <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-faint"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
               >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
               </svg>
               <input
                  type="search"
                  value={draftQuery}
                  onChange={(event) => setDraftQuery(event.target.value)}
                  placeholder="Search places, types or towns"
                  aria-label="Search places by name, type or town"
                  className="w-full rounded-xl border border-ink-lineStrong bg-ink-raised py-2.5 pl-10 pr-3.5 text-[13.5px] text-cream placeholder:text-cream-faint outline-none transition-colors duration-200 hover:border-white/20 focus-visible:border-lime focus-visible:ring-1 focus-visible:ring-lime"
               />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:w-auto sm:grid-cols-3">
               <div className="relative">
                  <label className="sr-only" htmlFor="filter-province">
                     Province
                  </label>
                  <select
                     id="filter-province"
                     value={filters.province}
                     onChange={(event) => setFacet("province", event.target.value)}
                     className={SELECT_CLASS}
                  >
                     <option value="">All provinces</option>
                     {facets.provinces.map((option) => (
                        <option key={option.value} value={option.value}>
                           {option.label} ({option.count})
                        </option>
                     ))}
                  </select>
                  <Chevron />
               </div>

               <div className="relative">
                  <label className="sr-only" htmlFor="filter-district">
                     District
                  </label>
                  <select
                     id="filter-district"
                     value={filters.district}
                     onChange={(event) => setFacet("district", event.target.value)}
                     className={SELECT_CLASS}
                  >
                     <option value="">All districts</option>
                     {facets.districts.map((option) => (
                        <option key={option.value} value={option.value}>
                           {option.label} ({option.count})
                        </option>
                     ))}
                  </select>
                  <Chevron />
               </div>

               <div className="relative col-span-2 sm:col-span-1">
                  <label className="sr-only" htmlFor="filter-category">
                     Category
                  </label>
                  <select
                     id="filter-category"
                     value={filters.category}
                     onChange={(event) => setFacet("category", event.target.value)}
                     className={SELECT_CLASS}
                  >
                     <option value="">All categories</option>
                     {facets.categories.map((option) => (
                        <option key={option.value} value={option.value}>
                           {option.label} ({option.count})
                        </option>
                     ))}
                  </select>
                  <Chevron />
               </div>
            </div>
         </div>

         <div
            role="group"
            aria-label="Access filters"
            className="scrollbar-hide mt-3 flex gap-2 overflow-x-auto pb-1"
         >
            {facets.access.map((entry) => {
               const active = filters.access.includes(entry.key);
               // A toggle that would empty the grid is still clickable when
               // active (you need to switch it off), but hidden when it is not.
               if (!active && entry.count === 0) return null;
               return (
                  <button
                     key={entry.key}
                     type="button"
                     onClick={() => toggleAccess(entry.key)}
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
                        {entry.count}
                     </span>
                  </button>
               );
            })}
         </div>

         {anyActive && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
               {chips.map((chip) => (
                  <button
                     key={chip.key}
                     type="button"
                     onClick={() => push(chip.next)}
                     aria-label={`Remove filter ${chip.label}`}
                     className="flex items-center gap-1.5 rounded-full bg-white/[0.05] py-1.5 pl-3.5 pr-2 text-[13px] text-cream-soft transition-colors duration-200 hover:bg-white/[0.09] hover:text-cream"
                  >
                     {chip.label}
                     <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-cream-muted">
                        <svg
                           width="8"
                           height="8"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="3.5"
                           strokeLinecap="round"
                           aria-hidden="true"
                        >
                           <line x1="5" y1="5" x2="19" y2="19" />
                           <line x1="19" y1="5" x2="5" y2="19" />
                        </svg>
                     </span>
                  </button>
               ))}
               <button
                  type="button"
                  onClick={() => push({ ...filters, q: "", province: "", district: "", city: "", category: "", access: [] })}
                  className="rounded-full px-2 py-1.5 text-[13px] font-medium text-cream-muted underline-offset-4 transition-colors duration-200 hover:text-lime hover:underline"
               >
                  Clear all
               </button>
            </div>
         )}

         <p
            role="status"
            aria-live="polite"
            className={`mt-3 text-[13px] transition-opacity duration-200 ${
               isPending ? "opacity-50" : "opacity-100"
            } text-cream-muted`}
         >
            {resultCount} {resultCount === 1 ? "place" : "places"}
            {activeCount > 0 && ` · ${activeCount} ${activeCount === 1 ? "filter" : "filters"} active`}
         </p>
      </div>
   );
};

export default SpaceFilters;
