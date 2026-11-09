/**
 * Cornerstone guides.
 *
 * Three deliberately, not ten: these are the backlink targets and the
 * informational head terms the hub pages cannot rank for, and three good pieces
 * beat ten thin ones on a new domain.
 *
 * This is quasi-YMYL regulatory content. Every figure is sourced, each guide
 * carries a visible review date, and anything unconfirmed is described as
 * unconfirmed rather than guessed. `reviewedOn` must be bumped whenever the
 * underlying rules are re-checked.
 */

export interface GuideSection {
   heading: string;
   /** Paragraphs and lists, rendered in order. */
   body: (string | { list: string[] })[];
}

export interface Guide {
   slug: string;
   title: string;
   metaTitle: string;
   description: string;
   /** Shown under the H1. */
   summary: string;
   reviewedOn: string;
   sections: GuideSection[];
   sources: { label: string; url: string }[];
   /** Place slugs this guide should link to. */
   relatedPlaces: string[];
}

const guides: Guide[] = [
   {
      slug: "drone-laws-sri-lanka",
      title: "Drone Laws in Sri Lanka for Photographers",
      metaTitle: "Drone Laws in Sri Lanka for Photographers (2026 Guide)",
      description:
         "What Sri Lanka actually requires to fly a camera drone: CAASL registration, TRCSL clearance, the CAA/AS/019 form, fees, lead times and the places where drones are simply banned.",
      summary:
         "If your drone has a camera, Sri Lanka treats it as regulated equipment regardless of how much it weighs. Here is the process, the paperwork and the locations where no permit will help you.",
      reviewedOn: "2026-11-09",
      sections: [
         {
            heading: "The short version",
            body: [
               "Any drone carrying a camera must be registered with the Civil Aviation Authority of Sri Lanka (CAASL) before it flies, whatever its weight. There is no hobbyist exemption once a camera is attached. Very small drones of around 200 g or less with no camera fall outside the registration requirement, but the operational rules and location restrictions still apply to them.",
               "Registration is separate from permission to fly a particular place, and separate again from the clearance the telecoms regulator issues for the radio equipment. Expect three pieces of paper, not one.",
               { list: [
                  "CAASL registration and operating approval for the aircraft and the operator.",
                  "Telecommunications Regulatory Commission (TRCSL) clearance for the radio transmitter.",
                  "Site-level permission from whoever controls the location, which for heritage sites is a separate authority again.",
               ] },
            ],
         },
         {
            heading: "How registration works",
            body: [
               "Applications go to CAASL on form CAA/AS/019, submitted by email, or through the CAASL drone operations portal. You will be asked for a copy of your passport or national ID, the purchase invoice for the aircraft, photographs of the drone and its controller, and any manufacturer certificate you hold.",
               "The application asks you to name every location you intend to fly and the times you intend to fly there. This matters more than it looks: approval is tied to the locations you listed, so a vague application produces a narrow approval. List everything you might realistically want, including fallbacks.",
               "Reported fees sit around USD 55, and appear to scale with the number of locations requested. Applicants are typically sent a payment link within about ten working days of submitting.",
               "Allow three to four weeks. Carry the certificate, the approval and the proof of payment with you in both printed and digital form -- they get asked for at the site, not at the airport.",
            ],
         },
         {
            heading: "Where drones are banned outright",
            body: [
               "Registration does not buy access. Several categories of location will refuse a drone no matter what paperwork you hold:",
               { list: [
                  "UNESCO World Heritage sites and the Cultural Triangle, including Sigiriya, Polonnaruwa and the Anuradhapura sacred city. Enforcement at Sigiriya in particular is strict.",
                  "Central Colombo, which sits inside controlled airspace. This covers Galle Face Green, Beira Lake, Independence Square, Pettah and Fort.",
                  "Active places of worship, including the Temple of the Tooth in Kandy.",
                  "Anywhere near an airport, military installation or naval facility. Trincomalee and the Koneswaram headland sit beside a naval base.",
               ] },
               "Open coastline away from airfields and heritage sites is the realistic answer for aerial work -- places like Coconut Tree Hill in Mirissa, or the southern beaches. Even there, registration and clearance still apply.",
            ],
         },
         {
            heading: "Operating rules once you are approved",
            body: [
               "Flights must stay within visual line of sight. Night flying needs separate permission. Do not fly over crowds, and do not assume a quiet beach at sunrise stays quiet -- the rule is about people being below the aircraft, not about how it felt when you launched.",
               "CAASL has signalled active enforcement of the existing rules from 2026 onward, alongside the introduction of a pilot licensing scheme, in line with the ICAO timeline for integrating unmanned aircraft into national frameworks. Flying unregistered has moved from a grey area to a straightforward offence.",
            ],
         },
         {
            heading: "If you are shooting commercially",
            body: [
               "A commercial production adds the National Film Corporation to the list. Drone work inside a commercial shoot is approved as part of the production rather than as a standalone flight, and heritage locations will want the Department of Archaeology or Central Cultural Fund named in the application too. Build the permissions into the schedule rather than treating them as a formality to clear the week before.",
            ],
         },
      ],
      sources: [
         { label: "Civil Aviation Authority of Sri Lanka", url: "https://www.caa.lk" },
         { label: "CAASL manual drone applications", url: "https://www.caa.lk/en/2-uncategorised/438-manual-drone-applications" },
         { label: "Drone Laws: Sri Lanka", url: "https://drone-laws.com/drone-laws-in-sri-lanka/" },
      ],
      relatedPlaces: ["sigiriya-rock-fortress", "coconut-tree-hill", "galle-face-green", "koneswaram-temple"],
   },
   {
      slug: "photography-permits-sri-lanka",
      title: "Do You Need a Permit to Shoot in Sri Lanka?",
      metaTitle: "Do You Need a Photography Permit in Sri Lanka? (2026)",
      description:
         "Sri Lanka splits shoot permissions across six different authorities. This explains which one applies to your location, what it costs, and when a standard entry ticket is already enough.",
      summary:
         "There is no single photography permit in Sri Lanka. Which authority you deal with depends on where you are standing, and the honest answer for most personal work is that you need nothing at all.",
      reviewedOn: "2026-11-09",
      sections: [
         {
            heading: "Start here: personal or commercial?",
            body: [
               "For personal photography at a public place -- a beach, a promenade, a viewpoint, a street -- you need no permit in Sri Lanka. Turn up and shoot. Almost everything on Snapify falls into this category, which is why the site exists.",
               "Permissions start to matter when one of three things is true: the location is a protected heritage site, you are shooting for commercial use, or you are bringing equipment that marks you out as a production -- a tripod, lighting, a crew, or a drone.",
            ],
         },
         {
            heading: "The six authorities, and when each applies",
            body: [
               { list: [
                  "National Film Corporation (NFC) -- commercial film and video production. Permits reportedly run around LKR 100,000 for a feature, LKR 75,000 for a TVC and LKR 50,000 for a documentary, and take roughly three days to process.",
                  "Department of Archaeology -- anything at an archaeological site. A departmental representative may be required on site during the shoot.",
                  "Central Cultural Fund (CCF) -- the Cultural Triangle sites: Sigiriya, Polonnaruwa, Anuradhapura, Kandy. Each location needs its own application and its own fee.",
                  "Galle Heritage Foundation -- filming and photography inside Galle Fort, which it administers separately from national rules.",
                  "CAASL and TRCSL -- drones, covered in the drone guide.",
                  "The site or temple administration itself -- many individual temples set their own rules about interiors, relic chambers and tripods, independent of any national body.",
               ] },
            ],
         },
         {
            heading: "What the entry ticket already covers",
            body: [
               "At Central Cultural Fund sites, still photography with a handheld camera is included in the standard entry ticket. You do not need to apply for anything to photograph Sigiriya or Gal Vihara as a visitor.",
               "What is not included: tripod-mounted photography, professional video, and drones. Those require a separate permit through the CCF or the Department of Archaeology head office in Battaramulla, typically applied for at least two weeks ahead, with fees set per application that can run to hundreds of dollars a day.",
               "This is the distinction most people miss. The tripod is the trigger, not the camera.",
            ],
         },
         {
            heading: "What a CCF application needs",
            body: [
               "Applications are expected to include a full production brief, the specific locations and monuments involved, the purpose of the shoot, the distribution markets intended, and a list of the equipment being brought on site. Vague applications get refused or delayed.",
               "The Central Cultural Fund head office is at 212/1 Bauddhaloka Mawatha, Colombo 07, with site offices at Anuradhapura, Polonnaruwa, Sigiriya and Kandy. Applying through the site office closest to your location is usually faster than going through Colombo.",
            ],
         },
         {
            heading: "Places where photography is simply not allowed",
            body: [
               { list: [
                  "The fresco gallery at Sigiriya. The ban is absolute and actively enforced.",
                  "The relic chamber at the Temple of the Tooth in Kandy, although the rest of the precinct is fine.",
                  "Inner shrines at many working temples, including Koneswaram.",
                  "Military and naval installations, and anything that looks like one.",
               ] },
               "Beyond the formal rules, photographing people at worship needs asking first. It costs nothing and the pictures are better for it.",
            ],
         },
         {
            heading: "Rules change, so confirm before you commit",
            body: [
               "Fees, processing times and site-level restrictions in Sri Lanka move more than published sources suggest, and enforcement varies between sites and between seasons. Treat everything here as the starting point for a phone call, not a substitute for one -- particularly if you are booking a crew or flying a client in.",
            ],
         },
      ],
      sources: [
         { label: "NFC foreign filming guidelines (PDF)", url: "https://www.mfa.gov.lk/public/sites/default/files/2026-01/general-guidelines-foreign-shooting-2019-dec-nfc.pdf" },
         { label: "Central Cultural Fund", url: "https://ccf.gov.lk" },
         { label: "Galle Heritage Foundation", url: "https://galleheritage.gov.lk/filming-and-photography-within-galle-fort/" },
      ],
      relatedPlaces: ["sigiriya-rock-fortress", "gal-vihara-polonnaruwa", "galle-fort-ramparts", "temple-of-the-tooth", "ruwanwelisaya"],
   },
   {
      slug: "best-time-to-shoot-sri-lanka",
      title: "Best Time of Year to Shoot in Sri Lanka",
      metaTitle: "Best Time of Year to Shoot in Sri Lanka (Monsoon Guide)",
      description:
         "Sri Lanka has two monsoons hitting opposite coasts at opposite times, so there is no single best season — only a best season for where you are going.",
      summary:
         "The country is small enough to drive across in a day and has two separate rainy seasons running on opposite schedules. Pick the coast to match the month, not the other way round.",
      reviewedOn: "2026-11-09",
      sections: [
         {
            heading: "Two monsoons, two coasts",
            body: [
               "The southwest (Yala) monsoon runs roughly May to September and soaks the west and south coasts and the southwestern hills. The northeast (Maha) monsoon runs roughly November to February and hits the north and east.",
               "The practical consequence is that Sri Lanka has no closed season. There is always a side of the island that is shootable -- it is just rarely the side the guidebooks put on the cover.",
               { list: [
                  "December to April: west and south coasts. Colombo, Galle, Mirissa, Unawatuna, Hikkaduwa.",
                  "April to September: east and north. Trincomalee, Nilaveli, Arugam Bay, Jaffna, Kalpitiya.",
                  "January to April and July to September: central highlands. Kandy, Ella, Haputale, Nuwara Eliya.",
               ] },
            ],
         },
         {
            heading: "The highlands are their own problem",
            body: [
               "Kandy, Ella and the tea country sit between the two monsoon systems and catch rain off both, plus inter-monsoon downpours around October to December. They also make their own weather: a clear morning at Lipton's Seat routinely closes in by 10:00, and the view from Little Adam's Peak can vanish inside twenty minutes.",
               "Shoot the highlands early. Not golden-hour-early -- first-light-early, with the climb done in the dark. Mist burns off from the east, so work outward as the light arrives rather than waiting for a clear frame that may not come.",
            ],
         },
         {
            heading: "Light through the day",
            body: [
               "Sri Lanka sits between about 6 and 10 degrees north, so day length barely shifts across the year. Sunrise lands around 06:00 and sunset around 18:00 whatever the month, varying by only about half an hour either side.",
               "The flip side of being near the equator is a brutally short golden hour and a near-vertical midday sun. Plan for roughly 40 minutes of usable warm light at each end of the day, and treat 10:00 to 15:00 as a scouting window rather than a shooting one. Every Snapify listing shows the computed sunrise, sunset, golden hour and blue hour for that specific location.",
            ],
         },
         {
            heading: "Planning a route rather than a destination",
            body: [
               "Because the coasts run on opposite schedules, a two-week trip in the wrong month is better solved by changing the route than the dates. In July, start in Colombo for a day and then go east. In January, do the south coast and the hills and leave Trincomalee for another trip.",
               "If the dates are fixed and the destination is not, the browse-by-area pages list what is shootable where, and each place carries its own best-months guidance based on which monsoon system it sits under.",
            ],
         },
      ],
      sources: [
         { label: "Sri Lanka Department of Meteorology", url: "https://www.meteo.gov.lk" },
      ],
      relatedPlaces: ["liptons-seat", "little-adams-peak", "arugam-bay", "nilaveli-beach", "mirissa-beach"],
   },
];

export const getGuide = (slug: string) => guides.find((guide) => guide.slug === slug);

export default guides;
