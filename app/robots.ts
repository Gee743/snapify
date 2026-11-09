import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/libs/site";

export default function robots(): MetadataRoute.Robots {
   return {
      rules: {
         userAgent: "*",
         allow: "/",
         // /admin is password-gated but still server-rendered, and /api returns
         // JSON that should never appear in an index.
         disallow: ["/admin", "/api/"],
      },
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
   };
}
