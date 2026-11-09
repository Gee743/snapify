import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { parseOwnerLead } from "@/app/libs/leadValidation";
import { clientKey, isRateLimited } from "@/app/libs/rateLimit";

export async function POST(request: Request) {
   if (isRateLimited(`leads:${clientKey(request)}`)) {
      return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
   }

   let body: unknown;
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
   }

   const input = parseOwnerLead(body);
   if (!input) {
      return NextResponse.json(
         { error: "Please check your name, email and message, then try again." },
         { status: 400 }
      );
   }

   await prisma.spaceOwnerLead.create({ data: input });
   return NextResponse.json({ ok: true }, { status: 201 });
}
