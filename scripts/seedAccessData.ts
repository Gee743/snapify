/**
 * Seeds permit / fee / drone data for the places where it genuinely applies.
 *
 * Sources (verify before publishing changes -- this is regulatory content):
 *  - CAASL drone rules: https://www.caa.lk  (registration + TRCSL clearance
 *    mandatory for any camera drone; VLOS only; night flight needs approval)
 *  - NFC / MFA foreign filming guidelines (feature 100K, TVC 75K, doc 50K LKR)
 *  - Central Cultural Fund: separate permit + fee per Cultural Triangle site
 *  - Galle Heritage Foundation: filming/photography within Galle Fort
 *
 * Deliberately conservative: where a rule is not confirmed the field is left
 * UNKNOWN rather than guessed, because a wrong permit claim is worse than none.
 *
 *   npx tsx scripts/seedAccessData.ts [--dry]
 */
import { PrismaClient, DroneRule } from "@prisma/client";

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry");

const CAASL_NOTE =
   "Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.";

type AccessSeed = {
   entryFee?: string;
   openingHours?: string;
   permitRequired?: boolean;
   permitAuthority?: string;
   permitNotes?: string;
   droneRule?: DroneRule;
   droneNotes?: string;
   tripodAllowed?: boolean;
   shootingNotes?: string;
};

const ACCESS: Record<string, AccessSeed> = {
   ruwanwelisaya: {
      entryFee: "Free for Sri Lankans; the Anuradhapura Sacred City ticket (approx. USD 25-30) applies to foreign visitors.",
      permitRequired: true,
      permitAuthority: "Department of Archaeology / Central Cultural Fund",
      permitNotes:
         "Commercial photography or video at a Cultural Triangle site needs written permission, applied for per location with its own fee. A departmental representative may be required on site.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: `Drones are not permitted over the Sacred City without explicit Department of Archaeology clearance. ${CAASL_NOTE}`,
      tripodAllowed: false,
      shootingNotes:
         "An active place of worship. Remove shoes and hats in the inner terrace, cover shoulders and knees, and never pose with your back to the stupa.",
   },
   "galle-fort-ramparts": {
      entryFee: "Free to walk the ramparts.",
      permitRequired: true,
      permitAuthority: "Galle Heritage Foundation",
      permitNotes:
         "The Foundation administers filming and photography inside the fort. Casual handheld shooting is fine; commercial shoots, crews and staged sessions need written approval in advance.",
      droneRule: DroneRule.PERMIT_REQUIRED,
      droneNotes: `A UNESCO World Heritage site -- drone work needs Foundation approval on top of national clearance. ${CAASL_NOTE}`,
      tripodAllowed: true,
      shootingNotes:
         "The ramparts face west, so the lighthouse end holds light longest. The walls are narrow and busy at sunset; set up early.",
   },
   "koneswaram-temple": {
      entryFee: "Free; donations accepted.",
      permitRequired: false,
      permitNotes:
         "No permit for personal photography, but the inner shrine is off limits to cameras. Ask before photographing worshippers or rituals.",
      droneRule: DroneRule.PERMIT_REQUIRED,
      droneNotes: `On a headland beside a naval installation -- do not fly without clearance. ${CAASL_NOTE}`,
      tripodAllowed: true,
      shootingNotes:
         "Remove footwear at the temple entrance and dress modestly. The cliff edge beyond the temple gives the wide coastal frame.",
   },
   "independence-square": {
      entryFee: "Free.",
      openingHours: "Grounds roughly 09:00-23:00; the colonnade is lit after dark.",
      permitRequired: false,
      permitNotes:
         "Personal photography is unrestricted. Commercial shoots and pre-wedding sessions with crews are routinely asked to arrange permission, and ceremonial days close sections at short notice.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: `A national monument in central Colombo with restricted airspace nearby. ${CAASL_NOTE}`,
      tripodAllowed: true,
   },
   "beira-lake": {
      entryFee: "Free to walk the shoreline; Seema Malaka has a separate temple donation.",
      permitRequired: false,
      droneRule: DroneRule.PROHIBITED,
      droneNotes: `Central Colombo sits inside controlled airspace. ${CAASL_NOTE}`,
      tripodAllowed: true,
      shootingNotes:
         "The temple pavilions are an active place of worship -- dress modestly on the boardwalk.",
   },
   "nine-arch-bridge": {
      entryFee: "Free.",
      permitRequired: false,
      permitNotes:
         "No permit for personal work. The track is live railway property: stand clear well before a train and never set up on the bridge itself.",
      droneRule: DroneRule.PERMIT_REQUIRED,
      droneNotes: `Heavily flown but still subject to national rules. ${CAASL_NOTE}`,
      tripodAllowed: true,
      shootingNotes:
         "Trains cross at roughly 06:48, 09:20, 13:37 and 15:48 -- times drift, so arrive 20 minutes early. The viewpoint from the Ella side is clear in the morning.",
   },
   "galle-face-green": {
      entryFee: "Free.",
      permitRequired: false,
      permitNotes:
         "Open promenade, no permit for personal work. Commercial crews should expect to be asked by the Urban Development Authority.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: `Adjacent to government and military buildings in central Colombo. ${CAASL_NOTE}`,
      tripodAllowed: true,
   },
   "jaffna-public-library": {
      entryFee: "Free to photograph the exterior; library entry is free with registration.",
      openingHours: "Closed Mondays and public holidays.",
      permitRequired: false,
      permitNotes: "Interior photography needs the librarian's permission.",
      droneRule: DroneRule.PERMIT_REQUIRED,
      droneNotes: CAASL_NOTE,
      tripodAllowed: true,
   },
   "liptons-seat": {
      entryFee: "Small entry charge at the viewpoint; the estate road is free.",
      openingHours: "Best before 10:00 -- cloud usually closes the view by midday.",
      permitRequired: false,
      droneRule: DroneRule.ALLOWED,
      droneNotes: `Open tea country with no restricted airspace nearby, but registration still applies. ${CAASL_NOTE}`,
      tripodAllowed: true,
      shootingNotes:
         "The climb from Dambatenne takes about an hour on foot. Mist burns off from the east, so shoot early and work outward.",
   },
};

async function main() {
   console.log(`Seeding access data for ${Object.keys(ACCESS).length} places. dry=${dryRun}\n`);
   let updated = 0;

   for (const [slug, data] of Object.entries(ACCESS)) {
      const existing = await prisma.publicSpace.findUnique({ where: { slug } });
      if (!existing) {
         console.log(`  SKIP  ${slug} (not in database)`);
         continue;
      }
      console.log(
         `  ${slug.padEnd(24)} permit=${data.permitRequired ?? false} drone=${data.droneRule ?? "UNKNOWN"}`
      );
      if (!dryRun) {
         await prisma.publicSpace.update({ where: { slug }, data });
      }
      updated += 1;
   }

   console.log(`\n${dryRun ? "Would update" : "Updated"} ${updated} places.`);
}

main()
   .catch((error) => {
      console.error(error);
      process.exitCode = 1;
   })
   .finally(() => prisma.$disconnect());
