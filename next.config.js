/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         { protocol: "https", hostname: "avatars.githubusercontent.com" },
         { protocol: "https", hostname: "lh3.googleusercontent.com" },
         { protocol: "https", hostname: "res.cloudinary.com" },
         { protocol: "https", hostname: "images.unsplash.com" },
         { protocol: "https", hostname: "upload.wikimedia.org" },
      ],
      // Location photographs are hotlinked from Wikimedia, which throttles
      // (HTTP 429) when we pull originals repeatedly. Three mitigations:
      //
      // 1. Cache optimised output for 30 days. Each source image is then fetched
      //    once per size per month instead of once per cache miss.
      // 2. Narrow the generated size set. Next defaults to 8 deviceSizes plus 8
      //    imageSizes, and every distinct width is a separate upstream fetch of
      //    the full source file. These cover the card grid and the detail hero
      //    and nothing else.
      // 3. Serve AVIF/WebP so the cached variants stay small.
      //
      // The stored URLs also point at Wikimedia's /thumb/ CDN rather than
      // full-resolution originals (see scripts/normalizeImages.ts) -- the
      // originals ran to 4 MB each.
      minimumCacheTTL: 60 * 60 * 24 * 30,
      deviceSizes: [640, 828, 1080, 1280],
      imageSizes: [256, 384],
      formats: ["image/avif", "image/webp"],
   },
};

module.exports = nextConfig;
