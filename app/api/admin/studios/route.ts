import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/app/libs/prismadb";
import {
   getAdminSessionTokenFromRequest,
   isSameOriginRequest,
   isValidAdminSession,
} from "@/app/libs/adminAuth";
import { toStudioRecord } from "@/app/actions/getStudios";
import { parseStudioInput } from "@/app/libs/studioValidation";
import { deriveSpaceFields } from "@/app/libs/deriveSpaceFields";

const isAuthorized = (request: Request) =>
   isValidAdminSession(getAdminSessionTokenFromRequest(request));

export async function GET(request: Request) {
   if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
   }
   if (!isSameOriginRequest(request)) {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
   }

   // Every status, unlike the public reader: reviewing PENDING owner
   // submissions is the point of this screen.
   const studios = await prisma.studio.findMany({ orderBy: { createdAt: "desc" } });
   return NextResponse.json(studios.map(toStudioRecord));
}

export async function POST(request: Request) {
   if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
   }
   if (!isSameOriginRequest(request)) {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
   }

   let body: unknown;
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
   }

   const input = parseStudioInput(body);
   if (!input) {
      return NextResponse.json(
         { error: "Please check all studio details and try again." },
         { status: 400 }
      );
   }

   // Reuses the public-space derivation for city/district/province so a studio
   // and a public space in the same town resolve to identical slugs. Its
   // `category` output is for the public-space taxonomy and does not apply.
   const { category: _category, ...location } = deriveSpaceFields({
      locationLabel: input.locationLabel,
      type: input.type,
   });

   try {
      const studio = await prisma.studio.create({ data: { ...input, ...location } });
      revalidatePath("/studios");
      if (studio.status === "PUBLISHED") revalidatePath("/");
      return NextResponse.json(toStudioRecord(studio), { status: 201 });
   } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
         return NextResponse.json(
            { error: "That URL slug is already in use. Choose a different one." },
            { status: 409 }
         );
      }
      throw error;
   }
}
