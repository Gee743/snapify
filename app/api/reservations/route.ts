import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const body = await request.json();

   const { listingId, startDate, endDate, totalPrice } = body;

   if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json({ error: "Missing reservation details" }, { status: 400 });
   }

   const start = new Date(startDate);
   const end = new Date(endDate);

   if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || !(start < end)) {
      return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
   }

   if (end <= new Date()) {
      return NextResponse.json({ error: "That time is no longer available" }, { status: 400 });
   }

   const overlappingReservation = await prisma.reservation.findFirst({
      where: {
         listingId,
         startDate: { lt: end },
         endDate: { gt: start },
      },
   });

   if (overlappingReservation) {
      return NextResponse.json({ error: "That time is already booked" }, { status: 409 });
   }

   const listingAndReservation = await prisma.listing.update({
      where: {
         id: listingId,
      },
      data: {
         reservations: {
            create: {
               userId: currentUser.id,
               startDate: start,
               endDate: end,
               totalPrice,
            },
         },
      },
   });

   return NextResponse.json(listingAndReservation);
}
