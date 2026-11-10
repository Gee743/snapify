import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import {
   getAdminSessionTokenFromRequest,
   isSameOriginRequest,
   isValidAdminSession,
} from "@/app/libs/adminAuth";

/** Read-only inbox for everything the public forms capture. Newest first, and
 *  capped so a long-running site cannot blow up the dashboard payload. */
const TAKE = 500;

export async function GET(request: Request) {
   if (!isValidAdminSession(getAdminSessionTokenFromRequest(request))) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
   }
   if (!isSameOriginRequest(request)) {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
   }

   const [owners, inquiries, subscribers] = await Promise.all([
      prisma.spaceOwnerLead.findMany({ orderBy: { createdAt: "desc" }, take: TAKE }),
      prisma.spaceInquiry.findMany({ orderBy: { createdAt: "desc" }, take: TAKE }),
      prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" }, take: TAKE }),
   ]);

   return NextResponse.json({
      owners: owners.map((lead) => ({
         ...lead,
         createdAt: lead.createdAt.toISOString(),
      })),
      inquiries: inquiries.map((inquiry) => ({
         ...inquiry,
         shootDate: inquiry.shootDate?.toISOString() ?? null,
         createdAt: inquiry.createdAt.toISOString(),
      })),
      subscribers: subscribers.map((subscriber) => ({
         ...subscriber,
         createdAt: subscriber.createdAt.toISOString(),
      })),
   });
}
