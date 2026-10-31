"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
   currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
   return (
      <div className="fixed z-10 w-full border-b border-white/10 bg-[#0a0a0a]/95 text-[#f5f5f5] backdrop-blur-md">
         <div className="py-3.5">
            <Container>
               <div className="flex flex-row items-center justify-between gap-3 md:gap-8">
                  <Logo />
                  <Search />
                  <UserMenu currentUser={currentUser} />
               </div>
            </Container>
         </div>
      </div>
   );
};
export default Navbar;
