"use client";

import { useState } from "react";
import toast from "react-hot-toast";

/** Footer email capture. Stores the address now; sending comes later. */
const NewsletterForm = () => {
   const [email, setEmail] = useState("");
   const [submitting, setSubmitting] = useState(false);
   const [done, setDone] = useState(false);

   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitting(true);
      try {
         const response = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, source: "footer" }),
         });
         const result = await response.json().catch(() => ({}));
         if (!response.ok) {
            toast.error(result.error ?? "Something went wrong. Please try again.");
            return;
         }
         setEmail("");
         setDone(true);
      } catch {
         toast.error("Could not reach the server. Please try again.");
      } finally {
         setSubmitting(false);
      }
   };

   if (done) {
      return (
         <p className="text-[13px] leading-6 text-[#dcff1a]">
            You are on the list. We will send new locations and permit updates, nothing else.
         </p>
      );
   }

   return (
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
         <label className="sr-only" htmlFor="newsletter-email">
            Email address
         </label>
         <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-lg border border-white/15 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#f5f5f5] outline-none transition placeholder:text-[#6f6f6f] focus:border-[#dcff1a]"
         />
         <button
            type="submit"
            disabled={submitting}
            className="whitespace-nowrap rounded-lg bg-[#dcff1a] px-4 py-2.5 text-sm font-semibold text-[#0a0a0a] transition hover:brightness-105 disabled:opacity-60"
         >
            {submitting ? "…" : "Subscribe"}
         </button>
      </form>
   );
};

export default NewsletterForm;
