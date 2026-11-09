import type { Metadata } from "next";
import Container from "@/app/components/Container";
import OwnerLeadForm from "@/app/components/OwnerLeadForm";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema } from "@/app/libs/structuredData";

export const metadata: Metadata = {
   title: "Submit a Photo Location in Sri Lanka",
   description:
      "Know a public place worth shooting in Sri Lanka that is not listed yet? Send it to Snapify with the access and permit details you know.",
   alternates: { canonical: "/submit" },
};

const wanted = [
   "Where it is, precisely enough to find — a pin, an address or a landmark to aim for.",
   "What makes it worth the trip, and the light or time of day that actually works there.",
   "Whether there is an entry fee, and whether a permit or a tripod restriction applies.",
   "Anything about drones, if you know it.",
   "Whether you have shot there yourself. First-hand notes are worth far more than a description copied from somewhere else.",
];

const Submit = () => (
   <main className="-mt-6 min-h-screen bg-[#0a0a0a] pb-16 pt-10 text-[#f5f5f5]">
      <JsonLd
         data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Submit a place", path: "/submit" },
         ])}
      />
      <Container>
         <div className="mx-auto max-w-4xl">
            <div className="mb-9 border-b border-white/10 pb-7">
               <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
                  Submit a place
               </h1>
               <p className="mt-4 max-w-2xl text-sm leading-6 text-[#c4c4c4]">
                  Snapify grows from the people who shoot here. If you know a public place that
                  belongs on the list, send it over. Every submission is reviewed before it goes
                  live, and we will credit you if you want the credit.
               </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
               <div className="lg:col-span-3">
                  <OwnerLeadForm />
               </div>
               <div className="lg:col-span-2">
                  <h2 className="text-sm font-semibold text-[#dcff1a]">What helps most</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#929292]">
                     {wanted.map((item) => (
                        <li key={item}>{item}</li>
                     ))}
                  </ul>
                  <p className="mt-5 text-[11px] leading-5 text-[#6f6f6f]">
                     Please do not send photographs you do not own the rights to. If you have
                     your own shots of the place and are happy for us to use them, say so and we
                     will follow up about licensing and credit.
                  </p>
               </div>
            </div>
         </div>
      </Container>
   </main>
);

export default Submit;
