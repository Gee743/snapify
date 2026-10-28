"use client";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

const ownersUrl = "http://127.0.0.1:5500/index.html";

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
               className="hidden md:block text-[13px] font-semibold hover:text-[#555] transition cursor-pointer"
            >
               Owners, Join Us!
            </a>
            {/* <div
               onClick={toogleOpen}
               className="w-9 h-9 border border-[#ddd] flex items-center justify-center rounded-full cursor-pointer hover:shadow-md transition"
            >
               <AiOutlineMenu />
            </div> */}
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
