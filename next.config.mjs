// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Common image hosting domains
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.r2.dev" },          // Cloudflare R2 public buckets
      { protocol: "https", hostname: "**.amazonaws.com" },   // S3
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" }
    ],
  },
};

export default nextConfig;
