import { PublicSpace } from "@/app/data/publicSpaces";
import { getSeasonGuidance } from "./sunTimes";
import { CATEGORY_META } from "./placeTaxonomy";

/**
 * Intro copy for hub pages, composed from each hub's actual contents rather
 * than filled from a template. A hub that says the same thing as every other
 * hub with the name swapped is a doorway page; these sentences change with the
 * mix of categories, the permit situation and the monsoon side the places sit
 * on, so no two read alike.
 */

const listify = (items: string[]) => {
   if (items.length === 0) return "";
   if (items.length === 1) return items[0];
   return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
};

/** "4 beaches, 2 viewpoints and a waterfall" from the real category mix. */
const describeMix = (spaces: PublicSpace[]) => {
   // Track singular and plural separately: naively stripping a trailing "s"
   // turns "Temples & landmarks" into "temples & landmark".
   const counts = new Map<string, { singular: string; plural: string; count: number }>();
   for (const space of spaces) {
      if (!space.category) continue;
      const meta = CATEGORY_META[space.category as keyof typeof CATEGORY_META];
      if (!meta) continue;
      const entry = counts.get(meta.slug) ?? {
         singular: meta.label.toLowerCase(),
         plural: meta.plural.toLowerCase(),
         count: 0,
      };
      entry.count += 1;
      counts.set(meta.slug, entry);
   }
   const parts = Array.from(counts.values())
      .sort((a, b) => b.count - a.count)
      .map((entry) =>
         entry.count === 1 ? `one ${entry.singular}` : `${entry.count} ${entry.plural}`
      );
   return listify(parts);
};

/** Named examples give the page specificity a template cannot. */
const namedExamples = (spaces: PublicSpace[], limit = 3) =>
   listify(spaces.slice(0, limit).map((space) => space.name));

export interface HubCopyInput {
   name: string;
   spaces: PublicSpace[];
   /** "district", "province", "city" or "category". */
   kind: string;
}

export const buildHubIntro = ({ name, spaces, kind }: HubCopyInput): string[] => {
   const paragraphs: string[] = [];
   const mix = describeMix(spaces);
   const examples = namedExamples(spaces);

   if (kind === "category") {
      const districts = new Set(spaces.map((space) => space.district).filter(Boolean));
      paragraphs.push(
         `${spaces.length} ${name.toLowerCase()} across Sri Lanka that are open to photograph, spread over ${districts.size} ${districts.size === 1 ? "district" : "districts"}. Among them: ${examples}.`
      );
   } else {
      const where =
         kind === "province" ? `${name}` : kind === "district" ? `${name} District` : name;
      paragraphs.push(
         `${spaces.length} public places to shoot in ${where}${mix ? ` — ${mix}` : ""}. The list covers ${examples}, each with directions, access notes and the light that actually works there.`
      );
   }

   // Permit and drone reality for this hub -- the information competitors omit.
   const permitPlaces = spaces.filter((space) => space.permitRequired);
   const droneBanned = spaces.filter((space) => space.droneRule === "PROHIBITED");
   const droneOk = spaces.filter((space) => space.droneRule === "ALLOWED");

   const accessNotes: string[] = [];
   if (permitPlaces.length > 0) {
      accessNotes.push(
         permitPlaces.length === 1
            ? `one of these needs written permission for commercial work (${namedExamples(permitPlaces, 1)})`
            : `${permitPlaces.length} of these need written permission for commercial work (${namedExamples(permitPlaces, 2)})`
      );
   }
   if (droneBanned.length > 0) {
      accessNotes.push(
         droneBanned.length === 1
            ? "one is closed to drones"
            : `${droneBanned.length} are closed to drones`
      );
   }
   if (droneOk.length > 0 && droneBanned.length === 0) {
      accessNotes.push(
         droneOk.length === 1
            ? "drones are flyable at one of them with CAASL registration"
            : `drones are flyable at ${droneOk.length} of them with CAASL registration`
      );
   }
   if (accessNotes.length > 0) {
      const sentence = listify(accessNotes);
      paragraphs.push(
         `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}. Check each listing before booking a crew.`
      );
   }

   // Season guidance, which differs by coast and is genuinely decision-grade.
   if (kind !== "category" && spaces.length > 0) {
      const [latitude, longitude] = spaces[0].latlng;
      const season = getSeasonGuidance(latitude, longitude);
      paragraphs.push(
         `Best months here are ${season.bestLabel}; ${season.avoidLabel} is usually the stretch to avoid.`
      );
   }

   return paragraphs;
};
