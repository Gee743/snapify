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
};

const publicSpaces: PublicSpace[] = [
   {
      id: "viharamahadevi-park",
      name: "Viharamahadevi Park",
      type: "Public Park",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9147, 79.8607],
      description:
         "Colombo’s largest urban park — lawns, banyan shade, and the Town Hall backdrop. Open to anyone, no booking or fee.",
      directions:
         "Opposite Town Hall on Sir Marcus Fernando Mawatha. Nearest bus hub is Pettah; rideshare drop-off at the south gate is easiest with gear.",
      tips: [
         "Golden hour on the lawns is the most flattering light.",
         "Weekday mornings are quiet; weekends fill with families.",
         "Drones usually need prior permission in this area.",
      ],
      imageSrc:
         "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: "galle-face-green",
      name: "Galle Face Green",
      type: "Coastal Promenade",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9271, 79.8442],
      description:
         "A wide oceanfront lawn for sunset portraits, street food color, and kite-flying silhouettes. Free, public, and always open.",
      directions:
         "Along Galle Face Centre Road, between the fort and Kollupitiya. Street parking lines the green; Galle Face Hotel is a useful landmark.",
      tips: [
         "Arrive 45 minutes before sunset for sky color without the biggest crowds.",
         "Wind is strong — secure light stands and hair/wardrobe.",
         "Street-food stalls make easy lifestyle B-roll after the shoot.",
      ],
      imageSrc:
         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: "independence-square",
      name: "Independence Square",
      type: "Public Landmark",
      locationLabel: "Western Province, Colombo",
      latlng: [6.9036, 79.8672],
      description:
         "Open memorial grounds and arcade columns that read well in both wide and editorial frames. No ticket, no booking.",
      directions:
         "Independence Avenue, Cinnamon Gardens. Arcade Independent Square mall is next door if you need shade or a café between setups.",
      tips: [
         "Columns work as a repeating background for walking shots.",
         "Early morning avoids joggers and harsh overhead sun.",
         "Be respectful during ceremonies — some areas may be briefly closed.",
      ],
      imageSrc:
         "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: "galle-fort-ramparts",
      name: "Galle Fort Ramparts",
      type: "Historic Walls",
      locationLabel: "Southern Province, Galle",
      latlng: [6.026, 80.217],
      description:
         "UNESCO fort walls with ocean, lighthouse, and colonial streets. Walking the ramparts is free.",
      directions:
         "Enter via the Main Gate off Church Street. The lighthouse and Flag Rock are the usual photo beats along the south wall.",
      tips: [
         "Lighthouse at blue hour is the classic frame.",
         "Stone gets hot — comfortable shoes, not props-only footwear.",
         "Narrow walls: keep kits compact and don’t block walkers.",
      ],
      imageSrc:
         "https://images.unsplash.com/photo-1586861635167-e825d4c8c1c3?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: "kandy-lake",
      name: "Kandy Lake",
      type: "Lakeside Walk",
      locationLabel: "Central Province, Kandy",
      latlng: [7.2906, 80.641],
      description:
         "A full loop around the lake with temple views and tree cover. Public path, no fee.",
      directions:
         "Start at Dalada Veediya near the Temple of the Tooth. The lakeside path is continuous and walkable with a small crew.",
      tips: [
         "Reflections are best on still mornings.",
         "Temple ceremonies can add atmosphere — keep a respectful distance.",
         "Clouds roll in fast; pack a rain cover for cameras.",
      ],
      imageSrc:
         "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: "mount-lavinia-beach",
      name: "Mount Lavinia Beach",
      type: "Public Beach",
      locationLabel: "Western Province, Colombo",
      latlng: [6.833, 79.863],
      description:
         "A long public beach south of Colombo for golden-hour portraits and casual lifestyle sets. No booking required.",
      directions:
         "Mount Lavinia Hotel steps lead to the sand; Mount Lavinia station is a short walk if you are coming by train with lighter kits.",
      tips: [
         "Late afternoon light is warmer and less crowded than midday.",
         "Watch the tide line if you are placing stands or a reflector.",
         "Hotels nearby are useful for changing, not required to shoot on the public sand.",
      ],
      imageSrc:
         "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1200&q=80",
   },
];

export const getPublicSpaceArea = (space: PublicSpace) =>
   space.locationLabel.split(",").at(-1)?.trim() ?? space.locationLabel;

export const publicSpaceAreas = Array.from(
   new Set(publicSpaces.map(getPublicSpaceArea))
).sort();

export const getPublicSpaceById = (id: string) =>
   publicSpaces.find((space) => space.id === id);

export default publicSpaces;
