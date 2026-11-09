/**
 * Sunrise/sunset from latitude, longitude and date using the NOAA solar
 * equations. No API and no dependency -- the whole point is that golden-hour
 * guidance costs nothing per place.
 *
 * Accurate to roughly a minute, which is far finer than a shoot needs.
 */
const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

const toJulian = (date: Date) => date.valueOf() / 86400000 + 2440587.5;
const fromJulian = (julian: number) => new Date((julian - 2440587.5) * 86400000);

/** Hour angle for a given solar altitude; null when the sun never reaches it. */
const hourAngle = (altitude: number, latitude: number, declination: number) => {
   const cosH =
      (Math.sin(altitude * RAD) - Math.sin(latitude * RAD) * Math.sin(declination)) /
      (Math.cos(latitude * RAD) * Math.cos(declination));
   if (cosH > 1 || cosH < -1) return null;
   return Math.acos(cosH);
};

const solarEvents = (date: Date, latitude: number, longitude: number) => {
   const julian = toJulian(date);
   const days = Math.round(julian - 2451545.0 - 0.0009 - -longitude / 360) + 0.0009 + -longitude / 360;
   const meanAnomaly = (357.5291 + 0.98560028 * days) * RAD;
   const center =
      (1.9148 * Math.sin(meanAnomaly) +
         0.02 * Math.sin(2 * meanAnomaly) +
         0.0003 * Math.sin(3 * meanAnomaly)) *
      RAD;
   const eclipticLongitude = meanAnomaly + center + 102.9372 * RAD + Math.PI;
   const solarTransit = 2451545.0 + days + 0.0053 * Math.sin(meanAnomaly) - 0.0069 * Math.sin(2 * eclipticLongitude);
   const declination = Math.asin(Math.sin(eclipticLongitude) * Math.sin(23.44 * RAD));

   /** Returns [rise, set] for an altitude, or null at extreme latitudes. */
   const eventsAt = (altitude: number): [Date, Date] | null => {
      const h = hourAngle(altitude, latitude, declination);
      if (h === null) return null;
      const setJulian = 2451545.0 + (Math.round(julian - 2451545.0 - 0.0009 - (h * DEG + -longitude) / 360) + 0.0009 + (h * DEG + -longitude) / 360) + 0.0053 * Math.sin(meanAnomaly) - 0.0069 * Math.sin(2 * eclipticLongitude);
      const riseJulian = solarTransit - (setJulian - solarTransit);
      return [fromJulian(riseJulian), fromJulian(setJulian)];
   };

   return { eventsAt, solarTransit };
};

export interface SunTimes {
   sunrise: Date;
   sunset: Date;
   /** Golden hour: sun between -4 and +6 degrees. */
   goldenHourMorningEnd: Date;
   goldenHourEveningStart: Date;
   /** Blue hour: sun between -6 and -4 degrees. */
   blueHourMorningStart: Date;
   blueHourEveningEnd: Date;
}

export const getSunTimes = (
   latitude: number,
   longitude: number,
   date = new Date()
): SunTimes | null => {
   const { eventsAt } = solarEvents(date, latitude, longitude);

   const official = eventsAt(-0.833);
   const golden = eventsAt(6);
   const blue = eventsAt(-6);
   if (!official || !golden || !blue) return null;

   return {
      sunrise: official[0],
      sunset: official[1],
      goldenHourMorningEnd: golden[0],
      goldenHourEveningStart: golden[1],
      blueHourMorningStart: blue[0],
      blueHourEveningEnd: blue[1],
   };
};

/** Format in Sri Lanka time (UTC+5:30) regardless of where the server runs. */
export const formatSriLankaTime = (date: Date) =>
   new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Colombo",
      hour12: false,
   }).format(date);

/**
 * Monsoon guidance. The two monsoons hit opposite coasts, so the usable season
 * depends on which side a place is on -- this is the single most useful planning
 * fact for a Sri Lankan shoot and competitors treat it generically.
 */
export const getSeasonGuidance = (latitude: number, longitude: number) => {
   // Yala (southwest) monsoon ~May-Sept hits the west and south coasts.
   // Maha (northeast) monsoon ~Nov-Feb hits the north and east.
   //
   // The central highlands sit between the two and get rain off both, so they
   // are treated separately rather than being lumped in with the east on
   // longitude alone (Ella at 81.05E is hill country, not east coast).
   const isHighland = latitude > 6.5 && latitude < 7.5 && longitude > 80.4 && longitude < 81.2;
   if (isHighland) {
      return {
         bestMonths: [1, 2, 3, 4, 7, 8, 9],
         bestLabel: "January to April, and July to September",
         avoidLabel: "October to December (inter-monsoon rain)",
      };
   }

   const isEastern = longitude > 81.2;
   const isNorthern = latitude > 8.5;

   if (isEastern || isNorthern) {
      return {
         bestMonths: [4, 5, 6, 7, 8, 9],
         bestLabel: "April to September",
         avoidLabel: "November to February (northeast monsoon)",
      };
   }
   return {
      bestMonths: [12, 1, 2, 3, 4],
      bestLabel: "December to April",
      avoidLabel: "May to September (southwest monsoon)",
   };
};
