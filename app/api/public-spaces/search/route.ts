import { NextResponse } from "next/server";
import { getPublicSpaces } from "@/app/actions/getPublicSpaces";
import { getPublicSpaceCity } from "@/app/data/publicSpaces";

export const revalidate = 3600;

/**
 * Lightweight search index for the navbar typeahead.
 *
 * The whole catalogue is a few hundred rows at most, so shipping a trimmed
 * index once and filtering in the browser gives instant results with no
 * per-keystroke round trip. Only the fields the suggestion row renders are
 * included -- descriptions and tips would multiply the payload for nothing.
 */
export async function GET() {
   const spaces = await getPublicSpaces();
   return NextResponse.json(
      spaces.map((space) => ({
         id: space.id,
         name: space.name,
         type: space.type,
         city: getPublicSpaceCity(space),
         category: space.category ?? null,
      })),
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
   );
}
