// Debug API to check what's in the database
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET() {
  await connectDB();
  
  const allProjects = await Project.find({}).lean();
  const publishedProjects = await Project.find({ isPublished: true }).lean();
  const featuredProjects = await Project.find({ isFeatured: true }).lean();
  const publishedAndFeatured = await Project.find({ isPublished: true, isFeatured: true }).lean();

  return NextResponse.json({
    total: allProjects.length,
    published: publishedProjects.length,
    featured: featuredProjects.length,
    publishedAndFeatured: publishedAndFeatured.length,
    allProjects: allProjects.map(p => ({
      id: p._id,
      title: p.title,
      isPublished: p.isPublished,
      isFeatured: p.isFeatured,
      createdAt: p.createdAt,
    })),
    publishedProjects: publishedProjects.map(p => ({
      id: p._id,
      title: p.title,
      isPublished: p.isPublished,
      isFeatured: p.isFeatured,
    })),
    featuredProjects: featuredProjects.map(p => ({
      id: p._id,
      title: p.title,
      isPublished: p.isPublished,
      isFeatured: p.isFeatured,
    })),
    publishedAndFeatured: publishedAndFeatured.map(p => ({
      id: p._id,
      title: p.title,
      isPublished: p.isPublished,
      isFeatured: p.isFeatured,
    })),
  });
}