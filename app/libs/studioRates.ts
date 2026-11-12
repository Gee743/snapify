import { Studio, lowestRate } from "@/app/actions/getStudios";

/**
 * Rate presentation.
 *
 * Rates are stored as integers and formatted here rather than at the database
 * boundary, so the card, the detail rate card and the JSON-LD all read the
 * same rules — in particular, that a missing rate is "on request" and never
 * rendered as zero or free.
 */

/** "Rs 7,500". Intl with LKR renders "LKR 7,500.00", which is both noisier and
 *  not how a rate is quoted locally. */
export const formatMoney = (amount: number, currency = "LKR") => {
   const formatted = amount.toLocaleString("en-LK", { maximumFractionDigits: 0 });
   return currency === "LKR" ? `Rs ${formatted}` : `${currency} ${formatted}`;
};

export type RateLine = { label: string; value: string; note?: string };

/** Every published rate, in the order a crew reads them. */
export const rateLines = (studio: Studio): RateLine[] => {
   const lines: RateLine[] = [];

   if (studio.hourlyRate) {
      lines.push({
         label: "Hourly",
         value: `${formatMoney(studio.hourlyRate, studio.currency)}/hr`,
         note:
            studio.minimumHours && studio.minimumHours > 1
               ? `${studio.minimumHours} hour minimum`
               : undefined,
      });
   }
   if (studio.halfDayRate) {
      lines.push({
         label: "Half day",
         value: formatMoney(studio.halfDayRate, studio.currency),
         note: "Around 4 hours",
      });
   }
   if (studio.fullDayRate) {
      lines.push({
         label: "Full day",
         value: formatMoney(studio.fullDayRate, studio.currency),
         note: "Around 8 hours",
      });
   }

   return lines;
};

/** The "from" price on a card. Null rates say so rather than showing nothing,
 *  since a blank where a price belongs reads as an error. */
export const fromPriceLabel = (studio: Studio) => {
   const rate = lowestRate(studio);
   if (rate === null) return "Rate on request";
   const suffix = studio.hourlyRate === rate ? "/hr" : "";
   return `From ${formatMoney(rate, studio.currency)}${suffix}`;
};

/** Compact size/capacity summary for cards and the spec row. */
export const capacityLabel = (studio: Studio) => {
   const parts: string[] = [];
   if (studio.capacity) parts.push(`${studio.capacity} people`);
   if (studio.floorAreaSqft) parts.push(`${studio.floorAreaSqft.toLocaleString("en-LK")} sq ft`);
   return parts.join(" · ");
};
