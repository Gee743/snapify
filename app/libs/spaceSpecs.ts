import { PublicSpace } from "@/app/data/publicSpaces";
import { accessSignals } from "@/app/libs/accessSignal";

/**
 * Short, right-alignable values for the detail-page spec rows.
 *
 * The stored fields are editorial prose — `entryFee` runs to 106 characters
 * ("Free for Sri Lankans; the Anuradhapura Sacred City ticket ... applies to
 * foreign visitors") and `openingHours` to a full sentence. Printed verbatim in
 * a label/value row they wrap to three lines and destroy the scan line, which
 * is the whole point of the layout. So each row carries a derived value of a
 * few words, and the original sentence stays available as the row's detail.
 */

export type SpecTone = "go" | "warn" | "stop" | "neutral";

export type Spec = {
   label: string;
   /** Short enough to sit on one line opposite the label. */
   value: string;
   /** The original sentence, when it says more than the short value. */
   detail?: string | null;
   tone?: SpecTone;
};

export const TONE_CLASS: Record<SpecTone, string> = {
   go: "text-signal-go",
   warn: "text-signal-warn",
   stop: "text-signal-stop",
   neutral: "text-cream",
};

/** The fee verdict, reusing the card chip so the two can never disagree. */
export const feeVerdict = (space: PublicSpace) => {
   const label = accessSignals(space).find((signal) =>
      ["Free entry", "Free in part", "Entry fee"].includes(signal.label)
   )?.label;

   if (label === "Entry fee") return { headline: "Ticketed", value: "Entry fee", tone: "warn" as SpecTone };
   if (label === "Free in part")
      return { headline: "Partly free", value: "Free in part", tone: "warn" as SpecTone };
   return { headline: "Free", value: "Free", tone: "go" as SpecTone };
};

/**
 * A clock range pulled out of the opening-hours sentence, e.g.
 * "07:00-17:30, last entry around 17:00." -> "07:00–17:30".
 * Returns null when the sentence has no range to lift, in which case the
 * caller shows a shorter qualitative value and keeps the sentence as detail.
 */
const clockRange = (text: string) => {
   const match = text.match(
      /(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*(?:-|–|—|to)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i
   );
   if (!match) return null;
   const tidy = (value: string) => value.trim().replace(/\s+/g, " ").toUpperCase().replace(/(\d)(AM|PM)/, "$1 $2");
   return `${tidy(match[1])}–${tidy(match[2])}`;
};

const hoursSpec = (space: PublicSpace): Spec | null => {
   const text = space.openingHours?.trim();
   if (!text) return null;

   const range = clockRange(text);
   if (range) {
      // Only keep the sentence when it carries more than the range itself.
      const remainder = text.replace(/^[^,;]*[,;]\s*/, "");
      return {
         label: "Opening hours",
         value: range,
         detail: remainder && remainder !== text ? remainder : null,
      };
   }

   const lower = text.toLowerCase();
   if (lower.includes("all hours") || lower.includes("any time") || lower.startsWith("open at all")) {
      return { label: "Opening hours", value: "Open 24h", tone: "go", detail: null };
   }
   if (lower.startsWith("daylight")) {
      return { label: "Opening hours", value: "Daylight only", detail: text };
   }
   return { label: "Opening hours", value: "See notes", detail: text };
};

const DRONE_VALUE: Record<string, { value: string; tone: SpecTone }> = {
   ALLOWED: { value: "Allowed", tone: "go" },
   PERMIT_REQUIRED: { value: "Permit needed", tone: "warn" },
   PROHIBITED: { value: "Not allowed", tone: "stop" },
};

/**
 * The rows for one place, in the order they matter to someone deciding whether
 * to go. Rows with no data are omitted rather than rendered as "Unknown", so a
 * sparsely documented place shows three honest rows instead of eight empty ones.
 */
export const buildSpecs = (space: PublicSpace): Spec[] => {
   const specs: Spec[] = [];
   const fee = feeVerdict(space);

   specs.push({
      label: "Entry fee",
      value: fee.value,
      tone: fee.tone,
      // The sentence only adds something when it is not just the word "Free."
      detail:
         space.entryFee?.trim() && !/^free\.?$/i.test(space.entryFee.trim())
            ? space.entryFee.trim()
            : null,
   });

   const hours = hoursSpec(space);
   if (hours) specs.push(hours);

   specs.push({
      label: "Category",
      value: space.type,
   });

   if (space.permitRequired || space.permitNotes) {
      specs.push({
         label: "Shoot permit",
         value: space.permitRequired ? "Required" : "Not required",
         tone: space.permitRequired ? "warn" : "go",
         // The procedure itself is a paragraph and belongs in the Access notes
         // section; repeating it here would print it twice on the same page.
         detail: space.permitAuthority ? `Authority: ${space.permitAuthority}` : null,
      });
   }

   const drone = space.droneRule ? DRONE_VALUE[space.droneRule] : undefined;
   if (drone) {
      specs.push({ label: "Drones", value: drone.value, tone: drone.tone });
   }

   if (typeof space.tripodAllowed === "boolean") {
      specs.push({
         label: "Tripods",
         value: space.tripodAllowed ? "Allowed" : "Restricted",
         tone: space.tripodAllowed ? "go" : "warn",
      });
   }

   return specs;
};
