"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { slugifyPlace } from "@/app/data/publicSpaces";

type IndexRow = {
   id: string;
   name: string;
   type: string;
   city: string;
   category: string | null;
};

type Suggestion =
   | { kind: "place"; label: string; detail: string; href: string }
   | { kind: "area"; label: string; detail: string; href: string };

/** Case- and accent-insensitive match, so "ella" finds "Ella". */
const normalise = (value: string) =>
   value
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim();

/**
 * Navbar search.
 *
 * Replaces an "Area" pill that opened a modal containing a single dropdown --
 * three interactions and a light-on-dark theme switch to do what a text field
 * does in one. Searches place names and areas together, because someone who
 * knows the name ("Sigiriya") should not have to work out its city first.
 */
const Search = () => {
   const router = useRouter();
   const [query, setQuery] = useState("");
   const [rows, setRows] = useState<IndexRow[]>([]);
   const [open, setOpen] = useState(false);
   const [active, setActive] = useState(0);
   const rootRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   // The index is small and immutable between deploys, so one fetch on mount
   // serves every keystroke without a network hop per character.
   useEffect(() => {
      let current = true;
      fetch("/api/public-spaces/search")
         .then((response) => (response.ok ? response.json() : []))
         .then((data: IndexRow[]) => {
            if (current) setRows(data);
         })
         .catch(() => undefined);
      return () => {
         current = false;
      };
   }, []);

   // Cmd/Ctrl-K focuses search from anywhere -- the shortcut every search field
   // on the web has trained people to reach for.
   useEffect(() => {
      const onKey = (event: KeyboardEvent) => {
         if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            inputRef.current?.focus();
         }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
   }, []);

   useEffect(() => {
      const onPointerDown = (event: MouseEvent) => {
         if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", onPointerDown);
      return () => document.removeEventListener("mousedown", onPointerDown);
   }, []);

   const suggestions = useMemo<Suggestion[]>(() => {
      const term = normalise(query);
      if (!term) return [];

      const places = rows
         .filter((row) => normalise(`${row.name} ${row.type} ${row.city}`).includes(term))
         // A name that starts with the term is a better answer than one that
         // merely contains it somewhere.
         .sort((a, b) => {
            const aStarts = normalise(a.name).startsWith(term) ? 0 : 1;
            const bStarts = normalise(b.name).startsWith(term) ? 0 : 1;
            return aStarts - bStarts || a.name.localeCompare(b.name);
         })
         .slice(0, 6)
         .map<Suggestion>((row) => ({
            kind: "place",
            label: row.name,
            detail: `${row.type} · ${row.city}`,
            href: `/community/${row.id}`,
         }));

      // Most cities hold too few places to earn a /photo-spots hub, and this
      // list is built in the browser where the published set is not known. The
      // filtered listing exists for every city, so it is the one destination
      // that cannot 404.
      const areas = Array.from(new Set(rows.map((row) => row.city)))
         .filter((city) => normalise(city).includes(term))
         .slice(0, 3)
         .map<Suggestion>((city) => ({
            kind: "area",
            label: city,
            detail: `All photo spots in ${city}`,
            href: `/community?city=${slugifyPlace(city)}`,
         }));

      return [...places, ...areas];
   }, [query, rows]);

   useEffect(() => setActive(0), [query]);

   const go = (suggestion?: Suggestion) => {
      const target = suggestion ?? suggestions[active];
      if (!target) return;
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
      router.push(target.href);
   };

   const onKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
         setOpen(false);
         inputRef.current?.blur();
         return;
      }
      if (!suggestions.length) return;
      if (event.key === "ArrowDown") {
         event.preventDefault();
         setActive((index) => (index + 1) % suggestions.length);
      } else if (event.key === "ArrowUp") {
         event.preventDefault();
         setActive((index) => (index - 1 + suggestions.length) % suggestions.length);
      } else if (event.key === "Enter") {
         event.preventDefault();
         go();
      }
   };

   const showPanel = open && query.length > 0;

   return (
      <div ref={rootRef} className="relative w-full md:max-w-sm">
         <div className="relative">
            <svg
               className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-muted"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               aria-hidden="true"
            >
               <circle cx="11" cy="11" r="7" />
               <line x1="21" y1="21" x2="16.6" y2="16.6" strokeLinecap="round" />
            </svg>
            <input
               ref={inputRef}
               type="search"
               value={query}
               onChange={(event) => {
                  setQuery(event.target.value);
                  setOpen(true);
               }}
               onFocus={() => setOpen(true)}
               onKeyDown={onKeyDown}
               placeholder="Search places or areas"
               aria-label="Search photo spots"
               role="combobox"
               aria-expanded={showPanel}
               aria-controls="search-suggestions"
               aria-autocomplete="list"
               className="w-full rounded-full border border-ink-line bg-white/[0.04] py-2.5 pl-10 pr-14 text-sm text-cream outline-none transition duration-200 ease-out placeholder:text-cream-faint hover:border-ink-lineStrong focus:border-lime focus:bg-white/[0.07] [&::-webkit-search-cancel-button]:appearance-none"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-ink-line px-1.5 py-0.5 text-[10px] font-medium text-cream-faint md:block">
               {"⌘K"}
            </kbd>
         </div>

         {showPanel && (
            <div
               id="search-suggestions"
               role="listbox"
               aria-label="Search suggestions"
               className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 animate-sheet overflow-hidden rounded-panel border border-ink-line bg-ink-overlay shadow-lifted"
            >
               {suggestions.length === 0 ? (
                  <p className="px-4 py-5 text-sm text-cream-muted">
                     Nothing matches that yet.{" "}
                     <a href="/submit" className="text-lime underline">
                        Suggest a place
                     </a>
                     .
                  </p>
               ) : (
                  <ul className="max-h-[22rem] overflow-y-auto py-1.5">
                     {suggestions.map((suggestion, index) => (
                        <li key={`${suggestion.kind}-${suggestion.label}`}>
                           <button
                              type="button"
                              role="option"
                              aria-selected={index === active}
                              onMouseEnter={() => setActive(index)}
                              onClick={() => go(suggestion)}
                              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 ${
                                 index === active ? "bg-white/[0.07]" : ""
                              }`}
                           >
                              <span
                                 aria-hidden="true"
                                 className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                                    suggestion.kind === "place"
                                       ? "bg-lime/15 text-lime"
                                       : "bg-white/[0.07] text-cream-muted"
                                 }`}
                              >
                                 <svg
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                 >
                                    {suggestion.kind === "place" ? (
                                       <>
                                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
                                          <circle cx="12" cy="10" r="3" />
                                       </>
                                    ) : (
                                       <>
                                          <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3Z" />
                                          <path d="M9 3v15M15 6v15" />
                                       </>
                                    )}
                                 </svg>
                              </span>
                              <span className="min-w-0">
                                 <span className="block truncate text-sm font-medium text-cream">
                                    {suggestion.label}
                                 </span>
                                 <span className="block truncate text-[12px] text-cream-muted">
                                    {suggestion.detail}
                                 </span>
                              </span>
                           </button>
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         )}
      </div>
   );
};

export default Search;
