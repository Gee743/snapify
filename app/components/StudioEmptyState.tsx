import Link from "next/link";
import { STUDIO_TYPES, STUDIO_TYPE_BLURBS, STUDIO_TYPE_LABELS } from "@/app/libs/studioTaxonomy";

/**
 * Shown when no studio is published yet.
 *
 * Deliberately not a placeholder grid of invented studios: these are real
 * businesses, and fictional listings would misrepresent inventory that does
 * not exist. The page instead does the only honest useful thing at zero
 * listings — explain what is coming and recruit the owners who will fill it.
 */
const StudioEmptyState = () => (
   <div>
      <div className="rounded-panel border border-ink-line bg-ink-raised px-6 py-12 text-center shadow-raised sm:px-10 sm:py-14">
         <span
            aria-hidden="true"
            className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-lime/10 text-lime"
         >
            <svg
               className="h-5 w-5"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="1.7"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <path d="M3 21V8l9-5 9 5v13" />
               <path d="M3 21h18" />
               <path d="M9 21v-6h6v6" />
            </svg>
         </span>
         <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-cream">
            Bookable studios are opening soon
         </h2>
         <p className="mx-auto mt-3 max-w-[52ch] text-[14.5px] leading-6 text-cream-muted">
            We are onboarding the first studios, villas and rooftops now. Nothing is listed here
            until a real owner has confirmed their rates and availability — so this page stays
            empty rather than showing spaces you cannot actually book.
         </p>
         <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
               href="/list-your-space"
               className="rounded-xl bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.97]"
            >
               List your space
            </Link>
            <Link
               href="/community"
               className="rounded-xl border border-ink-lineStrong px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-200 hover:border-lime hover:text-lime"
            >
               Browse free public spots
            </Link>
         </div>
      </div>

      <section className="mt-12">
         <h3 className="text-lg font-semibold tracking-[-0.01em] text-cream">
            What will be listed here
         </h3>
         <p className="mt-2 max-w-[60ch] text-[14.5px] leading-6 text-cream-muted">
            Each listing will carry its hourly and day rate, how many people it holds, the kit
            that comes with it and what the room does to light.
         </p>
         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_TYPES.map((type) => (
               <div key={type} className="border-t border-ink-line pt-4">
                  <h4 className="text-sm font-semibold text-lime">{STUDIO_TYPE_LABELS[type]}</h4>
                  <p className="mt-1.5 text-[13px] leading-5 text-cream-muted">
                     {STUDIO_TYPE_BLURBS[type]}
                  </p>
               </div>
            ))}
         </div>
      </section>
   </div>
);

export default StudioEmptyState;
