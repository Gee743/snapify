import { PublicSpace } from "@/app/data/publicSpaces";

/**
 * Long-form access notes.
 *
 * The verdicts (fee, hours, permit, drones, tripods) now live in the sidebar
 * summary panel, where they can be scanned in a couple of seconds. This
 * section carries only the paragraphs that are too long for a label/value row
 * — the permit procedure, the drone caveats, the shooting conditions. When a
 * place has no such notes it renders nothing rather than restating the
 * sidebar.
 */
const AccessPanel = ({ space }: { space: PublicSpace }) => {
   const notes = [
      space.permitNotes && {
         label: space.permitAuthority ? `Permits · ${space.permitAuthority}` : "Permits",
         body: space.permitNotes,
      },
      space.droneNotes && { label: "Drones", body: space.droneNotes },
      space.shootingNotes && { label: "On location", body: space.shootingNotes },
   ].filter(Boolean) as { label: string; body: string }[];

   if (notes.length === 0) return null;

   return (
      <section className="rounded-panel bg-ink-raised p-6 shadow-raised">
         <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-cream">
            Access notes
         </h2>
         <p className="mb-4 mt-1.5 text-[13px] leading-5 text-cream-muted">
            Rules change and enforcement varies. Confirm with the site before a paid shoot.
         </p>
         <div className="flex flex-col gap-4">
            {notes.map((note) => (
               <div key={note.label}>
                  <h3 className="text-[12px] font-medium uppercase tracking-[0.07em] text-cream-faint">
                     {note.label}
                  </h3>
                  <p className="mt-1.5 max-w-[68ch] text-[14.5px] leading-6 text-cream-soft">
                     {note.body}
                  </p>
               </div>
            ))}
         </div>
      </section>
   );
};

export default AccessPanel;
