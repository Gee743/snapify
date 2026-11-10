"use client";

import { useState } from "react";
import { PublicSpace } from "@/app/data/publicSpaces";
import { TONE_CLASS, buildSpecs, feeVerdict } from "@/app/libs/spaceSpecs";

/**
 * The decision panel: what it costs, when it is open, and the rules that
 * decide whether a shoot can happen — above the fold and scannable in a
 * couple of seconds.
 *
 * Values are the derived short forms from spaceSpecs; any longer sentence
 * hangs underneath its row so the label/value scan line stays intact for the
 * places whose fee or hours run to a full sentence.
 */

const ShareButton = ({ name }: { name: string }) => {
   const [copied, setCopied] = useState(false);

   const share = async () => {
      const url = typeof window === "undefined" ? "" : window.location.href;
      // The share sheet is the better affordance where it exists (mobile), but
      // it rejects on dismissal, which is not an error worth surfacing.
      if (navigator.share) {
         try {
            await navigator.share({ title: name, url });
            return;
         } catch {
            return;
         }
      }
      try {
         await navigator.clipboard.writeText(url);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         /* Clipboard blocked (insecure context or denied permission). */
      }
   };

   return (
      <button
         type="button"
         onClick={share}
         className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink-lineStrong px-5 py-3 text-[14.5px] font-medium text-cream transition-colors duration-200 hover:border-lime hover:text-lime"
      >
         {copied ? (
            <>
               <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
               </svg>
               Link copied
            </>
         ) : (
            <>
               <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.6" y1="10.7" x2="15.4" y2="6.3" />
                  <line x1="8.6" y1="13.3" x2="15.4" y2="17.7" />
               </svg>
               Share this place
            </>
         )}
      </button>
   );
};

const SpaceSummaryPanel = ({ space }: { space: PublicSpace }) => {
   const specs = buildSpecs(space);
   const fee = feeVerdict(space);
   const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${space.latlng[0]},${space.latlng[1]}`;

   return (
      <div className="rounded-panel bg-ink-raised p-6 shadow-raised md:sticky md:top-[88px]">
         <p className="text-[13px] text-cream-muted">Cost to shoot</p>
         <p className="mt-1 text-[32px] font-semibold leading-none tracking-[-0.025em] text-lime">
            {fee.headline}
         </p>

         <dl className="mt-5">
            {specs.map((spec) => (
               <div key={spec.label} className="border-t border-ink-line py-3">
                  <div className="flex items-baseline justify-between gap-4">
                     <dt className="text-[11.5px] font-medium uppercase tracking-[0.07em] text-cream-faint">
                        {spec.label}
                     </dt>
                     <dd
                        className={`text-right text-[14.5px] font-medium ${
                           TONE_CLASS[spec.tone ?? "neutral"]
                        }`}
                     >
                        {spec.value}
                     </dd>
                  </div>
                  {spec.detail && (
                     <p className="mt-1.5 text-[13px] leading-5 text-cream-muted">{spec.detail}</p>
                  )}
               </div>
            ))}
         </dl>

         <div className="mt-5 flex flex-col gap-2.5">
            <a
               href={mapsUrl}
               target="_blank"
               rel="noreferrer"
               className="flex items-center justify-center gap-2 rounded-xl bg-lime px-5 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 ease-out hover:shadow-glow hover:brightness-105 active:scale-[0.98]"
            >
               Get directions
               <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" />
               </svg>
            </a>
            <ShareButton name={space.name} />
         </div>

         <p className="mt-3 text-center text-[12px] text-cream-faint">
            Rules change — confirm before a paid shoot.
         </p>
      </div>
   );
};

export default SpaceSummaryPanel;
