"use client";

import { STUDIO_TYPE_LABELS, StudioTypeValue } from "@/app/libs/studioTaxonomy";
import { STUDIO_STATUS_LABELS, StudioRecord, formatDate } from "./types";

const STATUS_TONE: Record<string, string> = {
   PUBLISHED: "border-[#dcff1a]/30 bg-[#dcff1a]/[0.07] text-[#dcff1a]",
   PENDING: "border-amber-400/30 bg-amber-400/[0.07] text-amber-300",
   REJECTED: "border-white/15 bg-white/[0.04] text-[#929292]",
};

const StudiosList = ({
   studios,
   isLoading,
   onEdit,
   onDelete,
   onAdd,
}: {
   studios: StudioRecord[];
   isLoading: boolean;
   onEdit: (studio: StudioRecord) => void;
   onDelete: (studio: StudioRecord) => void;
   onAdd: () => void;
}) => {
   const pending = studios.filter((studio) => studio.status === "PENDING").length;

   return (
      <div>
         <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
               <h2 className="text-xl font-semibold text-white">Studios</h2>
               <p className="mt-1 text-sm text-[#929292]">
                  {isLoading
                     ? "Loading..."
                     : `${studios.length} ${studios.length === 1 ? "studio" : "studios"}${
                          pending ? ` · ${pending} awaiting review` : ""
                       }`}
               </p>
            </div>
            <button
               type="button"
               onClick={onAdd}
               className="rounded-lg bg-[#dcff1a] px-4 py-2.5 text-sm font-semibold text-[#0a0a0a] transition"
            >
               Add a studio
            </button>
         </div>

         {!isLoading && studios.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-[#0d0d0d] px-6 py-12 text-center">
               <h3 className="text-base font-semibold text-white">No studios yet</h3>
               <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#929292]">
                  The public /studios page shows its waitlist empty state until a studio is
                  published here.
               </p>
            </div>
         )}

         <ul className="space-y-2">
            {studios.map((studio) => (
               <li
                  key={studio.slug}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-3.5"
               >
                  <div className="min-w-0 flex-1">
                     <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-medium text-white">{studio.name}</p>
                        <span
                           className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                              STATUS_TONE[studio.status] ?? STATUS_TONE.REJECTED
                           }`}
                        >
                           {STUDIO_STATUS_LABELS[studio.status] ?? studio.status}
                        </span>
                     </div>
                     <p className="mt-0.5 truncate text-xs text-[#929292]">
                        {studio.studioType in STUDIO_TYPE_LABELS
                           ? STUDIO_TYPE_LABELS[studio.studioType as StudioTypeValue]
                           : studio.studioType}{" "}
                        · {studio.locationLabel} · updated {formatDate(studio.updatedAt)}
                     </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                     <button
                        type="button"
                        onClick={() => onEdit(studio)}
                        className="rounded-lg border border-white/15 px-3.5 py-2 text-xs text-[#d4d4d4] transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
                     >
                        Edit
                     </button>
                     <button
                        type="button"
                        onClick={() => onDelete(studio)}
                        className="rounded-lg border border-white/15 px-3.5 py-2 text-xs text-[#d4d4d4] transition hover:border-[#ff8a7a] hover:text-[#ff8a7a]"
                     >
                        Delete
                     </button>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default StudiosList;
