import { NextResponse } from "next/server";
import {
   checkAdminCredentials,
   getAdminSessionCookie,
   getAdminSessionTokenFromRequest,
   isAdminConfigured,
   isSameOriginRequest,
   isValidAdminSession,
   ADMIN_SESSION_COOKIE,
} from "@/app/libs/adminAuth";

export async function GET(request: Request) {
   return NextResponse.json({
      authenticated: isValidAdminSession(getAdminSessionTokenFromRequest(request)),
   });
}

export async function POST(request: Request) {
   if (!isSameOriginRequest(request)) {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
   }
   if (!isAdminConfigured()) {
      return NextResponse.json(
         { error: "Admin login is not configured on the server." },
         { status: 503 }
      );
   }

   let body: unknown;
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
   }
   if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
   }
   const { username, password } = body as Record<string, unknown>;
   if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !checkAdminCredentials(username, password)
   ) {
      return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
   }

   const response = NextResponse.json({ authenticated: true });
   response.cookies.set(getAdminSessionCookie());
   return response;
}

export async function DELETE(request: Request) {
   if (!isSameOriginRequest(request)) {
      return NextResponse.json({ error: "Request origin is not allowed." }, { status: 403 });
   }
   const response = NextResponse.json({ authenticated: false });
   response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: "",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
   });
   return response;
}
