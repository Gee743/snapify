import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStudioBySlug, getStudios, studioCity } from "@/app/actions/getStudios";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbSchema } from "@/app/libs/structuredData";
import { studioSchema } from "@/app/libs/studioStructuredData";
import StudioClient from "./StudioClient";

export const revalidate = 3600;
// Studios added via /admin after the build render on demand, then cache.
// Same known trade-off as /community/[spaceId]: on Next 14.2.35 an
// unprerendered slug renders the 404 UI but responds 200, so unknown slugs are
// marked noindex in generateMetadata regardless of the status code.
export const dynamicParams = true;

export async function generateStaticParams() {
   const studios = await getStudios();
   return studios.map((studio) => ({ slug: studio.slug }));
}

interface IParams {
   slug?: string;
}

const toMetaDescription = (text: string, limit = 155) => {
   if (text.length <= limit) return text;
   const clipped = text.slice(0, limit);
   const lastStop = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf(" "));
   return `${clipped.slice(0, lastStop > 0 ? lastStop : limit).trimEnd()}...`;
};

export async function generateMetadata({ params }: { params: IParams }): Promise<Metadata> {
   const studio = params.slug ? await getStudioBySlug(params.slug) : undefined;

   if (!studio) {
      return { title: "Studio not found", robots: { index: false, follow: true } };
   }

   const city = studioCity(studio);
   const title = studio.metaTitle ?? `${studio.name} - Studio Hire in ${city}, Sri Lanka`;
   const description =
      studio.metaDescription ?? toMetaDescription(`${studio.tagline} ${studio.description}`);
   const path = `/studios/${studio.slug}`;

   return {
      title,
      description,
      alternates: { canonical: path },
      openGraph: {
         type: "article",
         title,
         description,
         url: path,
         images: [{ url: studio.imageSrc, alt: studio.name, width: 1200, height: 630 }],
      },
      twitter: {
         card: "summary_large_image",
         title,
         description,
         images: [studio.imageSrc],
      },
   };
}

const StudioPage = async ({ params }: { params: IParams }) => {
   const studio = params.slug ? await getStudioBySlug(params.slug) : undefined;

   if (!studio) {
      notFound();
   }

   // Other studios in the same city. Cheap on a small catalogue and avoids a
   // geo query for studios that may not publish a pin at all.
   const all = await getStudios();
   const alsoNearby = all
      .filter(
         (other) =>
            other.slug !== studio.slug &&
            (other.citySlug ?? "") !== "" &&
            other.citySlug === studio.citySlug
      )
      .slice(0, 4);

   const city = studioCity(studio);

   return (
      <>
         <JsonLd
            data={[
               studioSchema(studio),
               breadcrumbSchema([
                  { name: "Home", path: "/" },
                  { name: "Studios", path: "/studios" },
                  { name: city, path: `/studios?city=${studio.citySlug ?? ""}` },
                  { name: studio.name, path: `/studios/${studio.slug}` },
               ]),
            ]}
         />
         <StudioClient studio={studio} alsoNearby={alsoNearby} />
      </>
   );
};

export default StudioPage;
