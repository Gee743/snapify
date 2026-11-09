"use client";

import Link from "next/link";

interface EmptyStateProps {
   title?: string;
   subTitle?: string;
   /** Offers a route back to the full list. */
   showReset?: boolean;
   /** Retry handler for recoverable failures. */
   onRetry?: () => void;
}

/**
 * Shared empty / error panel.
 *
 * Previously rendered a light-theme Heading and a `bg-white text-black` outline
 * Button on a black page, and shipped the typo "Try changing or removig your
 * subtitles" -- copy that named a concept the UI does not have.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
   title = "Nothing here yet",
   subTitle = "We could not find anything matching that. Try another area, or browse everything we have listed.",
   showReset,
   onRetry,
}) => (
   <div className="flex min-h-[55vh] items-center bg-ink px-4 py-16">
      <div className="mx-auto max-w-md text-center">
         <span
            aria-hidden="true"
            className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05] text-cream-muted"
         >
            <svg
               className="h-5 w-5"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="1.8"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <circle cx="11" cy="11" r="7" />
               <line x1="21" y1="21" x2="16.6" y2="16.6" />
            </svg>
         </span>
         <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-cream">{title}</h2>
         <p className="mx-auto mt-3 max-w-[46ch] text-[14.5px] leading-6 text-cream-muted">
            {subTitle}
         </p>
         <div className="mt-7 flex flex-wrap justify-center gap-3">
            {onRetry && (
               <button
                  type="button"
                  onClick={onRetry}
                  className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.97]"
               >
                  Try again
               </button>
            )}
            {showReset && (
               <Link
                  href="/community"
                  className="rounded-xl border border-ink-lineStrong px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-200 hover:border-lime hover:text-lime"
               >
                  Browse all spaces
               </Link>
            )}
         </div>
      </div>
   </div>
);

export default EmptyState;
