import Link from "next/link";
import Container from "./Container";
import Logo from "./navbar/Logo";
import NewsletterForm from "./NewsletterForm";

const exploreLinks = [
   { label: "All free public spaces", href: "/community" },
   { label: "Browse by area", href: "/photo-spots" },
   { label: "Beaches", href: "/photo-spots/category/beaches" },
   { label: "Viewpoints", href: "/photo-spots/category/viewpoints" },
   { label: "Photo spots in Colombo", href: "/photo-spots/colombo" },
];

const companyLinks = [
   { label: "About Snapify", href: "/about" },
   { label: "Guides", href: "/guides" },
   { label: "Submit a place", href: "/submit" },
   { label: "List your space", href: "/list-your-space" },
   { label: "Contact", href: "/contact" },
   { label: "Privacy", href: "/privacy" },
];

const currentYear = new Date().getFullYear();

const LinkColumn = ({
   title,
   links,
}: {
   title: string;
   links: { label: string; href: string }[];
}) => (
   <nav aria-label={title}>
      <h2 className="mb-4 text-[13px] font-semibold text-cream">{title}</h2>
      {/* `inline-flex` + vertical padding gives each row a ~36px hit area; as
          bare inline text they were 17px tall and awkward to tap. */}
      <ul className="flex flex-col gap-0.5">
         {links.map((link) => (
            <li key={link.label}>
               <Link
                  href={link.href}
                  className="inline-flex min-h-[36px] items-center text-[14px] text-cream-muted transition-colors duration-200 hover:text-lime"
               >
                  {link.label}
               </Link>
            </li>
         ))}
      </ul>
   </nav>
);

const Footer = () => {
   return (
      <footer className="border-t border-ink-line bg-ink">
         <Container>
            <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
               <div className="lg:col-span-2">
                  {/* Reuses the navbar Logo rather than repeating the SVG; the
                      mark was previously duplicated in two files. */}
                  <Logo />
                  <p className="mt-4 max-w-[46ch] text-[14.5px] leading-7 text-cream-muted">
                     Free public spaces across Sri Lanka to shoot, explore and create — with the
                     permit rules, fees and drone law that actually apply.
                  </p>
                  <div className="mt-7 max-w-sm">
                     <h2 className="mb-1 text-[14px] font-semibold text-cream">
                        New locations, now and then
                     </h2>
                     <p className="mb-3 text-[13px] leading-5 text-cream-muted">
                        New spots and permit changes. Nothing else.
                     </p>
                     <NewsletterForm />
                  </div>
               </div>

               <LinkColumn title="Explore" links={exploreLinks} />
               <LinkColumn title="Snapify" links={companyLinks} />
            </div>

            <div className="flex flex-col gap-3 border-t border-ink-line py-7 sm:flex-row sm:items-center sm:justify-between">
               <p className="text-[12.5px] text-cream-faint">
                  © {currentYear} Snapify. All rights reserved.
               </p>
               <p className="text-[12.5px] text-cream-faint">
                  Always respect local rules and the people around you when shooting.
               </p>
            </div>
         </Container>
      </footer>
   );
};

export default Footer;
