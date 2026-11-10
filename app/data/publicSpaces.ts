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
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "BEACH",
      entryFee: "Free.",
      permitNotes:
         "Open promenade, no permit for personal work. Commercial crews should expect to be asked by the Urban Development Authority.",
      droneRule: "PROHIBITED",
      droneNotes:
         "Adjacent to government and military buildings in central Colombo. Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.",
      tripodAllowed: true,
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
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "TEMPLE_LANDMARK",
      entryFee: "Free.",
      permitNotes:
         "Personal photography is unrestricted. Commercial shoots and pre-wedding sessions with crews are routinely asked to arrange permission, and ceremonial days close sections at short notice.",
      droneRule: "PROHIBITED",
      droneNotes:
         "A national monument in central Colombo with restricted airspace nearby. Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.",
      openingHours:
         "Grounds roughly 09:00-23:00; the colonnade is lit after dark.",
      tripodAllowed: true,
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
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "URBAN",
      shootingNotes:
         "The temple pavilions are an active place of worship -- dress modestly on the boardwalk.",
      entryFee:
         "Free to walk the shoreline; Seema Malaka has a separate temple donation.",
      droneRule: "PROHIBITED",
      droneNotes:
         "Central Colombo sits inside controlled airspace. Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.",
      tripodAllowed: true,
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
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "BEACH",
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
      city: "Negombo",
      citySlug: "negombo",
      district: "Gampaha",
      districtSlug: "gampaha",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "BEACH",
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
      city: "Galle",
      citySlug: "galle",
      district: "Galle",
      districtSlug: "galle",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "TEMPLE_LANDMARK",
      shootingNotes:
         "The ramparts face west, so the lighthouse end holds light longest. The walls are narrow and busy at sunset; set up early.",
      entryFee: "Free to walk the ramparts.",
      permitRequired: true,
      permitAuthority: "Galle Heritage Foundation",
      permitNotes:
         "The Foundation administers filming and photography inside the fort. Casual handheld shooting is fine; commercial shoots, crews and staged sessions need written approval in advance.",
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "A UNESCO World Heritage site -- drone work needs Foundation approval on top of national clearance. Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.",
      tripodAllowed: true,
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
      city: "Unawatuna",
      citySlug: "unawatuna",
      district: "Galle",
      districtSlug: "galle",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "BEACH",
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
      city: "Mirissa",
      citySlug: "mirissa",
      district: "Matara",
      districtSlug: "matara",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "BEACH",
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
      city: "Hikkaduwa",
      citySlug: "hikkaduwa",
      district: "Galle",
      districtSlug: "galle",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "BEACH",
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
      city: "Kandy",
      citySlug: "kandy",
      district: "Kandy",
      districtSlug: "kandy",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "URBAN",
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
      city: "Kandy",
      citySlug: "kandy",
      district: "Kandy",
      districtSlug: "kandy",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "NATURE_TRAIL",
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
      city: "Ella",
      citySlug: "ella",
      district: "Badulla",
      districtSlug: "badulla",
      province: "Uva Province",
      provinceSlug: "uva-province",
      category: "TEMPLE_LANDMARK",
      shootingNotes:
         "Trains cross at roughly 06:48, 09:20, 13:37 and 15:48 -- times drift, so arrive 20 minutes early. The viewpoint from the Ella side is clear in the morning.",
      entryFee: "Free.",
      permitNotes:
         "No permit for personal work. The track is live railway property: stand clear well before a train and never set up on the bridge itself.",
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Heavily flown but still subject to national rules. Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.",
      tripodAllowed: true,
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
      city: "Ella",
      citySlug: "ella",
      district: "Badulla",
      districtSlug: "badulla",
      province: "Uva Province",
      provinceSlug: "uva-province",
      category: "VIEWPOINT",
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
      city: "Ella",
      citySlug: "ella",
      district: "Badulla",
      districtSlug: "badulla",
      province: "Uva Province",
      provinceSlug: "uva-province",
      category: "WATERFALL",
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
      city: "Haputale",
      citySlug: "haputale",
      district: "Badulla",
      districtSlug: "badulla",
      province: "Uva Province",
      provinceSlug: "uva-province",
      category: "VIEWPOINT",
      shootingNotes:
         "The climb from Dambatenne takes about an hour on foot. Mist burns off from the east, so shoot early and work outward.",
      entryFee:
         "Small entry charge at the viewpoint; the estate road is free.",
      droneRule: "ALLOWED",
      droneNotes:
         "Open tea country with no restricted airspace nearby, but registration still applies. Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.",
      openingHours:
         "Best before 10:00 -- cloud usually closes the view by midday.",
      tripodAllowed: true,
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
      city: "Jaffna",
      citySlug: "jaffna",
      district: "Jaffna",
      districtSlug: "jaffna",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "TEMPLE_LANDMARK",
      entryFee:
         "Free to photograph the exterior; library entry is free with registration.",
      permitNotes: "Interior photography needs the librarian's permission.",
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.",
      openingHours: "Closed Mondays and public holidays.",
      tripodAllowed: true,
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
      city: "Jaffna",
      citySlug: "jaffna",
      district: "Jaffna",
      districtSlug: "jaffna",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "BEACH",
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
      city: "Trincomalee",
      citySlug: "trincomalee",
      district: "Trincomalee",
      districtSlug: "trincomalee",
      province: "Eastern Province",
      provinceSlug: "eastern-province",
      category: "TEMPLE_LANDMARK",
      shootingNotes:
         "Remove footwear at the temple entrance and dress modestly. The cliff edge beyond the temple gives the wide coastal frame.",
      entryFee: "Free; donations accepted.",
      permitNotes:
         "No permit for personal photography, but the inner shrine is off limits to cameras. Ask before photographing worshippers or rituals.",
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "On a headland beside a naval installation -- do not fly without clearance. Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.",
      tripodAllowed: true,
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
      city: "Trincomalee",
      citySlug: "trincomalee",
      district: "Trincomalee",
      districtSlug: "trincomalee",
      province: "Eastern Province",
      provinceSlug: "eastern-province",
      category: "BEACH",
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
      city: "Arugam Bay",
      citySlug: "arugam-bay",
      district: "Ampara",
      districtSlug: "ampara",
      province: "Eastern Province",
      provinceSlug: "eastern-province",
      category: "BEACH",
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
      city: "Anuradhapura",
      citySlug: "anuradhapura",
      district: "Anuradhapura",
      districtSlug: "anuradhapura",
      province: "North Central Province",
      provinceSlug: "north-central-province",
      category: "TEMPLE_LANDMARK",
      shootingNotes:
         "An active place of worship. Remove shoes and hats in the inner terrace, cover shoulders and knees, and never pose with your back to the stupa.",
      entryFee:
         "Free for Sri Lankans; the Anuradhapura Sacred City ticket (approx. USD 25-30) applies to foreign visitors.",
      permitRequired: true,
      permitAuthority: "Department of Archaeology / Central Cultural Fund",
      permitNotes:
         "Commercial photography or video at a Cultural Triangle site needs written permission, applied for per location with its own fee. A departmental representative may be required on site.",
      droneRule: "PROHIBITED",
      droneNotes:
         "Drones are not permitted over the Sacred City without explicit Department of Archaeology clearance. Any drone with a camera must be registered with CAASL and cleared by the TRCSL, regardless of weight. Visual line of sight only; night flights need separate approval.",
      tripodAllowed: false,
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
      city: "Kalpitiya",
      citySlug: "kalpitiya",
      district: "Puttalam",
      districtSlug: "puttalam",
      province: "North Western Province",
      provinceSlug: "north-western-province",
      category: "BEACH",
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
      city: "Ratnapura",
      citySlug: "ratnapura",
      district: "Ratnapura",
      districtSlug: "ratnapura",
      province: "Sabaragamuwa Province",
      provinceSlug: "sabaragamuwa-province",
      category: "WATERFALL",
   },
   {
      id: "sigiriya-rock-fortress",
      name: "Sigiriya Rock Fortress",
      type: "Ancient Rock Fortress",
      locationLabel: "Central Province, Dambulla",
      latlng: [7.957, 80.7603],
      description:
         "A granite monolith rising 180 m from flat scrub, topped by the ruins of a 5th-century royal citadel. The western face still carries fresco panels and the mirror wall, and the summit gives an uninterrupted horizon in every direction. It is the most recognisable silhouette in the country.",
      directions:
         "Signposted from the Dambulla-Habarane road, about 15 km north-east of Dambulla. The ticket office opens at 07:00 and the climb is roughly 1,200 steps through the water gardens and lion staircase.",
      tips: [
         "Climbing Sigiriya does not photograph Sigiriya. For the rock itself, shoot it from Pidurangala instead.",
         "Gates open at 07:00 but tour groups arrive by 08:30 -- the first hour on the staircase is the quiet one.",
         "The fresco gallery bans photography outright and it is actively enforced.",
         "Afternoon light rakes the western face; morning leaves it flat and backlit.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sigiriya_%28141688197%29.jpeg/1280px-Sigiriya_%28141688197%29.jpeg",
      city: "Dambulla",
      citySlug: "dambulla",
      district: "Matale",
      districtSlug: "matale",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "TEMPLE_LANDMARK",
      shootingNotes:
         "The staircase is narrow and one-way at peak times; a tripod is impractical above the lion platform even where permitted.",
      entryFee:
         "Approx. USD 30-35 for foreign visitors; substantially less for SAARC nationals and Sri Lankans.",
      permitRequired: true,
      permitAuthority: "Central Cultural Fund",
      permitNotes:
         "The standard ticket covers personal photography. Any commercial shoot, crew or tripod-based session needs written permission from the Central Cultural Fund, applied for per site with its own fee. Photography is banned entirely in the fresco gallery.",
      droneRule: "PROHIBITED",
      droneNotes:
         "A World Heritage site -- drones are not permitted without explicit Central Cultural Fund and Department of Archaeology clearance, and enforcement here is strict. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      openingHours: "07:00-17:30, last entry around 17:00.",
      tripodAllowed: false,
   },
   {
      id: "pidurangala-rock",
      name: "Pidurangala Rock",
      type: "Hill Viewpoint",
      locationLabel: "Central Province, Dambulla",
      latlng: [7.9686, 80.7594],
      description:
         "The outcrop directly north of Sigiriya, and the only place to photograph the fortress as a whole. A short scramble past a reclining Buddha brings you onto a boulder field facing south, with Sigiriya centred against the plain. Cheaper and quieter than the fortress itself.",
      directions:
         "Pidurangala Road, about 1.5 km north of the Sigiriya ticket office. Park at the temple, pay at the entrance, then climb 20-25 minutes -- stairs first, then a boulder scramble that needs both hands.",
      tips: [
         "Leave 75 minutes before sunrise: the final scramble is genuinely awkward in the dark and a head torch is essential.",
         "Shoot south towards Sigiriya. The sun comes up to your left, so the rock lights from the side rather than behind.",
         "Shoulders and knees must be covered to pass the temple, even at 05:00.",
         "The summit boulders are wide and flat, so a tripod works here in a way it never does on Sigiriya.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pidurangala_Rock_depuis_Sigiriya_%281%29.jpg/1280px-Pidurangala_Rock_depuis_Sigiriya_%281%29.jpg",
      city: "Dambulla",
      citySlug: "dambulla",
      district: "Matale",
      districtSlug: "matale",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "VIEWPOINT",
      entryFee: "Approx. LKR 1,000 temple donation at the entrance.",
      permitNotes:
         "No permit for personal work. It is temple land, so dress modestly and expect to remove shoes near the reclining Buddha.",
      droneRule: "PROHIBITED",
      droneNotes:
         "Within the Sigiriya restricted zone -- flying here is treated the same as flying over the fortress itself. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      openingHours: "Open from roughly 05:00 for sunrise climbers.",
      tripodAllowed: true,
   },
   {
      id: "seema-malaka",
      name: "Seema Malaka",
      type: "Lake Temple Pavilion",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9166, 79.8564],
      description:
         "Three timber-and-copper pavilions set on platforms in Beira Lake, designed by Geoffrey Bawa in the 1970s as a meditation annexe to Gangaramaya. Rows of seated Buddha figures line the decks, with the Colombo skyline stacked up behind.",
      directions:
         "On Beira Lake off Sir James Peiris Mawatha, a few minutes walk from Gangaramaya Temple. Entry is via the Gangaramaya ticket, and the boardwalk connects the three platforms.",
      tips: [
         "Early morning gives still water and clean skyline reflections; by midday the breeze breaks the surface up.",
         "Shoot from the northern deck to stack the pavilion roofs against the high-rises.",
         "Blue hour is the strongest window -- the copper roofs hold warmth after the sky has gone cool.",
         "It is an active meditation space: keep back from anyone seated and do not use flash.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Seema_Malaka_temple.JPG/1280px-Seema_Malaka_temple.JPG",
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "TEMPLE_LANDMARK",
      shootingNotes: "Remove shoes before stepping onto the pavilion platforms.",
      entryFee:
         "Covered by the Gangaramaya Temple ticket, usually LKR 300-500.",
      permitNotes:
         "Personal photography is welcome. Pre-wedding and commercial sessions should clear it with the temple office first.",
      droneRule: "PROHIBITED",
      droneNotes:
         "Central Colombo sits inside controlled airspace. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      tripodAllowed: true,
   },
   {
      id: "jami-ul-alfar-mosque",
      name: "Jami Ul-Alfar Mosque",
      type: "Historic Mosque",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9387, 79.8542],
      description:
         "The red-and-white striped mosque at the heart of Pettah, built between 1908 and 1909 in a candy-banded brickwork with no real parallel elsewhere in the city. The facade reads as pure graphic pattern.",
      directions:
         "2nd Cross Street, Pettah. Walk in from Main Street through the market; Colombo Fort station is about ten minutes away on foot.",
      tips: [
         "Second Cross Street is narrow, so a 16-24mm equivalent is the difference between the whole facade and a corner of it.",
         "Morning light reaches the frontage before the street fills with handcarts.",
         "Non-Muslim visitors can usually see the interior outside prayer times -- ask at the entrance rather than walking in.",
         "Cover shoulders and knees; women are asked to cover their hair inside.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/SL_Colombo_asv2020-01_img22_Jami_Ul-Alfar_Mosque.jpg/1280px-SL_Colombo_asv2020-01_img22_Jami_Ul-Alfar_Mosque.jpg",
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "TEMPLE_LANDMARK",
      shootingNotes:
         "Pettah is busy and tight. A tripod will block a working street here even though nobody formally prohibits it.",
      entryFee: "Free.",
      permitNotes:
         "Exterior photography is unrestricted. Always ask before photographing inside or photographing worshippers.",
      droneRule: "PROHIBITED",
      droneNotes:
         "Dense central Colombo inside controlled airspace. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      openingHours:
         "Closed to visitors during the five daily prayers and on Friday around midday.",
      tripodAllowed: false,
   },
   {
      id: "pettah-market",
      name: "Pettah Market",
      type: "Street Market",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9375, 79.8585],
      description:
         "The commercial quarter east of Fort station: a grid of cross streets where each trades in something different -- textiles, produce, hardware, gold on Sea Street. Handcarts, awnings and stacked goods make it the densest street-photography ground in the country.",
      directions:
         "Bounded roughly by Main Street, Olcott Mawatha and the Pettah bus stands. Easiest on foot from Colombo Fort station; driving in is not worth it.",
      tips: [
         "Trading peaks between 07:00 and 10:00, and the light reaches street level in the same window.",
         "Work one cross street at a time -- each has its own trade and its own palette.",
         "Ask before photographing traders up close. Most agree, and the portraits are better for it.",
         "Keep gear minimal and close. One body, one lens, nothing hanging loose.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Pettah_Floating_Market.jpg/1280px-Pettah_Floating_Market.jpg",
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "URBAN",
      entryFee: "Free.",
      droneRule: "PROHIBITED",
      droneNotes:
         "Controlled airspace over a dense market -- not flyable. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      openingHours:
         "Busiest 07:00-17:00; most of Pettah closes on Sundays and Poya days.",
      tripodAllowed: false,
   },
   {
      id: "old-dutch-hospital",
      name: "Old Dutch Hospital",
      type: "Colonial Precinct",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9344, 79.8422],
      description:
         "The oldest surviving colonial building in Colombo, dating to the 17th-century Dutch period and now restored into a courtyard of restaurants and shops. Thick whitewashed columns, timber rafters and deep shaded arcades give clean architectural lines a few minutes from Galle Face.",
      directions:
         "Hospital Street, Fort, between Chatham Street and the harbour end. An easy walk from Galle Face Green or Colombo Fort station.",
      tips: [
         "The arcades stay shaded all day, so it is the reliable fallback when midday sun kills everything outdoors.",
         "Courtyard lanterns light shortly before dusk and pair well with a blue-hour sky.",
         "Columns repeat cleanly down the colonnade -- a long lens compresses them into a strong background.",
         "It is a working hospitality precinct; shoot around tables rather than through them.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/LK-Colombo-altes-parlament.jpg/1280px-LK-Colombo-altes-parlament.jpg",
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "TEMPLE_LANDMARK",
      entryFee: "Free to walk the courtyard and arcades.",
      permitNotes:
         "Casual photography is fine. Commercial shoots need permission from precinct management, and individual venues may ask you to stop inside their footprint.",
      droneRule: "PROHIBITED",
      droneNotes:
         "Colombo Fort, close to the harbour and government buildings. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      openingHours:
         "Courtyard open daily; individual tenants keep their own hours, generally 10:00-23:00.",
      tripodAllowed: true,
   },
   {
      id: "galle-lighthouse",
      name: "Galle Lighthouse",
      type: "Historic Lighthouse",
      locationLabel: "Southern Province, Galle",
      latlng: [6.0258, 80.2167],
      description:
         "A 26 m white tower standing on the ramparts at the south-eastern corner of Galle Fort, built in 1939 to replace an earlier light. Palms, coral wall and open ocean sit behind it, and the surrounding bastion is the most worked corner of the fort.",
      directions:
         "At the end of Hospital Street inside Galle Fort, on the Point Utrecht bastion. Walk the ramparts clockwise from the main gate, roughly 15 minutes.",
      tips: [
         "The tower faces east, so it lights cleanly at sunrise and falls into silhouette at sunset.",
         "The small beach below the bastion gives a low angle with the tower above the wall.",
         "The lighthouse itself is not open to the public -- everything is shot from the ramparts.",
         "Sunset draws crowds onto this exact corner; sunrise is effectively private.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/SL_Galle_Fort_asv2020-01_img24.jpg/1280px-SL_Galle_Fort_asv2020-01_img24.jpg",
      city: "Galle",
      citySlug: "galle",
      district: "Galle",
      districtSlug: "galle",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "TEMPLE_LANDMARK",
      entryFee: "Free.",
      permitRequired: true,
      permitAuthority: "Galle Heritage Foundation",
      permitNotes:
         "Inside the World Heritage fort, where the Foundation administers filming and photography. Handheld personal work is fine; commercial shoots and crews need written approval in advance.",
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Foundation approval is needed on top of national clearance. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      tripodAllowed: true,
   },
   {
      id: "coconut-tree-hill",
      name: "Coconut Tree Hill",
      type: "Coastal Viewpoint",
      locationLabel: "Southern Province, Mirissa",
      latlng: [5.9436, 80.4506],
      description:
         "A headland above Mirissa planted with coconut palms on a grass slope that drops straight to the sea on three sides. Leaning trunks, grass and open water make it one of the most recognisable frames on the south coast.",
      directions:
         "North-east end of Mirissa Beach. Follow the lane past Mirissa Beach Road, then a short walk up the headland path.",
      tips: [
         "Sunrise is the only quiet window -- it is busy from mid-morning until dusk.",
         "Shoot east along the slope so the trunks lean into frame rather than across it.",
         "Get low: from waist height the palms separate against the sky instead of merging with the grass.",
         "The seaward edge is undercut and crumbling. Stay back from the lip.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Mirissa-Plage_%283%29.jpg/1280px-Mirissa-Plage_%283%29.jpg",
      city: "Mirissa",
      citySlug: "mirissa",
      district: "Matara",
      districtSlug: "matara",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "VIEWPOINT",
      shootingNotes:
         "Erosion has narrowed the headland noticeably in recent years; some older compositions are no longer safely reachable.",
      entryFee:
         "Free, though a small informal charge is sometimes collected on the path.",
      droneRule: "ALLOWED",
      droneNotes:
         "Open coast with no restricted airspace nearby, but registration and clearance still apply. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      tripodAllowed: true,
   },
   {
      id: "temple-of-the-tooth",
      name: "Temple of the Tooth",
      type: "Sacred Temple",
      locationLabel: "Central Province, Kandy",
      latlng: [7.2936, 80.6413],
      description:
         "Sri Dalada Maligawa, the temple housing the relic of the tooth of the Buddha and the most venerated Buddhist site in the country. A moat, octagonal library tower and painted wooden interiors sit beside Kandy Lake.",
      directions:
         "Sri Dalada Veediya on the north shore of Kandy Lake, walkable from anywhere in central Kandy. Security screening at the entrance.",
      tips: [
         "Puja ceremonies run early morning, midday and evening -- the evening drumming is the strongest sequence.",
         "The octagon photographs best from across the moat at the north-west corner.",
         "White clothing is expected, and shoulders and knees must be covered. Shoes come off at the entrance.",
         "Interior light is low and warm; flash is inappropriate rather than merely discouraged.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/SL_Kandy_asv2020-01_img33_Sacred_Tooth_Temple.jpg/1280px-SL_Kandy_asv2020-01_img33_Sacred_Tooth_Temple.jpg",
      city: "Kandy",
      citySlug: "kandy",
      district: "Kandy",
      districtSlug: "kandy",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "TEMPLE_LANDMARK",
      entryFee:
         "Approx. LKR 2,000 for foreign visitors; free for Sri Lankans.",
      permitRequired: true,
      permitAuthority: "Temple administration / Department of Archaeology",
      permitNotes:
         "Personal photography is allowed in most of the precinct but not of the relic chamber itself. Commercial work needs written permission from the temple administration, and tripods are generally refused inside.",
      droneRule: "PROHIBITED",
      droneNotes:
         "A site of the highest religious significance with a standing no-fly expectation. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      openingHours: "05:30-20:00, with puja at roughly 05:30, 09:30 and 18:30.",
      tripodAllowed: false,
   },
   {
      id: "gal-vihara-polonnaruwa",
      name: "Gal Vihara",
      type: "Rock-Cut Buddha Statues",
      locationLabel: "North Central Province, Polonnaruwa",
      latlng: [7.9594, 81.0003],
      description:
         "Four colossal Buddha figures carved from a single granite face in the 12th century -- seated, two standing and a 14 m reclining figure. The stone still shows its original banding, and the carving is the high point of Sri Lankan sculpture.",
      directions:
         "At the northern end of the Polonnaruwa ancient city circuit, about 4 km from the museum. Covered by the site ticket; most visitors cycle or drive the loop.",
      tips: [
         "A canopy shelters the figures, so the light is soft and even all day -- a rare midday-proof subject.",
         "A long lens isolates the reclining figure face and foot carving far better than a wide frame.",
         "Shoes off and hats off within the enclosure, and never photograph with your back to the statues.",
         "Arrive before 09:00 to shoot the full row without visitors in frame.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/%E0%B6%8B%E0%B6%AD%E0%B7%8A%E0%B6%AD%E0%B6%BB%E0%B7%8F%E0%B6%BB%E0%B7%8F%E0%B6%B8%E0%B6%BA_%E0%B6%9A%E0%B7%85%E0%B7%94_%E0%B6%9C%E0%B6%BD_%E0%B6%B1%E0%B7%99%E0%B6%BD%E0%B7%8F.jpg/1280px-%E0%B6%8B%E0%B6%AD%E0%B7%8A%E0%B6%AD%E0%B6%BB%E0%B7%8F%E0%B6%BB%E0%B7%8F%E0%B6%B8%E0%B6%BA_%E0%B6%9A%E0%B7%85%E0%B7%94_%E0%B6%9C%E0%B6%BD_%E0%B6%B1%E0%B7%99%E0%B6%BD%E0%B7%8F.jpg",
      city: "Polonnaruwa",
      citySlug: "polonnaruwa",
      district: "Polonnaruwa",
      districtSlug: "polonnaruwa",
      province: "North Central Province",
      provinceSlug: "north-central-province",
      category: "TEMPLE_LANDMARK",
      entryFee:
         "Covered by the Polonnaruwa site ticket, approx. USD 25-30 for foreign visitors.",
      permitRequired: true,
      permitAuthority: "Central Cultural Fund",
      permitNotes:
         "Commercial photography or video requires written permission applied for per Cultural Triangle location, each with its own fee. A departmental representative may be required on site.",
      droneRule: "PROHIBITED",
      droneNotes:
         "World Heritage site under Department of Archaeology control. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      openingHours: "07:00-18:00.",
      tripodAllowed: false,
   },
   {
      id: "koggala-stilt-fishermen",
      name: "Koggala Stilt Fishermen",
      type: "Coastal Tradition",
      locationLabel: "Southern Province, Koggala",
      latlng: [5.9931, 80.3297],
      description:
         "The stretch of coast between Koggala and Weligama where fishermen perch on single poles driven into the reef. The practice is now largely performed for visitors rather than for fish, but the silhouettes against a low sun remain the defining image of the south coast.",
      directions:
         "Along the Galle-Matara road between Koggala and Ahangama. The poles are visible from the roadside; pull-ins sit directly opposite the main clusters.",
      tips: [
         "Expect to negotiate a fee before photographing -- agree the number before you start shooting, not after.",
         "Sunrise puts the sun behind the poles for clean silhouettes; sunset backlights from the opposite side.",
         "A 70-200 equivalent from the beach compresses the line of poles without wading in.",
         "Shoot at low tide, when the reef is exposed and the poles stand clear of the water.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Fishermen_practicing_traditional_stilt_fishing_near_Galle%2C_southern_Sri_Lanka%2C_20260207_1419_9452.jpg/1280px-Fishermen_practicing_traditional_stilt_fishing_near_Galle%2C_southern_Sri_Lanka%2C_20260207_1419_9452.jpg",
      city: "Koggala",
      citySlug: "koggala",
      district: "Galle",
      districtSlug: "galle",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "BEACH",
      entryFee:
         "The beach is free, but the fishermen charge for photographs -- commonly LKR 500-2,000 per person.",
      permitNotes:
         "No official permit. This is a paid arrangement with the fishermen directly; settle the price first to avoid a dispute afterwards.",
      droneRule: "ALLOWED",
      droneNotes:
         "Open coastline, though Koggala airfield is close by -- check the airspace before launching. Register any camera drone with CAASL and obtain TRCSL clearance before flying, whatever its weight.",
      tripodAllowed: true,
   },
   {
      id: "gangaramaya-temple",
      name: "Gangaramaya Temple",
      type: "Urban Temple",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9168, 79.8564],
      description:
         "A working Colombo temple that doubles as a museum of donated curiosities — vintage cars, carved ivory and crowded relic cabinets sit alongside the shrine hall. The sheer density of objects makes it unlike any other temple interior in the city.",
      directions:
         "On Sri Jinaratana Road beside Beira Lake, a short walk from Seema Malaka. The lane entrance is narrow and easy to miss coming from Hunupitiya Road.",
      tips: [
         "Interiors are cluttered and dim — a fast lens beats a flash you are not permitted to use.",
         "Shoulders and knees covered, shoes off at the shrine entrance.",
         "The Navam Perahera in February fills the whole precinct with elephants and dancers.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Colombo_Temple_bouddhiste_de_Gangaramaya_%282%29.JPG/1280px-Colombo_Temple_bouddhiste_de_Gangaramaya_%282%29.JPG",
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
      ],
      shootingNotes:
         "Cramped interiors mixing tungsten and daylight — expect heavy white-balance correction.",
      entryFee: "Nominal donation requested at the museum section.",
      droneRule: "PROHIBITED",
      droneNotes:
         "Dense urban airspace beside an active religious site; do not fly here.",
      openingHours: "Roughly 05:30–22:00 daily.",
      tripodAllowed: false,
   },
   {
      id: "wellawatte-beach",
      name: "Wellawatte Beach",
      type: "Public Beach",
      locationLabel: "Western Province, Colombo",
      latlng: [6.8731, 79.8578],
      description:
         "A working city beach rather than a resort one — fishing boats hauled up on the sand, cricket games, and a steady flow of residents walking after work. The coastal railway runs directly behind it.",
      directions:
         "Reached by level crossings off Galle Road in Wellawatte (Colombo 06). Wellawatte station sits on the beach side of the line.",
      tips: [
         "Trains passing between the sand and the road make a strong foreground element.",
         "Evening is when the beach fills with locals — better for candid work than empty sand.",
         "Litter varies day to day; scout the frame before committing to a wide shot.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Wellawatte_Beach_Sunset.jpg/1280px-Wellawatte_Beach_Sunset.jpg",
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "BEACH",
      bestTimeOfDay: [
         "evening",
      ],
      bestMonths: [
         11,
         12,
         1,
         2,
         3,
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Inside Colombo's controlled airspace — CAASL registration and TRCSL clearance required.",
      openingHours: "Open at all hours.",
      tripodAllowed: true,
   },
   {
      id: "viharamahadevi-park",
      name: "Viharamahadevi Park",
      type: "Public Park",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9147, 79.8607],
      description:
         "The city's oldest and largest park, laid out under British rule as Victoria Park and later renamed for the mother of King Dutugemunu. Mature rain trees, a golden Buddha statue, and the Town Hall dome rising behind the lawns.",
      directions:
         "Opposite Colombo Town Hall, bounded by Ananda Coomaraswamy Mawatha in Colombo 07. Gates on several sides; the Town Hall side is the usual approach.",
      tips: [
         "Rain-tree canopies hold usable open shade right through the middle of the day.",
         "The Town Hall dome lines up cleanly as a background from the northern lawns.",
         "A nominal admission applies at the gate — carry small change in rupees.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/SL_Colombo_asv2020-01_img11_Viharamahadevi_Park.jpg/1280px-SL_Colombo_asv2020-01_img11_Viharamahadevi_Park.jpg",
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "URBAN",
      bestTimeOfDay: [
         "morning",
         "evening",
      ],
      entryFee: "Nominal gate fee, around LKR 20 for adults.",
      isFree: false,
      droneRule: "PROHIBITED",
      droneNotes:
         "Adjacent to government buildings in central Colombo; flying is not permitted.",
      openingHours: "Roughly 06:00–20:00 daily.",
      tripodAllowed: true,
   },
   {
      id: "colombo-port-city",
      name: "Port City Colombo",
      type: "Waterfront Promenade",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9344, 79.8386],
      description:
         "Reclaimed land north of Galle Face being built out as a new financial district. Wide empty boulevards and a hard geometric seafront give it a character entirely unlike the rest of Colombo.",
      directions:
         "North of Galle Face Green, entered from the Marine Drive side. Open areas and access points shift as construction phases complete.",
      tips: [
         "Empty new infrastructure suits clean minimal composition and longer lenses.",
         "Security patrols the active zones — ask before setting up near construction.",
         "Almost no shade anywhere; treat it as an early-morning or late-afternoon location.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Colombo_Port_City_seem_from_galle_road..jpg/1280px-Colombo_Port_City_seem_from_galle_road..jpg",
      city: "Colombo",
      citySlug: "colombo",
      district: "Colombo",
      districtSlug: "colombo",
      province: "Western Province",
      provinceSlug: "western-province",
      category: "URBAN",
      bestTimeOfDay: [
         "evening",
      ],
      droneRule: "PROHIBITED",
      droneNotes:
         "Port-adjacent restricted airspace with an active security presence.",
      openingHours: "Public promenade areas generally open during daylight.",
   },
   {
      id: "bentota-beach",
      name: "Bentota Beach",
      type: "Public Beach",
      locationLabel: "Southern Province, Bentota",
      latlng: [6.4213, 79.9959],
      description:
         "A broad stretch of sand on the spit where the Bentota river meets the sea, so open surf on one side and still lagoon water on the other sit within a few minutes' walk of each other.",
      directions:
         "About 65 km south of Colombo on the Galle road, and a stop on the coastal railway. The river mouth is at the northern end of the beach.",
      tips: [
         "The sandbar at the river mouth is the distinctive frame here, not the open beach.",
         "The lagoon side stays glassy at dawn while the sea side is already breaking.",
         "West-facing, so sunset works directly off the sand.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sri_Lanka%2C_Bentota%2C_beach_%281%29.JPG/1280px-Sri_Lanka%2C_Bentota%2C_beach_%281%29.JPG",
      city: "Bentota",
      citySlug: "bentota",
      district: "Galle",
      districtSlug: "galle",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "BEACH",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      bestMonths: [
         11,
         12,
         1,
         2,
         3,
         4,
      ],
      droneRule: "ALLOWED",
      droneNotes:
         "Open coastline clear of controlled airspace; CAASL registration still applies.",
      openingHours: "Open at all hours.",
      tripodAllowed: true,
   },
   {
      id: "weligama-bay",
      name: "Weligama Bay",
      type: "Surf Beach",
      locationLabel: "Southern Province, Weligama",
      latlng: [5.9748, 80.4294],
      description:
         "A wide shallow bay with a forgiving beach break, which is why most of the south coast's surf schools cluster here. Outrigger fishing boats line the eastern end and a small island sits just offshore.",
      directions:
         "On the main coast road between Galle and Matara. The bay is visible from the road along its full length, with access points throughout.",
      tips: [
         "Beginner surf means plenty of usable action without needing a long lens.",
         "The fishing fleet at the eastern end is the quieter photographic end of the bay.",
         "Shallow water a long way out suits low-angle reflective work at dawn.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Fishermen_at_Fisherman%27s_Bay.jpg/1280px-Fishermen_at_Fisherman%27s_Bay.jpg",
      city: "Weligama",
      citySlug: "weligama",
      district: "Matara",
      districtSlug: "matara",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "BEACH",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      bestMonths: [
         11,
         12,
         1,
         2,
         3,
         4,
      ],
      droneRule: "ALLOWED",
      openingHours: "Open at all hours.",
      tripodAllowed: true,
   },
   {
      id: "tangalle-beach",
      name: "Tangalle Beach",
      type: "Public Beach",
      locationLabel: "Southern Province, Tangalle",
      latlng: [6.0233, 80.7949],
      description:
         "A long run of far-south coastline broken into separate coves by rocky headlands. Noticeably emptier than the Galle-side beaches, with stronger surf and more open horizon.",
      directions:
         "About 195 km from Colombo via the southern expressway to Matara, then the coast road. Goyambokka and Medaketiya are the main access coves.",
      tips: [
         "Headlands let you shoot down into a cove rather than along flat sand.",
         "Currents here are genuinely strong — be careful positioning anyone in the water.",
         "Few facilities between coves, so carry everything you need.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Tangalle_Beach%2C_Sri_Lanka_%2840081697721%29.jpg/1280px-Tangalle_Beach%2C_Sri_Lanka_%2840081697721%29.jpg",
      city: "Tangalle",
      citySlug: "tangalle",
      district: "Hambantota",
      districtSlug: "hambantota",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "BEACH",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      bestMonths: [
         11,
         12,
         1,
         2,
         3,
         4,
      ],
      droneRule: "ALLOWED",
      openingHours: "Open at all hours.",
      tripodAllowed: true,
   },
   {
      id: "dondra-head-lighthouse",
      name: "Dondra Head Lighthouse",
      type: "Historic Lighthouse",
      locationLabel: "Southern Province, Devinuwara",
      latlng: [5.9226, 80.5934],
      description:
         "The southernmost point of the island, marked by a 49 m colonial lighthouse in banded stone. There is nothing but open ocean south of here until Antarctica.",
      directions:
         "At Devinuwara, roughly 6 km east of Matara. A side road off the coast road runs out to the headland and the lighthouse compound.",
      tips: [
         "The tower reads best against open sky from the rocks below rather than head-on.",
         "Interior access is restricted — plan on exterior frames only.",
         "Exposed headland with constant wind and salt spray; shield your gear.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Dondra_Head_lighthouse.jpg/1280px-Dondra_Head_lighthouse.jpg",
      city: "Devinuwara",
      citySlug: "devinuwara",
      district: "Matara",
      districtSlug: "matara",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "VIEWPOINT",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes: "Active navigational aid — check locally before flying.",
      openingHours:
         "Grounds accessible during daylight; tower interior generally closed.",
      tripodAllowed: true,
   },
   {
      id: "ambalangoda-beach",
      name: "Ambalangoda Beach",
      type: "Public Beach",
      locationLabel: "Southern Province, Ambalangoda",
      latlng: [6.2353, 80.0536],
      description:
         "A quiet working beach in a town better known for mask carving and devil-dance traditions. Fishing boats and a rocky natural pool at one end give it more structure than a plain sand strip.",
      directions:
         "About 85 km south of Colombo on the coast road, between Kosgoda and Hikkaduwa. Ambalangoda railway station is close to the sand.",
      tips: [
         "The natural rock pool holds still water for reflections when the sea is rough.",
         "Mask workshops in town are a strong companion subject to the beach itself.",
         "Sunset is unobstructed along the whole west-facing stretch.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/b/be/Beach_ambalangoda_srilanka.jpg",
      city: "Ambalangoda",
      citySlug: "ambalangoda",
      district: "Galle",
      districtSlug: "galle",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "BEACH",
      bestTimeOfDay: [
         "evening",
      ],
      bestMonths: [
         11,
         12,
         1,
         2,
         3,
         4,
      ],
      droneRule: "ALLOWED",
      openingHours: "Open at all hours.",
      tripodAllowed: true,
   },
   {
      id: "hummanaya-blowhole",
      name: "Hummanaya Blow Hole",
      type: "Coastal Blowhole",
      locationLabel: "Southern Province, Kudawella",
      latlng: [5.9397, 80.6742],
      description:
         "A sea cave that forces swell up through a vertical rock shaft, throwing spray well above the cliff line. Reckoned to be the second-largest blowhole in the world and at its most dramatic in rough weather.",
      directions:
         "At Kudawella, off the coast road between Dickwella and Tangalle. A short walk from the parking area leads to the viewing platform.",
      tips: [
         "Rough seas produce the biggest spouts — calm days can be a non-event.",
         "Spray reaches the platform, so a rain cover is not optional here.",
         "Time your bursts with the swell rather than shooting continuously.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Hummanaya%28Blow_hole%29%2C_Kudawella%2C_Sri_Lanka.jpg/1280px-Hummanaya%28Blow_hole%29%2C_Kudawella%2C_Sri_Lanka.jpg",
      city: "Kudawella",
      citySlug: "kudawella",
      district: "Hambantota",
      districtSlug: "hambantota",
      province: "Southern Province",
      provinceSlug: "southern-province",
      category: "VIEWPOINT",
      bestTimeOfDay: [
         "midday",
      ],
      entryFee: "Small local entrance charge at the viewing area.",
      isFree: false,
      droneRule: "ALLOWED",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "ella-rock",
      name: "Ella Rock",
      type: "Hill Viewpoint",
      locationLabel: "Uva Province, Ella",
      latlng: [6.8599, 81.0366],
      description:
         "The larger of Ella's two summits, reached by a route that follows the railway line before climbing through tea and eucalyptus. The top opens onto Ella Gap with the plains far below.",
      directions:
         "Walk south from Ella station along the track, then take the marked path uphill. Allow around two hours each way; the junctions are poorly signed.",
      tips: [
         "Go at sunrise — the gap fills with cloud later in the morning.",
         "The track section is live railway; stay alert and step well clear of trains.",
         "Route-finding is genuinely confusing, so download an offline map first.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Ella_Rock%2C_Sri_Lanka.jpg/1280px-Ella_Rock%2C_Sri_Lanka.jpg",
      city: "Ella",
      citySlug: "ella",
      district: "Badulla",
      districtSlug: "badulla",
      province: "Uva Province",
      provinceSlug: "uva-province",
      category: "VIEWPOINT",
      bestTimeOfDay: [
         "sunrise",
      ],
      bestMonths: [
         1,
         2,
         3,
         4,
         7,
         8,
         9,
      ],
      shootingNotes:
         "A long approach on foot — carry only what you can walk two hours with.",
      droneRule: "ALLOWED",
      openingHours: "Open access; daylight hiking only.",
      tripodAllowed: true,
   },
   {
      id: "diyaluma-falls",
      name: "Diyaluma Falls",
      type: "Waterfall",
      locationLabel: "Uva Province, Koslanda",
      latlng: [6.7322, 81.0353],
      description:
         "At 220 m the second-highest waterfall in the country — a single long drop visible straight from the road, with a chain of natural pools on the plateau above it.",
      directions:
         "On the Koslanda–Wellawaya road. The base view is roadside; the upper pools need a steep 45-minute climb from a signed trailhead nearby.",
      tips: [
         "Roadside gives you the full drop; the upper pools give the infinity-edge frames.",
         "The climb to the top is steep and slippery — not a route for heavy kit.",
         "Flow drops noticeably in the dry season; after rain is far more impressive.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Diyaluma_Falls.jpg/1280px-Diyaluma_Falls.jpg",
      city: "Koslanda",
      citySlug: "koslanda",
      district: "Badulla",
      districtSlug: "badulla",
      province: "Uva Province",
      provinceSlug: "uva-province",
      category: "WATERFALL",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "ALLOWED",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "dunhinda-falls",
      name: "Dunhinda Falls",
      type: "Waterfall",
      locationLabel: "Uva Province, Badulla",
      latlng: [6.9975, 81.0683],
      description:
         "A 64 m fall named for the smoky spray it throws off, reached by a rough path through forest. The viewing platform faces it straight on across the gorge.",
      directions:
         "About 5 km north of Badulla. A rocky 1 km footpath leads from the parking area to the viewpoint, with stalls along the way.",
      tips: [
         "Constant mist on the platform — keep a cloth on the front element.",
         "The path is uneven rock, so a monopod travels better than a tripod here.",
         "Morning light reaches into the gorge before the sun drops behind the ridge.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SL_Badulla_asv2020-01_img24_Dunhinda_Falls.jpg/1280px-SL_Badulla_asv2020-01_img24_Dunhinda_Falls.jpg",
      city: "Badulla",
      citySlug: "badulla",
      district: "Badulla",
      districtSlug: "badulla",
      province: "Uva Province",
      provinceSlug: "uva-province",
      category: "WATERFALL",
      bestTimeOfDay: [
         "morning",
      ],
      entryFee: "Small entrance charge at the trailhead.",
      isFree: false,
      droneRule: "ALLOWED",
      openingHours: "Roughly 07:00–17:00.",
      tripodAllowed: true,
   },
   {
      id: "demodara-loop",
      name: "Demodara Railway Loop",
      type: "Railway Landmark",
      locationLabel: "Uva Province, Demodara",
      latlng: [6.8747, 81.0877],
      description:
         "An engineering answer to a steep gradient: the line spirals under itself and passes through a tunnel directly beneath the station platform, so trains emerge a level below where they entered.",
      directions:
         "Demodara station, a few kilometres from Ella on the Badulla line. The loop and tunnel mouth are a short walk from the platform.",
      tips: [
         "Check the timetable — the loop only makes sense photographically with a train on it.",
         "The tunnel mouth below the platform is the frame that explains the design.",
         "Station staff are used to photographers, but ask before crossing any track.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Demodara_railway_loop.jpg/1280px-Demodara_railway_loop.jpg",
      city: "Demodara",
      citySlug: "demodara",
      district: "Badulla",
      districtSlug: "badulla",
      province: "Uva Province",
      provinceSlug: "uva-province",
      category: "URBAN",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Railway property — permission from Sri Lanka Railways needed for drone work.",
      openingHours: "Station hours; tracks are live at all times.",
      tripodAllowed: true,
   },
   {
      id: "nanu-oya-station",
      name: "Nanu Oya Railway Station",
      type: "Railway Station",
      locationLabel: "Central Province, Nuwara Eliya",
      latlng: [6.9444, 80.7247],
      description:
         "The hill-country station serving Nuwara Eliya, and the usual boarding point for the tea-estate rail run towards Ella. Colonial-era platform buildings sit among pines and frequent mist.",
      directions:
         "About 8 km west of Nuwara Eliya town, connected by frequent tuk-tuks and buses.",
      tips: [
         "Platform mist in the early morning is the signature look here.",
         "Arriving trains fill the platform fast — pre-compose before they pull in.",
         "Cold and damp at this altitude; lens condensation is a real problem.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Gare_de_Nanu_Oya-Sri_Lanka_%284%29.jpg/1280px-Gare_de_Nanu_Oya-Sri_Lanka_%284%29.jpg",
      city: "Nuwara Eliya",
      citySlug: "nuwara-eliya",
      district: "Nuwara Eliya",
      districtSlug: "nuwara-eliya",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "URBAN",
      bestTimeOfDay: [
         "sunrise",
         "morning",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Railway property; clearance required from Sri Lanka Railways.",
      openingHours: "Station operating hours.",
      tripodAllowed: true,
   },
   {
      id: "victoria-park-nuwara-eliya",
      name: "Victoria Park",
      type: "Public Park",
      locationLabel: "Central Province, Nuwara Eliya",
      latlng: [6.9697, 80.7658],
      description:
         "A formal park in the middle of Nuwara Eliya, planted with temperate flowers that will not grow elsewhere in the country. Also a noted spot for migrant hill-country birds.",
      directions:
         "Central Nuwara Eliya, beside the main road opposite the post office.",
      tips: [
         "Flower beds peak around March to May after the cool season.",
         "Early morning brings the birdlife and the low mist together.",
         "A modest gate fee applies and the park closes before dark.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Victoria_park%2C_Nuwara_Eliya_-_panoramio.jpg/1280px-Victoria_park%2C_Nuwara_Eliya_-_panoramio.jpg",
      city: "Nuwara Eliya",
      citySlug: "nuwara-eliya",
      district: "Nuwara Eliya",
      districtSlug: "nuwara-eliya",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "URBAN",
      bestTimeOfDay: [
         "morning",
      ],
      bestMonths: [
         3,
         4,
         5,
      ],
      entryFee: "Small gate fee.",
      isFree: false,
      droneRule: "PROHIBITED",
      openingHours: "Roughly 07:30–18:00.",
      tripodAllowed: true,
   },
   {
      id: "gregory-lake",
      name: "Gregory Lake",
      type: "Lakeside Walk",
      locationLabel: "Central Province, Nuwara Eliya",
      latlng: [6.9586, 80.7675],
      description:
         "A reservoir created under British administration, now the centre of Nuwara Eliya's recreation — a walking promenade, hills reflected in still water, and low cloud most mornings.",
      directions:
         "On the southern edge of Nuwara Eliya town, with a walkway running along the northern shore.",
      tips: [
         "Still mornings give clean hill reflections before the wind picks up.",
         "Mist rolling across the water is common and worth waiting for.",
         "The promenade is paved and level — the easiest hill-country location for heavy kit.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Gregory_Lake_Nuwara_Eliya_01.jpg/1280px-Gregory_Lake_Nuwara_Eliya_01.jpg",
      city: "Nuwara Eliya",
      citySlug: "nuwara-eliya",
      district: "Nuwara Eliya",
      districtSlug: "nuwara-eliya",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "NATURE_TRAIL",
      bestTimeOfDay: [
         "sunrise",
         "morning",
      ],
      entryFee: "Small charge for the lakeside park area.",
      isFree: false,
      droneRule: "PERMIT_REQUIRED",
      openingHours: "Promenade open during daylight.",
      tripodAllowed: true,
   },
   {
      id: "lankatilaka-viharaya",
      name: "Lankatilaka Viharaya",
      type: "Ancient Temple",
      locationLabel: "Central Province, Kandy",
      latlng: [7.2383, 80.5472],
      description:
         "A 14th-century temple built on a rock outcrop, mixing South Indian and Sinhalese architecture. The white structure stands above terraced paddy in an unusually commanding setting.",
      directions:
         "About 15 km west of Kandy near Daulagala, on the loop that also takes in Gadaladeniya and Embekka.",
      tips: [
         "The approach across the bare rock face is the frame that shows the setting.",
         "Paddy terraces below run green after rain and gold before harvest.",
         "Remove shoes at the shrine; interior photography may be restricted.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Lankatilaka_Temple_%285%29.JPG/1280px-Lankatilaka_Temple_%285%29.JPG",
      city: "Kandy",
      citySlug: "kandy",
      district: "Kandy",
      districtSlug: "kandy",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
         "evening",
      ],
      entryFee: "Small charge for foreign visitors.",
      isFree: false,
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Protected archaeological site — Department of Archaeology clearance needed.",
      openingHours: "Roughly 07:00–18:00.",
      tripodAllowed: true,
   },
   {
      id: "gadaladeniya-temple",
      name: "Gadaladeniya Temple",
      type: "Ancient Temple",
      locationLabel: "Central Province, Kandy",
      latlng: [7.2656, 80.5392],
      description:
         "A stone temple from 1344 built directly onto a flat rock shelf, with carved granite pillars and a Dravidian-influenced plan that sets it apart from later timber-and-plaster temples.",
      directions:
         "Off the Kandy–Colombo road near Pilimathalawa, roughly 12 km from Kandy. Usually visited alongside Lankatilaka and Embekka.",
      tips: [
         "The bare rock shelf gives a clean, uncluttered foreground most temples lack.",
         "Carved stone pillars reward a close-focusing lens as much as the wide view.",
         "Lower sun rakes across the carving and brings out the relief.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Main_entrance_Gadaladeniya_Vihara.png/1280px-Main_entrance_Gadaladeniya_Vihara.png",
      city: "Kandy",
      citySlug: "kandy",
      district: "Kandy",
      districtSlug: "kandy",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
         "evening",
      ],
      entryFee: "Small charge for foreign visitors.",
      isFree: false,
      droneRule: "PERMIT_REQUIRED",
      droneNotes: "Protected archaeological site.",
      openingHours: "Roughly 07:00–18:00.",
      tripodAllowed: true,
   },
   {
      id: "embekka-devalaya",
      name: "Embekka Devalaya",
      type: "Ancient Temple",
      locationLabel: "Central Province, Kandy",
      latlng: [7.2178, 80.5633],
      description:
         "Known for its woodwork — the drummers' hall carries some of the finest timber carving in the country, with wrestlers, swans and entwined animal figures cut into every column.",
      directions:
         "Near Embekka village, about 19 km from Kandy. The third stop on the Gadaladeniya–Lankatilaka–Embekka circuit.",
      tips: [
         "The carved pillars are the subject — bring something that focuses close.",
         "The hall is dim, so a fast lens matters more than a wide one.",
         "Side light through the open edges of the hall defines the relief best.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Embekka_Devalaya_%285%29.jpg/1280px-Embekka_Devalaya_%285%29.jpg",
      city: "Kandy",
      citySlug: "kandy",
      district: "Kandy",
      districtSlug: "kandy",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
      ],
      shootingNotes:
         "Low interior light against bright openings — bracket if you want carving and surroundings in one frame.",
      entryFee: "Small charge for foreign visitors.",
      isFree: false,
      droneRule: "PERMIT_REQUIRED",
      openingHours: "Roughly 07:00–18:00.",
      tripodAllowed: true,
   },
   {
      id: "kadugannawa-rock-tunnel",
      name: "Kadugannawa Rock Tunnel",
      type: "Railway Landmark",
      locationLabel: "Central Province, Kadugannawa",
      latlng: [7.2547, 80.5219],
      description:
         "A tunnel cut through solid rock on the colonial-era line up to Kandy, part of a climb that was a serious feat of Victorian engineering. Trains emerge from the rock face against a steep hillside.",
      directions:
         "At Kadugannawa on the Colombo–Kandy line, about 17 km from Kandy. Visible from points along the adjacent road.",
      tips: [
         "A train at the tunnel mouth is the shot; without one it is just rock.",
         "Shoot from public roadside viewpoints — never from the track itself.",
         "Backlight from the tunnel makes exposure tricky; meter for the rock face.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Kadugannawa_tunnel.JPG/1280px-Kadugannawa_tunnel.JPG",
      city: "Kadugannawa",
      citySlug: "kadugannawa",
      district: "Kandy",
      districtSlug: "kandy",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "URBAN",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes: "Railway infrastructure; clearance required.",
      openingHours: "Viewable any time from public roads.",
      tripodAllowed: true,
   },
   {
      id: "dunumadalawa-forest",
      name: "Dunumadalawa Forest Reserve",
      type: "Forest Trail",
      locationLabel: "Central Province, Kandy",
      latlng: [7.2797, 80.6256],
      description:
         "A protected catchment forest on the hills above Kandy, with a reservoir at its centre and a network of shaded tracks. Close to the city but quiet enough for birds and monkeys.",
      directions:
         "Reached from the Roseneath or Hantana side above Kandy town. The main track climbs steadily from the entrance gate.",
      tips: [
         "Dense canopy forces slow shutter speeds — plan for higher ISO than you expect.",
         "Early morning for birds; the forest goes quiet by mid-morning.",
         "Leeches are common after rain, so cover your ankles.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Dunumadalawa_Forest_%2825791410292%29.jpg/1280px-Dunumadalawa_Forest_%2825791410292%29.jpg",
      city: "Kandy",
      citySlug: "kandy",
      district: "Kandy",
      districtSlug: "kandy",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "NATURE_TRAIL",
      bestTimeOfDay: [
         "sunrise",
         "morning",
      ],
      droneRule: "PROHIBITED",
      droneNotes: "Protected catchment forest.",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "victoria-reservoir",
      name: "Victoria Reservoir",
      type: "Reservoir Viewpoint",
      locationLabel: "Central Province, Teldeniya",
      latlng: [7.2406, 80.7847],
      description:
         "The largest reservoir in the country, held back by an arch dam in a steep gorge on the Mahaweli. When levels drop, remains of the old Teldeniya town surface at the margins.",
      directions:
         "East of Kandy past Digana, roughly 30 km out. Several roadside viewpoints overlook the water and the dam.",
      tips: [
         "Shoot from the public road viewpoints; the dam itself is a secured installation.",
         "Low water in the dry season exposes the drowned town's foundations.",
         "Haze builds through the day — morning is far clearer across the water.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Victoria_Reservoir_Sri_Lanka.jpg/1280px-Victoria_Reservoir_Sri_Lanka.jpg",
      city: "Teldeniya",
      citySlug: "teldeniya",
      district: "Kandy",
      districtSlug: "kandy",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "VIEWPOINT",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "PROHIBITED",
      droneNotes: "Critical infrastructure with an active security presence.",
      openingHours: "Roadside viewpoints accessible any time.",
      tripodAllowed: true,
   },
   {
      id: "ramboda-falls",
      name: "Ramboda Falls",
      type: "Waterfall",
      locationLabel: "Central Province, Ramboda",
      latlng: [7.0636, 80.6983],
      description:
         "A tall multi-tier fall on the climb between Kandy and Nuwara Eliya, dropping beside the main road through tea country. Upper and lower sections can be viewed separately.",
      directions:
         "On the A5 at Ramboda, roughly 60 km from Kandy. Roadside pull-ins serve the lower fall; a path leads towards the upper tiers.",
      tips: [
         "Tea slopes around the fall give context a tight crop would lose.",
         "Hill mist can hide the upper tier entirely — allow time to wait it out.",
         "Spray plus hill drizzle means weather sealing earns its keep here.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Ramboda_Falls.jpg/1280px-Ramboda_Falls.jpg",
      city: "Ramboda",
      citySlug: "ramboda",
      district: "Nuwara Eliya",
      districtSlug: "nuwara-eliya",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "WATERFALL",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "ALLOWED",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "devon-falls",
      name: "Devon Falls",
      type: "Waterfall",
      locationLabel: "Central Province, Talawakele",
      latlng: [6.9381, 80.6619],
      description:
         "A 97 m fall named after a pioneer coffee planter, viewed across a tea-covered valley from a roadside platform rather than up close.",
      directions:
         "On the Hatton–Talawakele road, about 6 km west of Talawakele. The viewpoint is signposted directly off the road.",
      tips: [
         "This is a long-lens location — the fall sits across the valley, not beside you.",
         "Tea bushes in the foreground give the drop its sense of scale.",
         "Valley haze thickens through the day, so go early.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/f/f6/Devon_falls-Sri_lanka.jpg",
      city: "Talawakele",
      citySlug: "talawakele",
      district: "Nuwara Eliya",
      districtSlug: "nuwara-eliya",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "WATERFALL",
      bestTimeOfDay: [
         "morning",
      ],
      shootingNotes:
         "Distance brings atmospheric haze — expect to recover contrast in post.",
      droneRule: "ALLOWED",
      openingHours: "Roadside viewpoint accessible any time.",
      tripodAllowed: true,
   },
   {
      id: "st-clairs-falls",
      name: "St Clair's Falls",
      type: "Waterfall",
      locationLabel: "Central Province, Talawakele",
      latlng: [6.9333, 80.6833],
      description:
         "Sometimes called the little Niagara of Sri Lanka — a broad, wide-fronted fall dropping in two stages through tea estate country, unusual for its width rather than its height.",
      directions:
         "On the A7 between Hatton and Talawakele, a few kilometres from Devon Falls. A signed viewpoint sits above the fall.",
      tips: [
         "Width suits a horizontal frame; vertical crops waste what makes it distinctive.",
         "Hydro diversion can reduce flow — it is strongest after sustained rain.",
         "Pairs naturally with Devon Falls in a single morning.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/3/32/St_Clair%27s_Falls_in_Sri_Lanka.jpg",
      city: "Talawakele",
      citySlug: "talawakele",
      district: "Nuwara Eliya",
      districtSlug: "nuwara-eliya",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "WATERFALL",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "ALLOWED",
      openingHours: "Roadside viewpoint accessible any time.",
      tripodAllowed: true,
   },
   {
      id: "matale-muthumariamman",
      name: "Sri Muthumariamman Temple",
      type: "Hindu Temple",
      locationLabel: "Central Province, Matale",
      latlng: [7.4675, 80.6236],
      description:
         "A major Hindu temple whose gopuram is densely packed with painted figures in vivid colour — one of the most visually saturated religious structures on the island.",
      directions:
         "In Matale town, about 25 km north of Kandy on the Dambulla road. The tower is visible from the main street.",
      tips: [
         "The gopuram rewards a long lens — isolate sections rather than shooting it whole.",
         "Shoes off and modest dress inside the precinct.",
         "Ask before photographing ceremonies or worshippers.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Sri_Muthumariamman_Temple%28Hindu_temple%29_Teru_Festival_Chariot.jpg/1280px-Sri_Muthumariamman_Temple%28Hindu_temple%29_Teru_Festival_Chariot.jpg",
      city: "Matale",
      citySlug: "matale",
      district: "Matale",
      districtSlug: "matale",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "PROHIBITED",
      openingHours: "Roughly 06:00–18:00 with a midday closure.",
      tripodAllowed: false,
   },
   {
      id: "sembuwatta-lake",
      name: "Sembuwatta Lake",
      type: "Mountain Lake",
      locationLabel: "Central Province, Elkaduwa",
      latlng: [7.4333, 80.7333],
      description:
         "A spring-fed lake on a tea estate above Elkaduwa, held in a bowl of forested hills. The water is unusually clear and the setting feels enclosed and quiet.",
      directions:
         "Near Elkaduwa, around 25 km from Matale on the Campbell's Lane route. The final stretch is a narrow estate road.",
      tips: [
         "Elevated paths around the rim give the view that shows the whole bowl.",
         "Morning is calm and reflective; afternoons bring wind and visitors.",
         "Hill cloud can close the scene in with very little warning.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Sembuwatta_Lake_View.jpg/1280px-Sembuwatta_Lake_View.jpg",
      city: "Elkaduwa",
      citySlug: "elkaduwa",
      district: "Matale",
      districtSlug: "matale",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "NATURE_TRAIL",
      bestTimeOfDay: [
         "morning",
      ],
      entryFee: "Small entrance charge.",
      isFree: false,
      droneRule: "PERMIT_REQUIRED",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "riverston-peak",
      name: "Riverston Peak",
      type: "Hill Viewpoint",
      locationLabel: "Central Province, Matale",
      latlng: [7.5167, 80.7333],
      description:
         "A grassland ridge in the Knuckles foothills where the road runs along an exposed escarpment. The land drops away sharply and cloud pours over the ridge most afternoons.",
      directions:
         "On the Matale–Illukkumbura road, roughly 45 km from Matale. The viewpoints sit directly beside the road along the ridge.",
      tips: [
         "Wind here is severe — a tripod needs weighting or it will walk.",
         "Cloud spilling over the edge is the defining image, and it builds after midday.",
         "Mini World's End is a short walk from the same road.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Riverston_Matale.jpg/1280px-Riverston_Matale.jpg",
      city: "Matale",
      citySlug: "matale",
      district: "Matale",
      districtSlug: "matale",
      province: "Central Province",
      provinceSlug: "central-province",
      category: "VIEWPOINT",
      bestTimeOfDay: [
         "afternoon",
      ],
      shootingNotes:
         "Sustained high wind; keep shutter speeds up for anything handheld.",
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Knuckles Conservation Forest — check restrictions before flying.",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "nallur-kandaswamy",
      name: "Nallur Kandaswamy Kovil",
      type: "Hindu Temple",
      locationLabel: "Northern Province, Jaffna",
      latlng: [9.6753, 80.0286],
      description:
         "The principal Hindu temple of the north, with a golden-ochre gopuram and long colonnaded halls. Its August festival runs for weeks and draws enormous crowds.",
      directions:
         "On Point Pedro Road in Nallur, about 2 km north-east of central Jaffna.",
      tips: [
         "Men are required to remove shirts to enter the inner precinct — plan accordingly.",
         "Photography inside is restricted; the exterior gopuram is the reliable subject.",
         "Festival season in August is extraordinary but extremely crowded.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/1/14/Nallur_Kandaswamy_Temple_-_Jaffna.jpg",
      city: "Jaffna",
      citySlug: "jaffna",
      district: "Jaffna",
      districtSlug: "jaffna",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
         "evening",
      ],
      droneRule: "PROHIBITED",
      openingHours: "Roughly 05:00–20:00 with a midday break.",
      tripodAllowed: false,
   },
   {
      id: "jaffna-railway-station",
      name: "Jaffna Railway Station",
      type: "Railway Station",
      locationLabel: "Northern Province, Jaffna",
      latlng: [9.6611, 80.0236],
      description:
         "Destroyed during the conflict and rebuilt in 2014, the station marks the restoration of the northern line to Colombo. The architecture deliberately echoes the original colonial building.",
      directions:
         "In central Jaffna off Station Road, walkable from the town centre.",
      tips: [
         "Clean modern lines photograph well against the strong northern light.",
         "The long-distance Colombo train brings the platform to life at departure.",
         "Ask staff before setting up anything substantial on the platform.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Jaffna_Railway_Station_-_Sri_Lanka_%281%29.jpg/1280px-Jaffna_Railway_Station_-_Sri_Lanka_%281%29.jpg",
      city: "Jaffna",
      citySlug: "jaffna",
      district: "Jaffna",
      districtSlug: "jaffna",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "URBAN",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Railway property; the northern province may impose additional requirements.",
      openingHours: "Station operating hours.",
      tripodAllowed: true,
   },
   {
      id: "keerimalai-springs",
      name: "Keerimalai Springs",
      type: "Mineral Springs",
      locationLabel: "Northern Province, Keerimalai",
      latlng: [9.8167, 80],
      description:
         "Walled freshwater bathing pools fed by mineral springs, sitting right at the sea's edge with the Naguleswaram temple nearby. The fresh water stays separate from the ocean only metres away.",
      directions:
         "On the northern coast about 20 km from Jaffna town, beyond Tellippalai.",
      tips: [
         "The pools are segregated by gender and actively used — be discreet.",
         "The contrast of walled pool against open sea is the frame worth finding.",
         "Hard northern light all day; early or late is the only soft option.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Keerimalai_Hot_springs_jaffna.jpg/1280px-Keerimalai_Hot_springs_jaffna.jpg",
      city: "Keerimalai",
      citySlug: "keerimalai",
      district: "Jaffna",
      districtSlug: "jaffna",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "VIEWPOINT",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Coastal northern province; security sensitivities remain in some areas.",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "nainativu-temple",
      name: "Nainativu Nagapooshani Amman Temple",
      type: "Island Temple",
      locationLabel: "Northern Province, Nainativu",
      latlng: [9.6103, 79.7761],
      description:
         "A Hindu temple on a small island off the Jaffna peninsula, reached only by ferry. Its tall painted gopuram rises straight out of a flat island with almost nothing else around it.",
      directions:
         "Ferry from Kurikadduwan jetty, roughly 35 km west of Jaffna. Boats run frequently through the day and the crossing is short.",
      tips: [
         "The ferry approach is the best angle on the gopuram — shoot from the boat.",
         "A Buddhist vihara shares the island, making it an unusual double site.",
         "Ferries stop by late afternoon; do not get caught on the island.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Nainativu_Nagapooshani_Amman_Temple.jpg/1280px-Nainativu_Nagapooshani_Amman_Temple.jpg",
      city: "Nainativu",
      citySlug: "nainativu",
      district: "Jaffna",
      districtSlug: "jaffna",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Island with naval presence nearby; seek local clearance first.",
      openingHours: "Roughly 06:00–18:00, governed by ferry times.",
      tripodAllowed: false,
   },
   {
      id: "delft-island",
      name: "Delft Island",
      type: "Remote Island",
      locationLabel: "Northern Province, Delft",
      latlng: [9.5167, 79.6833],
      description:
         "A flat coral island west of the Jaffna peninsula, known for walls built from coral blocks, a population of feral ponies descended from Portuguese stock, and a baobab tree far from its native range.",
      directions:
         "Ferry from Kurikadduwan jetty, around an hour each way. Services are limited and fill up, so start early.",
      tips: [
         "Coral walls and open scrub give the island its distinctive flat, bleached look.",
         "The ponies are wild — use a long lens rather than approaching them.",
         "Almost no shade or facilities; carry water and sun protection.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Delft_evening.jpg/1280px-Delft_evening.jpg",
      city: "Delft",
      citySlug: "delft",
      district: "Jaffna",
      districtSlug: "jaffna",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "NATURE_TRAIL",
      bestTimeOfDay: [
         "morning",
         "evening",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Naval-administered ferry route and island; clearance advised.",
      openingHours:
         "Governed by ferry times, typically morning departures and afternoon returns.",
      tripodAllowed: true,
   },
   {
      id: "elephant-pass-memorial",
      name: "Elephant Pass Memorial",
      type: "War Memorial",
      locationLabel: "Northern Province, Elephant Pass",
      latlng: [9.4833, 80.4],
      description:
         "A memorial on the narrow causeway linking the Jaffna peninsula to the mainland, marking one of the most strategically contested points of the civil war. Lagoon water lies flat on both sides.",
      directions:
         "On the A9 highway at Elephant Pass, roughly 45 km south of Jaffna. The memorial sits directly beside the road.",
      tips: [
         "Treat it as a place of remembrance first — keep the approach respectful.",
         "Flat lagoon on both sides gives strong symmetry and very big skies.",
         "Almost no cover; the light is harsh from mid-morning onward.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Elephant_Pass_Memorial_And_Tree.jpg/1280px-Elephant_Pass_Memorial_And_Tree.jpg",
      city: "Elephant Pass",
      citySlug: "elephant-pass",
      district: "Kilinochchi",
      districtSlug: "kilinochchi",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      droneRule: "PROHIBITED",
      droneNotes: "Militarily sensitive location; do not fly.",
      openingHours: "Accessible any time from the highway.",
      tripodAllowed: true,
   },
   {
      id: "adams-bridge",
      name: "Adam's Bridge Sandbanks",
      type: "Coastal Sandbanks",
      locationLabel: "Northern Province, Mannar",
      latlng: [9.1, 79.5167],
      description:
         "A chain of sandbanks and shoals running from Mannar towards India, exposed at low tide and steeped in the Ramayana. The seaward end of Mannar island is bare dune and shallow water.",
      directions:
         "From Talaimannar at the western tip of Mannar island, about 350 km from Colombo. The final stretch beyond the village is sand track.",
      tips: [
         "Low tide exposes the sand chain — check tide times before travelling out.",
         "Treeless dunes and shallow water suit minimal, horizon-led composition.",
         "Boat access is restricted near the maritime border; stay on the island side.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/e/ea/Adams_Bridge_aerial.jpg",
      city: "Mannar",
      citySlug: "mannar",
      district: "Mannar",
      districtSlug: "mannar",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "BEACH",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      droneRule: "PROHIBITED",
      droneNotes:
         "Close to the international maritime boundary with naval oversight.",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "mannar-dutch-fort",
      name: "Mannar Dutch Fort",
      type: "Colonial Fort",
      locationLabel: "Northern Province, Mannar",
      latlng: [8.9814, 79.9142],
      description:
         "A square Dutch fort with corner bastions guarding the causeway onto Mannar island, built over an earlier Portuguese structure and now weathered and largely open to walk.",
      directions:
         "At the entrance to Mannar town beside the causeway, about 10 minutes from the bridge.",
      tips: [
         "Bastion walls make strong geometric lines against the flat surroundings.",
         "Masonry is unstable in places — watch your footing on the ramparts.",
         "Pair it with the nearby baobab trees, which grow nowhere else in the country.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Mannar_Dutch_Fort.jpg/1280px-Mannar_Dutch_Fort.jpg",
      city: "Mannar",
      citySlug: "mannar",
      district: "Mannar",
      districtSlug: "mannar",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
         "evening",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes:
         "Protected archaeological site in a security-sensitive province.",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "madhu-church",
      name: "Our Lady of Madhu Church",
      type: "Historic Church",
      locationLabel: "Northern Province, Madhu",
      latlng: [8.6167, 80.1833],
      description:
         "A Catholic shrine in forest inland from Mannar, over 400 years old and a pilgrimage site that drew people across ethnic and religious lines even through the conflict years.",
      directions:
         "Inland from Madhu Road, roughly 50 km east of Mannar town, approached through forest.",
      tips: [
         "The white façade against dense forest is the frame that defines the place.",
         "August festival days bring vast crowds; ordinary days are near-silent.",
         "An active shrine — be discreet around anyone praying.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/d/d6/Madhu_Church_%28Madu_Church%29.jpg",
      city: "Madhu",
      citySlug: "madhu",
      district: "Mannar",
      districtSlug: "mannar",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
      ],
      droneRule: "PROHIBITED",
      droneNotes: "Religious site in a sensitive area.",
      openingHours: "Daylight hours; festival periods extend much later.",
      tripodAllowed: true,
   },
   {
      id: "point-pedro",
      name: "Point Pedro",
      type: "Coastal Viewpoint",
      locationLabel: "Northern Province, Point Pedro",
      latlng: [9.8167, 80.2333],
      description:
         "The northernmost point of Sri Lanka, with a working fishing harbour, a lighthouse and wide palmyra-backed beaches. The light here is harder and clearer than anywhere further south.",
      directions:
         "About 30 km north-east of Jaffna town by road through the peninsula's palmyra country.",
      tips: [
         "The fishing harbour at dawn is the most active subject in the area.",
         "Palmyra palms give the north its distinctive skyline — use them.",
         "Very little shade; midday light here is unforgiving.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Point_Pedro_Beach.jpg/1280px-Point_Pedro_Beach.jpg",
      city: "Point Pedro",
      citySlug: "point-pedro",
      district: "Jaffna",
      districtSlug: "jaffna",
      province: "Northern Province",
      provinceSlug: "northern-province",
      category: "BEACH",
      bestTimeOfDay: [
         "sunrise",
      ],
      droneRule: "PERMIT_REQUIRED",
      droneNotes: "Northern coastal area with naval presence; seek clearance.",
      openingHours: "Open at all hours.",
      tripodAllowed: true,
   },
   {
      id: "marble-beach",
      name: "Marble Beach",
      type: "Public Beach",
      locationLabel: "Eastern Province, Trincomalee",
      latlng: [8.5167, 81.1833],
      description:
         "A sheltered cove south of Trincomalee named for water so still and clear it looks like polished stone. Forest comes down almost to the sand and the bay stays calm when the open coast is rough.",
      directions:
         "Off the Trincomalee–Nilaveli road near China Bay, about 15 km from Trincomalee town.",
      tips: [
         "Exceptional water clarity — shoot from slightly above to show it.",
         "Calm sheltered water makes this the easiest east-coast spot for in-water work.",
         "Run as a managed facility, so a small entry charge may apply.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/d/d7/Marble_beach_Trincomalee.jpg",
      city: "Trincomalee",
      citySlug: "trincomalee",
      district: "Trincomalee",
      districtSlug: "trincomalee",
      province: "Eastern Province",
      provinceSlug: "eastern-province",
      category: "BEACH",
      bestTimeOfDay: [
         "morning",
      ],
      bestMonths: [
         5,
         6,
         7,
         8,
         9,
      ],
      entryFee: "Small entry charge at the gate.",
      isFree: false,
      droneRule: "PERMIT_REQUIRED",
      droneNotes: "Adjacent to air force land; clearance required.",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "pasikuda-beach",
      name: "Pasikuda Beach",
      type: "Public Beach",
      locationLabel: "Eastern Province, Pasikuda",
      latlng: [7.9256, 81.5636],
      description:
         "A broad shallow bay on the east coast where the water stays waist-deep hundreds of metres out, producing long flat expanses of sea with almost no break.",
      directions:
         "About 35 km north of Batticaloa, signposted off the coast road near Kalkudah.",
      tips: [
         "The shallow shelf lets you walk far out for sea-level angles back to shore.",
         "East-facing, so sunrise is the main event here.",
         "Resort frontage dominates the centre; the ends of the bay stay more open.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Pasikuda_beach.jpg/1280px-Pasikuda_beach.jpg",
      city: "Pasikuda",
      citySlug: "pasikuda",
      district: "Batticaloa",
      districtSlug: "batticaloa",
      province: "Eastern Province",
      provinceSlug: "eastern-province",
      category: "BEACH",
      bestTimeOfDay: [
         "sunrise",
      ],
      bestMonths: [
         5,
         6,
         7,
         8,
         9,
      ],
      droneRule: "ALLOWED",
      openingHours: "Open at all hours.",
      tripodAllowed: true,
   },
   {
      id: "batticaloa-lagoon",
      name: "Batticaloa Lagoon",
      type: "Coastal Lagoon",
      locationLabel: "Eastern Province, Batticaloa",
      latlng: [7.7167, 81.7],
      description:
         "A long brackish lagoon threading through Batticaloa, crossed by old iron bridges and lined with fishing craft. Local lore holds that the lagoon fish sing on still nights near the Kallady bridge.",
      directions:
         "Surrounds Batticaloa town; the Kallady bridge and the lagoon road either side are the usual vantage points.",
      tips: [
         "Fishing boats at dawn against flat water are the reliable frame here.",
         "The old iron bridge gives structure to otherwise featureless wides.",
         "Sunset colour over the lagoon is often better than over the open sea.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Batticaloa_lagoon%2C_sunset.jpg/1280px-Batticaloa_lagoon%2C_sunset.jpg",
      city: "Batticaloa",
      citySlug: "batticaloa",
      district: "Batticaloa",
      districtSlug: "batticaloa",
      province: "Eastern Province",
      provinceSlug: "eastern-province",
      category: "NATURE_TRAIL",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      droneRule: "ALLOWED",
      openingHours: "Open at all hours.",
      tripodAllowed: true,
   },
   {
      id: "lovers-leap-trincomalee",
      name: "Lovers Leap",
      type: "Clifftop Viewpoint",
      locationLabel: "Eastern Province, Trincomalee",
      latlng: [8.5819, 81.2472],
      description:
         "The cliff edge on Swami Rock beside Koneswaram, dropping straight into deep water. The outlook runs along the Trincomalee coastline with nothing between the cliff and the sea.",
      directions:
         "On Swami Rock inside Fort Frederick, a short walk from Koneswaram Temple. Carry ID for the fort checkpoint.",
      tips: [
         "The cliff edge is unfenced in places — set up well back.",
         "Whales and dolphins pass offshore in season; a long lens is worth carrying.",
         "Morning light comes off the sea and lifts the whole cliff face.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/f/fd/Lovers_Leap_1.jpg",
      city: "Trincomalee",
      citySlug: "trincomalee",
      district: "Trincomalee",
      districtSlug: "trincomalee",
      province: "Eastern Province",
      provinceSlug: "eastern-province",
      category: "VIEWPOINT",
      bestTimeOfDay: [
         "sunrise",
         "morning",
      ],
      bestMonths: [
         5,
         6,
         7,
         8,
         9,
      ],
      droneRule: "PROHIBITED",
      droneNotes: "Inside an active naval fort.",
      openingHours: "Daylight hours, within fort opening times.",
      tripodAllowed: true,
   },
   {
      id: "abhayagiri-dagoba",
      name: "Abhayagiri Dagoba",
      type: "Ancient Stupa",
      locationLabel: "North Central Province, Anuradhapura",
      latlng: [8.3703, 80.3956],
      description:
         "A vast brick stupa at the centre of what was once a monastery of thousands of monks. Left largely unrendered, so the raw brickwork reads very differently from the whitewashed domes nearby.",
      directions:
         "In the northern part of the Anuradhapura sacred city, reached by the ring road through the ruins.",
      tips: [
         "Bare brick takes warm light far better than whitewashed stupas do.",
         "The surrounding monastery ruins give foreground the stupa alone lacks.",
         "Shoes off and shoulders covered on the stupa platform.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Abhayagiri_Dagoba_in_Anuradhapura%2C_Sri_Lanka.jpg/1280px-Abhayagiri_Dagoba_in_Anuradhapura%2C_Sri_Lanka.jpg",
      city: "Anuradhapura",
      citySlug: "anuradhapura",
      district: "Anuradhapura",
      districtSlug: "anuradhapura",
      province: "North Central Province",
      provinceSlug: "north-central-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      entryFee:
         "Within the ticketed archaeological zone for foreign visitors.",
      isFree: false,
      droneRule: "PROHIBITED",
      droneNotes:
         "World Heritage site — Department of Archaeology clearance required.",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "jetavanaramaya",
      name: "Jetavanaramaya",
      type: "Ancient Stupa",
      locationLabel: "North Central Province, Anuradhapura",
      latlng: [8.3528, 80.4039],
      description:
         "Built in the 3rd century, this was once among the tallest structures in the ancient world and remains one of the largest brick monuments ever raised. Its scale is hard to register until you stand under it.",
      directions:
         "In the eastern part of the Anuradhapura sacred city, near the Jetavana monastery ruins.",
      tips: [
         "Include a person for scale or the size simply will not read.",
         "Weathered brick holds detail that flat midday light destroys.",
         "The ruined monastery around it is as photogenic as the dome.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jetavanaramaya_Stupa_profile.jpg/1280px-Jetavanaramaya_Stupa_profile.jpg",
      city: "Anuradhapura",
      citySlug: "anuradhapura",
      district: "Anuradhapura",
      districtSlug: "anuradhapura",
      province: "North Central Province",
      provinceSlug: "north-central-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      entryFee:
         "Within the ticketed archaeological zone for foreign visitors.",
      isFree: false,
      droneRule: "PROHIBITED",
      droneNotes: "World Heritage site — clearance required.",
      openingHours: "Daylight hours.",
      tripodAllowed: true,
   },
   {
      id: "isurumuniya",
      name: "Isurumuniya Rock Temple",
      type: "Rock Temple",
      locationLabel: "North Central Province, Anuradhapura",
      latlng: [8.3389, 80.3967],
      description:
         "A temple carved into and around a rock outcrop beside a bathing pool, best known for the Isurumuniya Lovers relief and carvings of elephants worked directly into the stone face.",
      directions:
         "South of the Anuradhapura sacred city near Tissa Wewa, a short drive from the main ruins.",
      tips: [
         "The elephant carvings at water level are easy to walk straight past — look low.",
         "Climbing the rock gives a view over the tank behind the temple.",
         "The famous Lovers relief sits in a small museum room, not outdoors.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Isurumuniya_Rock_Temple.jpg/1280px-Isurumuniya_Rock_Temple.jpg",
      city: "Anuradhapura",
      citySlug: "anuradhapura",
      district: "Anuradhapura",
      districtSlug: "anuradhapura",
      province: "North Central Province",
      provinceSlug: "north-central-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
         "evening",
      ],
      entryFee: "Separate small charge at the temple entrance.",
      isFree: false,
      droneRule: "PROHIBITED",
      droneNotes: "Protected archaeological site.",
      openingHours: "Roughly 07:00–18:00.",
      tripodAllowed: true,
   },
   {
      id: "mihintale",
      name: "Mihintale",
      type: "Sacred Hill",
      locationLabel: "North Central Province, Mihintale",
      latlng: [8.3528, 80.5097],
      description:
         "The hill where Buddhism is said to have been introduced to Sri Lanka in 247 BC. A long granite stairway climbs past monastery ruins to stupas and a white Buddha statue at the summit.",
      directions:
         "About 13 km east of Anuradhapura on the Trincomalee road. Roughly 1,840 steps lead from the car park to the top.",
      tips: [
         "The wide lower stairway framed by trees is the classic approach shot.",
         "Sunset from the summit looks back over the Anuradhapura plain.",
         "Shoes come off well before the summit — the granite gets very hot.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Mihintale_Peak_Sri_Lanka.jpg/1280px-Mihintale_Peak_Sri_Lanka.jpg",
      city: "Mihintale",
      citySlug: "mihintale",
      district: "Anuradhapura",
      districtSlug: "anuradhapura",
      province: "North Central Province",
      provinceSlug: "north-central-province",
      category: "VIEWPOINT",
      bestTimeOfDay: [
         "sunrise",
         "evening",
      ],
      entryFee: "Charge applies for foreign visitors.",
      isFree: false,
      droneRule: "PROHIBITED",
      droneNotes: "Sacred site under Department of Archaeology protection.",
      openingHours: "Roughly 07:00–19:00.",
      tripodAllowed: true,
   },
   {
      id: "minneriya-tank",
      name: "Minneriya Tank",
      type: "Ancient Reservoir",
      locationLabel: "North Central Province, Minneriya",
      latlng: [8.0333, 80.8833],
      description:
         "A reservoir built in the 3rd century and still in use, with grassland exposed along its bed as water recedes. That grass draws large numbers of wild elephants in the dry season.",
      directions:
         "On the Habarana–Polonnaruwa road, about 10 km from Habarana. The tank is visible from the main road and park entrance.",
      tips: [
         "Dry-season months concentrate elephants on the exposed lake bed.",
         "A long lens is essential — never approach wild elephants for a closer frame.",
         "Late afternoon brings both the animals and the best light.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Minneriya_tank-sri_lanka.jpg/1280px-Minneriya_tank-sri_lanka.jpg",
      city: "Minneriya",
      citySlug: "minneriya",
      district: "Polonnaruwa",
      districtSlug: "polonnaruwa",
      province: "North Central Province",
      provinceSlug: "north-central-province",
      category: "NATURE_TRAIL",
      bestTimeOfDay: [
         "afternoon",
         "evening",
      ],
      bestMonths: [
         6,
         7,
         8,
         9,
         10,
      ],
      entryFee:
         "Free from public roads; national park entry is charged separately.",
      droneRule: "PROHIBITED",
      droneNotes: "National park airspace — drones are not permitted.",
      openingHours: "Roadside views any time; park entry has set hours.",
      tripodAllowed: true,
   },
   {
      id: "yapahuwa-rock",
      name: "Yapahuwa Rock Fortress",
      type: "Rock Fortress",
      locationLabel: "North Western Province, Maho",
      latlng: [7.8139, 80.3],
      description:
         "A granite outcrop rising abruptly from flat scrub, briefly the royal capital in the 13th century and guarded by an ornamental stone stairway that ranks among the finest carved work of its period.",
      directions:
         "Near Maho, roughly 50 km north of Kurunegala. The site is signposted from the Maho–Daladagama road.",
      tips: [
         "The ornamental stairway and lion sculpture are the signature subject, not the summit view.",
         "Steps are steep and worn — take care carrying kit above the stairway.",
         "Low sun rakes across the carved balustrades and lifts the detail.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Ancient_Kingdome_of_Yapahuwa%2C_Sri_Lanka.jpg/1280px-Ancient_Kingdome_of_Yapahuwa%2C_Sri_Lanka.jpg",
      city: "Maho",
      citySlug: "maho",
      district: "Kurunegala",
      districtSlug: "kurunegala",
      province: "North Western Province",
      provinceSlug: "north-western-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
         "evening",
      ],
      entryFee: "Charge applies for foreign visitors.",
      isFree: false,
      droneRule: "PROHIBITED",
      droneNotes: "Protected archaeological site.",
      openingHours: "Roughly 07:30–17:30.",
      tripodAllowed: true,
   },
   {
      id: "munneswaram-temple",
      name: "Munneswaram Temple",
      type: "Hindu Temple",
      locationLabel: "North Western Province, Chilaw",
      latlng: [7.5667, 79.8333],
      description:
         "An ancient Shaiva temple complex east of Chilaw, referenced in the Ramayana and drawing both Hindu and Buddhist worshippers. Five separate shrines sit within one walled precinct.",
      directions:
         "About 3 km east of Chilaw on the Kurunegala road, roughly 80 km north of Colombo.",
      tips: [
         "The painted gopuram is the strongest exterior frame, especially in low sun.",
         "An active temple — ask before photographing rituals or worshippers.",
         "The August festival brings fire-walking and very large crowds.",
      ],
      imageSrc:
         "https://upload.wikimedia.org/wikipedia/commons/c/c5/Munneswaram.jpg",
      city: "Chilaw",
      citySlug: "chilaw",
      district: "Puttalam",
      districtSlug: "puttalam",
      province: "North Western Province",
      provinceSlug: "north-western-province",
      category: "TEMPLE_LANDMARK",
      bestTimeOfDay: [
         "morning",
         "evening",
      ],
      droneRule: "PROHIBITED",
      openingHours: "Roughly 06:00–18:00 with a midday closure.",
      tripodAllowed: false,
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
