import { Studio } from "@/app/actions/getStudios";
import StudioCard from "./StudioCard";

/**
 * Studio grid.
 *
 * Deliberately simpler than SpaceGrid: it has no built-in chip filters,
 * because every page that renders studios (/studios and the type hubs) owns a
 * full StudioFilters bar upstream. A second set of controls inside the grid
 * would be the duplication SpaceGrid's `showFilters={false}` mode exists to
 * avoid.
 */
const StudioGrid = ({
   studios,
   emptyState,
}: {
   studios: Studio[];
   emptyState?: React.ReactNode;
}) => {
   if (studios.length === 0) {
      return (
         emptyState ?? (
            <div className="rounded-panel bg-ink-raised px-6 py-14 text-center shadow-raised">
               <h3 className="text-lg font-semibold text-cream">No studios listed yet</h3>
               <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cream-muted">
                  Paid, bookable spaces are opening soon.
               </p>
            </div>
         )
      );
   }

   return (
      <div className="stagger grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4">
         {studios.map((studio, index) => (
            <StudioCard key={studio.slug} data={studio} index={index} />
         ))}
      </div>
   );
};

export default StudioGrid;
