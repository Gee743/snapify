"use client";

import { useMemo, useState } from "react";
import { DRONE_RULE_LABELS, PublicSpaceRecord } from "./types";

interface SpacesListProps {
   spaces: PublicSpaceRecord[];
   isLoading: boolean;
   onEdit: (space: PublicSpaceRecord) => void;
   onDelete: (space: PublicSpaceRecord) => void;
   onAdd: () => void;
}

const DRONE_TONE: Record<string, string> = {
   ALLOWED: "border-[#dcff1a]/30 text-[#dcff1a]",
   PERMIT_REQUIRED: "border-[#ffcf6a]/30 text-[#ffcf6a]",
   PROHIBITED: "border-[#ff8a7a]/30 text-[#ff9a8b]",
   UNKNOWN: "border-white/15 text-[#929292]",
};

const Badge = ({ tone, children }: { tone: string; children: React.ReactNode }) => (
   <span className={`rounded-full border px-2 py-0.5 text-xs ${tone}`}>{children}</span>
);

/** Flags a place whose access intelligence is still blank -- the fields that
 *  make the listing worth visiting. */
const isIncomplete = (space: PublicSpaceRecord) =>
   (!space.droneRule || space.droneRule === "UNKNOWN") &&
   !space.openingHours &&
   !space.entryFee;

const SpacesList = ({ spaces, isLoading, onEdit, onDelete, onAdd }: SpacesListProps) => {
   const [query, setQuery] = useState("");
   const [province, setProvince] = useState("");
   const [drone, setDrone] = useState("");

   const provinces = useMemo(
      () =>
         Array.from(
            new Set(spaces.map((space) => space.province).filter((value): value is string => Boolean(value)))
         ).sort(),
      [spaces]
   );

   const visible = useMemo(() => {
      const needle = query.trim().toLowerCase();
      return spaces.filter((space) => {
         const matchesQuery =
            !needle ||
            [space.name, space.slug, space.type, space.locationLabel].some((field) =>
               field?.toLowerCase().includes(needle)
            );
         const matchesProvince = !province || space.province === province;
         const matchesDrone = !drone || (space.droneRule ?? "UNKNOWN") === drone;
         return matchesQuery && matchesProvince && matchesDrone;
      });
   }, [spaces, query, province, drone]);

   const selectClass =
      "rounded-lg border border-white/10 bg-[#161616] px-3 py-2 text-sm text-white outline-none transition focus:border-[#dcff1a]";

   return (
      <section>
         <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
               <h2 className="text-xl font-semibold">Public spaces</h2>
               <p className="mt-1 text-sm text-[#929292]">
                  {spaces.length} total
                  {visible.length !== spaces.length && ` · ${visible.length} shown`}
               </p>
            </div>
            <button
               type="button"
               onClick={onAdd}
               className="rounded-lg bg-[#dcff1a] px-4 py-2 text-sm font-semibold text-[#0a0a0a] transition hover:brightness-105"
            >
               Add a space
            </button>
         </div>

         <div className="mb-5 flex flex-wrap gap-3">
            <input
               type="search"
               value={query}
               onChange={(event) => setQuery(event.target.value)}
               placeholder="Search name, slug, area..."
               aria-label="Search spaces"
               className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#161616] px-3.5 py-2 text-sm text-white outline-none transition focus:border-[#dcff1a] sm:max-w-xs"
            />
            <select
               value={province}
               onChange={(event) => setProvince(event.target.value)}
               aria-label="Filter by province"
               className={selectClass}
            >
               <option value="">All provinces</option>
               {provinces.map((name) => (
                  <option key={name} value={name}>
                     {name}
                  </option>
               ))}
            </select>
            <select
               value={drone}
               onChange={(event) => setDrone(event.target.value)}
               aria-label="Filter by drone rule"
               className={selectClass}
            >
               <option value="">Any drone rule</option>
               {Object.entries(DRONE_RULE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                     {label}
                  </option>
               ))}
            </select>
         </div>

         {isLoading ? (
            <p className="py-8 text-sm text-[#929292]">Loading spaces...</p>
         ) : spaces.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-[#101010] px-5 py-8 text-sm text-[#929292]">
               No spaces yet. Add one using the button above.
            </p>
         ) : visible.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-[#101010] px-5 py-8 text-sm text-[#929292]">
               No spaces match these filters.
            </p>
         ) : (
            <ul className="space-y-3">
               {visible.map((space) => {
                  const droneRule = space.droneRule ?? "UNKNOWN";
                  return (
                     <li
                        key={space.slug}
                        className="flex gap-4 rounded-xl border border-white/10 bg-[#101010] p-3 transition hover:border-white/20"
                     >
                        <div
                           className="h-20 w-28 shrink-0 rounded-lg bg-cover bg-center"
                           style={{
                              backgroundImage: `url("${space.imageSrc.split('"').join("%22")}")`,
                           }}
                           role="img"
                           aria-label={space.name}
                        />
                        <div className="min-w-0 flex-1">
                           <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold">{space.name}</h3>
                              <Badge tone={DRONE_TONE[droneRule]}>
                                 Drone: {DRONE_RULE_LABELS[droneRule]}
                              </Badge>
                              {space.permitRequired && (
                                 <Badge tone="border-[#ffcf6a]/30 text-[#ffcf6a]">Permit</Badge>
                              )}
                              {space.isFree === false && (
                                 <Badge tone="border-white/15 text-[#b8b8b8]">Paid</Badge>
                              )}
                              {isIncomplete(space) && (
                                 <Badge tone="border-[#ff8a7a]/30 text-[#ff9a8b]">
                                    Access details missing
                                 </Badge>
                              )}
                           </div>
                           <p className="mt-1 truncate text-sm text-[#929292]">
                              {space.type} · {space.locationLabel}
                           </p>
                           <p className="mt-0.5 truncate text-xs text-[#737373]">
                              /community/{space.slug}
                           </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end justify-center gap-2 sm:flex-row sm:items-center">
                           <button
                              type="button"
                              onClick={() => onEdit(space)}
                              className="rounded-md border border-white/15 px-3 py-1.5 text-sm transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
                           >
                              Edit
                           </button>
                           <button
                              type="button"
                              onClick={() => onDelete(space)}
                              className="rounded-md border border-[#ff8a7a]/30 px-3 py-1.5 text-sm text-[#ff9a8b] transition hover:bg-[#ff8a7a]/10"
                           >
                              Remove
                           </button>
                           <a
                              href={`/community/${space.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-1 text-sm text-[#929292] hover:text-white"
                           >
                              View
                           </a>
                        </div>
                     </li>
                  );
               })}
            </ul>
         )}
      </section>
   );
};

export default SpacesList;
