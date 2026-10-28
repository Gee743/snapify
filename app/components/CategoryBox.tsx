"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
   icon?: IconType;
   label: string;
   emoji?: string;
   selected?: boolean;
   filterKey?: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
   icon: Icon,
   label,
   emoji,
   selected,
   filterKey = "category",
}) => {
   const router = useRouter();
   const params = useSearchParams();
   const pathname = usePathname();

   const handleClick = useCallback(() => {
      let currentQuerry = {};

      if (params) {
         currentQuerry = qs.parse(params.toString());
      }

      const updatedQuery: any = {
         ...currentQuerry,
         [filterKey]: label,
      };

      if (params?.get(filterKey) === label) {
         delete updatedQuery[filterKey];
      }

      const url = qs.stringifyUrl(
         {
            url: pathname ?? "/",
            query: updatedQuery,
         },
         { skipNull: true }
      );
      router.push(url);
   }, [filterKey, label, params, pathname, router]);

   return (
      <div
         onClick={handleClick}
         className={`flex flex-col items-center justify-center text-center text-xs hover:text-[#222] transition cursor-pointer ${
            selected ? "text-[#222]" : "text-[#717171]"
         }`}
      >
         {emoji ? (
            <span className="text-lg leading-none">{emoji}</span>
         ) : Icon ? (
            <Icon size={26} />
         ) : null}
         <div className="mt-1 font-medium">{label}</div>
      </div>
   );
};
export default CategoryBox;
