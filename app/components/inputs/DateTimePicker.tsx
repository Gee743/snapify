"use client";

import { useMemo, useState } from "react";
import {
   addDays,
   addWeeks,
   format,
   isBefore,
   isSameDay,
   startOfDay,
   startOfWeek,
} from "date-fns";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import {
   BOOKING_HOURS,
   formatSlotLabel,
   isSlotUnavailable,
   SlotInterval,
} from "@/app/libs/timeSlots";

interface DateTimePickerProps {
   selectedDate: Date;
   selectedHours: number[];
   onSelectDate: (date: Date) => void;
   onToggleHour: (hour: number) => void;
   reservations?: SlotInterval[];
}

const WEEK_STARTS_ON = 0;

const DateTimePicker: React.FC<DateTimePickerProps> = ({
   selectedDate,
   selectedHours,
   onSelectDate,
   onToggleHour,
   reservations = [],
}) => {
   const today = startOfDay(new Date());
   const [weekStart, setWeekStart] = useState(() =>
      startOfWeek(selectedDate, { weekStartsOn: WEEK_STARTS_ON })
   );

   const days = useMemo(
      () => Array.from({ length: 8 }, (_, index) => addDays(weekStart, index)),
      [weekStart]
   );

   const canGoBack = isBefore(
      startOfWeek(today, { weekStartsOn: WEEK_STARTS_ON }),
      weekStart
   );

   return (
      <div className="flex flex-col gap-6 px-4 py-5">
         <div className="flex flex-col gap-3">
            <div className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
               Select date
            </div>
            <div className="flex items-center justify-between">
               <div className="text-lg font-semibold">{format(weekStart, "MMMM yyyy")}</div>
               <div className="flex items-center gap-1">
                  <button
                     type="button"
                     aria-label="Previous week"
                     disabled={!canGoBack}
                     onClick={() => setWeekStart((value) => addWeeks(value, -1))}
                     className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                     <IoChevronBack size={18} />
                  </button>
                  <button
                     type="button"
                     aria-label="Next week"
                     onClick={() => setWeekStart((value) => addWeeks(value, 1))}
                     className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-100"
                  >
                     <IoChevronForward size={18} />
                  </button>
               </div>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
               {days.map((day) => {
                  const isPast = isBefore(day, today);
                  const isSelected = isSameDay(day, selectedDate);

                  return (
                     <button
                        key={day.toISOString()}
                        type="button"
                        disabled={isPast}
                        onClick={() => onSelectDate(day)}
                        className="min-w-[44px] flex-1 flex flex-col items-center gap-1.5 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
                     >
                        <span className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">
                           {format(day, "EEE")}
                        </span>
                        <span
                           className={`
                              flex items-center justify-center w-9 h-9 text-sm font-semibold rounded-full border transition
                              ${
                                 isSelected
                                    ? "border-neutral-800 text-neutral-800"
                                    : "border-transparent text-neutral-800"
                              }
                           `}
                        >
                           {format(day, "d")}
                        </span>
                     </button>
                  );
               })}
            </div>
         </div>

         <div className="flex flex-col gap-3">
            <div className="text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
               Select time
               {selectedHours.length > 0 && (
                  <span className="normal-case tracking-normal text-neutral-500 ml-2">
                     ({selectedHours.length}h selected)
                  </span>
               )}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
               {BOOKING_HOURS.map((hour) => {
                  const unavailable = isSlotUnavailable(reservations, selectedDate, hour);
                  const isSelected = selectedHours.includes(hour) && !unavailable;

                  return (
                     <button
                        key={hour}
                        type="button"
                        disabled={unavailable}
                        onClick={() => onToggleHour(hour)}
                        className={`
                           w-full rounded-full border py-2.5 text-sm font-medium transition
                           ${
                              unavailable
                                 ? "border-transparent text-neutral-300 line-through cursor-not-allowed"
                                 : isSelected
                                 ? "border-neutral-800 text-neutral-800 bg-neutral-100"
                                 : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                           }
                        `}
                     >
                        {formatSlotLabel(hour)}
                     </button>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default DateTimePicker;
