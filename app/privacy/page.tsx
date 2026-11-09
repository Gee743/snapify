import type { Metadata } from "next";
import Container from "@/app/components/Container";

export const metadata: Metadata = {
   title: "Privacy",
   description:
      "What Snapify collects, why, and how to have it removed. Short version: an email address only if you give us one, and nothing sold to anyone.",
   alternates: { canonical: "/privacy" },
};

const sections = [
   {
      heading: "What we collect",
      body: [
         "If you join the newsletter, we store the email address you give us and which page you submitted it from.",
         "If you join the owner waitlist or submit a place, we store what you type into that form -- typically a name, an email address, an optional phone number and a description of the space.",
         "If you create an account, we store your email address and a hashed password, or the basic profile your chosen provider shares when you sign in with Google or GitHub.",
      ],
   },
   {
      heading: "What we do with it",
      body: [
         "We use it to reply to you, and to send the newsletter if you asked for it. That is the whole list.",
         "We do not sell personal data, and we do not share it with advertisers.",
      ],
   },
   {
      heading: "What we do not collect",
      body: [
         "We do not take payment details anywhere on this site.",
         "We do not track you across other websites.",
      ],
   },
   {
      heading: "Third parties",
      body: [
         "Location photographs are served from Wikimedia Commons, which will see the request your browser makes for the image. Map tiles come from OpenStreetMap, which will see requests for the tiles while a map is open.",
         "Sign-in, where used, is handled by Google or GitHub under their own privacy terms.",
      ],
   },
   {
      heading: "Removing your data",
      body: [
         "Email hello@snapify.lk and ask. We will delete what we hold and confirm when it is done. You do not need to explain why.",
      ],
   },
];

const Privacy = () => (
   <main className="bg-ink pb-16 pt-4 text-cream">
      <Container>
         <article className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Privacy</h1>
            <p className="mt-4 text-sm leading-7 text-cream-soft">
               Snapify is a location directory. We collect as little as the site can function
               with, and we would rather explain it in plain language than in four pages of
               boilerplate.
            </p>
            {sections.map((section) => (
               <section key={section.heading} className="mt-8">
                  <h2 className="mb-2.5 text-lg font-semibold tracking-tight">{section.heading}</h2>
                  <div className="space-y-3">
                     {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-cream-soft">
                           {paragraph}
                        </p>
                     ))}
                  </div>
               </section>
            ))}
         </article>
      </Container>
   </main>
);

export default Privacy;
