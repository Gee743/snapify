import { Suspense } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

// Search reads useSearchParams(), which opts the nearest boundary into client
// rendering. Keeping it in its own Suspense boundary lets the rest of the navbar
// — and every page below it — stay server-rendered for crawlers.
const SearchFallback = () => (
   <div className="w-full rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-[18px] pr-1.5 md:w-auto md:min-w-48">
      <div className="flex flex-row items-center justify-between">
         <div className="pr-4">
            <div className="text-[11px] font-semibold text-[#f5f5f5]">Area</div>
            <div className="text-[12px] text-[#929292]">Anywhere</div>
         </div>
         <div className="pl-3 flex flex-row items-center">
            <div className="h-8 w-8 rounded-full bg-[#dcff1a]" />
         </div>
      </div>
   </div>
);

const Navbar = () => {
   return (
      <div className="fixed z-10 w-full border-b border-white/10 bg-[#0a0a0a]/95 text-[#f5f5f5] backdrop-blur-md">
         <div className="py-3.5">
            <Container>
               <div className="flex flex-row items-center justify-between gap-3 md:gap-8">
                  <Logo />
                  <Suspense fallback={<SearchFallback />}>
                     <Search />
                  </Suspense>
                  <UserMenu />
               </div>
            </Container>
         </div>
      </div>
   );
};
export default Navbar;
