"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import SpaceCard from "./SpaceCard";

interface ListingCardProps {
   data: SafeListing;
   reservation?: SafeReservation;
   onAction?: (id: string) => void;
   disabled?: boolean;
   actionLabel?: string;
   actionId?: string;
   currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
   data,
   reservation,
   onAction,
   disabled,
   actionLabel,
   actionId = "",
   currentUser,
}) => {
   const router = useRouter();
   const { getByValue } = useCountries();
   const location = getByValue(data.locationValue);
   const handleCancel = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
         e.stopPropagation();

         if (disabled) return;

         onAction?.(actionId);
      },
      [onAction, actionId, disabled]
   );

   const price = useMemo(() => {
      if (reservation) {
         return reservation.totalPrice;
      }
      return data.price;
   }, [reservation, data.price]);

   const reservationDate = useMemo(() => {
      if (!reservation) {
         return null;
      }

      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);

      if (format(start, "PP") === format(end, "PP")) {
         return `${format(start, "PP")} · ${format(start, "p")}`;
      }

      return `${format(start, "PP")} - ${format(end, "PP")}`;
   }, [reservation]);

   return (
      <SpaceCard
         onClick={() => router.push(`/listings/${data.id}`)}
         image={
            <Image
               alt="Listing"
               src={data.imageSrc}
               className="object-cover h-full w-full group-hover:scale-110 transition"
               fill
            />
         }
         overlay={
            <div className="absolute top-3 right-3">
               <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
         }
         title={`${location?.region}, ${location?.label}`}
         subtitle={reservationDate || data.category}
         footer={
            <div className="flex flex-row items-center gap-1">
               <div className="font-bold">Rs. {price}</div>
               {!reservation && <div>hour</div>}
            </div>
         }
         action={
            onAction && actionLabel ? (
               <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
            ) : undefined
         }
      />
   );
};

export default ListingCard;
