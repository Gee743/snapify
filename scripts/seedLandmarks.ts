/**
 * Phase 2.0A: the iconic landmarks the directory was missing entirely.
 *
 * The gap analysis found Snapify had none of the niche high-volume entity
 * queries -- no Sigiriya, Pidurangala, Galle Lighthouse, Seema Malaka, Red
 * Mosque or Coconut Tree Hill.
 *
 * All descriptive copy here is written for Snapify. Names and coordinates are
 * facts; images are Wikimedia Commons (freely licensed, each verified to
 * resolve, recorded in sourceAttribution). Nothing is copied from a competitor
 * directory.
 *
 *   npx tsx scripts/seedLandmarks.ts [--dry]
 */
import { PrismaClient, DroneRule, SpaceCategory } from "@prisma/client";
import { deriveSpaceFields } from "../app/libs/deriveSpaceFields";

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry");

const CAASL =
   "Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.";

interface LandmarkSeed {
   slug: string;
   name: string;
   type: string;
   locationLabel: string;
   latlng: [number, number];
   description: string;
   directions: string;
   tips: string[];
   imageSrc: string;
   category: SpaceCategory;
   entryFee?: string;
   openingHours?: string;
   permitRequired?: boolean;
   permitAuthority?: string;
   permitNotes?: string;
   droneRule?: DroneRule;
   droneNotes?: string;
   tripodAllowed?: boolean;
   shootingNotes?: string;
}

const LANDMARKS: LandmarkSeed[] = [
   {
      slug: "sigiriya-rock-fortress",
      name: "Sigiriya Rock Fortress",
      type: "Ancient Rock Fortress",
      locationLabel: "Central Province, Dambulla",
      latlng: [7.957, 80.7603],
      description: "A granite monolith rising 180 m from flat scrub, topped by the ruins of a 5th-century royal citadel. The western face still carries fresco panels and the mirror wall, and the summit gives an uninterrupted horizon in every direction. It is the most recognisable silhouette in the country.",
      directions: "Signposted from the Dambulla-Habarane road, about 15 km north-east of Dambulla. The ticket office opens at 07:00 and the climb is roughly 1,200 steps through the water gardens and lion staircase.",
      tips: [
         "Climbing Sigiriya does not photograph Sigiriya. For the rock itself, shoot it from Pidurangala instead.",
         "Gates open at 07:00 but tour groups arrive by 08:30 -- the first hour on the staircase is the quiet one.",
         "The fresco gallery bans photography outright and it is actively enforced.",
         "Afternoon light rakes the western face; morning leaves it flat and backlit.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Sigiriya_%28141688197%29.jpeg",
      category: SpaceCategory.TEMPLE_LANDMARK,
      entryFee: "Approx. USD 30-35 for foreign visitors; substantially less for SAARC nationals and Sri Lankans.",
      openingHours: "07:00-17:30, last entry around 17:00.",
      permitRequired: true,
      permitAuthority: "Central Cultural Fund",
      permitNotes: "The standard ticket covers personal photography. Any commercial shoot, crew or tripod-based session needs written permission from the Central Cultural Fund, applied for per site with its own fee. Photography is banned entirely in the fresco gallery.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: "A World Heritage site -- drones are not permitted without explicit Central Cultural Fund and Department of Archaeology clearance, and enforcement here is strict." + " " + CAASL,
      tripodAllowed: false,
      shootingNotes: "The staircase is narrow and one-way at peak times; a tripod is impractical above the lion platform even where permitted.",
   },
   {
      slug: "pidurangala-rock",
      name: "Pidurangala Rock",
      type: "Hill Viewpoint",
      locationLabel: "Central Province, Dambulla",
      latlng: [7.9686, 80.7594],
      description: "The outcrop directly north of Sigiriya, and the only place to photograph the fortress as a whole. A short scramble past a reclining Buddha brings you onto a boulder field facing south, with Sigiriya centred against the plain. Cheaper and quieter than the fortress itself.",
      directions: "Pidurangala Road, about 1.5 km north of the Sigiriya ticket office. Park at the temple, pay at the entrance, then climb 20-25 minutes -- stairs first, then a boulder scramble that needs both hands.",
      tips: [
         "Leave 75 minutes before sunrise: the final scramble is genuinely awkward in the dark and a head torch is essential.",
         "Shoot south towards Sigiriya. The sun comes up to your left, so the rock lights from the side rather than behind.",
         "Shoulders and knees must be covered to pass the temple, even at 05:00.",
         "The summit boulders are wide and flat, so a tripod works here in a way it never does on Sigiriya.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pidurangala_Rock_depuis_Sigiriya_%281%29.jpg/1280px-Pidurangala_Rock_depuis_Sigiriya_%281%29.jpg",
      category: SpaceCategory.VIEWPOINT,
      entryFee: "Approx. LKR 1,000 temple donation at the entrance.",
      openingHours: "Open from roughly 05:00 for sunrise climbers.",
      permitRequired: false,
      permitNotes: "No permit for personal work. It is temple land, so dress modestly and expect to remove shoes near the reclining Buddha.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: "Within the Sigiriya restricted zone -- flying here is treated the same as flying over the fortress itself." + " " + CAASL,
      tripodAllowed: true,
   },
   {
      slug: "seema-malaka",
      name: "Seema Malaka",
      type: "Lake Temple Pavilion",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9166, 79.8564],
      description: "Three timber-and-copper pavilions set on platforms in Beira Lake, designed by Geoffrey Bawa in the 1970s as a meditation annexe to Gangaramaya. Rows of seated Buddha figures line the decks, with the Colombo skyline stacked up behind.",
      directions: "On Beira Lake off Sir James Peiris Mawatha, a few minutes walk from Gangaramaya Temple. Entry is via the Gangaramaya ticket, and the boardwalk connects the three platforms.",
      tips: [
         "Early morning gives still water and clean skyline reflections; by midday the breeze breaks the surface up.",
         "Shoot from the northern deck to stack the pavilion roofs against the high-rises.",
         "Blue hour is the strongest window -- the copper roofs hold warmth after the sky has gone cool.",
         "It is an active meditation space: keep back from anyone seated and do not use flash.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Seema_Malaka_temple.JPG",
      category: SpaceCategory.TEMPLE_LANDMARK,
      entryFee: "Covered by the Gangaramaya Temple ticket, usually LKR 300-500.",
      permitRequired: false,
      permitNotes: "Personal photography is welcome. Pre-wedding and commercial sessions should clear it with the temple office first.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: "Central Colombo sits inside controlled airspace." + " " + CAASL,
      tripodAllowed: true,
      shootingNotes: "Remove shoes before stepping onto the pavilion platforms.",
   },
   {
      slug: "jami-ul-alfar-mosque",
      name: "Jami Ul-Alfar Mosque",
      type: "Historic Mosque",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9387, 79.8542],
      description: "The red-and-white striped mosque at the heart of Pettah, built between 1908 and 1909 in a candy-banded brickwork with no real parallel elsewhere in the city. The facade reads as pure graphic pattern.",
      directions: "2nd Cross Street, Pettah. Walk in from Main Street through the market; Colombo Fort station is about ten minutes away on foot.",
      tips: [
         "Second Cross Street is narrow, so a 16-24mm equivalent is the difference between the whole facade and a corner of it.",
         "Morning light reaches the frontage before the street fills with handcarts.",
         "Non-Muslim visitors can usually see the interior outside prayer times -- ask at the entrance rather than walking in.",
         "Cover shoulders and knees; women are asked to cover their hair inside.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/2/24/SL_Colombo_asv2020-01_img22_Jami_Ul-Alfar_Mosque.jpg",
      category: SpaceCategory.TEMPLE_LANDMARK,
      entryFee: "Free.",
      openingHours: "Closed to visitors during the five daily prayers and on Friday around midday.",
      permitRequired: false,
      permitNotes: "Exterior photography is unrestricted. Always ask before photographing inside or photographing worshippers.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: "Dense central Colombo inside controlled airspace." + " " + CAASL,
      tripodAllowed: false,
      shootingNotes: "Pettah is busy and tight. A tripod will block a working street here even though nobody formally prohibits it.",
   },
   {
      slug: "pettah-market",
      name: "Pettah Market",
      type: "Street Market",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9375, 79.8585],
      description: "The commercial quarter east of Fort station: a grid of cross streets where each trades in something different -- textiles, produce, hardware, gold on Sea Street. Handcarts, awnings and stacked goods make it the densest street-photography ground in the country.",
      directions: "Bounded roughly by Main Street, Olcott Mawatha and the Pettah bus stands. Easiest on foot from Colombo Fort station; driving in is not worth it.",
      tips: [
         "Trading peaks between 07:00 and 10:00, and the light reaches street level in the same window.",
         "Work one cross street at a time -- each has its own trade and its own palette.",
         "Ask before photographing traders up close. Most agree, and the portraits are better for it.",
         "Keep gear minimal and close. One body, one lens, nothing hanging loose.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/d/db/Pettah_Floating_Market.jpg",
      category: SpaceCategory.URBAN,
      entryFee: "Free.",
      openingHours: "Busiest 07:00-17:00; most of Pettah closes on Sundays and Poya days.",
      permitRequired: false,
      droneRule: DroneRule.PROHIBITED,
      droneNotes: "Controlled airspace over a dense market -- not flyable." + " " + CAASL,
      tripodAllowed: false,
   },
   {
      slug: "old-dutch-hospital",
      name: "Old Dutch Hospital",
      type: "Colonial Precinct",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9344, 79.8422],
      description: "The oldest surviving colonial building in Colombo, dating to the 17th-century Dutch period and now restored into a courtyard of restaurants and shops. Thick whitewashed columns, timber rafters and deep shaded arcades give clean architectural lines a few minutes from Galle Face.",
      directions: "Hospital Street, Fort, between Chatham Street and the harbour end. An easy walk from Galle Face Green or Colombo Fort station.",
      tips: [
         "The arcades stay shaded all day, so it is the reliable fallback when midday sun kills everything outdoors.",
         "Courtyard lanterns light shortly before dusk and pair well with a blue-hour sky.",
         "Columns repeat cleanly down the colonnade -- a long lens compresses them into a strong background.",
         "It is a working hospitality precinct; shoot around tables rather than through them.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/b/b9/LK-Colombo-altes-parlament.jpg",
      category: SpaceCategory.TEMPLE_LANDMARK,
      entryFee: "Free to walk the courtyard and arcades.",
      openingHours: "Courtyard open daily; individual tenants keep their own hours, generally 10:00-23:00.",
      permitRequired: false,
      permitNotes: "Casual photography is fine. Commercial shoots need permission from precinct management, and individual venues may ask you to stop inside their footprint.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: "Colombo Fort, close to the harbour and government buildings." + " " + CAASL,
      tripodAllowed: true,
   },
   {
      slug: "galle-lighthouse",
      name: "Galle Lighthouse",
      type: "Historic Lighthouse",
      locationLabel: "Southern Province, Galle",
      latlng: [6.0258, 80.2167],
      description: "A 26 m white tower standing on the ramparts at the south-eastern corner of Galle Fort, built in 1939 to replace an earlier light. Palms, coral wall and open ocean sit behind it, and the surrounding bastion is the most worked corner of the fort.",
      directions: "At the end of Hospital Street inside Galle Fort, on the Point Utrecht bastion. Walk the ramparts clockwise from the main gate, roughly 15 minutes.",
      tips: [
         "The tower faces east, so it lights cleanly at sunrise and falls into silhouette at sunset.",
         "The small beach below the bastion gives a low angle with the tower above the wall.",
         "The lighthouse itself is not open to the public -- everything is shot from the ramparts.",
         "Sunset draws crowds onto this exact corner; sunrise is effectively private.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/5/54/SL_Galle_Fort_asv2020-01_img24.jpg",
      category: SpaceCategory.TEMPLE_LANDMARK,
      entryFee: "Free.",
      permitRequired: true,
      permitAuthority: "Galle Heritage Foundation",
      permitNotes: "Inside the World Heritage fort, where the Foundation administers filming and photography. Handheld personal work is fine; commercial shoots and crews need written approval in advance.",
      droneRule: DroneRule.PERMIT_REQUIRED,
      droneNotes: "Foundation approval is needed on top of national clearance." + " " + CAASL,
      tripodAllowed: true,
   },
   {
      slug: "coconut-tree-hill",
      name: "Coconut Tree Hill",
      type: "Coastal Viewpoint",
      locationLabel: "Southern Province, Mirissa",
      latlng: [5.9436, 80.4506],
      description: "A headland above Mirissa planted with coconut palms on a grass slope that drops straight to the sea on three sides. Leaning trunks, grass and open water make it one of the most recognisable frames on the south coast.",
      directions: "North-east end of Mirissa Beach. Follow the lane past Mirissa Beach Road, then a short walk up the headland path.",
      tips: [
         "Sunrise is the only quiet window -- it is busy from mid-morning until dusk.",
         "Shoot east along the slope so the trunks lean into frame rather than across it.",
         "Get low: from waist height the palms separate against the sky instead of merging with the grass.",
         "The seaward edge is undercut and crumbling. Stay back from the lip.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Mirissa-Plage_%283%29.jpg",
      category: SpaceCategory.VIEWPOINT,
      entryFee: "Free, though a small informal charge is sometimes collected on the path.",
      permitRequired: false,
      droneRule: DroneRule.ALLOWED,
      droneNotes: "Open coast with no restricted airspace nearby, but registration and clearance still apply." + " " + CAASL,
      tripodAllowed: true,
      shootingNotes: "Erosion has narrowed the headland noticeably in recent years; some older compositions are no longer safely reachable.",
   },
   {
      slug: "temple-of-the-tooth",
      name: "Temple of the Tooth",
      type: "Sacred Temple",
      locationLabel: "Central Province, Kandy",
      latlng: [7.2936, 80.6413],
      description: "Sri Dalada Maligawa, the temple housing the relic of the tooth of the Buddha and the most venerated Buddhist site in the country. A moat, octagonal library tower and painted wooden interiors sit beside Kandy Lake.",
      directions: "Sri Dalada Veediya on the north shore of Kandy Lake, walkable from anywhere in central Kandy. Security screening at the entrance.",
      tips: [
         "Puja ceremonies run early morning, midday and evening -- the evening drumming is the strongest sequence.",
         "The octagon photographs best from across the moat at the north-west corner.",
         "White clothing is expected, and shoulders and knees must be covered. Shoes come off at the entrance.",
         "Interior light is low and warm; flash is inappropriate rather than merely discouraged.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/e/eb/SL_Kandy_asv2020-01_img33_Sacred_Tooth_Temple.jpg",
      category: SpaceCategory.TEMPLE_LANDMARK,
      entryFee: "Approx. LKR 2,000 for foreign visitors; free for Sri Lankans.",
      openingHours: "05:30-20:00, with puja at roughly 05:30, 09:30 and 18:30.",
      permitRequired: true,
      permitAuthority: "Temple administration / Department of Archaeology",
      permitNotes: "Personal photography is allowed in most of the precinct but not of the relic chamber itself. Commercial work needs written permission from the temple administration, and tripods are generally refused inside.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: "A site of the highest religious significance with a standing no-fly expectation." + " " + CAASL,
      tripodAllowed: false,
   },
   {
      slug: "gal-vihara-polonnaruwa",
      name: "Gal Vihara",
      type: "Rock-Cut Buddha Statues",
      locationLabel: "North Central Province, Polonnaruwa",
      latlng: [7.9594, 81.0003],
      description: "Four colossal Buddha figures carved from a single granite face in the 12th century -- seated, two standing and a 14 m reclining figure. The stone still shows its original banding, and the carving is the high point of Sri Lankan sculpture.",
      directions: "At the northern end of the Polonnaruwa ancient city circuit, about 4 km from the museum. Covered by the site ticket; most visitors cycle or drive the loop.",
      tips: [
         "A canopy shelters the figures, so the light is soft and even all day -- a rare midday-proof subject.",
         "A long lens isolates the reclining figure face and foot carving far better than a wide frame.",
         "Shoes off and hats off within the enclosure, and never photograph with your back to the statues.",
         "Arrive before 09:00 to shoot the full row without visitors in frame.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/9/92/%E0%B6%8B%E0%B6%AD%E0%B7%8A%E0%B6%AD%E0%B6%BB%E0%B7%8F%E0%B6%BB%E0%B7%8F%E0%B6%B8%E0%B6%BA_%E0%B6%9A%E0%B7%85%E0%B7%94_%E0%B6%9C%E0%B6%BD_%E0%B6%B1%E0%B7%99%E0%B6%BD%E0%B7%8F.jpg",
      category: SpaceCategory.TEMPLE_LANDMARK,
      entryFee: "Covered by the Polonnaruwa site ticket, approx. USD 25-30 for foreign visitors.",
      openingHours: "07:00-18:00.",
      permitRequired: true,
      permitAuthority: "Central Cultural Fund",
      permitNotes: "Commercial photography or video requires written permission applied for per Cultural Triangle location, each with its own fee. A departmental representative may be required on site.",
      droneRule: DroneRule.PROHIBITED,
      droneNotes: "World Heritage site under Department of Archaeology control." + " " + CAASL,
      tripodAllowed: false,
   },
   {
      slug: "koggala-stilt-fishermen",
      name: "Koggala Stilt Fishermen",
      type: "Coastal Tradition",
      locationLabel: "Southern Province, Koggala",
      latlng: [5.9931, 80.3297],
      description: "The stretch of coast between Koggala and Weligama where fishermen perch on single poles driven into the reef. The practice is now largely performed for visitors rather than for fish, but the silhouettes against a low sun remain the defining image of the south coast.",
      directions: "Along the Galle-Matara road between Koggala and Ahangama. The poles are visible from the roadside; pull-ins sit directly opposite the main clusters.",
      tips: [
         "Expect to negotiate a fee before photographing -- agree the number before you start shooting, not after.",
         "Sunrise puts the sun behind the poles for clean silhouettes; sunset backlights from the opposite side.",
         "A 70-200 equivalent from the beach compresses the line of poles without wading in.",
         "Shoot at low tide, when the reef is exposed and the poles stand clear of the water.",
      ],
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Fishermen_practicing_traditional_stilt_fishing_near_Galle%2C_southern_Sri_Lanka%2C_20260207_1419_9452.jpg/1280px-Fishermen_practicing_traditional_stilt_fishing_near_Galle%2C_southern_Sri_Lanka%2C_20260207_1419_9452.jpg",
      category: SpaceCategory.BEACH,
      entryFee: "The beach is free, but the fishermen charge for photographs -- commonly LKR 500-2,000 per person.",
      permitRequired: false,
      permitNotes: "No official permit. This is a paid arrangement with the fishermen directly; settle the price first to avoid a dispute afterwards.",
      droneRule: DroneRule.ALLOWED,
      droneNotes: "Open coastline, though Koggala airfield is close by -- check the airspace before launching." + " " + CAASL,
      tripodAllowed: true,
   },
];

async function main() {
   console.log(`Seeding ${LANDMARKS.length} landmarks. dry=${dryRun}\n`);
   let created = 0;
   let existing = 0;

   for (const landmark of LANDMARKS) {
      const found = await prisma.publicSpace.findUnique({ where: { slug: landmark.slug } });
      if (found) {
         console.log(`  EXISTS  ${landmark.slug}`);
         existing += 1;
         continue;
      }

      const { slug, latlng, category, ...rest } = landmark;
      const derived = deriveSpaceFields({
         locationLabel: landmark.locationLabel,
         type: landmark.type,
      });

      console.log(`  CREATE  ${slug.padEnd(26)} ${derived.district.padEnd(14)} ${category}`);

      if (!dryRun) {
         await prisma.publicSpace.create({
            data: {
               ...rest,
               slug,
               latlng: [latlng[0], latlng[1]],
               ...derived,
               // Explicit category overrides the type-based guess.
               category,
               sourceAttribution: "Lead image from Wikimedia Commons.",
            },
         });
      }
      created += 1;
   }

   console.log(`\n${dryRun ? "Would create" : "Created"} ${created}, already present ${existing}.`);
}

main()
   .catch((error) => {
      console.error(error);
      process.exitCode = 1;
   })
   .finally(() => prisma.$disconnect());
