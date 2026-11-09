import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicSpaceBySlug, getPublicSpaces } from "@/app/actions/getPublicSpaces";
import { getPublicSpaceCity } from "@/app/data/publicSpaces";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema, touristAttractionSchema } from "@/app/libs/structuredData";
import PublicSpaceClient from "./PublicSpaceClient";

export const revalidate = 3600;
// Spaces added via /admin after the build render on demand, then cache.
//
// Known trade-off, re-verified on Next 14.2.35: for a slug that was not
// prerendered, notFound() renders the 404 UI but the response is still 200 (a
// soft 404). Confirmed by instrumenting this component -- the space resolves to
// undefined and notFound() does run. dynamicParams=false returns a correct 404
// but makes admin-added spaces 404 until the next build, which breaks the admin
// dashboard. We keep `true` and mark unknown slugs noindex in generateMetadata
// so search engines drop them regardless of the status code.
export const dynamicParams = true;

export async function generateStaticParams() {
   const spaces = await getPublicSpaces();
   return spaces.map((space) => ({ spaceId: space.id }));
}

interface IParams {
   spaceId?: string;
}

/** Trim to a clean word/sentence boundary near the meta-description limit. */
const toMetaDescription = (text: string, limit = 155) => {
   if (text.length <= limit) return text;
   const clipped = text.slice(0, limit);
   const lastStop = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf(" "));
   return `${clipped.slice(0, lastStop > 0 ? lastStop : limit).trimEnd()}...`;
};

export async function generateMetadata({ params }: { params: IParams }): Promise<Metadata> {
   const space = params.spaceId ? await getPublicSpaceBySlug(params.spaceId) : undefined;

   if (!space) {
      return { title: "Place not found", robots: { index: false, follow: true } };
   }

   const city = getPublicSpaceCity(space);
   // Place name + city matches both the head term ("Galle Face Green") and the
   // long tail ("photo spots in Colombo").
   const title = `${space.name} - Photo Spot in ${city}, Sri Lanka`;
   const description = toMetaDescription(space.description);
   const path = `/community/${space.id}`;

   return {
      title,
      description,
      alternates: { canonical: path },
      // The place photo is the social card. A generated next/og card was tried
      // and reverted: @vercel/og 14.2.35 throws "Invalid URL" while rendering on
      // this Node 26 setup, in both `next dev` and `next start`, with and
      // without an explicit font. Revisit if/when that is fixed upstream.
      openGraph: {
         type: "article",
         title,
         description,
         url: path,
         images: [{ url: space.imageSrc, alt: space.name, width: 1200, height: 630 }],
      },
      twitter: {
         card: "summary_large_image",
         title,
         description,
         images: [space.imageSrc],
      },
   };
}

const PublicSpacePage = async ({ params }: { params: IParams }) => {
   const space = params.spaceId ? await getPublicSpaceBySlug(params.spaceId) : undefined;

   if (!space) {
      notFound();
   }

   const city = getPublicSpaceCity(space);

   return (
      <>
         <JsonLd
            data={[
               touristAttractionSchema(space),
               breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Free public spaces", path: "/community" },
                  { name: city, path: `/community?area=${encodeURIComponent(city)}` },
                  { name: space.name, path: `/community/${space.id}` },
               ]),
            ]}
         />
         <PublicSpaceClient space={space} />
      </>
   );
};

export default PublicSpacePage;
