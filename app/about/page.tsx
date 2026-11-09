import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/Container";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema } from "@/app/libs/structuredData";

export const metadata: Metadata = {
   title: "About Snapify",
   description:
      "Snapify is a directory of places to shoot in Sri Lanka, built for the local photography and film community — with the access, fee and permit detail other directories leave out.",
   alternates: { canonical: "/about" },
};

const About = () => (
   <main className="-mt-6 min-h-screen bg-[#0a0a0a] pb-16 pt-10 text-[#f5f5f5]">
      <JsonLd
         data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
         ])}
      />
      <Container>
         <article className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">About Snapify</h1>

            <div className="mt-6 space-y-4 text-sm leading-7 text-[#c4c4c4]">
               <p>
                  Snapify is a directory of places to shoot in Sri Lanka, made for the people who
                  actually shoot here: photographers, videographers, students, and the crews who
                  turn up at 5am because the light only works once.
               </p>
               <p>
                  Plenty of sites will tell you Sri Lanka is beautiful. Far fewer will tell you
                  that the fresco gallery at Sigiriya bans cameras outright, that a tripod at a
                  Cultural Triangle site needs a permit the entry ticket does not cover, that
                  central Colombo is closed to drones whatever your registration says, or that
                  the view from Lipton&apos;s Seat is usually gone by 10am. That gap is the reason
                  this exists.
               </p>
               <p>
                  Every listing carries directions, entry fees, permit requirements, drone rules
                  and the computed golden hour for that exact location. Where a rule is
                  unconfirmed, we say so rather than guessing -- a wrong permit claim is worse
                  than no claim at all.
               </p>
            </div>

            <h2 className="mt-10 text-xl font-semibold tracking-tight">Where the data comes from</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[#c4c4c4]">
               <p>
                  Descriptions, directions and shooting notes are written by us. Permit and drone
                  information is taken from the relevant authorities -- the Civil Aviation
                  Authority, the National Film Corporation, the Department of Archaeology, the
                  Central Cultural Fund and the Galle Heritage Foundation -- and each guide lists
                  its sources and the date it was last reviewed.
               </p>
               <p>
                  Lead photographs are from Wikimedia Commons under their respective licences.
                  Sunrise, sunset, golden hour and blue hour are calculated from each
                  location&apos;s coordinates rather than looked up for the country as a whole,
                  because a 2.5 degree spread in longitude genuinely moves the numbers.
               </p>
               <p>
                  Rules change and enforcement varies. If you find something out of date, or you
                  know a place worth adding, please{" "}
                  <Link href="/contact" className="text-[#dcff1a] underline">
                     tell us
                  </Link>
                  .
               </p>
            </div>

            <h2 className="mt-10 text-xl font-semibold tracking-tight">What is coming</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[#c4c4c4]">
               <p>
                  Free public places are live now. Paid, bookable locations -- studios, villas,
                  rooftops -- are next. If you own a space crews would pay to work in,{" "}
                  <Link href="/list-your-space" className="text-[#dcff1a] underline">
                     join the owner waitlist
                  </Link>
                  .
               </p>
            </div>
         </article>
      </Container>
   </main>
);

export default About;
