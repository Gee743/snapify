import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import {
   getAdminSessionTokenFromRequest,
   isSameOriginRequest,
   isValidAdminSession,
} from "@/app/libs/adminAuth";
import { toPublicSpaceRecord } from "@/app/actions/getPublicSpaces";
import publicSpaces from "@/app/data/publicSpaces";
import { parsePublicSpaceInput } from "@/app/libs/publicSpaceValidation";

const isAuthorized = (request: Request) =>
   isValidAdminSession(getAdminSessionTokenFromRequest(request));

async function importInitialSpacesOnce() {
   const markerKey = "initial-public-spaces-imported";
   const marker = await prisma.publicSpaceBootstrap.findUnique({
      where: { key: markerKey },
   });
   if (marker?.completed) return;

   const existingCount = await prisma.publicSpace.count();
   if (existingCount === 0) {
      for (const space of publicSpaces) {
         await prisma.publicSpace.upsert({
            where: { slug: space.id },
            create: {
               slug: space.id,
               name: space.name,
               type: space.type,
               locationLabel: space.locationLabel,
               latlng: space.latlng,
               description: space.description,
               directions: space.directions,
               tips: space.tips,
               imageSrc: space.imageSrc,
            },
            update: {},
         });
      }
   }

   await prisma.publicSpaceBootstrap.upsert({
      where: { key: markerKey },
      create: { key: markerKey, completed: true },
      update: { completed: true },
   });
}

export async function GET(request: Request) {
   if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
   }

   await importInitialSpacesOnce();
   const spaces = await prisma.publicSpace.findMany({
      orderBy: { createdAt: "desc" },
   });
   return NextResponse.json(spaces.map(toPublicSpaceRecord));
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

   const input = parsePublicSpaceInput(body);
   if (!input) {
      return NextResponse.json({ error: "Please check all space details and try again." }, { status: 400 });
   }

   try {
      const space = await prisma.publicSpace.create({ data: input });
      return NextResponse.json(toPublicSpaceRecord(space), { status: 201 });
   } catch (error) {
      if (
         typeof error === "object" &&
         error !== null &&
         "code" in error &&
         error.code === "P2002"
      ) {
         return NextResponse.json(
            { error: "That URL slug is already in use. Choose a different one." },
            { status: 409 }
         );
      }
      throw error;
   }
}
