// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add any hosts you actually use. These cover your seed data + common CDNs.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.r2.dev" },          // Cloudflare R2 public buckets
      { protocol: "https", hostname: "**.amazonaws.com" },   // S3
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
      // Instagram CDN domains for imported content
      { protocol: "https", hostname: "scontent-*.cdninstagram.com" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
      { protocol: "https", hostname: "instagram.com" },
      { protocol: "https", hostname: "*.instagram.com" }
    ],
  },
};

export default nextConfig;
