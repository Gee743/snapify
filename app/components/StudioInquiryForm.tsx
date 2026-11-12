"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const inputClass =
   "w-full rounded-lg border border-ink-lineStrong bg-ink px-3.5 py-2.5 text-sm text-cream outline-none transition placeholder:text-cream-faint focus:border-lime";

/**
 * Enquiry form for a bookable studio.
 *
 * Posts to /api/studio-inquiries rather than exposing the owner's email: the
 * address stays server-side, which is also why getStudios drops owner contact
 * before the studio ever reaches a client component.
 */
const StudioInquiryForm = ({
   studioSlug,
   studioName,
}: {
   studioSlug: string;
   studioName: string;
}) => {
   const [submitting, setSubmitting] = useState(false);
   const [done, setDone] = useState(false);

   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());

      setSubmitting(true);
      try {
         const response = await fetch("/api/studio-inquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               ...data,
               spaceSlug: studioSlug,
               // Sent as a number so it passes the integer check rather than
               // being rejected as a numeric string.
               crewSize: data.crewSize ? Number(data.crewSize) : undefined,
            }),
         });
         const result = await response.json().catch(() => ({}));

         if (!response.ok) {
            toast.error(result.error ?? "Something went wrong. Please try again.");
            return;
         }

         form.reset();
         setDone(true);
      } catch {
         toast.error("Could not reach the server. Please try again.");
      } finally {
         setSubmitting(false);
      }
   };

   if (done) {
      return (
         <div className="rounded-2xl border border-lime/30 bg-ink-raised p-7 text-center">
            <h2 className="text-lg font-semibold text-lime">Enquiry sent</h2>
            <p className="mt-2 text-sm leading-6 text-cream-muted">
               We have passed your details to {studioName}. Rates and availability are confirmed
               by the owner directly — Snapify does not take payment or hold the booking.
            </p>
         </div>
      );
   }

   return (
      <form
         onSubmit={onSubmit}
         className="space-y-4 rounded-2xl border border-ink-line bg-ink-raised p-6"
      >
         <div>
            <h2 className="text-base font-semibold text-cream">Enquire about this space</h2>
            <p className="mt-1 text-[13px] leading-5 text-cream-muted">
               Tell the owner what you are shooting. They reply to you directly.
            </p>
         </div>

         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
               <span className="mb-1.5 block text-[12px] font-semibold text-cream-soft">
                  Your name<span className="ml-1 text-lime">*</span>
               </span>
               <input name="name" required placeholder="Nimal Perera" className={inputClass} />
            </label>
            <label className="block">
               <span className="mb-1.5 block text-[12px] font-semibold text-cream-soft">
                  Email<span className="ml-1 text-lime">*</span>
               </span>
               <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className="mb-1.5 block text-[12px] font-semibold text-cream-soft">Phone</span>
               <input
                  name="phone"
                  type="tel"
                  placeholder="+94 77 000 0000"
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className="mb-1.5 block text-[12px] font-semibold text-cream-soft">
                  Shoot date
               </span>
               <input name="shootDate" type="date" className={inputClass} />
            </label>
            <label className="block sm:col-span-2">
               <span className="mb-1.5 block text-[12px] font-semibold text-cream-soft">
                  Crew size
               </span>
               <input
                  name="crewSize"
                  type="number"
                  min={1}
                  max={1000}
                  placeholder="How many people on the day?"
                  className={inputClass}
               />
            </label>
         </div>

         <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold text-cream-soft">
               What are you shooting?
            </span>
            <textarea
               name="message"
               rows={4}
               placeholder="Half-day product shoot, two lights, need the cyc wall and parking for a van."
               className={inputClass}
            />
         </label>

         <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-lime px-5 py-3 text-sm font-semibold text-ink transition-transform duration-200 active:scale-[0.98] disabled:opacity-60"
         >
            {submitting ? "Sending..." : "Send enquiry"}
         </button>

         <p className="text-[11.5px] leading-5 text-cream-faint">
            Snapify passes your enquiry to the owner. We do not take payment, and listing a rate
            here is not a confirmed booking.
         </p>
      </form>
   );
};

export default StudioInquiryForm;
