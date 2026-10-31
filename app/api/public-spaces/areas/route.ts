import { NextResponse } from "next/server";
import { getPublicSpaceAreas } from "@/app/actions/getPublicSpaces";

export const dynamic = "force-dynamic";

export async function GET() {
   return NextResponse.json(await getPublicSpaceAreas());
}
