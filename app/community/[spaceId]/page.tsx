import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import { getPublicSpaceBySlug } from "@/app/actions/getPublicSpaces";
import PublicSpaceClient from "./PublicSpaceClient";

interface IParams {
   spaceId?: string;
}

const PublicSpacePage = async ({ params }: { params: IParams }) => {
   const space = params.spaceId ? await getPublicSpaceBySlug(params.spaceId) : undefined;

   if (!space) {
      return (
         <ClientOnly>
            <EmptyState
               title="Space not found"
               subTitle="That public location is not in the community list yet."
            />
         </ClientOnly>
      );
   }

   return (
      <ClientOnly>
         <PublicSpaceClient space={space} />
      </ClientOnly>
   );
};

export default PublicSpacePage;
