import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { parseNewsletterEmail } from "@/app/libs/leadValidation";
import { clientKey, isRateLimited } from "@/app/libs/rateLimit";

export async function POST(request: Request) {
   if (isRateLimited(`newsletter:${clientKey(request)}`)) {
      return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
   }

   let body: unknown;
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
   }

   const input = parseNewsletterEmail(body);
   if (!input) {
      return NextResponse.json({ error: "That email address does not look right." }, { status: 400 });
   }

   // Already-subscribed is a success from the subscriber's point of view, so it
   // reports ok rather than leaking whether an address is on the list.
   await prisma.newsletterSubscriber.upsert({
      where: { email: input.email },
      create: input,
      update: {},
   });

   return NextResponse.json({ ok: true }, { status: 201 });
}
