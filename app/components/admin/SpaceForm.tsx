"use client";

import { FormEvent, ReactNode } from "react";
import {
   BEST_TIMES,
   BEST_TIME_LABELS,
   DRONE_RULES,
   DRONE_RULE_LABELS,
   MONTH_LABELS,
   inputClass,
   labelClass,
} from "./types";

export interface SpaceForm {
   slug: string;
   name: string;
   type: string;
   locationLabel: string;
   latitude: string;
   longitude: string;
   description: string;
   directions: string;
   tips: string;
   imageSrc: string;
   entryFee: string;
   isFree: boolean;
   permitRequired: boolean;
   permitAuthority: string;
   permitNotes: string;
   droneRule: string;
   droneNotes: string;
   openingHours: string;
   tripodAllowed: string;
   shootingNotes: string;
   bestTimeOfDay: string[];
   bestMonths: number[];
}

export const emptyForm: SpaceForm = {
   slug: "",
   name: "",
   type: "",
   locationLabel: "",
   latitude: "",
   longitude: "",
   description: "",
   directions: "",
   tips: "",
   imageSrc: "",
   entryFee: "",
   isFree: true,
   permitRequired: false,
   permitAuthority: "",
   permitNotes: "",
   droneRule: "UNKNOWN",
   droneNotes: "",
   openingHours: "",
   tripodAllowed: "",
   shootingNotes: "",
   bestTimeOfDay: [],
   bestMonths: [],
};

interface SpaceFormProps {
   form: SpaceForm;
   editingSlug: string | null;
   isSaving: boolean;
   onField: <K extends keyof SpaceForm>(field: K, value: SpaceForm[K]) => void;
   onSubmit: (event: FormEvent<HTMLFormElement>) => void;
   onCancel: () => void;
}

const Fieldset = ({
   title,
   description,
   children,
}: {
   title: string;
   description: string;
   children: ReactNode;
}) => (
   <fieldset className="rounded-2xl border border-white/10 bg-[#101010] p-5 sm:p-7">
      <legend className="px-2 text-sm font-semibold text-[#dcff1a]">{title}</legend>
      <p className="mb-5 text-sm text-[#929292]">{description}</p>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
   </fieldset>
);

/** Toggle chip for the multi-select vocabularies (months, times of day). */
const Chip = ({
   active,
   onClick,
   children,
}: {
   active: boolean;
   onClick: () => void;
   children: ReactNode;
}) => (
   <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-xs transition ${
         active
            ? "border-[#dcff1a] bg-[#dcff1a]/10 text-[#dcff1a]"
            : "border-white/15 text-[#b8b8b8] hover:border-white/30 hover:text-white"
      }`}
   >
      {children}
   </button>
);

const Switch = ({
   label,
   checked,
   onChange,
}: {
   label: string;
   checked: boolean;
   onChange: (next: boolean) => void;
}) => (
   <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#d4d4d4]">
      <input
         type="checkbox"
         checked={checked}
         onChange={(event) => onChange(event.target.checked)}
         className="h-4 w-4 accent-[#dcff1a]"
      />
      {label}
   </label>
);

const SpaceFormView = ({
   form,
   editingSlug,
   isSaving,
   onField,
   onSubmit,
   onCancel,
}: SpaceFormProps) => {
   // Mirrors deriveSpaceFields: "Province, City" -- last part city, first province.
   const parts = form.locationLabel.split(",");
   const derivedCity = parts[parts.length - 1]?.trim() || form.locationLabel.trim();
   const derivedProvince = parts[0]?.trim() || form.locationLabel.trim();
   const locationIsAmbiguous =
      form.locationLabel.trim().length > 0 && derivedCity === derivedProvince;

   const toggleIn = <T,>(list: T[], value: T) =>
      list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];

   const previewUrl = form.imageSrc.split('"').join("%22");

   return (
      <form onSubmit={onSubmit} className="space-y-6">
         <div className="flex items-start justify-between gap-4">
            <div>
               <h2 className="text-xl font-semibold">
                  {editingSlug ? "Edit space" : "Add a space"}
               </h2>
               <p className="mt-1 text-sm text-[#929292]">
                  Share a useful guide for creators visiting this location.
               </p>
            </div>
            {editingSlug && (
               <button
                  type="button"
                  onClick={onCancel}
                  className="shrink-0 text-sm text-[#929292] hover:text-white"
               >
                  Cancel edit
               </button>
            )}
         </div>

         <Fieldset title="Basics" description="How the space is named and found.">
            <label className={labelClass}>
               Space name
               <input
                  required
                  value={form.name}
                  onChange={(event) => onField("name", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={labelClass}>
               URL slug
               <input
                  required
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  value={form.slug}
                  onChange={(event) => onField("slug", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={labelClass}>
               Space type
               <input
                  required
                  placeholder="Public Park"
                  value={form.type}
                  onChange={(event) => onField("type", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={labelClass}>
               Area / location
               <input
                  required
                  placeholder="Western Province, Colombo"
                  value={form.locationLabel}
                  onChange={(event) => onField("locationLabel", event.target.value)}
                  className={inputClass}
               />
            </label>
            <div className="sm:col-span-2">
               {locationIsAmbiguous ? (
                  <p className="rounded-lg border border-[#ffcf6a]/30 bg-[#ffcf6a]/[0.06] px-4 py-3 text-sm text-[#ffcf6a]">
                     Province and city both resolve to &ldquo;{derivedCity}&rdquo;. Use the format
                     &ldquo;Province, City&rdquo; so the hub pages and breadcrumbs are correct.
                  </p>
               ) : (
                  form.locationLabel.trim() && (
                     <p className="text-xs text-[#737373]">
                        Will file under province{" "}
                        <span className="text-[#b8b8b8]">{derivedProvince}</span> and city{" "}
                        <span className="text-[#b8b8b8]">{derivedCity}</span>.
                     </p>
                  )
               )}
            </div>
            <label className={labelClass}>
               Latitude
               <input
                  required
                  type="number"
                  step="any"
                  min="-90"
                  max="90"
                  value={form.latitude}
                  onChange={(event) => onField("latitude", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={labelClass}>
               Longitude
               <input
                  required
                  type="number"
                  step="any"
                  min="-180"
                  max="180"
                  value={form.longitude}
                  onChange={(event) => onField("longitude", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
               Image URL (HTTPS)
               <input
                  required
                  type="url"
                  placeholder="https://..."
                  value={form.imageSrc}
                  onChange={(event) => onField("imageSrc", event.target.value)}
                  className={inputClass}
               />
            </label>
            {form.imageSrc && (
               <div
                  className="h-40 rounded-lg border border-white/10 bg-cover bg-center sm:col-span-2"
                  style={{ backgroundImage: `url("${previewUrl}")` }}
                  role="img"
                  aria-label="Selected space preview"
               />
            )}
         </Fieldset>

         <Fieldset title="Guide content" description="What a creator needs to read before going.">
            <label className={`${labelClass} sm:col-span-2`}>
               Description
               <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(event) => onField("description", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
               Directions
               <textarea
                  required
                  rows={3}
                  value={form.directions}
                  onChange={(event) => onField("directions", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
               Tips (one per line)
               <textarea
                  rows={3}
                  value={form.tips}
                  onChange={(event) => onField("tips", event.target.value)}
                  className={inputClass}
               />
            </label>
         </Fieldset>

         <Fieldset
            title="Access and permits"
            description="The details creators cannot find anywhere else. Leave a field blank if you are unsure."
         >
            <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
               <Switch
                  label="Free to enter"
                  checked={form.isFree}
                  onChange={(next) => onField("isFree", next)}
               />
               <Switch
                  label="Permit required"
                  checked={form.permitRequired}
                  onChange={(next) => onField("permitRequired", next)}
               />
            </div>
            <label className={labelClass}>
               Entry fee
               <input
                  placeholder="LKR 500 for foreign nationals"
                  value={form.entryFee}
                  onChange={(event) => onField("entryFee", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={labelClass}>
               Opening hours
               <input
                  placeholder="6.00am - 6.00pm daily"
                  value={form.openingHours}
                  onChange={(event) => onField("openingHours", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={labelClass}>
               Permit authority
               <input
                  placeholder="Department of Archaeology"
                  value={form.permitAuthority}
                  onChange={(event) => onField("permitAuthority", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={labelClass}>
               Tripods
               <select
                  value={form.tripodAllowed}
                  onChange={(event) => onField("tripodAllowed", event.target.value)}
                  className={inputClass}
               >
                  <option value="">Unknown</option>
                  <option value="true">Allowed</option>
                  <option value="false">Not allowed</option>
               </select>
            </label>
            <label className={`${labelClass} sm:col-span-2`}>
               Permit notes
               <textarea
                  rows={2}
                  placeholder="Who to contact, lead time, cost."
                  value={form.permitNotes}
                  onChange={(event) => onField("permitNotes", event.target.value)}
                  className={inputClass}
               />
            </label>
            <label className={labelClass}>
               Drone rule
               <select
                  value={form.droneRule}
                  onChange={(event) => onField("droneRule", event.target.value)}
                  className={inputClass}
               >
                  {DRONE_RULES.map((rule) => (
                     <option key={rule} value={rule}>
                        {DRONE_RULE_LABELS[rule]}
                     </option>
                  ))}
               </select>
            </label>
            <label className={labelClass}>
               Drone notes
               <input
                  placeholder="CAASL clearance needed above 400ft"
                  value={form.droneNotes}
                  onChange={(event) => onField("droneNotes", event.target.value)}
                  className={inputClass}
               />
            </label>
         </Fieldset>

         <Fieldset
            title="Shoot timing"
            description="When the light and the weather actually work at this place."
         >
            <div className="sm:col-span-2">
               <span className={labelClass}>Best time of day</span>
               <div className="mt-2 flex flex-wrap gap-2">
                  {BEST_TIMES.map((time) => (
                     <Chip
                        key={time}
                        active={form.bestTimeOfDay.includes(time)}
                        onClick={() => onField("bestTimeOfDay", toggleIn(form.bestTimeOfDay, time))}
                     >
                        {BEST_TIME_LABELS[time]}
                     </Chip>
                  ))}
               </div>
            </div>
            <div className="sm:col-span-2">
               <span className={labelClass}>Best months</span>
               <div className="mt-2 flex flex-wrap gap-2">
                  {MONTH_LABELS.map((month, index) => (
                     <Chip
                        key={month}
                        active={form.bestMonths.includes(index + 1)}
                        onClick={() => onField("bestMonths", toggleIn(form.bestMonths, index + 1))}
                     >
                        {month}
                     </Chip>
                  ))}
               </div>
            </div>
            <label className={`${labelClass} sm:col-span-2`}>
               Shooting notes
               <textarea
                  rows={2}
                  placeholder="Crowds before 8am, harsh backlight after noon."
                  value={form.shootingNotes}
                  onChange={(event) => onField("shootingNotes", event.target.value)}
                  className={inputClass}
               />
            </label>
         </Fieldset>

         <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-[#dcff1a] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60"
         >
            {isSaving ? "Saving..." : editingSlug ? "Save changes" : "Add public space"}
         </button>
      </form>
   );
};

export default SpaceFormView;
