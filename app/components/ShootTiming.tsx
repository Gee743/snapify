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

   const slots = [
      { label: "Blue hour", value: `${formatSriLankaTime(sun.blueHourMorningStart)}–${formatSriLankaTime(sun.sunrise)}` },
      { label: "Sunrise", value: formatSriLankaTime(sun.sunrise) },
      { label: "Morning golden hour", value: `${formatSriLankaTime(sun.sunrise)}–${formatSriLankaTime(sun.goldenHourMorningEnd)}` },
      { label: "Evening golden hour", value: `${formatSriLankaTime(sun.goldenHourEveningStart)}–${formatSriLankaTime(sun.sunset)}` },
      { label: "Sunset", value: formatSriLankaTime(sun.sunset) },
      { label: "Blue hour (pm)", value: `${formatSriLankaTime(sun.sunset)}–${formatSriLankaTime(sun.blueHourEveningEnd)}` },
   ];

   return (
      <section className="rounded-[14px] border border-white/10 bg-[#101010] p-5">
         <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-[#dcff1a]">
            Best time to shoot
         </h2>
         <p className="mb-4 text-xs text-[#6f6f6f]">
            Light times for today at this location, in Sri Lanka time.
         </p>
         <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {slots.map((slot) => (
               <div key={slot.label}>
                  <div className="text-[11px] uppercase tracking-[0.1em] text-[#929292]">
                     {slot.label}
                  </div>
                  <div className="text-sm font-semibold text-[#f5f5f5]">{slot.value}</div>
               </div>
            ))}
         </div>
         <div className="mt-4 border-t border-white/[0.07] pt-3 text-sm">
            <span className="text-[#929292]">Best months: </span>
            <span className="font-semibold text-[#dcff1a]">{season.bestLabel}</span>
            <span className="mt-1 block text-xs text-[#929292]">
               Usually avoid {season.avoidLabel}.
            </span>
         </div>
         {space.shootingNotes && (
            <p className="mt-3 text-sm text-[#c4c4c4]">{space.shootingNotes}</p>
         )}
      </section>
   );
};

export default ShootTiming;
