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
import { STUDIO_TYPE_SLUGS, StudioTypeValue } from "@/app/libs/studioTaxonomy";

interface RouteContext {
   params: { slug: string };
}

const isAuthorized = (request: Request) =>
   isValidAdminSession(getAdminSessionTokenFromRequest(request));

/** Refresh every page a studio appears on, including its type hub. */
const revalidateStudio = (slug: string, studioType?: string | null) => {
   revalidatePath("/");
   revalidatePath("/studios");
   revalidatePath(`/studios/${slug}`);
   if (studioType && studioType in STUDIO_TYPE_SLUGS) {
      revalidatePath(`/studios/type/${STUDIO_TYPE_SLUGS[studioType as StudioTypeValue]}`);
   }
};

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

   const input = parseStudioInput(body);
   if (!input) {
      return NextResponse.json(
         { error: "Please check all studio details and try again." },
         { status: 400 }
      );
   }

   const { category: _category, ...location } = deriveSpaceFields({
      locationLabel: input.locationLabel,
      type: input.type,
   });

   try {
      // Read the previous type first: if an edit moves a studio between type
      // hubs, the hub it left needs revalidating too or it keeps serving the
      // studio from cache.
      const previous = await prisma.studio.findUnique({
         where: { slug: params.slug },
         select: { studioType: true },
      });

      const studio = await prisma.studio.update({
         where: { slug: params.slug },
         // Re-derive on update: locationLabel may have changed, which moves the
         // studio between areas.
         data: { ...input, ...location },
      });

      revalidateStudio(params.slug, studio.studioType);
      if (previous && previous.studioType !== studio.studioType) {
         revalidateStudio(params.slug, previous.studioType);
      }
      if (studio.slug !== params.slug) revalidateStudio(studio.slug, studio.studioType);

      return NextResponse.json(toStudioRecord(studio));
   } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error) {
         if (error.code === "P2025") {
            return NextResponse.json({ error: "Studio not found." }, { status: 404 });
         }
         if (error.code === "P2002") {
            return NextResponse.json({ error: "That URL slug is already in use." }, { status: 409 });
         }
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
      const studio = await prisma.studio.delete({ where: { slug: params.slug } });
      revalidateStudio(params.slug, studio.studioType);
      return NextResponse.json({ deleted: true });
   } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error && error.code === "P2025") {
         return NextResponse.json({ error: "Studio not found." }, { status: 404 });
      }
      throw error;
   }
}
