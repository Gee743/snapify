import { notFound } from "next/navigation";
import { getPublicSpaceBySlug, getPublicSpaces } from "@/app/actions/getPublicSpaces";
import PublicSpaceClient from "./PublicSpaceClient";

export const revalidate = 3600;
// Spaces added via /admin after the build render on demand, then cache.
//
// Trade-off (Next 13.4): with dynamicParams=true, notFound() renders the 404 UI
// but responds 200 for slugs that were not prerendered -- a soft 404. Setting it
// to false returns a correct 404 but makes admin-added spaces 404 until the next
// build. We keep `true` so the admin dashboard works without a redeploy, and
// revalidatePath() from the admin write routes (Plan 0.3) keeps the prerendered
// set fresh. Re-test on the Next 14+ upgrade, which fixes the status code.
export const dynamicParams = true;

export async function generateStaticParams() {
   const spaces = await getPublicSpaces();
   return spaces.map((space) => ({ spaceId: space.id }));
}

interface IParams {
   spaceId?: string;
}

const PublicSpacePage = async ({ params }: { params: IParams }) => {
   const space = params.spaceId ? await getPublicSpaceBySlug(params.spaceId) : undefined;

   // notFound() returns a real 404 status. Rendering an "empty state" at 200
   // would be a soft 404: search engines index it as a valid page.
   if (!space) {
      notFound();
   }

   return <PublicSpaceClient space={space} />;
};

export default PublicSpacePage;
