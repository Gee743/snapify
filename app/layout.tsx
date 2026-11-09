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
import JsonLd from "./components/JsonLd";
import { organizationSchema } from "./libs/structuredData";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./libs/site";

const inter = Inter({
   subsets: ["latin"],
});

export const metadata: Metadata = {
   // Without metadataBase every OG/canonical URL emits as a relative path and
   // social scrapers reject them.
   metadataBase: new URL(SITE_URL),
   title: {
      default: `${SITE_NAME} — Free Photo & Film Locations in Sri Lanka`,
      template: `%s | ${SITE_NAME}`,
   },
   description: SITE_DESCRIPTION,
   alternates: { canonical: "/" },
   openGraph: {
      type: "website",
      locale: "en_LK",
      siteName: SITE_NAME,
      title: `${SITE_NAME} — Free Photo & Film Locations in Sri Lanka`,
      description: SITE_DESCRIPTION,
      url: "/",
   },
   twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Free Photo & Film Locations in Sri Lanka`,
      description: SITE_DESCRIPTION,
   },
   robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
   },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={`${inter.className} flex min-h-full flex-col bg-[#0a0a0a] text-[#222]`}>
            <JsonLd data={organizationSchema()} />
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
