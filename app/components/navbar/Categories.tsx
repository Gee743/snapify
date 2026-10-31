"use client";

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { MdOutlineVilla, MdOutlineForest, MdOutlineCameraIndoor } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { MdLocationOn } from "react-icons/md";

export const categories: {
   label: string;
   icon: IconType;
   emoji: string;
   description: string;
}[] = [
   {
      label: "Studio",
      icon: MdOutlineCameraIndoor,
      emoji: "🏠",
      description: "Indoor studio spaces for controlled shoots",
   },
   {
      label: "Villa",
      icon: MdOutlineVilla,
      emoji: "🏘️",
      description: "Private villas and houses",
   },
   {
      label: "Coastal",
      icon: TbBeach,
      emoji: "🌴",
      description: "Beaches and waterfront locations",
   },
   {
      label: "Indoor",
      icon: FaHome,
      emoji: "🏡",
      description: "Indoor rooms and interiors",
   },
   {
      label: "Outdoor",
      icon: MdOutlineForest,
      emoji: "🌳",
      description: "Gardens, estates, and open air sets",
   },
];

const Categories = () => {
   const params = useSearchParams();
   const area = params?.get("area");
   const [areas, setAreas] = useState<string[]>([]);
   const [error, setError] = useState("");

   useEffect(() => {
      fetch("/api/public-spaces/areas")
         .then(async (response) => {
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Could not load areas.");
            return result as string[];
         })
         .then(setAreas)
         .catch((loadError: unknown) => {
            setError(loadError instanceof Error ? loadError.message : "Could not load areas.");
         });
   }, []);

   return (
      <Container>
         <div className="flex flex-row items-center gap-8 overflow-x-auto text-[#717171] pb-2">
            {areas.map((item) => (
               <CategoryBox
                  key={item}
                  label={item}
                  selected={area === item}
                  icon={MdLocationOn}
                  filterKey="area"
               />
            ))}
         </div>
         {error && <p role="alert" className="text-xs text-rose-600">{error}</p>}
      </Container>
   );
};
export default Categories;
