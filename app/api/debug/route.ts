import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    
    const projectCount = await Project.countDocuments();
    const featuredProjects = await Project.find({ isPublished: true, isFeatured: true }).limit(3).lean();
    
    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      projectCount,
      featuredProjects: featuredProjects.map(p => ({
        title: p.title,
        hasImages: p.images && p.images.length > 0,
        firstImage: p.images?.[0],
        imageCount: p.images?.length || 0
      })),
      cloudinaryConfig: {
        cloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: !!process.env.CLOUDINARY_API_KEY,
        apiSecret: !!process.env.CLOUDINARY_API_SECRET,
        uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      environment: process.env.NODE_ENV
    }, { status: 500 });
  }
}