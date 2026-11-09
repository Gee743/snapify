import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { organizationSchema } from "./libs/structuredData";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./libs/site";

const inter = Inter({
   subsets: ["latin"],
   variable: "--font-sans",
   display: "swap",
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

export const viewport = {
   themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" className={inter.variable}>
         <body className="flex min-h-full flex-col bg-ink font-sans text-cream antialiased">
            <JsonLd data={organizationSchema()} />
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            {/* Keyboard and screen-reader users can jump the nav instead of
                tabbing the whole header on every page. */}
            <a
               href="#main"
               className="sr-only left-4 top-4 z-[60] rounded-lg bg-lime px-4 py-2.5 text-sm font-semibold text-ink focus:not-sr-only focus:fixed"
            >
               Skip to content
            </a>
            <Navbar />
            {/* The header is 72px on desktop and ~125px on mobile, where search
                occupies a second row. */}
            <div id="main" className="grow pt-[125px] md:pt-[72px]">
               {children}
            </div>
            <Footer />
         </body>
      </html>
   );
}
