import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import SearchModal from "./components/modals/SearchModal";
import Footer from "./components/Footer";

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
         <body className={`${inter.className} flex min-h-full flex-col bg-[#0a0a0a] text-[#222]`}>
            <ToasterProvider />
            <Suspense fallback={null}>
               <SearchModal />
            </Suspense>
            <LoginModal />
            <RegisterModal />
            <Navbar />
            <div className="grow pt-24">{children}</div>
            <Footer />
         </body>
      </html>
   );
}
