import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function POST(request: NextRequest) {
    try {
        const { imageUrl, projectId } = await request.json();

        if (!imageUrl || !projectId) {
            return NextResponse.json({ error: "Missing imageUrl or projectId" }, { status: 400 });
        }

        // Validate that it's an Instagram URL
        if (!imageUrl.includes('cdninstagram.com') && !imageUrl.includes('instagram.com')) {
            return NextResponse.json({ error: "Only Instagram URLs are supported" }, { status: 400 });
        }

        await connectDB();

        // Check if this image has already been migrated
        const project = await Project.findById(projectId);
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Check if image is already migrated (not an Instagram URL)
        const imageIndex = project.images.indexOf(imageUrl);
        if (imageIndex === -1) {
            return NextResponse.json({ error: "Image not found in project" }, { status: 404 });
        }

        try {
            // Try to fetch and upload the image
            const fetchResponse = await fetch(imageUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept': 'image/webp,image/apng,image/jpeg,image/png,image/*,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Sec-Fetch-Dest': 'image',
                    'Sec-Fetch-Mode': 'no-cors',
                    'Sec-Fetch-Site': 'cross-site',
                    'Referer': 'https://www.instagram.com/',
                    'Origin': 'https://www.instagram.com'
                }
            });

            if (!fetchResponse.ok) {
                throw new Error(`Failed to fetch: ${fetchResponse.status} ${fetchResponse.statusText}`);
            }

            // Create a unique public ID
            const publicId = `${project.slug || projectId}-image-${imageIndex + 1}-${Date.now()}`;

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(imageUrl, {
                public_id: publicId,
                folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "saththebuilder",
                resource_type: "auto",
                transformation: [
                    { width: 1200, height: 800, crop: "fill", quality: "auto" },
                    { fetch_format: "auto" }
                ]
            });

            // Update the project with the new Cloudinary URL
            const newImages = [...project.images];
            newImages[imageIndex] = result.secure_url;

            await Project.findByIdAndUpdate(projectId, { images: newImages });

            return NextResponse.json({
                success: true,
                originalUrl: imageUrl,
                newUrl: result.secure_url,
                message: "Image successfully migrated to Cloudinary"
            });

        } catch (error) {
            console.error('Lazy migration failed:', error);
            
            // Return the proxy URL as fallback
            const proxyUrl = `/api/instagram-proxy?url=${encodeURIComponent(imageUrl)}`;
            
            return NextResponse.json({
                success: false,
                originalUrl: imageUrl,
                fallbackUrl: proxyUrl,
                error: error instanceof Error ? error.message : "Migration failed",
                message: "Migration failed, using proxy instead"
            });
        }

    } catch (error) {
        console.error('Lazy migration endpoint error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}