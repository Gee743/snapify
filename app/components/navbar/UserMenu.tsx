"use client";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

const ownersUrl = "host-waitlist.html";

interface UserMenuProps {
   currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
   const [isOpen, setIsOpen] = useState(false);

   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();
   const router = useRouter();

   const toogleOpen = useCallback(() => {
      setIsOpen((value) => !value);
   }, []);

   return (
      <div className="relative">
         <div className="flex flex-row items-center gap-3">
            <a
               href={ownersUrl}
               className="whitespace-nowrap rounded-xl bg-[#dcff1a] px-3 py-2 text-center text-[11px] font-semibold text-[#0a0a0a] transition hover:brightness-105 sm:px-4 sm:text-[13px]"
            >
               Owners, Join Us!
            </a>
         </div>
         {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-full bg-white overflow-hidden right-0 top-14 text-sm">
               <div className="flex flex-col cursor-pointer">
                  {currentUser ? (
                     <>
                        <MenuItem
                           onClick={() => {
                              router.push("/trips");
                              setIsOpen(false);
                           }}
                           label="My Trips"
                        />
                        <MenuItem
                           onClick={() => {
                              router.push("/favorites");
                              setIsOpen(false);
                           }}
                           label="My Favorites"
                        />
                        <MenuItem
                           onClick={() => {
                              router.push("/reservations");
                              setIsOpen(false);
                           }}
                           label="My Reservations"
                        />
                        <MenuItem
                           onClick={() => {
                              router.push("/properties");
                              setIsOpen(false);
                           }}
                           label="My Properties"
                        />
                        <MenuItem
                           onClick={() => {
                              router.push("/community");
                              setIsOpen(false);
                           }}
                           label="Community spaces"
                        />
                        <MenuItem href={ownersUrl} label="Owners, Join Us!" />
                        <hr />
                        <MenuItem
                           onClick={() => {
                              signOut();
                           }}
                           label="Logout"
                        />
                     </>
                  ) : (
                     <>
                        <MenuItem onClick={loginModal.onOpen} label="Login" />
                        <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
                        <MenuItem
                           onClick={() => {
                              router.push("/community");
                              setIsOpen(false);
                           }}
                           label="Community spaces"
                        />
                        <MenuItem href={ownersUrl} label="Owners, Join Us!" />
                     </>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};
export default UserMenu;
