import sriLankaLocations from "@/app/data/sriLankaLocations";

const useCountries = () => {
   const getAll = () => sriLankaLocations;
   const getByValue = (value: string) => {
      return sriLankaLocations.find((item) => item.value === value);
   };
   return {
      getAll,
      getByValue,
   };
};

export default useCountries;
