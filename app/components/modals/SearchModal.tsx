"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearch";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";

enum STEPS {
   LOCATION = 0,
   DATE = 1,
}

const SearchModal = () => {
   const router = useRouter();
   const searchModal = useSearchModal();
   const params = useSearchParams();

   const [step, setStep] = useState(STEPS.LOCATION);

   const [location, setLocation] = useState<CountrySelectValue>();
   const [dateRange, setDateRange] = useState<Range>({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
   });

   const Map = useMemo(
      () =>
         dynamic(() => import("../Map"), {
            ssr: false,
         }),
      []
   );

   const onBack = useCallback(() => {
      setStep((value) => value - 1);
   }, []);

   const onNext = useCallback(() => {
      setStep((value) => value + 1);
   }, []);

   const onSubmit = useCallback(async () => {
      if (step !== STEPS.DATE) {
         return onNext();
      }

      let currentQuery = {};

      if (params) {
         currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
         ...currentQuery,
         locationValue: location?.value,
      };

      if (dateRange.startDate) {
         updatedQuery.startDate = formatISO(dateRange.startDate);
      }

      if (dateRange.endDate) {
         updatedQuery.endDate = formatISO(dateRange.endDate);
      }

      const url = qs.stringifyUrl(
         {
            url: "/",
            query: updatedQuery,
         },
         { skipNull: true }
      );

      setStep(STEPS.LOCATION);
      searchModal.onClose();
      router.push(url);
   }, [
      step,
      searchModal,
      location,
      router,
      dateRange,
      onNext,
      params,
   ]);

   const actionLabel = useMemo(() => {
      if (step === STEPS.DATE) {
         return "Search";
      }

      return "Next";
   }, [step]);

   const secondaryActionLabel = useMemo(() => {
      if (step === STEPS.LOCATION) {
         return undefined;
      }

      return "Back";
   }, [step]);

   let bodyContent = (
      <div className="flex flex-col gap-8">
         <Heading title="Where do you wanna go?" subtitle="Find the perfect location!" />
         <CountrySelect
            value={location}
            onChange={(value) => setLocation(value as CountrySelectValue)}
         />
         <hr />
         <Map center={location?.latlng} />
      </div>
   );

   if (step === STEPS.DATE) {
      bodyContent = (
         <div className="flex flex-col gap-8">
            <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
            <Calendar onChange={(value) => setDateRange(value.selection)} value={dateRange} />
         </div>
      );
   }

   return (
      <Modal
         isOpen={searchModal.isOpen}
         title="Filters"
         actionLabel={actionLabel}
         onSubmit={onSubmit}
         secondaryActionLabel={secondaryActionLabel}
         secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
         onClose={searchModal.onClose}
         body={bodyContent}
      />
   );
};

export default SearchModal;
