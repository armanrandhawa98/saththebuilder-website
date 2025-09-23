// app/robots.ts
import { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const sitemap = siteUrl("/sitemap.xml");
  return {
    rules: [{ userAgent: "*" }],
    sitemap,
  };
}
