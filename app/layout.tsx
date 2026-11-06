import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import SearchModal from "./components/modals/SearchModal";

const inter = Inter({
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Snapify",
   description: "Discover free public spaces for your next shoot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={`${inter.className} text-[#222]`}>
            <ClientOnly>
               <ToasterProvider />
               <SearchModal />
               <LoginModal />
               <RegisterModal />
               <Navbar />
            </ClientOnly>
            <div className="pb-20 pt-24">{children}</div>
         </body>
      </html>
   );
}
