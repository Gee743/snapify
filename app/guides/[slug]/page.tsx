import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/app/components/Container";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema } from "@/app/libs/structuredData";
import { absoluteUrl, SITE_NAME } from "@/app/libs/site";
import guides, { getGuide } from "@/app/data/guides";
import { getPublicSpaces } from "@/app/actions/getPublicSpaces";

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
   return guides.map((guide) => ({ slug: guide.slug }));
}

interface Params {
   slug: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
   const guide = getGuide(params.slug);
   if (!guide) return { title: "Not found", robots: { index: false, follow: true } };

   return {
      title: guide.metaTitle,
      description: guide.description,
      alternates: { canonical: `/guides/${guide.slug}` },
      openGraph: {
         type: "article",
         title: guide.metaTitle,
         description: guide.description,
         url: `/guides/${guide.slug}`,
      },
   };
}

const formatDate = (iso: string) =>
   new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(iso)
   );

const GuidePage = async ({ params }: { params: Params }) => {
   const guide = getGuide(params.slug);
   if (!guide) notFound();

   const allSpaces = await getPublicSpaces();
   const related = guide.relatedPlaces
      .map((slug) => allSpaces.find((space) => space.id === slug))
      .filter((space): space is NonNullable<typeof space> => Boolean(space));

   return (
      <main className="bg-[#0a0a0a] pb-16 pt-4 text-[#f5f5f5]">
         <JsonLd
            data={[
               {
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: guide.title,
                  description: guide.description,
                  url: absoluteUrl(`/guides/${guide.slug}`),
                  // Regulatory content, so the review date is a trust signal
                  // rather than decoration.
                  dateModified: guide.reviewedOn,
                  datePublished: guide.reviewedOn,
                  author: { "@type": "Organization", name: SITE_NAME },
                  publisher: { "@type": "Organization", name: SITE_NAME },
                  isAccessibleForFree: true,
               },
               breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Guides", path: "/guides" },
                  { name: guide.title, path: `/guides/${guide.slug}` },
               ]),
            ]}
         />
         <Container>
            <article className="mx-auto max-w-3xl">
               <nav aria-label="Breadcrumb" className="mb-5 text-[12px] text-[#6f6f6f]">
                  <Link href="/" className="transition hover:text-[#dcff1a]">
                     Home
                  </Link>
                  <span className="px-1.5">/</span>
                  <Link href="/guides" className="transition hover:text-[#dcff1a]">
                     Guides
                  </Link>
               </nav>

               <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {guide.title}
               </h1>
               <p className="mt-4 text-base leading-7 text-[#c4c4c4]">{guide.summary}</p>
               <p className="mt-4 border-b border-white/10 pb-6 text-[12px] text-[#6f6f6f]">
                  Last reviewed {formatDate(guide.reviewedOn)} · Rules and fees change, and
                  enforcement varies by site. Confirm with the authority before committing to a
                  paid shoot.
               </p>

               {guide.sections.map((section) => (
                  <section key={section.heading} className="mt-9">
                     <h2 className="mb-3 text-xl font-semibold tracking-tight text-[#f5f5f5]">
                        {section.heading}
                     </h2>
                     <div className="space-y-3.5">
                        {section.body.map((block, index) =>
                           typeof block === "string" ? (
                              <p key={index} className="text-sm leading-7 text-[#c4c4c4]">
                                 {block}
                              </p>
                           ) : (
                              <ul
                                 key={index}
                                 className="list-disc space-y-2 pl-5 text-sm leading-7 text-[#c4c4c4]"
                              >
                                 {block.list.map((item) => (
                                    <li key={item}>{item}</li>
                                 ))}
                              </ul>
                           )
                        )}
                     </div>
                  </section>
               ))}

               {related.length > 0 && (
                  <section className="mt-12 border-t border-white/10 pt-7">
                     <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#dcff1a]">
                        Places this applies to
                     </h2>
                     <div className="flex flex-wrap gap-2.5">
                        {related.map((space) => (
                           <Link
                              key={space.id}
                              href={`/community/${space.id}`}
                              className="rounded-lg border border-white/15 px-3.5 py-2 text-sm text-[#d4d4d4] transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
                           >
                              {space.name}
                           </Link>
                        ))}
                     </div>
                  </section>
               )}

               <section className="mt-10 border-t border-white/10 pt-7">
                  <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#dcff1a]">
                     Sources
                  </h2>
                  <ul className="space-y-1.5 text-sm text-[#929292]">
                     {guide.sources.map((source) => (
                        <li key={source.url}>
                           <a
                              href={source.url}
                              target="_blank"
                              rel="noreferrer nofollow"
                              className="underline transition hover:text-[#dcff1a]"
                           >
                              {source.label}
                           </a>
                        </li>
                     ))}
                  </ul>
               </section>
            </article>
         </Container>
      </main>
   );
};

export default GuidePage;
