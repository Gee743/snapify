"use client";

import Container from "../Container";
import { FaUmbrellaBeach } from "@react-icons/all-files/fa/FaUmbrellaBeach";
import { FaMountain } from "@react-icons/all-files/fa/FaMountain";
import { FaSwimmingPool } from "@react-icons/all-files/fa/FaSwimmingPool";
import { GiBarn } from "@react-icons/all-files/gi/GiBarn";
import { GiBoatFishing } from "@react-icons/all-files/gi/GiBoatFishing";
import { GiCactus } from "@react-icons/all-files/gi/GiCactus";
import { GiCastle } from "@react-icons/all-files/gi/GiCastle";
import { GiCaveEntrance } from "@react-icons/all-files/gi/GiCaveEntrance";
import { GiForestCamp } from "@react-icons/all-files/gi/GiForestCamp";
import { GiIsland } from "@react-icons/all-files/gi/GiIsland";
import { GiWindmill } from "@react-icons/all-files/gi/GiWindmill";
import { FaSkiing } from "@react-icons/all-files/fa/FaSkiing";
import { GiCutDiamond } from "@react-icons/all-files/gi/GiCutDiamond";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaSnowflake } from "@react-icons/all-files/fa/FaSnowflake";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
   {
      label: "Beach",
      icon: FaUmbrellaBeach,
      description: "This property is close to the beach",
   },
   {
      label: "House",
      icon: GiWindmill,
      description: "This property has windmill",
   },
   {
      label: "Tech",
      icon: FaHome,
      description: "This property is modern",
   },
   {
      label: "Countryside",
      icon: FaMountain,
      description: "This property is mountain",
   },
   {
      label: "Pools",
      icon: FaSwimmingPool,
      description: "This property has a pool",
   },
];

const Categories = () => {
   const params = useSearchParams();
   const category = params?.get("category");
   const pathName = usePathname();

   const isMainPage = pathName === "/";

   if (!isMainPage) {
      return null;
   }

   return (
      <Container>
         <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
               <CategoryBox
                  key={item.label}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
               />
            ))}
         </div>
      </Container>
   );
};
export default Categories;
