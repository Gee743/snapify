/**
 * Route-level loading state.
 *
 * Replaces a react-spinners PuffLoader set to `color="red"` -- a hue from
 * outside the palette entirely. A skeleton that matches the grid it resolves
 * into also tells the visitor what is arriving, which a spinner never does.
 */
const Loader = () => (
   <div className="bg-ink py-16" role="status" aria-label="Loading places">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
         <div className="mb-9 max-w-3xl">
            <div className="h-10 w-2/3 animate-pulse rounded-lg bg-white/[0.06] sm:h-12" />
            <div className="mt-5 h-4 w-full max-w-md animate-pulse rounded bg-white/[0.04]" />
            <div className="mt-2.5 h-4 w-2/3 max-w-sm animate-pulse rounded bg-white/[0.04]" />
         </div>
         <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
               <div key={index} className="overflow-hidden rounded-card bg-ink-raised">
                  <div className="aspect-[4/3] w-full animate-pulse bg-white/[0.05]" />
                  <div className="space-y-2 p-3.5">
                     <div className="h-4 w-3/4 animate-pulse rounded bg-white/[0.05]" />
                     <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.035]" />
                  </div>
               </div>
            ))}
         </div>
      </div>
      <span className="sr-only">Loading places…</span>
   </div>
);

export default Loader;
