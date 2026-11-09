import { PublicSpace } from "@/app/data/publicSpaces";

const DRONE_COPY: Record<string, { label: string; tone: string }> = {
   ALLOWED: { label: "Drones allowed", tone: "text-[#dcff1a]" },
   PERMIT_REQUIRED: { label: "Drone permit required", tone: "text-[#ffd166]" },
   PROHIBITED: { label: "Drones prohibited", tone: "text-[#ff6b6b]" },
   UNKNOWN: { label: "Drone rules unconfirmed", tone: "text-[#929292]" },
};

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
   <div className="flex flex-col gap-1 border-b border-white/[0.07] py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="w-44 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#929292]">
         {label}
      </dt>
      <dd className="text-sm text-[#e4e4e4]">{value}</dd>
   </div>
);

/**
 * Permit / fee / drone panel -- the thing no competing directory publishes.
 * Only renders rows we actually have data for, so a sparse place does not show
 * a wall of "unknown".
 */
const AccessPanel = ({ space }: { space: PublicSpace }) => {
   const drone = space.droneRule ? DRONE_COPY[space.droneRule] : undefined;
   const hasAnything =
      space.entryFee ||
      space.openingHours ||
      space.permitRequired ||
      space.permitNotes ||
      (drone && space.droneRule !== "UNKNOWN") ||
      typeof space.tripodAllowed === "boolean";

   if (!hasAnything) return null;

   return (
      <section className="rounded-[14px] border border-white/10 bg-[#101010] p-5">
         <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-[#dcff1a]">
            Access, fees &amp; permits
         </h2>
         <p className="mb-3 text-xs text-[#6f6f6f]">
            Rules change and enforcement varies. Confirm with the site before a paid shoot.
         </p>
         <dl>
            {space.entryFee && <Row label="Entry fee" value={space.entryFee} />}
            {space.openingHours && <Row label="Open" value={space.openingHours} />}
            {(space.permitRequired || space.permitNotes) && (
               <Row
                  label="Permit"
                  value={
                     <>
                        <span
                           className={
                              space.permitRequired ? "text-[#ffd166]" : "text-[#dcff1a]"
                           }
                        >
                           {space.permitRequired ? "Required" : "Not required"}
                        </span>
                        {space.permitAuthority && (
                           <span className="text-[#929292]"> · {space.permitAuthority}</span>
                        )}
                        {space.permitNotes && (
                           <span className="mt-1 block text-[#c4c4c4]">{space.permitNotes}</span>
                        )}
                     </>
                  }
               />
            )}
            {drone && space.droneRule !== "UNKNOWN" && (
               <Row
                  label="Drones"
                  value={
                     <>
                        <span className={drone.tone}>{drone.label}</span>
                        {space.droneNotes && (
                           <span className="mt-1 block text-[#c4c4c4]">{space.droneNotes}</span>
                        )}
                     </>
                  }
               />
            )}
            {typeof space.tripodAllowed === "boolean" && (
               <Row
                  label="Tripods / pro gear"
                  value={space.tripodAllowed ? "Allowed" : "Restricted or charged separately"}
               />
            )}
         </dl>
      </section>
   );
};

export default AccessPanel;
