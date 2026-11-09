import { Suspense } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

const SearchFallback = () => (
   <div className="h-[42px] w-full rounded-full border border-ink-line bg-white/[0.04] md:max-w-sm" />
);

const Navbar = () => {
   return (
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-line bg-ink/85 backdrop-blur-xl">
         <Container>
            <div className="flex h-[72px] flex-row items-center justify-between gap-3 md:gap-6">
               <Logo />
               {/* Search owns the middle at every width above the mobile sheet:
                   finding a place is the primary job on this site. */}
               <div className="hidden flex-1 justify-center md:flex">
                  <Suspense fallback={<SearchFallback />}>
                     <Search />
                  </Suspense>
               </div>
               <div className="flex items-center gap-2 md:gap-4">
                  <NavLinks />
                  <MobileMenu />
               </div>
            </div>
            {/* On phones search drops to its own row rather than competing with
                the logo and the menu button for the same 390px. */}
            <div className="pb-3 md:hidden">
               <Suspense fallback={<SearchFallback />}>
                  <Search />
               </Suspense>
            </div>
         </Container>
      </header>
   );
};

export default Navbar;
