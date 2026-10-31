import { createHmac, createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "snapify_admin_session";
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

export const isAdminConfigured = () =>
   Boolean(
      process.env.ADMIN_USERNAME &&
         process.env.ADMIN_PASSWORD &&
         process.env.ADMIN_SESSION_SECRET &&
         process.env.ADMIN_SESSION_SECRET.length >= 32
   );

const signSession = (expiresAt: number) =>
   createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
      .update(
         `snapify-admin:${process.env.ADMIN_USERNAME}:${createHash("sha256")
            .update(process.env.ADMIN_PASSWORD!)
            .digest("hex")}:${expiresAt}`
      )
      .digest("hex");

export const createAdminSession = () => {
   const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE;
   return `${expiresAt}.${signSession(expiresAt)}`;
};

export const isValidAdminSession = (token?: string) => {
   if (!token || !isAdminConfigured()) return false;

   const [expiry, signature, ...rest] = token.split(".");
   const expiresAt = Number(expiry);
   if (rest.length || !Number.isInteger(expiresAt) || expiresAt <= Date.now() / 1000) {
      return false;
   }

   const expected = Buffer.from(signSession(expiresAt), "hex");
   const received = Buffer.from(signature ?? "", "hex");
   return (
      received.length === expected.length &&
      timingSafeEqual(received, expected)
   );
};

const constantTimeEquals = (value: string, expected: string) => {
   const valueHash = createHash("sha256").update(value).digest();
   const expectedHash = createHash("sha256").update(expected).digest();
   return timingSafeEqual(valueHash, expectedHash);
};

export const checkAdminCredentials = (username: string, password: string) =>
   isAdminConfigured() &&
   constantTimeEquals(username, process.env.ADMIN_USERNAME!) &&
   constantTimeEquals(password, process.env.ADMIN_PASSWORD!);

export const isSameOriginRequest = (request: Request) => {
   const origin = request.headers.get("origin");
   return !origin || origin === new URL(request.url).origin;
};

export const getAdminSessionCookie = () => ({
   name: ADMIN_SESSION_COOKIE,
   value: createAdminSession(),
   httpOnly: true,
   sameSite: "strict" as const,
   secure: process.env.NODE_ENV === "production",
   path: "/",
   maxAge: ADMIN_SESSION_MAX_AGE,
});

export const getAdminSessionToken = () =>
   cookies().get(ADMIN_SESSION_COOKIE)?.value;

export const getAdminSessionTokenFromRequest = (request: Request) =>
   request.headers
      .get("cookie")
      ?.split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${ADMIN_SESSION_COOKIE}=`))
      ?.slice(ADMIN_SESSION_COOKIE.length + 1);
