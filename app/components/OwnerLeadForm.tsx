"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const inputClass =
   "w-full rounded-lg border border-white/15 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-[#f5f5f5] outline-none transition placeholder:text-[#6f6f6f] focus:border-[#dcff1a]";

const Field = ({
   label,
   name,
   required,
   type = "text",
   placeholder,
}: {
   label: string;
   name: string;
   required?: boolean;
   type?: string;
   placeholder?: string;
}) => (
   <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold text-[#d4d4d4]">
         {label}
         {required && <span className="ml-1 text-[#dcff1a]">*</span>}
      </span>
      <input
         name={name}
         type={type}
         required={required}
         placeholder={placeholder}
         className={inputClass}
      />
   </label>
);

const OwnerLeadForm = () => {
   const [submitting, setSubmitting] = useState(false);
   const [done, setDone] = useState(false);

   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());

      setSubmitting(true);
      try {
         const response = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
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
         <div className="rounded-2xl border border-[#dcff1a]/30 bg-[#101010] p-7 text-center">
            <h2 className="text-lg font-semibold text-[#dcff1a]">Thanks — we have your details.</h2>
            <p className="mt-2 text-sm leading-6 text-[#929292]">
               We are reviewing spaces in batches and will be in touch before paid listings open.
               No payment is taken and nothing is published until you approve it.
            </p>
         </div>
      );
   }

   return (
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-[#101010] p-6">
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Your name" name="name" required placeholder="Nimal Perera" />
            <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
            <Field label="Phone" name="phone" type="tel" placeholder="+94 77 000 0000" />
            <Field label="Space name" name="spaceName" placeholder="Studio name or address" />
            <Field label="Where is it?" name="locationText" placeholder="Colombo 05" />
            <Field label="What kind of space?" name="spaceType" placeholder="Studio, villa, rooftop" />
         </div>
         <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold text-[#d4d4d4]">
               Anything else worth knowing?
            </span>
            <textarea
               name="message"
               rows={4}
               placeholder="Size, natural light, parking, hourly rate you have in mind."
               className={inputClass}
            />
         </label>
         <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[#dcff1a] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:brightness-105 disabled:opacity-60"
         >
            {submitting ? "Sending…" : "Join the owner waitlist"}
         </button>
         <p className="text-[11px] leading-5 text-[#6f6f6f]">
            We only use this to contact you about listing your space. No payment details, and
            nothing goes live without your say-so.
         </p>
      </form>
   );
};

export default OwnerLeadForm;
