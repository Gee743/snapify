export type PublicSpace = {
   id: string;
   name: string;
   type: string;
   locationLabel: string;
   latlng: number[];
   description: string;
   directions: string;
   tips: string[];
   imageSrc: string;
   // Structured + access fields (Plan 3.1). Optional so the built-in seed array
   // and any not-yet-backfilled rows still satisfy the type.
   city?: string | null;
   citySlug?: string | null;
   district?: string | null;
   districtSlug?: string | null;
   province?: string | null;
   provinceSlug?: string | null;
   category?: string | null;
   images?: string[];
   bestTimeOfDay?: string[];
   bestMonths?: number[];
   shootingNotes?: string | null;
   entryFee?: string | null;
   isFree?: boolean;
   permitRequired?: boolean;
   permitAuthority?: string | null;
   permitNotes?: string | null;
   droneRule?: string | null;
   droneNotes?: string | null;
   openingHours?: string | null;
   tripodAllowed?: boolean | null;
};

const publicSpaces: PublicSpace[] = [
   {
      id: "galle-face-green",
      name: "Galle Face Green",
      type: "Coastal Promenade",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9271, 79.8442],
      description:
         "A 500-metre oceanfront lawn laid out in 1859, now Colombo’s default sunset gathering place. Kite sellers, street food carts, and an uninterrupted western horizon. Free and open at all hours.",
      directions:
         "Runs along Galle Road between Fort and Kollupitiya. The Galle Face Hotel anchors the southern end; street parking lines the promenade and Fort station is a 15-minute walk north.",
      tips: [
         "Arrive 45 minutes before sunset for colour in the sky without the peak crowd.",
         "Onshore wind is constant — weight down light stands and plan for moving hair.",
         "The food stalls along the seawall make easy lifestyle B-roll after golden hour.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Galle_Face_Green_-_sunset.jpg/1280px-Galle_Face_Green_-_sunset.jpg",
   },
   {
      id: "independence-square",
      name: "Independence Square",
      type: "Public Landmark",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9036, 79.8672],
      description:
         "The national memorial hall commemorating independence in 1948, ringed by carved stone lions and an open colonnade. The grounds are public and popular with early-morning walkers.",
      directions:
         "Independence Avenue, Cinnamon Gardens (Colombo 07). Arcade Independence Square next door has shade, cafés, and parking between setups.",
      tips: [
         "Open roughly 09:00–23:00; the colonnade lights up after dark.",
         "Repeating columns make a strong background for walking and motion shots.",
         "Ceremonial days can close sections at short notice — have a backup frame.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colombo-independence_memory_hall1.jpg/1280px-Colombo-independence_memory_hall1.jpg",
   },
   {
      id: "beira-lake",
      name: "Beira Lake",
      type: "Urban Lake",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9269, 79.8505],
      description:
         "A lake in the middle of the city with walkable edges, the Seema Malaka temple pavilions on the water, and high-rise reflections at dusk. No fee to walk the shoreline.",
      directions:
         "Central Colombo, bordered by Sir James Peiris Mawatha and Navam Mawatha. The south-west bank near Gangaramaya has the most open water views.",
      tips: [
         "Still mornings give the cleanest reflections of the skyline.",
         "The temple pavilions are an active place of worship — dress modestly nearby.",
         "Midday light is harsh and flat here; early or late is noticeably better.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/SL_Colombo_asv2020-01_img16_Southwest_Beira_Lake.jpg/1280px-SL_Colombo_asv2020-01_img16_Southwest_Beira_Lake.jpg",
   },
   {
      id: "mount-lavinia-beach",
      name: "Mount Lavinia Beach",
      type: "Public Beach",
      locationLabel: "Western Province, Colombo",
      latlng: [6.8389, 79.8653],
      description:
         "The closest proper beach to central Colombo — a wide stretch of sand with a headland at the north end and a line of casual seafood places behind it.",
      directions:
         "Steps beside Mount Lavinia Hotel lead down to the sand. Mount Lavinia railway station is a short walk inland if you are travelling light.",
      tips: [
         "Late afternoon is warmer in tone and far less crowded than weekend middays.",
         "Watch the tide line before placing stands or a reflector on the sand.",
         "The sand is fully public — you do not need to be a hotel guest to shoot here.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Mount_Lavinia_Beach.jpg/1280px-Mount_Lavinia_Beach.jpg",
   },
   {
      id: "negombo-beach",
      name: "Negombo Beach",
      type: "Public Beach",
      locationLabel: "Western Province, Negombo",
      latlng: [7.2083, 79.8358],
      description:
         "A long, flat golden beach close to the airport, with outrigger fishing boats pulled up on the sand most mornings and a working fish market at the lagoon end.",
      directions:
         "Along Lewis Place and Porutota Road north of Negombo town. Roughly 20 minutes from Bandaranaike International Airport, which makes it a practical first or last stop.",
      tips: [
         "The fishing fleet returns early — before 07:00 is best for boats and activity.",
         "Wide open sand means very little natural shade; bring a diffuser for midday.",
         "Ask before photographing fishermen at work up close.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Negombo_Beach%2C_Sri_Lanka.jpg/1280px-Negombo_Beach%2C_Sri_Lanka.jpg",
   },
   {
      id: "galle-fort-ramparts",
      name: "Galle Fort Ramparts",
      type: "Historic Walls",
      locationLabel: "Southern Province, Galle",
      latlng: [6.0258, 80.2175],
      description:
         "Roughly three kilometres of Dutch-built rampart wall around a UNESCO World Heritage old town, with the lighthouse, Flag Rock, and ocean on three sides. Walking the walls is free.",
      directions:
         "Enter through the Main Gate off Church Street. The circuit from the lighthouse around to Flag Rock covers the best-known viewpoints and takes about an hour at an easy pace.",
      tips: [
         "The lighthouse at blue hour is the signature frame — expect company.",
         "Stone radiates heat into the evening; proper footwear over prop shoes.",
         "The wall narrows in places, so keep kit compact and let walkers pass.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Galle_Fort_wall_and_lighthouse.jpg/1280px-Galle_Fort_wall_and_lighthouse.jpg",
   },
   {
      id: "unawatuna-beach",
      name: "Unawatuna Beach",
      type: "Public Beach",
      locationLabel: "Southern Province, Unawatuna",
      latlng: [6.0097, 80.2474],
      description:
         "A curved bay sheltered by an offshore reef, which keeps the water unusually calm. Palms come right down to the sand and a small temple sits on the headland above.",
      directions:
         "About 15 minutes south-east of Galle on the Matara road. Lanes off the main road lead down to the sand; the western end near the pagoda is quietest.",
      tips: [
         "The bay faces roughly south-west, so sunset works from the sand itself.",
         "Calm water makes this one of the better spots for in-water shots.",
         "The central stretch fills up fast after 10:00 — start at the headland end.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Unawatuna_beach_sri_lanka.jpg/1280px-Unawatuna_beach_sri_lanka.jpg",
   },
   {
      id: "mirissa-beach",
      name: "Mirissa Beach",
      type: "Public Beach",
      locationLabel: "Southern Province, Mirissa",
      latlng: [5.9449, 80.4594],
      description:
         "A broad south-coast bay backed by palms, with Parrot Rock at the eastern end and a working fishing harbour just around the headland.",
      directions:
         "On the coast road about 4 km south-east of Weligama. Access paths run between the beachfront restaurants off the main road.",
      tips: [
         "Climb Parrot Rock at low tide for an elevated view back along the bay.",
         "Surf can be strong outside the sheltered corner — check before water shots.",
         "Sunrise over the eastern headland is quieter than the busy sunset stretch.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Mirissa-Plage_%283%29.jpg/1280px-Mirissa-Plage_%283%29.jpg",
   },
   {
      id: "hikkaduwa-beach",
      name: "Hikkaduwa Beach",
      type: "Public Beach",
      locationLabel: "Southern Province, Hikkaduwa",
      latlng: [6.1395, 80.1006],
      description:
         "Sri Lanka’s longest-established beach town, known for surf breaks and a shallow coral sanctuary where turtles come close to shore.",
      directions:
         "About 20 minutes north-west of Galle along the coast road. Hikkaduwa railway station sits just behind the main beach strip.",
      tips: [
         "The reef section at the north end is calmest for water-level work.",
         "Surf is biggest November to April — good for action, awkward for portraits.",
         "Turtles are wild animals; keep distance and never use flash near them.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Hikkaduwa_beach_beauty.jpg/1280px-Hikkaduwa_beach_beauty.jpg",
   },
   {
      id: "kandy-lake",
      name: "Kandy Lake",
      type: "Lakeside Walk",
      locationLabel: "Central Province, Kandy",
      latlng: [7.2906, 80.641],
      description:
         "An artificial lake built in 1807 at the centre of Kandy, with a continuous walking path, the Temple of the Tooth on its northern shore, and wooded hills behind.",
      directions:
         "Start on Dalada Veediya beside the Temple of the Tooth. The full loop is a little over three kilometres and is flat the whole way.",
      tips: [
         "Still mornings give mirror reflections of the hills and temple.",
         "Drumming from the temple at dawn and dusk adds atmosphere to video.",
         "Hill weather turns quickly — pack a rain cover even on clear mornings.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/The_Kandy_Lake_at_dawn.jpg/1280px-The_Kandy_Lake_at_dawn.jpg",
   },
   {
      id: "hanthana-mountain-range",
      name: "Hanthana Mountain Range",
      type: "Hill Trail",
      locationLabel: "Central Province, Kandy",
      latlng: [7.2561, 80.6103],
      description:
         "A protected range of grassy ridges just south of Kandy, with open trails, tea slopes, and wide views back over the city. Free to walk.",
      directions:
         "Trailheads sit off Hanthana Road, roughly 15 minutes by road from Kandy town, near the University of Peradeniya side.",
      tips: [
         "Morning mist on the ridges clears by mid-morning — start early for it.",
         "Open grassland means no shade and full sun once the cloud lifts.",
         "Carry water; there is nothing to buy once you are on the ridge.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Hanthana_Mountain_Range%2C_Sri_Lanka.jpg/1280px-Hanthana_Mountain_Range%2C_Sri_Lanka.jpg",
   },
   {
      id: "nine-arch-bridge",
      name: "Nine Arch Bridge",
      type: "Historic Viaduct",
      locationLabel: "Uva Province, Ella",
      latlng: [6.8767, 81.0608],
      description:
         "A nine-span stone railway viaduct built without steel during the colonial era, curving through dense jungle on the Kandy–Badulla line. No ticket, open at all hours.",
      directions:
         "About 2.5 km from Ella town. Walk the footpath from Ella railway station or take the signposted track down from the Ella–Demodara road to the viewpoints at either end.",
      tips: [
         "Check the local train timetable — a crossing transforms the shot.",
         "Daylight hours only in practice; the paths are unlit and uneven.",
         "The lower tea-field viewpoint is less crowded than the arch itself.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nine_Arches_Bridge%2C_Demodara.jpg/1280px-Nine_Arches_Bridge%2C_Demodara.jpg",
   },
   {
      id: "little-adams-peak",
      name: "Little Adam’s Peak",
      type: "Hill Viewpoint",
      locationLabel: "Uva Province, Ella",
      latlng: [6.8707, 81.0589],
      description:
         "A short, well-made hill walk from Ella with panoramic views over Ella Gap, the tea slopes, and Ella Rock opposite. Free, and reachable in about an hour from town.",
      directions:
         "Follow the Passara road out of Ella, then the signposted track past the tea factory. The final stretch is steps rather than scrambling.",
      tips: [
         "Sunrise from the summit is the payoff — head up in the dark with a torch.",
         "The ridge continues past the first summit and is much quieter.",
         "Steps get slippery after rain; grippy footwear matters more than it looks.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Little_Adam%27s_Peak%2C_Ella%2C_Sri_Lanka.jpg/1280px-Little_Adam%27s_Peak%2C_Ella%2C_Sri_Lanka.jpg",
   },
   {
      id: "ravana-falls",
      name: "Ravana Falls",
      type: "Waterfall",
      locationLabel: "Uva Province, Ella",
      latlng: [6.8419, 81.0458],
      description:
         "A wide cascade dropping beside the main road below Ella, named for the Ramayana legend. The roadside viewing area is free and needs no walking.",
      directions:
         "On the Ella–Wellawaya road, about 6 km south of Ella. There is a pull-in area directly opposite the falls.",
      tips: [
         "Flow is strongest during and just after the monsoon; it thins in dry months.",
         "Spray carries further than expected — keep a cloth for the front element.",
         "It is a live roadside with buses; mind traffic when setting up.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ravana_Falls_Ella.jpg/1280px-Ravana_Falls_Ella.jpg",
   },
   {
      id: "liptons-seat",
      name: "Lipton’s Seat",
      type: "Hill Viewpoint",
      locationLabel: "Uva Province, Haputale",
      latlng: [6.7809, 81.0158],
      description:
         "The viewpoint at around 1,970 m where Thomas Lipton looked out over his tea estates. On a clear morning the view runs across several provinces.",
      directions:
         "Above Dambatenne Tea Factory, roughly 13 km from Haputale. You can walk up through the tea fields or drive most of the way.",
      tips: [
         "Go at sunrise — cloud usually closes the view in by mid-morning.",
         "It is cold and windy at the top before dawn; bring a layer.",
         "The walk up through the tea rows is the better photography, not the summit.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Lipton%27s_seat.jpg/1280px-Lipton%27s_seat.jpg",
   },
   {
      id: "jaffna-public-library",
      name: "Jaffna Public Library",
      type: "Public Landmark",
      locationLabel: "Northern Province, Jaffna",
      latlng: [9.6625, 80.0111],
      description:
         "A white Indo-Saracenic landmark and one of the most significant buildings in the north — burned in 1981 and since rebuilt, now a symbol of cultural resilience. Entry is free.",
      directions:
         "On Esplanade Road beside Jaffna Fort, in the centre of town. The Tiruvalluvar statue stands in the forecourt.",
      tips: [
         "Interior access is limited to afternoons, roughly 16:00–18:00.",
         "Photography is restricted inside — plan on exterior frames.",
         "The white façade blows out in midday sun; late light is far kinder.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Jaffna_Public_Library.jpg/1280px-Jaffna_Public_Library.jpg",
   },
   {
      id: "casuarina-beach",
      name: "Casuarina Beach",
      type: "Public Beach",
      locationLabel: "Northern Province, Jaffna",
      latlng: [9.8017, 79.9078],
      description:
         "The best-known beach of the Jaffna peninsula, on Karainagar island — shallow, calm, and lined with the casuarina trees it is named after.",
      directions:
         "On Karainagar, about 20 km north-west of Jaffna town via the causeway. The road runs almost to the sand.",
      tips: [
         "The water stays shallow a long way out, which suits wide reflective shots.",
         "Sparse tree cover and strong northern sun — shoot early or late.",
         "Few facilities nearby, so bring water and anything you need with you.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Casuarina_beach_Sri_Lanka.jpg/1280px-Casuarina_beach_Sri_Lanka.jpg",
   },
   {
      id: "koneswaram-temple",
      name: "Koneswaram Temple",
      type: "Clifftop Temple",
      locationLabel: "Eastern Province, Trincomalee",
      latlng: [8.5819, 81.2461],
      description:
         "A brightly painted Hindu temple on Swami Rock, a cliff dropping straight into the Indian Ocean. Entry is free, with donations optional.",
      directions:
         "At the end of Konesar Road on Swami Rock, inside Fort Frederick. The fort gate has a checkpoint — carry ID.",
      tips: [
         "Remove shoes and dress modestly; this is an active place of worship.",
         "Morning light hits the painted gopuram best and avoids the harshest glare.",
         "Ask before photographing worshippers or inside shrine areas.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Koneswaram_temple_of_Trincomalee_01.jpg/1280px-Koneswaram_temple_of_Trincomalee_01.jpg",
   },
   {
      id: "nilaveli-beach",
      name: "Nilaveli Beach",
      type: "Public Beach",
      locationLabel: "Eastern Province, Trincomalee",
      latlng: [8.6833, 81.2],
      description:
         "A four-kilometre run of pale sand on the north-east coast, backed by palms and facing Pigeon Island offshore. Wide, quiet, and completely free to access.",
      directions:
         "About 16 km north of Trincomalee town along the coast road. Several public access lanes run down to the sand between the hotels.",
      tips: [
         "East-facing, so this is a sunrise beach rather than a sunset one.",
         "Calmest seas are May to September, opposite the south-coast season.",
         "Long empty stretches make it easy to get clean frames without people.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Nillaveli_Beach.JPG/1280px-Nillaveli_Beach.JPG",
   },
   {
      id: "arugam-bay",
      name: "Arugam Bay",
      type: "Surf Beach",
      locationLabel: "Eastern Province, Arugam Bay",
      latlng: [6.8404, 81.8339],
      description:
         "A crescent bay on the south-east coast rated among the best surf points in Asia, with a relaxed single-street town behind the sand.",
      directions:
         "Roughly 320 km from Colombo via Monaragala. The main point break sits at the southern end of the bay, near the fishing boats.",
      tips: [
         "Surf season runs about May to September; off-season the bay goes flat and glassy.",
         "The point break is the spot for action shots — a long lens helps.",
         "Lagoons just inland are good for wildlife B-roll at dawn.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Beach_of_Arugam_Bay.jpg/1280px-Beach_of_Arugam_Bay.jpg",
   },
   {
      id: "ruwanwelisaya",
      name: "Ruwanwelisaya Stupa",
      type: "Ancient Stupa",
      locationLabel: "North Central Province, Anuradhapura",
      latlng: [8.3497, 80.3964],
      description:
         "A vast white stupa from the 2nd century BC, ringed by a wall of stone elephants. One of the free-to-enter parts of the sacred city, outside the ticketed archaeological zone.",
      directions:
         "In the sacred city north of Anuradhapura town. Approach from Sangamiththa Mawatha; shoes come off at the outer platform.",
      tips: [
         "White dome against blue sky blows out easily — expose for the highlights.",
         "Dress covers shoulders and knees, and footwear is removed on the platform.",
         "Full moon (poya) days bring crowds of white-clad pilgrims.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Ruwanwelisaya_Stupa_Anuradhapura.jpg/1280px-Ruwanwelisaya_Stupa_Anuradhapura.jpg",
   },
   {
      id: "kalpitiya-peninsula",
      name: "Kalpitiya Peninsula",
      type: "Coastal Lagoon",
      locationLabel: "North Western Province, Kalpitiya",
      latlng: [8.2333, 79.7667],
      description:
         "A long sandy peninsula between lagoon and open sea, known for kitesurfing, dolphin pods offshore, and wide uninterrupted horizons in both directions.",
      directions:
         "About 165 km north of Colombo via Puttalam. The road runs the length of the peninsula with access points to both the lagoon and ocean sides.",
      tips: [
         "The lagoon side is flat and sheltered; the ocean side gets the wind and surf.",
         "Consistent wind from May to October — great for kites, hard on light stands.",
         "Very little shade or shelter along the peninsula; plan around midday.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/SL_Kalpitiya_asv2020-01_img5_Fishery_harbour.jpg/1280px-SL_Kalpitiya_asv2020-01_img5_Fishery_harbour.jpg",
   },
   {
      id: "bopath-ella-falls",
      name: "Bopath Ella Falls",
      type: "Waterfall",
      locationLabel: "Sabaragamuwa Province, Ratnapura",
      latlng: [6.7667, 80.2667],
      description:
         "A waterfall shaped like a bo leaf, dropping about 30 m into a pool in the hills near Ratnapura. The public viewing area is free to reach.",
      directions:
         "Near Kuruwita, roughly 10 km from Ratnapura off the Colombo–Ratnapura road. A short path leads from the parking area to the falls.",
      tips: [
         "Strongest flow follows the rains; expect spray on the approach path.",
         "Rocks around the pool stay slick year-round — move carefully with gear.",
         "Currents here are deceptively strong; frame from the bank rather than wading.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Bopath_Ella_Falls.jpg/1280px-Bopath_Ella_Falls.jpg",
   },
];

// locationLabel is stored as "Province, City" (e.g. "Western Province, Colombo"),
// so the last comma-separated part is the CITY and the first is the PROVINCE.
// The old getPublicSpaceArea() returned the city while being named/labelled
// "area" and "Province" in the UI, which made the two impossible to tell apart.
// Every pSEO URL, JSON-LD address and breadcrumb depends on the distinction.
export const getPublicSpaceCity = (space: PublicSpace) =>
   space.city?.trim() || space.locationLabel.split(",").at(-1)?.trim() || space.locationLabel;

export const getPublicSpaceProvince = (space: PublicSpace) =>
   space.province?.trim() || space.locationLabel.split(",")[0]?.trim() || space.locationLabel;

export const getPublicSpaceDistrict = (space: PublicSpace) =>
   space.district?.trim() || getPublicSpaceCity(space);

/** @deprecated Ambiguous name - returns the city. Use getPublicSpaceCity. */
export const getPublicSpaceArea = getPublicSpaceCity;

/** URL-safe slug: "Arugam Bay" -> "arugam-bay", "Uva Province" -> "uva-province". */
export const slugifyPlace = (value: string) =>
   value
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

export default publicSpaces;
