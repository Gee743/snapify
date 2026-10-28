"use client";

import qs from "query-string";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";

import useSearchModal from "@/app/hooks/useSearch";

import Modal from "./Modal";
import Heading from "../Heading";
import { publicSpaceAreas } from "@/app/data/publicSpaces";

const SearchModal = () => {
   const router = useRouter();
   const searchModal = useSearchModal();
   const params = useSearchParams();

   const areaOptions = useMemo(
      () => publicSpaceAreas.map((area) => ({ label: area, value: area })),
      []
   );
   const [area, setArea] = useState<(typeof areaOptions)[number] | null>(null);

   useEffect(() => {
      const selectedArea = params?.get("area");
      setArea(areaOptions.find((option) => option.value === selectedArea) ?? null);
   }, [areaOptions, params, searchModal.isOpen]);

   const onSubmit = useCallback(async () => {
      const updatedQuery = qs.parse(params?.toString() ?? "");
      delete updatedQuery.locationValue;
      delete updatedQuery.startDate;
      delete updatedQuery.endDate;
      delete updatedQuery.category;

      if (area) {
         updatedQuery.area = area.value;
      } else {
         delete updatedQuery.area;
      }

      const url = qs.stringifyUrl(
         {
            url: "/",
            query: updatedQuery,
         },
         { skipNull: true }
      );

      searchModal.onClose();
      router.push(url);
   }, [area, params, router, searchModal]);

   return (
      <Modal
         isOpen={searchModal.isOpen}
         title="Filter by area"
         actionLabel="Search"
         onSubmit={onSubmit}
         onClose={searchModal.onClose}
         body={
            <div className="flex flex-col gap-6">
               <Heading
                  title="Where are you looking?"
                  subtitle="Choose an area to find free public spaces."
               />
               <Select
                  placeholder="Anywhere"
                  isClearable
                  options={areaOptions}
                  value={area}
                  onChange={setArea}
                  classNames={{
                     control: () => "p-3 border-2",
                     input: () => "text-lg",
                     option: () => "text-lg",
                  }}
                  theme={(theme) => ({
                     ...theme,
                     borderRadius: 6,
                     colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#f1f8f2",
                     },
                  })}
               />
            </div>
         }
      />
   );
};

export default SearchModal;
