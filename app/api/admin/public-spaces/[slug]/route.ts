import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import {
   getAdminSessionTokenFromRequest,
   isSameOriginRequest,
   isValidAdminSession,
} from "@/app/libs/adminAuth";
import { toPublicSpaceRecord } from "@/app/actions/getPublicSpaces";
import { parsePublicSpaceInput } from "@/app/libs/publicSpaceValidation";

interface RouteContext {
   params: { slug: string };
}

const isAuthorized = (request: Request) =>
   isValidAdminSession(getAdminSessionTokenFromRequest(request));

export async function PUT(request: Request, { params }: RouteContext) {
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
      const space = await prisma.publicSpace.update({
         where: { slug: params.slug },
         data: input,
      });
      return NextResponse.json(toPublicSpaceRecord(space));
   } catch (error) {
      if (
         typeof error === "object" &&
         error !== null &&
         "code" in error &&
         error.code === "P2025"
      ) {
         return NextResponse.json({ error: "Space not found." }, { status: 404 });
      }
      if (
         typeof error === "object" &&
         error !== null &&
         "code" in error &&
         error.code === "P2002"
      ) {
         return NextResponse.json({ error: "That URL slug is already in use." }, { status: 409 });
      }
      throw error;
   }
}

export async function DELETE(request: Request, { params }: RouteContext) {
   if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
   }
   if (!isSameOriginRequest(request)) {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
   }

   try {
      await prisma.publicSpace.delete({ where: { slug: params.slug } });
      return NextResponse.json({ deleted: true });
   } catch (error) {
      if (
         typeof error === "object" &&
         error !== null &&
         "code" in error &&
         error.code === "P2025"
      ) {
         return NextResponse.json({ error: "Space not found." }, { status: 404 });
      }
      throw error;
   }
}
