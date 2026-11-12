"use client";

import { FormEvent } from "react";
import {
   STUDIO_AMENITIES,
   STUDIO_AMENITY_LABELS,
   STUDIO_TYPES,
   STUDIO_TYPE_LABELS,
   StudioAmenityValue,
} from "@/app/libs/studioTaxonomy";
import { STUDIO_STATUS_LABELS, inputClass, labelClass } from "./types";

/**
 * Admin form for a bookable studio.
 *
 * Numeric fields are kept as strings in form state and converted on submit:
 * an `<input type="number">` yields "" when cleared, and coercing that to 0
 * would publish a free studio. The dashboard drops empty numerics from the
 * payload instead, which the validator reads as "leave this alone".
 */
export interface StudioFormState {
   slug: string;
   name: string;
   tagline: string;
   type: string;
   description: string;
   locationLabel: string;
   latitude: string;
   longitude: string;
   imageSrc: string;
   images: string;
   studioType: string;
   currency: string;
   hourlyRate: string;
   halfDayRate: string;
   fullDayRate: string;
   minimumHours: string;
   rateNotes: string;
   capacity: string;
   floorAreaSqft: string;
   ceilingHeightFt: string;
   amenities: string[];
   equipment: string;
   availabilityNotes: string;
   openingHours: string;
   ownerName: string;
   ownerEmail: string;
   ownerPhone: string;
   bookingNotes: string;
   cancellationPolicy: string;
   metaTitle: string;
   metaDescription: string;
   status: string;
}

export const emptyStudioForm: StudioFormState = {
   slug: "",
   name: "",
   tagline: "",
   type: "",
   description: "",
   locationLabel: "",
   latitude: "",
   longitude: "",
   imageSrc: "",
   images: "",
   studioType: "DAYLIGHT",
   currency: "LKR",
   hourlyRate: "",
   halfDayRate: "",
   fullDayRate: "",
   minimumHours: "",
   rateNotes: "",
   capacity: "",
   floorAreaSqft: "",
   ceilingHeightFt: "",
   amenities: [],
   equipment: "",
   availabilityNotes: "",
   openingHours: "",
   ownerName: "",
   ownerEmail: "",
   ownerPhone: "",
   bookingNotes: "",
   cancellationPolicy: "",
   metaTitle: "",
   metaDescription: "",
   // New studios default to pending: an owner submission should be reviewed
   // before it goes live, and publishing by default makes that easy to miss.
   status: "PENDING",
};

interface StudioFormViewProps {
   form: StudioFormState;
   editingSlug: string | null;
   isSaving: boolean;
   onField: <K extends keyof StudioFormState>(field: K, value: StudioFormState[K]) => void;
   onSubmit: (event: FormEvent<HTMLFormElement>) => void;
   onCancel: () => void;
}

const Section = ({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) => (
   <section className="border-t border-white/10 pt-6">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {hint && <p className="mt-1 text-xs text-[#929292]">{hint}</p>}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
   </section>
);

const StudioFormView = ({
   form,
   editingSlug,
   isSaving,
   onField,
   onSubmit,
   onCancel,
}: StudioFormViewProps) => {
   const toggleAmenity = (amenity: StudioAmenityValue) => {
      onField(
         "amenities",
         form.amenities.includes(amenity)
            ? form.amenities.filter((entry) => entry !== amenity)
            : [...form.amenities, amenity]
      );
   };

   return (
      <form onSubmit={onSubmit} className="space-y-6">
         <div>
            <h2 className="text-xl font-semibold text-white">
               {editingSlug ? "Edit studio" : "Add a studio"}
            </h2>
            <p className="mt-1 text-sm text-[#929292]">
               Only published studios appear on the public site.
            </p>
         </div>

         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
               <span className={labelClass}>Name *</span>
               <input
                  required
                  value={form.name}
                  onChange={(event) => onField("name", event.target.value)}
                  className={inputClass}
                  placeholder="Lightwell Studio"
               />
            </label>
            <label className="block">
               <span className={labelClass}>URL slug *</span>
               <input
                  required
                  value={form.slug}
                  onChange={(event) => onField("slug", event.target.value)}
                  className={inputClass}
                  placeholder="lightwell-studio"
               />
            </label>
            <label className="block sm:col-span-2">
               <span className={labelClass}>Tagline *</span>
               <input
                  required
                  value={form.tagline}
                  onChange={(event) => onField("tagline", event.target.value)}
                  className={inputClass}
                  placeholder="North-facing loft with 4m windows, ten minutes from Colombo Fort."
               />
            </label>
            <label className="block">
               <span className={labelClass}>Type descriptor *</span>
               <input
                  required
                  value={form.type}
                  onChange={(event) => onField("type", event.target.value)}
                  className={inputClass}
                  placeholder="Daylight loft"
               />
            </label>
            <label className="block">
               <span className={labelClass}>Category *</span>
               <select
                  value={form.studioType}
                  onChange={(event) => onField("studioType", event.target.value)}
                  className={inputClass}
               >
                  {STUDIO_TYPES.map((type) => (
                     <option key={type} value={type}>
                        {STUDIO_TYPE_LABELS[type]}
                     </option>
                  ))}
               </select>
            </label>
            <label className="block sm:col-span-2">
               <span className={labelClass}>Location label *</span>
               <input
                  required
                  value={form.locationLabel}
                  onChange={(event) => onField("locationLabel", event.target.value)}
                  className={inputClass}
                  placeholder="Western Province, Colombo"
               />
               <span className="mt-1 block text-xs text-[#737373]">
                  Format: &quot;Province, City&quot;. City and district slugs are derived from this.
               </span>
            </label>
            <label className="block sm:col-span-2">
               <span className={labelClass}>Description *</span>
               <textarea
                  required
                  rows={5}
                  value={form.description}
                  onChange={(event) => onField("description", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className={labelClass}>Status</span>
               <select
                  value={form.status}
                  onChange={(event) => onField("status", event.target.value)}
                  className={inputClass}
               >
                  {Object.entries(STUDIO_STATUS_LABELS).map(([value, label]) => (
                     <option key={value} value={value}>
                        {label}
                     </option>
                  ))}
               </select>
            </label>
         </div>

         <Section title="Photos" hint="Hero image is the social card. All URLs must be https.">
            <label className="block sm:col-span-2">
               <span className={labelClass}>Hero image URL *</span>
               <input
                  required
                  type="url"
                  value={form.imageSrc}
                  onChange={(event) => onField("imageSrc", event.target.value)}
                  className={inputClass}
                  placeholder="https://..."
               />
            </label>
            <label className="block sm:col-span-2">
               <span className={labelClass}>Gallery URLs</span>
               <textarea
                  rows={3}
                  value={form.images}
                  onChange={(event) => onField("images", event.target.value)}
                  className={inputClass}
                  placeholder="One URL per line"
               />
            </label>
         </Section>

         <Section
            title="Rates"
            hint="Whole rupees, no separators. Leave blank for 'on request' — a blank rate is never shown as free."
         >
            <label className="block">
               <span className={labelClass}>Currency</span>
               <input
                  value={form.currency}
                  onChange={(event) => onField("currency", event.target.value)}
                  className={inputClass}
                  placeholder="LKR"
               />
            </label>
            <label className="block">
               <span className={labelClass}>Hourly rate</span>
               <input
                  type="number"
                  min={0}
                  value={form.hourlyRate}
                  onChange={(event) => onField("hourlyRate", event.target.value)}
                  className={inputClass}
                  placeholder="7500"
               />
            </label>
            <label className="block">
               <span className={labelClass}>Half-day rate</span>
               <input
                  type="number"
                  min={0}
                  value={form.halfDayRate}
                  onChange={(event) => onField("halfDayRate", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className={labelClass}>Full-day rate</span>
               <input
                  type="number"
                  min={0}
                  value={form.fullDayRate}
                  onChange={(event) => onField("fullDayRate", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className={labelClass}>Minimum hours</span>
               <input
                  type="number"
                  min={0}
                  max={24}
                  value={form.minimumHours}
                  onChange={(event) => onField("minimumHours", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block sm:col-span-2">
               <span className={labelClass}>Rate notes</span>
               <input
                  value={form.rateNotes}
                  onChange={(event) => onField("rateNotes", event.target.value)}
                  className={inputClass}
                  placeholder="Weekend rates 20% higher. Overtime billed hourly."
               />
            </label>
         </Section>

         <Section title="The space">
            <label className="block">
               <span className={labelClass}>Capacity (people)</span>
               <input
                  type="number"
                  min={0}
                  value={form.capacity}
                  onChange={(event) => onField("capacity", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className={labelClass}>Floor area (sq ft)</span>
               <input
                  type="number"
                  min={0}
                  value={form.floorAreaSqft}
                  onChange={(event) => onField("floorAreaSqft", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className={labelClass}>Ceiling height (ft)</span>
               <input
                  type="number"
                  min={0}
                  value={form.ceilingHeightFt}
                  onChange={(event) => onField("ceilingHeightFt", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className={labelClass}>Opening hours</span>
               <input
                  value={form.openingHours}
                  onChange={(event) => onField("openingHours", event.target.value)}
                  className={inputClass}
                  placeholder="Mon-Sat 07:00-19:00"
               />
            </label>
            <label className="block sm:col-span-2">
               <span className={labelClass}>Availability notes</span>
               <textarea
                  rows={2}
                  value={form.availabilityNotes}
                  onChange={(event) => onField("availabilityNotes", event.target.value)}
                  className={inputClass}
                  placeholder="Book at least 48 hours ahead. Sundays by arrangement."
               />
            </label>
            <label className="block sm:col-span-2">
               <span className={labelClass}>Equipment included</span>
               <textarea
                  rows={4}
                  value={form.equipment}
                  onChange={(event) => onField("equipment", event.target.value)}
                  className={inputClass}
                  placeholder="One item per line, e.g. 2x Godox AD600 with softboxes"
               />
            </label>
            <label className="block">
               <span className={labelClass}>Latitude</span>
               <input
                  value={form.latitude}
                  onChange={(event) => onField("latitude", event.target.value)}
                  className={inputClass}
                  placeholder="Optional"
               />
            </label>
            <label className="block">
               <span className={labelClass}>Longitude</span>
               <input
                  value={form.longitude}
                  onChange={(event) => onField("longitude", event.target.value)}
                  className={inputClass}
                  placeholder="Optional"
               />
            </label>
         </Section>

         <section className="border-t border-white/10 pt-6">
            <h3 className="text-sm font-semibold text-white">Amenities</h3>
            <div className="mt-4 flex flex-wrap gap-2">
               {STUDIO_AMENITIES.map((amenity) => {
                  const active = form.amenities.includes(amenity);
                  return (
                     <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        aria-pressed={active}
                        className={`rounded-full px-3.5 py-2 text-xs font-medium transition ${
                           active
                              ? "bg-[#dcff1a] text-[#0a0a0a]"
                              : "bg-white/[0.05] text-[#b8b8b8] hover:bg-white/[0.09] hover:text-white"
                        }`}
                     >
                        {STUDIO_AMENITY_LABELS[amenity]}
                     </button>
                  );
               })}
            </div>
         </section>

         <Section
            title="Owner contact"
            hint="Never shown publicly. Enquiries are collected in the leads inbox."
         >
            <label className="block">
               <span className={labelClass}>Owner name</span>
               <input
                  value={form.ownerName}
                  onChange={(event) => onField("ownerName", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className={labelClass}>Owner email</span>
               <input
                  type="email"
                  value={form.ownerEmail}
                  onChange={(event) => onField("ownerEmail", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block">
               <span className={labelClass}>Owner phone</span>
               <input
                  type="tel"
                  value={form.ownerPhone}
                  onChange={(event) => onField("ownerPhone", event.target.value)}
                  className={inputClass}
               />
            </label>
         </Section>

         <Section title="Booking terms">
            <label className="block sm:col-span-2">
               <span className={labelClass}>Booking notes</span>
               <textarea
                  rows={3}
                  value={form.bookingNotes}
                  onChange={(event) => onField("bookingNotes", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block sm:col-span-2">
               <span className={labelClass}>Cancellation policy</span>
               <textarea
                  rows={3}
                  value={form.cancellationPolicy}
                  onChange={(event) => onField("cancellationPolicy", event.target.value)}
                  className={inputClass}
               />
            </label>
         </Section>

         <Section title="SEO overrides" hint="Leave blank to use the generated title and description.">
            <label className="block sm:col-span-2">
               <span className={labelClass}>Meta title</span>
               <input
                  value={form.metaTitle}
                  onChange={(event) => onField("metaTitle", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className="block sm:col-span-2">
               <span className={labelClass}>Meta description</span>
               <textarea
                  rows={2}
                  value={form.metaDescription}
                  onChange={(event) => onField("metaDescription", event.target.value)}
                  className={inputClass}
               />
            </label>
         </Section>

         <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
            <button
               type="submit"
               disabled={isSaving}
               className="rounded-lg bg-[#dcff1a] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition disabled:opacity-60"
            >
               {isSaving ? "Saving..." : editingSlug ? "Save changes" : "Add studio"}
            </button>
            <button
               type="button"
               onClick={onCancel}
               className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-[#d4d4d4] transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
            >
               Cancel
            </button>
         </div>
      </form>
   );
};

export default StudioFormView;
