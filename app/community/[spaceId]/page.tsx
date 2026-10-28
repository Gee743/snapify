import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import { getPublicSpaceById } from "@/app/data/publicSpaces";
import PublicSpaceClient from "./PublicSpaceClient";

interface IParams {
   spaceId?: string;
}

const PublicSpacePage = ({ params }: { params: IParams }) => {
   const space = params.spaceId ? getPublicSpaceById(params.spaceId) : undefined;

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
