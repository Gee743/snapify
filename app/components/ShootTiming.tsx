import { PublicSpace } from "@/app/data/publicSpaces";
import { formatSriLankaTime, getSeasonGuidance, getSunTimes } from "@/app/libs/sunTimes";

/**
 * Golden hour and season guidance, computed from the place's coordinates.
 * Unique content at zero marginal cost, and the long-tail magnet for queries
 * like "best time to photograph Ella".
 */
const ShootTiming = ({ space }: { space: PublicSpace }) => {
   const [latitude, longitude] = space.latlng;
   const sun = getSunTimes(latitude, longitude);
   const season = getSeasonGuidance(latitude, longitude);

   if (!sun) return null;

   // Ordered through the day so the column reads as a timeline. The two golden
   // hours are marked because they are what most visitors came for.
   const slots = [
      {
         label: "Blue hour",
         value: `${formatSriLankaTime(sun.blueHourMorningStart)}–${formatSriLankaTime(sun.sunrise)}`,
      },
      { label: "Sunrise", value: formatSriLankaTime(sun.sunrise) },
      {
         label: "Golden hour",
         value: `${formatSriLankaTime(sun.sunrise)}–${formatSriLankaTime(sun.goldenHourMorningEnd)}`,
         key: true,
      },
      {
         label: "Golden hour",
         value: `${formatSriLankaTime(sun.goldenHourEveningStart)}–${formatSriLankaTime(sun.sunset)}`,
         key: true,
      },
      { label: "Sunset", value: formatSriLankaTime(sun.sunset) },
      {
         label: "Blue hour",
         value: `${formatSriLankaTime(sun.sunset)}–${formatSriLankaTime(sun.blueHourEveningEnd)}`,
      },
   ];

   return (
      <section className="rounded-panel bg-ink-raised p-6 shadow-raised">
         <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-cream">
            Best time to shoot
         </h2>
         <p className="mb-5 mt-1.5 text-[13px] leading-5 text-cream-muted">
            Light times for today at this location, in Sri Lanka time.
         </p>
         <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {slots.map((slot, index) => (
               <div key={`${slot.label}-${index}`}>
                  <div className="text-[12px] text-cream-muted">{slot.label}</div>
                  <div
                     className={`tabular mt-0.5 text-[15px] font-semibold ${
                        slot.key ? "text-lime" : "text-cream"
                     }`}
                  >
                     {slot.value}
                  </div>
               </div>
            ))}
         </div>
         <div className="mt-6 border-t border-ink-line pt-4">
            <p className="text-[14.5px] text-cream">
               <span className="text-cream-muted">Best months: </span>
               <span className="font-semibold text-lime">{season.bestLabel}</span>
            </p>
            <p className="mt-1 text-[13px] text-cream-muted">
               Usually avoid {season.avoidLabel}.
            </p>
         </div>
         {space.shootingNotes && (
            <p className="mt-4 max-w-[62ch] text-[14.5px] leading-6 text-cream-soft">
               {space.shootingNotes}
            </p>
         )}
      </section>
   );
};

export default ShootTiming;
