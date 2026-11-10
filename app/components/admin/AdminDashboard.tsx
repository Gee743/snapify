"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import AdminSidebar, { AdminSection } from "./AdminSidebar";
import LeadsInbox from "./LeadsInbox";
import SpaceFormView, { SpaceForm, emptyForm } from "./SpaceForm";
import SpacesList from "./SpacesList";
import { LeadsPayload, PublicSpaceRecord } from "./types";

const slugify = (value: string) =>
   value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

/** The validator treats an absent optional field as "leave the stored value
 *  alone", so a cleared input must be dropped from the payload rather than
 *  sent as "". Blanking a field therefore keeps its previous value -- edit it
 *  to a new value instead. */
const optionalText = (value: string) => {
   const trimmed = value.trim();
   return trimmed ? { value: trimmed } : null;
};

const AdminDashboard = () => {
   const [section, setSection] = useState<AdminSection>("spaces");
   const [spaces, setSpaces] = useState<PublicSpaceRecord[]>([]);
   const [leads, setLeads] = useState<LeadsPayload | null>(null);
   const [form, setForm] = useState<SpaceForm>(emptyForm);
   const [editingSlug, setEditingSlug] = useState<string | null>(null);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingLeads, setIsLoadingLeads] = useState(true);
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

   const loadLeads = useCallback(async () => {
      setIsLoadingLeads(true);
      try {
         const response = await fetch("/api/admin/leads");
         const result = await response.json();
         if (!response.ok) throw new Error(result.error || "Could not load leads.");
         setLeads(result);
      } catch (loadError) {
         setError(loadError instanceof Error ? loadError.message : "Could not load leads.");
      } finally {
         setIsLoadingLeads(false);
      }
   }, []);

   useEffect(() => {
      void loadSpaces();
      void loadLeads();
   }, [loadSpaces, loadLeads]);

   const setField = <K extends keyof SpaceForm>(field: K, value: SpaceForm[K]) => {
      setForm((current) => ({
         ...current,
         [field]: value,
         // Keep the slug in step with the name until the space exists; after
         // that the slug is a live URL and must only change deliberately.
         ...(field === "name" && !editingSlug ? { slug: slugify(String(value)) } : {}),
      }));
   };

   const resetForm = () => {
      setForm(emptyForm);
      setEditingSlug(null);
   };

   const startAdding = () => {
      resetForm();
      setSection("add");
      setError("");
      setMessage("");
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
         entryFee: space.entryFee ?? "",
         isFree: space.isFree ?? true,
         permitRequired: space.permitRequired ?? false,
         permitAuthority: space.permitAuthority ?? "",
         permitNotes: space.permitNotes ?? "",
         droneRule: space.droneRule ?? "UNKNOWN",
         droneNotes: space.droneNotes ?? "",
         openingHours: space.openingHours ?? "",
         tripodAllowed:
            space.tripodAllowed === null || space.tripodAllowed === undefined
               ? ""
               : String(space.tripodAllowed),
         shootingNotes: space.shootingNotes ?? "",
         bestTimeOfDay: space.bestTimeOfDay ?? [],
         bestMonths: space.bestMonths ?? [],
      });
      setEditingSlug(space.slug);
      setSection("add");
      setError("");
      setMessage("");
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const saveSpace = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSaving(true);
      setError("");
      setMessage("");

      const entryFee = optionalText(form.entryFee);
      const permitAuthority = optionalText(form.permitAuthority);
      const permitNotes = optionalText(form.permitNotes);
      const droneNotes = optionalText(form.droneNotes);
      const openingHours = optionalText(form.openingHours);
      const shootingNotes = optionalText(form.shootingNotes);

      const payload = {
         slug: slugify(form.slug),
         name: form.name,
         type: form.type,
         locationLabel: form.locationLabel,
         latlng: [Number(form.latitude), Number(form.longitude)],
         description: form.description,
         directions: form.directions,
         tips: form.tips
            .split("\n")
            .map((tip) => tip.trim())
            .filter(Boolean),
         imageSrc: form.imageSrc,
         isFree: form.isFree,
         permitRequired: form.permitRequired,
         droneRule: form.droneRule,
         bestTimeOfDay: form.bestTimeOfDay,
         bestMonths: form.bestMonths,
         ...(entryFee && { entryFee: entryFee.value }),
         ...(permitAuthority && { permitAuthority: permitAuthority.value }),
         ...(permitNotes && { permitNotes: permitNotes.value }),
         ...(droneNotes && { droneNotes: droneNotes.value }),
         ...(openingHours && { openingHours: openingHours.value }),
         ...(shootingNotes && { shootingNotes: shootingNotes.value }),
         ...(form.tripodAllowed !== "" && { tripodAllowed: form.tripodAllowed === "true" }),
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

         const wasEditing = Boolean(editingSlug);
         resetForm();
         setMessage(wasEditing ? "Space updated." : "Space added.");
         setSection("spaces");
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

   const leadCount =
      (leads?.owners.length ?? 0) +
      (leads?.inquiries.length ?? 0) +
      (leads?.subscribers.length ?? 0);

   return (
      <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-[#f5f5f5] lg:flex-row">
         <AdminSidebar
            active={section}
            onSelect={setSection}
            spaceCount={spaces.length}
            leadCount={leadCount}
            isEditing={Boolean(editingSlug)}
            onSignOut={signOut}
         />

         <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-5xl">
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

               {section === "spaces" && (
                  <SpacesList
                     spaces={spaces}
                     isLoading={isLoading}
                     onEdit={editSpace}
                     onDelete={deleteSpace}
                     onAdd={startAdding}
                  />
               )}

               {section === "add" && (
                  <SpaceFormView
                     form={form}
                     editingSlug={editingSlug}
                     isSaving={isSaving}
                     onField={setField}
                     onSubmit={saveSpace}
                     onCancel={() => {
                        resetForm();
                        setSection("spaces");
                     }}
                  />
               )}

               {section === "leads" && (
                  <LeadsInbox leads={leads} isLoading={isLoadingLeads} onRefresh={loadLeads} />
               )}
            </div>
         </main>
      </div>
   );
};

export default AdminDashboard;
