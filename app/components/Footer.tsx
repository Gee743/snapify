import Link from "next/link";
import Container from "./Container";

const exploreLinks = [
   { label: "All free public spaces", href: "/community" },
   { label: "Browse by area", href: "/photo-spots" },
   { label: "Beaches", href: "/photo-spots/category/beaches" },
   { label: "Viewpoints", href: "/photo-spots/category/viewpoints" },
   { label: "Photo spots in Colombo", href: "/photo-spots/colombo" },
];

const companyLinks = [
   { label: "About Snapify", href: "/" },
   { label: "Paid spaces", href: "/#free-spaces" },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
   return (
      <footer className="border-t border-white/10 bg-[#0a0a0a] text-[#f5f5f5]">
         <Container>
            <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
               <div className="lg:col-span-2">
                  <Link
                     href="/"
                     className="flex w-fit items-center gap-2.5 text-[20px] font-semibold tracking-tight text-[#f5f5f5]"
                  >
                     <svg width="32" height="32" viewBox="0 0 56 56" aria-hidden="true">
                        <rect width="56" height="56" rx="16" fill="#dcff1a" />
                        <path
                           d="M17 24v-7h7M39 24v-7h-7M17 32v7h7M39 32v7h-7"
                           stroke="#0a0a0a"
                           strokeWidth="3.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           fill="none"
                        />
                        <circle cx="28" cy="28" r="4" fill="#0a0a0a" />
                     </svg>
                     Snapify
                  </Link>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-[#929292]">
                     Discover free public spaces across Sri Lanka to shoot, explore, and create —
                     no booking and no fees.
                  </p>
               </div>

               <div>
                  <h3 className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-[#dcff1a]">
                     EXPLORE
                  </h3>
                  <ul className="flex flex-col gap-3">
                     {exploreLinks.map((link) => (
                        <li key={link.label}>
                           <Link
                              href={link.href}
                              className="text-sm text-[#929292] transition hover:text-[#dcff1a]"
                           >
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               <div>
                  <h3 className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-[#dcff1a]">
                     SNAPIFY
                  </h3>
                  <ul className="flex flex-col gap-3">
                     {companyLinks.map((link) => (
                        <li key={link.label}>
                           <Link
                              href={link.href}
                              className="text-sm text-[#929292] transition hover:text-[#dcff1a]"
                           >
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
               <p className="text-xs text-[#929292]">
                  © {currentYear} Snapify. All rights reserved.
               </p>
               <p className="text-xs text-[#929292]">
                  Always respect local rules and the people around you when shooting.
               </p>
            </div>
         </Container>
      </footer>
   );
};

export default Footer;
