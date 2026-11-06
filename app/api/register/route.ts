import bcrypt from "bcryptjs";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 200;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNonEmptyString = (value: unknown): value is string =>
   typeof value === "string" && value.trim().length > 0;

export async function POST(request: Request) {
   let body: unknown;
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
   }

   if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
   }

   const { email, name, password } = body as Record<string, unknown>;

   if (!isNonEmptyString(email) || !EMAIL_PATTERN.test(email.trim()) || email.trim().length > 320) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
   }

   if (!isNonEmptyString(name) || name.trim().length > 100) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
   }

   if (
      typeof password !== "string" ||
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
   ) {
      return NextResponse.json(
         { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
         { status: 400 }
      );
   }

   const hashedPassword = await bcrypt.hash(password, 12);

   try {
      const user = await prisma.user.create({
         data: {
            email: email.trim().toLowerCase(),
            name: name.trim(),
            hashedPassword,
         },
      });

      // Never return the password hash to the client.
      const { hashedPassword: _omit, ...safeUser } = user;
      return NextResponse.json(safeUser, { status: 201 });
   } catch (error) {
      if (
         typeof error === "object" &&
         error !== null &&
         "code" in error &&
         error.code === "P2002"
      ) {
         return NextResponse.json(
            { error: "An account with this email already exists." },
            { status: 409 }
         );
      }
      return NextResponse.json({ error: "Could not create the account." }, { status: 500 });
   }
}
