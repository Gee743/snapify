import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema } from "@/app/libs/structuredData";

export const metadata: Metadata = {
   title: "Contact Snapify",
   description:
      "Get in touch about a listing correction, a place worth adding, listing your own space, or anything else about shooting in Sri Lanka.",
   alternates: { canonical: "/contact" },
};

const routes = [
   {
      title: "Suggest a place",
      body: "Know somewhere that belongs on Snapify? Send the location and, if you have them, the access and permit details.",
      action: { label: "Submit a place", href: "/submit" },
   },
   {
      title: "List your space",
      body: "Own a studio, villa or rooftop that crews would pay to use? Join the owner waitlist.",
      action: { label: "Owner waitlist", href: "/list-your-space" },
   },
   {
      title: "Correct a listing",
      body: "Fees change, permits change, and sites close sections without notice. If something here is wrong, we would rather know.",
      action: null,
   },
];

const Contact = () => (
   <main className="-mt-6 min-h-screen bg-[#0a0a0a] pb-16 pt-10 text-[#f5f5f5]">
      <JsonLd
         data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
         ])}
      />
      <Container>
         <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
            <p className="mt-4 text-sm leading-7 text-[#c4c4c4]">
               Email us at{" "}
               <a href="mailto:hello@snapify.lk" className="text-[#dcff1a] underline">
                  hello@snapify.lk
               </a>
               . We read everything, and corrections to permit or access information get
               prioritised because people make travel decisions on them.
            </p>

            <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
               {routes.map((route) => (
                  <div
                     key={route.title}
                     className="flex flex-col rounded-2xl border border-white/10 bg-[#101010] p-5"
                  >
                     <h2 className="text-sm font-semibold text-[#dcff1a]">{route.title}</h2>
                     <p className="mt-2 grow text-sm leading-6 text-[#929292]">{route.body}</p>
                     {route.action && (
                        <Link
                           href={route.action.href}
                           className="mt-4 text-[12px] font-semibold text-[#f5f5f5] underline transition hover:text-[#dcff1a]"
                        >
                           {route.action.label}
                        </Link>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </Container>
   </main>
);

export default Contact;
