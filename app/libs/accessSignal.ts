import { PublicSpace } from "@/app/data/publicSpaces";

export type Signal = {
   label: string;
   /** Tailwind text colour token for the chip. */
   tone: string;
   title: string;
};

/**
 * `entryFee` is editorial prose, not a value: it ranges from "Free." to a
 * 106-character sentence about SAARC pricing. Rendering it verbatim in a chip
 * wrapped cards to four lines and left the grid ragged, so the chip carries a
 * derived verdict and the full sentence stays on the detail page.
 */
const feeSignal = (space: PublicSpace): Signal | null => {
   const fee = space.entryFee?.trim();

   if (!fee) {
      return space.isFree === false
         ? null
         : { label: "Free entry", tone: "text-signal-go", title: "No entry fee" };
   }

   const text = fee.toLowerCase();
   // "Free for Sri Lankans; ... ticket applies to foreign visitors" is a paid
   // place for most readers, so a leading "free" only counts when nothing
   // later in the sentence reverses it.
   const charged = /\b(usd|lkr|rs\.?|ticket|charge|fee|paid|donation)\b/.test(text);

   if (text.startsWith("free") && !charged) {
      return { label: "Free entry", tone: "text-signal-go", title: fee };
   }
   if (text.startsWith("free") && charged) {
      return { label: "Free in part", tone: "text-signal-warn", title: fee };
   }
   return { label: "Entry fee", tone: "text-signal-warn", title: fee };
};

/**
 * The two or three facts that decide whether someone can actually shoot at a
 * place: what it costs, whether a permit is needed, and whether a drone is
 * allowed. Every card previously read "Free - No booking needed", identical on
 * all of them, which carried no information at all.
 */
export const accessSignals = (space: PublicSpace): Signal[] => {
   const signals: Signal[] = [];

   const fee = feeSignal(space);
   if (fee) signals.push(fee);

   if (space.permitRequired) {
      signals.push({
         label: "Permit needed",
         tone: "text-signal-warn",
         title: space.permitAuthority
            ? `Permit required from ${space.permitAuthority}`
            : "A shooting permit is required",
      });
   }

   if (space.droneRule === "PROHIBITED") {
      signals.push({ label: "No drones", tone: "text-signal-stop", title: "Drones prohibited" });
   } else if (space.droneRule === "PERMIT_REQUIRED") {
      signals.push({
         label: "Drone permit",
         tone: "text-signal-warn",
         title: "A drone permit is required",
      });
   } else if (space.droneRule === "ALLOWED") {
      signals.push({ label: "Drones OK", tone: "text-signal-go", title: "Drones allowed" });
   }

   // Three chips is the most a card can carry before the name stops leading.
   return signals.slice(0, 3);
};
