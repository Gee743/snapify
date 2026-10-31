import { NextResponse } from "next/server";
import { getPublicSpaces } from "@/app/actions/getPublicSpaces";

export const dynamic = "force-dynamic";

export async function GET() {
   const spaces = await getPublicSpaces();
   return NextResponse.json(spaces);
}
