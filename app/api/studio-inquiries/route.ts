import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { parseStudioInquiry } from "@/app/libs/studioValidation";
import { clientKey, isRateLimited } from "@/app/libs/rateLimit";

/**
 * Public enquiry endpoint for a bookable studio.
 *
 * Unauthenticated and rate limited, like /api/leads. The enquiry is stored
 * against the studio slug and read back in the admin leads inbox; the owner's
 * email never travels to the client, which is the whole reason enquiries route
 * through here instead of a mailto link on the page.
 */
export async function POST(request: Request) {
   if (isRateLimited(`studio-inquiry:${clientKey(request)}`)) {
      return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
   }

   let body: unknown;
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
   }

   const input = parseStudioInquiry(body);
   if (!input) {
      return NextResponse.json(
         { error: "Please check your name, email and shoot details, then try again." },
         { status: 400 }
      );
   }

   // Enquiries are only accepted for a studio that is actually published.
   // Without this check the endpoint would happily collect enquiries for any
   // slug a caller invents, filling the inbox with unattributable rows.
   const studio = await prisma.studio.findUnique({
      where: { slug: input.spaceSlug },
      select: { slug: true, name: true, status: true },
   });
   if (!studio || studio.status !== "PUBLISHED") {
      return NextResponse.json({ error: "That studio is not available." }, { status: 404 });
   }

   await prisma.spaceInquiry.create({
      data: {
         spaceSlug: studio.slug,
         // Trust the stored name over whatever the client sent, so the inbox
         // cannot be seeded with a misleading studio name.
         spaceName: studio.name,
         name: input.name,
         email: input.email,
         ...(input.phone && { phone: input.phone }),
         ...(input.shootDate && { shootDate: input.shootDate }),
         ...(input.crewSize !== undefined && { crewSize: input.crewSize }),
         ...(input.message && { message: input.message }),
      },
   });

   return NextResponse.json({ ok: true }, { status: 201 });
}
