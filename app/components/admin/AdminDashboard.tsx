"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

interface PublicSpaceRecord {
   id: string;
   slug: string;
   name: string;
   type: string;
   locationLabel: string;
   latlng: number[];
   description: string;
   directions: string;
   tips: string[];
   imageSrc: string;
}

interface SpaceForm {
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
}

const emptyForm: SpaceForm = {
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
};

const slugify = (value: string) =>
   value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

const AdminDashboard = () => {
   const [spaces, setSpaces] = useState<PublicSpaceRecord[]>([]);
   const [form, setForm] = useState<SpaceForm>(emptyForm);
   const [editingSlug, setEditingSlug] = useState<string | null>(null);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [isSaving, setIsSaving] = useState(false);

   const loadSpaces = useCallback(async () => {
      setError("");
      try {
         const response = await fetch("/api/admin/public-spaces");
         const result = await response.json();
         if (!response.ok) throw new Error(result.error || "Could not load spaces.");
         setSpaces(result);
      } catch (loadError) {
         setError(
            loadError instanceof Error ? loadError.message : "Could not load public spaces."
         );
      } finally {
         setIsLoading(false);
      }
   }, []);

   useEffect(() => {
      void loadSpaces();
   }, [loadSpaces]);

   const setField = (field: keyof SpaceForm, value: string) => {
      setForm((current) => ({
         ...current,
         [field]: value,
         ...(field === "name" && !editingSlug ? { slug: slugify(value) } : {}),
      }));
   };

   const resetForm = () => {
      setForm(emptyForm);
      setEditingSlug(null);
   };

   const editSpace = (space: PublicSpaceRecord) => {
      setForm({
         slug: space.slug,
         name: space.name,
         type: space.type,
         locationLabel: space.locationLabel,
         latitude: String(space.latlng[0] ?? ""),
         longitude: String(space.latlng[1] ?? ""),
         description: space.description,
         directions: space.directions,
         tips: space.tips.join("\n"),
         imageSrc: space.imageSrc,
      });
      setEditingSlug(space.slug);
      setError("");
      setMessage("");
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const saveSpace = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSaving(true);
      setError("");
      setMessage("");

      const payload = {
         slug: slugify(form.slug),
         name: form.name,
         type: form.type,
         locationLabel: form.locationLabel,
         latlng: [Number(form.latitude), Number(form.longitude)],
         description: form.description,
         directions: form.directions,
         tips: form.tips.split("\n").map((tip) => tip.trim()).filter(Boolean),
         imageSrc: form.imageSrc,
      };

      try {
         const response = await fetch(
            editingSlug
               ? `/api/admin/public-spaces/${encodeURIComponent(editingSlug)}`
               : "/api/admin/public-spaces",
            {
               method: editingSlug ? "PUT" : "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(payload),
            }
         );
         const result = await response.json();
         if (!response.ok) throw new Error(result.error || "Could not save this space.");

         resetForm();
         setMessage(editingSlug ? "Space updated." : "Space added.");
         await loadSpaces();
      } catch (saveError) {
         setError(saveError instanceof Error ? saveError.message : "Could not save this space.");
      } finally {
         setIsSaving(false);
      }
   };

   const deleteSpace = async (space: PublicSpaceRecord) => {
      if (!window.confirm(`Remove "${space.name}" from the public spaces?`)) return;
      setError("");
      setMessage("");

      try {
         const response = await fetch(
            `/api/admin/public-spaces/${encodeURIComponent(space.slug)}`,
            { method: "DELETE" }
         );
         const result = await response.json();
         if (!response.ok) throw new Error(result.error || "Could not remove this space.");
         setMessage("Space removed.");
         if (editingSlug === space.slug) resetForm();
         await loadSpaces();
      } catch (deleteError) {
         setError(
            deleteError instanceof Error ? deleteError.message : "Could not remove this space."
         );
      }
   };

   const signOut = async () => {
      try {
         const response = await fetch("/api/admin/session", { method: "DELETE" });
         if (!response.ok) throw new Error("Could not sign out.");
         window.location.reload();
      } catch (signOutError) {
         setError(signOutError instanceof Error ? signOutError.message : "Could not sign out.");
      }
   };

   const inputClass =
      "mt-2 w-full rounded-lg border border-white/10 bg-[#161616] px-3.5 py-3 text-sm text-white outline-none transition focus:border-[#dcff1a]";
   const labelClass = "block text-sm font-medium text-[#d4d4d4]";

   return (
      <main className="min-h-[calc(100vh-6rem)] bg-[#0a0a0a] px-4 py-8 text-[#f5f5f5] sm:px-8">
         <div className="mx-auto max-w-6xl">
            <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
               <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#dcff1a]">
                     SNAPIFY TEAM
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight">Manage public spaces</h1>
                  <p className="mt-2 text-sm text-[#929292]">
                     Create and update the free spaces shown on Snapify.
                  </p>
               </div>
               <button
                  type="button"
                  onClick={signOut}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-[#d4d4d4] transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
               >
                  Sign out
               </button>
            </header>

            {(error || message) && (
               <p
                  role={error ? "alert" : "status"}
                  className={`mb-5 rounded-lg border px-4 py-3 text-sm ${
                     error
                        ? "border-[#ff8a7a]/30 bg-[#ff8a7a]/[0.06] text-[#ff9a8b]"
                        : "border-[#dcff1a]/20 bg-[#dcff1a]/[0.05] text-[#dcff1a]"
                  }`}
               >
                  {error || message}
               </p>
            )}

            <section className="mb-10 rounded-2xl border border-white/10 bg-[#101010] p-5 sm:p-7">
               <div className="mb-6 flex items-start justify-between gap-4">
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
                        onClick={resetForm}
                        className="text-sm text-[#929292] hover:text-white"
                     >
                        Cancel
                     </button>
                  )}
               </div>
               <form onSubmit={saveSpace} className="grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>
                     Space name
                     <input
                        required
                        value={form.name}
                        onChange={(event) => setField("name", event.target.value)}
                        className={inputClass}
                     />
                  </label>
                  <label className={labelClass}>
                     URL slug
                     <input
                        required
                        pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                        value={form.slug}
                        onChange={(event) => setField("slug", event.target.value)}
                        className={inputClass}
                     />
                  </label>
                  <label className={labelClass}>
                     Space type
                     <input
                        required
                        placeholder="Public Park"
                        value={form.type}
                        onChange={(event) => setField("type", event.target.value)}
                        className={inputClass}
                     />
                  </label>
                  <label className={labelClass}>
                     Area / location
                     <input
                        required
                        placeholder="Western Province, Colombo"
                        value={form.locationLabel}
                        onChange={(event) => setField("locationLabel", event.target.value)}
                        className={inputClass}
                     />
                  </label>
                  <label className={labelClass}>
                     Latitude
                     <input
                        required
                        type="number"
                        step="any"
                        min="-90"
                        max="90"
                        value={form.latitude}
                        onChange={(event) => setField("latitude", event.target.value)}
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
                        onChange={(event) => setField("longitude", event.target.value)}
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
                        onChange={(event) => setField("imageSrc", event.target.value)}
                        className={inputClass}
                     />
                  </label>
                  {form.imageSrc && (
                     <div
                        className="h-40 rounded-lg border border-white/10 bg-cover bg-center sm:col-span-2"
                        style={{ backgroundImage: `url("${form.imageSrc.replaceAll('"', "%22")}")` }}
                        role="img"
                        aria-label="Selected space preview"
                     />
                  )}
                  <label className={`${labelClass} sm:col-span-2`}>
                     Description
                     <textarea
                        required
                        rows={3}
                        value={form.description}
                        onChange={(event) => setField("description", event.target.value)}
                        className={inputClass}
                     />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                     Directions
                     <textarea
                        required
                        rows={3}
                        value={form.directions}
                        onChange={(event) => setField("directions", event.target.value)}
                        className={inputClass}
                     />
                  </label>
                  <label className={`${labelClass} sm:col-span-2`}>
                     Tips (one per line)
                     <textarea
                        rows={3}
                        value={form.tips}
                        onChange={(event) => setField("tips", event.target.value)}
                        className={inputClass}
                     />
                  </label>
                  <button
                     type="submit"
                     disabled={isSaving}
                     className="rounded-lg bg-[#dcff1a] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
                  >
                     {isSaving ? "Saving..." : editingSlug ? "Save changes" : "Add public space"}
                  </button>
               </form>
            </section>

            <section>
               <div className="mb-4 flex items-end justify-between gap-4">
                  <h2 className="text-xl font-semibold">Current spaces</h2>
                  <span className="text-sm text-[#929292]">{spaces.length} total</span>
               </div>
               {isLoading ? (
                  <p className="py-8 text-sm text-[#929292]">Loading spaces...</p>
               ) : spaces.length === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-[#101010] px-5 py-8 text-sm text-[#929292]">
                     No spaces yet. Add one using the form above.
                  </p>
               ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                     {spaces.map((space) => (
                        <article
                           key={space.slug}
                           className="overflow-hidden rounded-xl border border-white/10 bg-[#101010]"
                        >
                           <div
                              className="h-40 bg-cover bg-center"
                              style={{
                                 backgroundImage: `url("${space.imageSrc.replaceAll('"', "%22")}")`,
                              }}
                              role="img"
                              aria-label={space.name}
                           />
                           <div className="p-4">
                              <h3 className="font-semibold">{space.name}</h3>
                              <p className="mt-1 text-sm text-[#929292]">
                                 {space.type} · {space.locationLabel}
                              </p>
                              <p className="mt-2 truncate text-xs text-[#737373]">
                                 /community/{space.slug}
                              </p>
                              <div className="mt-4 flex gap-2">
                                 <button
                                    type="button"
                                    onClick={() => editSpace(space)}
                                    className="rounded-md border border-white/15 px-3 py-1.5 text-sm transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
                                 >
                                    Edit
                                 </button>
                                 <button
                                    type="button"
                                    onClick={() => void deleteSpace(space)}
                                    className="rounded-md border border-[#ff8a7a]/30 px-3 py-1.5 text-sm text-[#ff9a8b] transition hover:bg-[#ff8a7a]/10"
                                 >
                                    Remove
                                 </button>
                                 <a
                                    href={`/community/${space.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ml-auto self-center text-sm text-[#929292] hover:text-white"
                                 >
                                    View
                                 </a>
                              </div>
                           </div>
                        </article>
                     ))}
                  </div>
               )}
            </section>
         </div>
      </main>
   );
};

export default AdminDashboard;
