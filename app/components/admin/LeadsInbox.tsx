"use client";

import { ReactNode, useMemo, useState } from "react";
import { LeadsPayload, formatDate } from "./types";

type LeadTab = "owners" | "inquiries" | "subscribers";

interface LeadsInboxProps {
   leads: LeadsPayload | null;
   isLoading: boolean;
   onRefresh: () => void;
}

/** RFC 4180 quoting: wrap every cell and double any embedded quote, so commas
 *  and newlines inside a message cannot shift columns. */
const toCsv = (headers: string[], rows: (string | null | undefined)[][]) =>
   [headers, ...rows]
      .map((row) =>
         row
            .map((cell) => `"${String(cell ?? "").split('"').join('""')}"`)
            .join(",")
      )
      .join("\r\n");

const downloadCsv = (filename: string, csv: string) => {
   // Prepend a BOM so Excel reads the UTF-8 correctly.
   const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8;" });
   const url = URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.href = url;
   link.download = filename;
   link.click();
   URL.revokeObjectURL(url);
};

const Table = ({ headers, children }: { headers: string[]; children: ReactNode }) => (
   <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#101010]">
      <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
         <thead>
            <tr className="border-b border-white/10">
               {headers.map((header) => (
                  <th
                     key={header}
                     scope="col"
                     className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#737373]"
                  >
                     {header}
                  </th>
               ))}
            </tr>
         </thead>
         <tbody>{children}</tbody>
      </table>
   </div>
);

const Cell = ({ children, muted }: { children: ReactNode; muted?: boolean }) => (
   <td className={`px-4 py-3 align-top ${muted ? "text-[#929292]" : "text-[#d4d4d4]"}`}>
      {children}
   </td>
);

const Mail = ({ email }: { email: string }) => (
   <a href={`mailto:${email}`} className="text-[#dcff1a] hover:underline">
      {email}
   </a>
);

const Empty = ({ colSpan, label }: { colSpan: number; label: string }) => (
   <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center text-sm text-[#737373]">
         {label}
      </td>
   </tr>
);

const LeadsInbox = ({ leads, isLoading, onRefresh }: LeadsInboxProps) => {
   const [tab, setTab] = useState<LeadTab>("owners");
   const [query, setQuery] = useState("");

   const owners = leads?.owners ?? [];
   const inquiries = leads?.inquiries ?? [];
   const subscribers = leads?.subscribers ?? [];

   const needle = query.trim().toLowerCase();
   const matches = (...fields: (string | null | undefined)[]) =>
      !needle || fields.some((field) => field?.toLowerCase().includes(needle));

   const visibleOwners = useMemo(
      () =>
         owners.filter((lead) =>
            matches(lead.name, lead.email, lead.spaceName, lead.locationText, lead.message)
         ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [owners, needle]
   );
   const visibleInquiries = useMemo(
      () =>
         inquiries.filter((inquiry) =>
            matches(
               inquiry.name,
               inquiry.email,
               inquiry.spaceSlug,
               inquiry.spaceName,
               inquiry.message
            )
         ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [inquiries, needle]
   );
   const visibleSubscribers = useMemo(
      () => subscribers.filter((subscriber) => matches(subscriber.email, subscriber.source)),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [subscribers, needle]
   );

   const tabs: { id: LeadTab; label: string; count: number }[] = [
      { id: "owners", label: "Space owners", count: owners.length },
      { id: "inquiries", label: "Studio enquiries", count: inquiries.length },
      { id: "subscribers", label: "Newsletter", count: subscribers.length },
   ];

   const exportCurrent = () => {
      if (tab === "owners") {
         downloadCsv(
            "snapify-owner-leads.csv",
            toCsv(
               ["Received", "Name", "Email", "Phone", "Space", "Location", "Type", "Message"],
               visibleOwners.map((lead) => [
                  lead.createdAt,
                  lead.name,
                  lead.email,
                  lead.phone,
                  lead.spaceName,
                  lead.locationText,
                  lead.spaceType,
                  lead.message,
               ])
            )
         );
         return;
      }
      if (tab === "inquiries") {
         downloadCsv(
            "snapify-studio-enquiries.csv",
            toCsv(
               [
                  "Received",
                  "Studio",
                  "Slug",
                  "Name",
                  "Email",
                  "Phone",
                  "Crew size",
                  "Shoot date",
                  "Message",
               ],
               visibleInquiries.map((inquiry) => [
                  inquiry.createdAt,
                  inquiry.spaceName ?? "",
                  inquiry.spaceSlug,
                  inquiry.name,
                  inquiry.email,
                  inquiry.phone,
                  inquiry.crewSize === null || inquiry.crewSize === undefined
                     ? ""
                     : String(inquiry.crewSize),
                  inquiry.shootDate,
                  inquiry.message,
               ])
            )
         );
         return;
      }
      downloadCsv(
         "snapify-newsletter.csv",
         toCsv(
            ["Subscribed", "Email", "Source"],
            visibleSubscribers.map((subscriber) => [
               subscriber.createdAt,
               subscriber.email,
               subscriber.source,
            ])
         )
      );
   };

   const visibleCount =
      tab === "owners"
         ? visibleOwners.length
         : tab === "inquiries"
         ? visibleInquiries.length
         : visibleSubscribers.length;

   return (
      <section>
         <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
               <h2 className="text-xl font-semibold">Leads inbox</h2>
               <p className="mt-1 text-sm text-[#929292]">
                  Everything captured by the public forms. Newest first.
               </p>
            </div>
            <div className="flex gap-2">
               <button
                  type="button"
                  onClick={onRefresh}
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-[#d4d4d4] transition hover:border-[#dcff1a] hover:text-[#dcff1a]"
               >
                  Refresh
               </button>
               <button
                  type="button"
                  onClick={exportCurrent}
                  disabled={visibleCount === 0}
                  className="rounded-lg bg-[#dcff1a] px-4 py-2 text-sm font-semibold text-[#0a0a0a] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
               >
                  Export CSV
               </button>
            </div>
         </div>

         <div className="mb-5 flex flex-wrap items-center gap-3">
            <div role="tablist" aria-label="Lead types" className="flex flex-wrap gap-2">
               {tabs.map((entry) => (
                  <button
                     key={entry.id}
                     type="button"
                     role="tab"
                     aria-selected={tab === entry.id}
                     onClick={() => setTab(entry.id)}
                     className={`rounded-lg border px-3.5 py-2 text-sm transition ${
                        tab === entry.id
                           ? "border-[#dcff1a] bg-[#dcff1a]/[0.08] text-[#dcff1a]"
                           : "border-white/10 text-[#b8b8b8] hover:border-white/25 hover:text-white"
                     }`}
                  >
                     {entry.label}
                     <span className="ml-2 text-xs text-[#737373]">{entry.count}</span>
                  </button>
               ))}
            </div>
            <input
               type="search"
               value={query}
               onChange={(event) => setQuery(event.target.value)}
               placeholder="Search name, email, message..."
               aria-label="Search leads"
               className="ml-auto w-full rounded-lg border border-white/10 bg-[#161616] px-3.5 py-2 text-sm text-white outline-none transition focus:border-[#dcff1a] sm:w-72"
            />
         </div>

         {isLoading ? (
            <p className="py-8 text-sm text-[#929292]">Loading leads...</p>
         ) : tab === "owners" ? (
            <Table headers={["Received", "Name", "Email", "Phone", "Space", "Message"]}>
               {visibleOwners.length === 0 ? (
                  <Empty colSpan={6} label="No space owner leads yet." />
               ) : (
                  visibleOwners.map((lead) => (
                     <tr key={lead.id} className="border-b border-white/5 last:border-0">
                        <Cell muted>{formatDate(lead.createdAt)}</Cell>
                        <Cell>{lead.name}</Cell>
                        <Cell>
                           <Mail email={lead.email} />
                        </Cell>
                        <Cell muted>{lead.phone || "-"}</Cell>
                        <Cell muted>
                           {lead.spaceName || "-"}
                           {lead.locationText && (
                              <span className="block text-xs text-[#737373]">
                                 {lead.locationText}
                              </span>
                           )}
                        </Cell>
                        <Cell muted>
                           <span className="line-clamp-3 max-w-sm">{lead.message || "-"}</span>
                        </Cell>
                     </tr>
                  ))
               )}
            </Table>
         ) : tab === "inquiries" ? (
            <Table
               headers={["Received", "Studio", "Name", "Email", "Crew", "Shoot date", "Message"]}
            >
               {visibleInquiries.length === 0 ? (
                  <Empty colSpan={7} label="No studio enquiries yet." />
               ) : (
                  visibleInquiries.map((inquiry) => (
                     <tr key={inquiry.id} className="border-b border-white/5 last:border-0">
                        <Cell muted>{formatDate(inquiry.createdAt)}</Cell>
                        <Cell>
                           {/* Enquiries come from the studio pages, so link to
                               /studios -- /community would 404 on this slug. */}
                           <a
                              href={`/studios/${inquiry.spaceSlug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-[#dcff1a]"
                           >
                              {inquiry.spaceName || inquiry.spaceSlug}
                           </a>
                        </Cell>
                        <Cell>{inquiry.name}</Cell>
                        <Cell>
                           <Mail email={inquiry.email} />
                        </Cell>
                        <Cell muted>{inquiry.crewSize ?? "-"}</Cell>
                        <Cell muted>
                           {inquiry.shootDate ? formatDate(inquiry.shootDate) : "-"}
                        </Cell>
                        <Cell muted>
                           <span className="line-clamp-3 max-w-sm">{inquiry.message || "-"}</span>
                        </Cell>
                     </tr>
                  ))
               )}
            </Table>
         ) : (
            <Table headers={["Subscribed", "Email", "Source"]}>
               {visibleSubscribers.length === 0 ? (
                  <Empty colSpan={3} label="No newsletter subscribers yet." />
               ) : (
                  visibleSubscribers.map((subscriber) => (
                     <tr key={subscriber.id} className="border-b border-white/5 last:border-0">
                        <Cell muted>{formatDate(subscriber.createdAt)}</Cell>
                        <Cell>
                           <Mail email={subscriber.email} />
                        </Cell>
                        <Cell muted>{subscriber.source || "-"}</Cell>
                     </tr>
                  ))
               )}
            </Table>
         )}
      </section>
   );
};

export default LeadsInbox;
