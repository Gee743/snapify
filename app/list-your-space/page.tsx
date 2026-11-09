import type { Metadata } from "next";
import Container from "@/app/components/Container";
import OwnerLeadForm from "@/app/components/OwnerLeadForm";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema } from "@/app/libs/structuredData";

export const metadata: Metadata = {
   title: "List Your Space for Photo and Film Shoots",
   description:
      "Own a studio, villa, rooftop or unusual location in Sri Lanka? Join the Snapify owner waitlist and get listed when paid bookings open.",
   alternates: { canonical: "/list-your-space" },
};

const points = [
   {
      title: "Reach people already looking",
      body: "Snapify is where photographers and film crews in Sri Lanka go to plan a shoot. Your space appears next to the locations they are already browsing.",
   },
   {
      title: "No payment, no commitment",
      body: "The waitlist costs nothing. We will talk through your space, your rate and your availability before anything is published.",
   },
   {
      title: "You stay in control",
      body: "You approve the listing, the photographs and the rate. Enquiries come to you directly -- we are not standing between you and the client.",
   },
];

const ListYourSpace = () => (
   <main className="bg-[#0a0a0a] pb-16 pt-4 text-[#f5f5f5]">
      <JsonLd
         data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "List your space", path: "/list-your-space" },
         ])}
      />
      <Container>
         <div className="mx-auto max-w-4xl">
            <div className="mb-9 border-b border-white/10 pb-7">
               <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#dcff1a]">
                  OWNER WAITLIST
               </span>
               <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
                  List your space for shoots
               </h1>
               <p className="mt-4 max-w-2xl text-sm leading-6 text-[#c4c4c4]">
                  Snapify lists free public places to shoot across Sri Lanka. Paid, bookable
                  locations are next: studios, villas, rooftops, warehouses and anywhere else a
                  crew would pay to work. If you own one, tell us about it and we will come to you
                  first.
               </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
               <div className="lg:col-span-3">
                  <OwnerLeadForm />
               </div>
               <div className="space-y-6 lg:col-span-2">
                  {points.map((point) => (
                     <div key={point.title}>
                        <h2 className="text-sm font-semibold text-[#dcff1a]">{point.title}</h2>
                        <p className="mt-1.5 text-sm leading-6 text-[#929292]">{point.body}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </Container>
   </main>
);

export default ListYourSpace;
