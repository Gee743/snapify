"use client";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import {
   getSlotRangeForHours,
   getUpdatedHourSelection,
   groupContiguousHours,
   isSlotUnavailable,
} from "@/app/libs/timeSlots";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface ListingClientProps {
   reservations?: SafeReservation[];
   listing: SafeListing & {
      user: SafeUser;
   };
   currentUser?: SafeUser | null;
}

const ListingClient: React.FunctionComponent<ListingClientProps> = ({
   listing,
   currentUser,
   reservations = [],
}) => {
   const loginModal = useLoginModal();
   const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);
   const [selectedDate, setSelectedDate] = useState(new Date());
   const [selectedHours, setSelectedHours] = useState<number[]>([]);

   const onChangeDate = useCallback((date: Date) => {
      setSelectedDate(date);
      // availability is per-day, so hours picked on one day may not be
      // valid on another — simplest correct behavior is to clear them
      setSelectedHours([]);
   }, []);

   const onToggleHour = useCallback(
      (hour: number) => {
         setSelectedHours((prev) =>
            getUpdatedHourSelection(prev, hour, reservations, selectedDate)
         );
      },
      [reservations, selectedDate]
   );

   const totalPrice = useMemo(
      () => listing.price * selectedHours.length,
      [listing.price, selectedHours.length]
   );

   const onCreateReservation = useCallback(() => {
      if (!currentUser) {
         return loginModal.onOpen();
      }

      if (selectedHours.length === 0) {
         toast.error("Please select a time slot");
         return;
      }

      const stillAvailable = selectedHours.every(
         (hour) => !isSlotUnavailable(reservations, selectedDate, hour)
      );

      if (!stillAvailable) {
         toast.error("That time is no longer available");
         return;
      }

      setIsLoading(true);

      // one reservation per contiguous run of hours
      Promise.all(
         groupContiguousHours(selectedHours).map((group) => {
            const { start, end } = getSlotRangeForHours(selectedDate, group);
            return axios.post("/api/reservations", {
               totalPrice: listing.price * group.length,
               startDate: start.toISOString(),
               endDate: end.toISOString(),
               listingId: listing?.id,
            });
         })
      )
         .then(() => {
            toast.success("Session reserved");
            setSelectedHours([]);
            router.push("/trips");
            router.refresh();
         })
         .catch((error) => {
            toast.error(error?.response?.data?.error || "Something went wrong");
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, [
      listing.price,
      listing?.id,
      router,
      currentUser,
      loginModal,
      reservations,
      selectedDate,
      selectedHours,
   ]);

   const category = useMemo(() => {
      return categories.find((item) => item.label === listing.category);
   }, [listing.category]);

   return (
      <Container>
         <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
               <ListingHead
                  title={listing.title}
                  imageSrc={listing.imageSrc}
                  locationValue={listing.locationValue}
                  id={listing.id}
                  currentUser={currentUser}
               />
               <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                  <ListingInfo
                     user={listing.user}
                     category={category}
                     description={listing.description}
                     locationValue={listing.locationValue}
                  />
                  <div className="order-first mb-10 md:order-last md:col-span-3">
                     <ListingReservation
                        price={listing.price}
                        totalPrice={totalPrice}
                        selectedDate={selectedDate}
                        selectedHours={selectedHours}
                        onChangeDate={onChangeDate}
                        onToggleHour={onToggleHour}
                        onSubmit={onCreateReservation}
                        disabled={isLoading}
                        reservations={reservations}
                     />
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
};

export default ListingClient;
