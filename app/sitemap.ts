// app/sitemap.ts
import { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const projects = await Project.find({ isPublished: true }).select("slug updatedAt").lean();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: siteUrl("/gallery"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: siteUrl("/contact"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const projectUrls: MetadataRoute.Sitemap = projects.map((p: Record<string, unknown>) => ({
    url: siteUrl(`/p/${(p.slug as string) || p._id}`),
    lastModified: p.updatedAt ? new Date(p.updatedAt as string) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...projectUrls];
}
