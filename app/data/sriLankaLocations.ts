export type SriLankaLocation = {
   value: string;
   label: string;
   flag: string;
   latlng: number[];
   region: string;
};

const sriLankaLocations: SriLankaLocation[] = [
   // Western Province
   {
      value: "colombo",
      label: "Colombo",
      flag: "🇱🇰",
      latlng: [6.9271, 79.8612],
      region: "Western Province",
   },
   {
      value: "gampaha",
      label: "Gampaha",
      flag: "🇱🇰",
      latlng: [7.0917, 79.999],
      region: "Western Province",
   },
   {
      value: "kalutara",
      label: "Kalutara",
      flag: "🇱🇰",
      latlng: [6.5854, 79.9607],
      region: "Western Province",
   },
   // Central Province
   {
      value: "kandy",
      label: "Kandy",
      flag: "🇱🇰",
      latlng: [7.2906, 80.6337],
      region: "Central Province",
   },
   {
      value: "matale",
      label: "Matale",
      flag: "🇱🇰",
      latlng: [7.4675, 80.6234],
      region: "Central Province",
   },
   {
      value: "nuwara-eliya",
      label: "Nuwara Eliya",
      flag: "🇱🇰",
      latlng: [6.9497, 80.7891],
      region: "Central Province",
   },
   // Southern Province
   {
      value: "galle",
      label: "Galle",
      flag: "🇱🇰",
      latlng: [6.0535, 80.221],
      region: "Southern Province",
   },
   {
      value: "matara",
      label: "Matara",
      flag: "🇱🇰",
      latlng: [5.9549, 80.555],
      region: "Southern Province",
   },
   {
      value: "hambantota",
      label: "Hambantota",
      flag: "🇱🇰",
      latlng: [6.1241, 81.1185],
      region: "Southern Province",
   },
   // Northern Province
   {
      value: "jaffna",
      label: "Jaffna",
      flag: "🇱🇰",
      latlng: [9.6615, 80.0255],
      region: "Northern Province",
   },
   {
      value: "kilinochchi",
      label: "Kilinochchi",
      flag: "🇱🇰",
      latlng: [9.3803, 80.377],
      region: "Northern Province",
   },
   {
      value: "mannar",
      label: "Mannar",
      flag: "🇱🇰",
      latlng: [8.981, 79.9044],
      region: "Northern Province",
   },
   {
      value: "vavuniya",
      label: "Vavuniya",
      flag: "🇱🇰",
      latlng: [8.7514, 80.4971],
      region: "Northern Province",
   },
   {
      value: "mullaitivu",
      label: "Mullaitivu",
      flag: "🇱🇰",
      latlng: [9.2671, 80.8142],
      region: "Northern Province",
   },
   // Eastern Province
   {
      value: "batticaloa",
      label: "Batticaloa",
      flag: "🇱🇰",
      latlng: [7.7102, 81.6924],
      region: "Eastern Province",
   },
   {
      value: "ampara",
      label: "Ampara",
      flag: "🇱🇰",
      latlng: [7.3018, 81.6747],
      region: "Eastern Province",
   },
   {
      value: "trincomalee",
      label: "Trincomalee",
      flag: "🇱🇰",
      latlng: [8.5874, 81.2152],
      region: "Eastern Province",
   },
   // North Western Province
   {
      value: "kurunegala",
      label: "Kurunegala",
      flag: "🇱🇰",
      latlng: [7.4818, 80.3609],
      region: "North Western Province",
   },
   {
      value: "puttalam",
      label: "Puttalam",
      flag: "🇱🇰",
      latlng: [8.0362, 79.8283],
      region: "North Western Province",
   },
   // North Central Province
   {
      value: "anuradhapura",
      label: "Anuradhapura",
      flag: "🇱🇰",
      latlng: [8.3114, 80.4037],
      region: "North Central Province",
   },
   {
      value: "polonnaruwa",
      label: "Polonnaruwa",
      flag: "🇱🇰",
      latlng: [7.9403, 81.0188],
      region: "North Central Province",
   },
   // Uva Province
   {
      value: "badulla",
      label: "Badulla",
      flag: "🇱🇰",
      latlng: [6.9934, 81.055],
      region: "Uva Province",
   },
   {
      value: "monaragala",
      label: "Monaragala",
      flag: "🇱🇰",
      latlng: [6.8728, 81.3507],
      region: "Uva Province",
   },
   // Sabaragamuwa Province
   {
      value: "ratnapura",
      label: "Ratnapura",
      flag: "🇱🇰",
      latlng: [6.7056, 80.3847],
      region: "Sabaragamuwa Province",
   },
   {
      value: "kegalle",
      label: "Kegalle",
      flag: "🇱🇰",
      latlng: [7.2513, 80.3464],
      region: "Sabaragamuwa Province",
   },
];

export default sriLankaLocations;
