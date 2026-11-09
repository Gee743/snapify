import { PublicSpace } from "@/app/data/publicSpaces";

const EARTH_RADIUS_KM = 6371;
const toRad = (degrees: number) => (degrees * Math.PI) / 180;

/** Great-circle distance in km. */
export const distanceKm = (a: number[], b: number[]) => {
   const dLat = toRad(b[0] - a[0]);
   const dLon = toRad(b[1] - a[1]);
   const lat1 = toRad(a[0]);
   const lat2 = toRad(b[0]);
   const h =
      Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
   return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
};

/**
 * Nearest other places. Pure in-memory at this scale -- no geospatial index
 * needed -- and it is what stops detail pages from being link orphans.
 */
export const findNearby = (space: PublicSpace, all: PublicSpace[], limit = 4) =>
   all
      .filter((candidate) => candidate.id !== space.id)
      .map((candidate) => ({ space: candidate, km: distanceKm(space.latlng, candidate.latlng) }))
      .sort((a, b) => a.km - b.km)
      .slice(0, limit);
