"use client";

import { SafeReservation } from "@/app/types";
import DateTimePicker from "../inputs/DateTimePicker";
import Button from "../Button";

interface ListingReservationProps {
   price: number;
   totalPrice: number;
   selectedDate: Date;
   selectedHours: number[];
   onChangeDate: (value: Date) => void;
   onToggleHour: (value: number) => void;
   onSubmit: () => void;
   disabled?: boolean;
   reservations: SafeReservation[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
   price,
   totalPrice,
   selectedDate,
   selectedHours,
   onChangeDate,
   onToggleHour,
   onSubmit,
   reservations,
   disabled,
}) => {
   return (
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
         <div className="flex flex-row items-center gap-1 p-4">
            <div className="text-2xl font-semibold">Rs. {price}</div>
            <div className="font-light text-neutral-600"> hour</div>
         </div>
         <hr />
         <DateTimePicker
            selectedDate={selectedDate}
            selectedHours={selectedHours}
            onSelectDate={onChangeDate}
            onToggleHour={onToggleHour}
            reservations={reservations}
         />
         <hr />
         <div className="p-4">
            <Button
               disabled={disabled || selectedHours.length === 0}
               label="Reserve"
               onClick={onSubmit}
            />
         </div>
         <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
            <div>Total</div>
            <div>Rs. {totalPrice}</div>
         </div>
      </div>
   );
};

export default ListingReservation;
