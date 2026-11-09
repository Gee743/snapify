import { PublicSpace } from "@/app/data/publicSpaces";

const DRONE_COPY: Record<string, { label: string; tone: string }> = {
   ALLOWED: { label: "Drones allowed", tone: "text-signal-go" },
   PERMIT_REQUIRED: { label: "Drone permit required", tone: "text-signal-warn" },
   PROHIBITED: { label: "Drones prohibited", tone: "text-signal-stop" },
   UNKNOWN: { label: "Drone rules unconfirmed", tone: "text-cream-muted" },
};

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
   <div className="flex flex-col gap-1 border-b border-ink-line py-3.5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-5">
      <dt className="w-40 shrink-0 text-[13px] text-cream-muted">{label}</dt>
      <dd className="text-[14.5px] leading-6 text-cream">{value}</dd>
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
      <section className="rounded-panel bg-ink-raised p-6 shadow-raised">
         <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-cream">
            Access, fees and permits
         </h2>
         <p className="mb-2 mt-1.5 text-[13px] leading-5 text-cream-muted">
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
                              space.permitRequired ? "text-signal-warn" : "text-signal-go"
                           }
                        >
                           {space.permitRequired ? "Required" : "Not required"}
                        </span>
                        {space.permitAuthority && (
                           <span className="text-cream-muted"> · {space.permitAuthority}</span>
                        )}
                        {space.permitNotes && (
                           <span className="mt-1.5 block text-cream-soft">
                              {space.permitNotes}
                           </span>
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
                           <span className="mt-1.5 block text-cream-soft">
                              {space.droneNotes}
                           </span>
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
