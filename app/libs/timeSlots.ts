import { isBefore } from "date-fns";

export const BOOKING_HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const;

export type BookingHour = (typeof BOOKING_HOURS)[number];

export interface SlotInterval {
   startDate: string | Date;
   endDate: string | Date;
}

export function formatSlotLabel(hour: number) {
   if (hour === 12) return "Noon";
   if (hour === 0) return "12:00AM";
   if (hour < 12) return `${hour}:00AM`;
   return `${hour - 12}:00PM`;
}

export function getSlotRange(date: Date, hour: number) {
   const start = new Date(date);
   start.setHours(hour, 0, 0, 0);
   const end = new Date(start);
   end.setHours(hour + 1, 0, 0, 0);
   return { start, end };
}

export function getSlotRangeForHours(date: Date, hours: number[]) {
   if (hours.length === 0) {
      throw new Error("getSlotRangeForHours requires at least one hour");
   }
   const { start } = getSlotRange(date, Math.min(...hours));
   const { end } = getSlotRange(date, Math.max(...hours));
   return { start, end };
}

export function slotsOverlap(
   aStart: Date,
   aEnd: Date,
   bStart: Date,
   bEnd: Date
) {
   return aStart < bEnd && aEnd > bStart;
}

export function isSlotBooked(reservations: SlotInterval[], date: Date, hour: number) {
   const { start, end } = getSlotRange(date, hour);

   return reservations.some((reservation) =>
      slotsOverlap(
         start,
         end,
         new Date(reservation.startDate),
         new Date(reservation.endDate)
      )
   );
}

export function isSlotInPast(date: Date, hour: number) {
   const { end } = getSlotRange(date, hour);
   return isBefore(end, new Date());
}

export function isSlotUnavailable(
   reservations: SlotInterval[],
   date: Date,
   hour: number
) {
   return isSlotInPast(date, hour) || isSlotBooked(reservations, date, hour);
}

/**
 * Toggles `hour` into/out of the current selection. Any combination of
 * available hours is allowed (including non-adjacent ones); the result is
 * kept sorted. Non-adjacent hours are split into separate reservations at
 * submit time via `groupContiguousHours`.
 */
export function getUpdatedHourSelection(
   currentHours: number[],
   hour: number,
   reservations: SlotInterval[],
   date: Date
): number[] {
   if (isSlotUnavailable(reservations, date, hour)) {
      return currentHours;
   }

   return currentHours.includes(hour)
      ? currentHours.filter((h) => h !== hour)
      : [...currentHours, hour].sort((a, b) => a - b);
}

/**
 * Splits a set of hours into runs of consecutive hours, e.g.
 * [9, 10, 12, 14, 15] -> [[9, 10], [12], [14, 15]].
 * Each run maps to one reservation (a single start/end pair).
 */
export function groupContiguousHours(hours: number[]): number[][] {
   const groups: number[][] = [];

   for (const h of [...hours].sort((a, b) => a - b)) {
      const last = groups[groups.length - 1];
      if (last && h === last[last.length - 1] + 1) {
         last.push(h);
      } else {
         groups.push([h]);
      }
   }

   return groups;
}