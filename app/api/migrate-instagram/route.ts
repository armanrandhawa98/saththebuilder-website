import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { isAdmin } from "@/lib/auth";

interface InstagramImageMigrationResult {
    originalUrl: string;
    newUrl: string;
    success: boolean;
    error?: string;
}

async function uploadImageToCloudinary(imageUrl: string, publicId: string): Promise<string> {
    try {
        console.log(`Attempting to upload image: ${imageUrl}`);
        console.log(`Public ID: ${publicId}`);
        console.log(`Cloudinary config check:`, {
            hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
            hasApiKey: !!process.env.CLOUDINARY_API_KEY,
            hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
            uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER
        });

        // First, try to fetch the image with browser-like headers
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
            throw new Error(`Failed to fetch image: ${fetchResponse.status} ${fetchResponse.statusText}`);
        }

        console.log(`Image fetch successful, content-type: ${fetchResponse.headers.get('content-type')}`);

        const result = await cloudinary.uploader.upload(imageUrl, {
            public_id: publicId,
            folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "saththebuilder",
            overwrite: true,
            resource_type: "auto",
            transformation: [
                { width: 1200, height: 800, crop: "fill", quality: "auto" },
                { fetch_format: "auto" }
            ]
        });
        
        console.log(`Cloudinary upload successful: ${result.secure_url}`);
        return result.secure_url;
    } catch (error) {
        console.error("Detailed Cloudinary upload error:", {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
            imageUrl,
            publicId
        });
        throw error;
    }
}

async function migrateProjectImages(project: { _id: string; title: string; slug?: string; images: string[] }): Promise<InstagramImageMigrationResult[]> {
    const results: InstagramImageMigrationResult[] = [];
    const newImages: string[] = [];

    for (let i = 0; i < project.images.length; i++) {
        const originalUrl = project.images[i];
        
        // Check if it's an Instagram URL
        if (originalUrl.includes('cdninstagram.com') || originalUrl.includes('instagram.com')) {
            try {
                // Create a unique public ID for this image
                const publicId = `${project.slug || project._id}-image-${i + 1}`;
                
                // Upload to Cloudinary
                const newUrl = await uploadImageToCloudinary(originalUrl, publicId);
                
                results.push({
                    originalUrl,
                    newUrl,
                    success: true
                });
                
                newImages.push(newUrl);
            } catch (error) {
                const errorMessage = error instanceof Error 
                    ? `${error.name}: ${error.message}` 
                    : `Unknown error: ${JSON.stringify(error)}`;
                
                console.error(`Migration failed for ${originalUrl}:`, error);
                
                results.push({
                    originalUrl,
                    newUrl: originalUrl, // Keep original if migration fails
                    success: false,
                    error: errorMessage
                });
                
                newImages.push(originalUrl); // Keep original URL as fallback
            }
        } else {
            // Non-Instagram URL, keep as is
            results.push({
                originalUrl,
                newUrl: originalUrl,
                success: true
            });
            newImages.push(originalUrl);
        }
    }

    // Update project with new image URLs
    if (newImages.length > 0) {
        await Project.findByIdAndUpdate(project._id, { images: newImages });
    }

    return results;
}

export async function POST() {
    try {
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        
        // Find all projects with Instagram images
        const projects = await Project.find({
            images: { 
                $elemMatch: { 
                    $regex: /(cdninstagram\.com|instagram\.com)/, 
                    $options: 'i' 
                } 
            }
        }).lean();

        if (projects.length === 0) {
            return NextResponse.json({
                success: true,
                message: "No projects with Instagram images found",
                results: []
            });
        }

        const allResults: Array<{
            projectTitle: string;
            projectId: string;
            images: InstagramImageMigrationResult[];
        }> = [];

        // Process each project
        for (const project of projects) {
            console.log(`Migrating images for project: ${project.title}`);
            
            const imageResults = await migrateProjectImages(project as unknown as { _id: string; title: string; slug?: string; images: string[] });
            
            allResults.push({
                projectTitle: project.title,
                projectId: (project._id as { toString(): string }).toString(),
                images: imageResults
            });
        }

        // Calculate summary stats
        const totalImages = allResults.reduce((sum, project) => sum + project.images.length, 0);
        const successfulMigrations = allResults.reduce((sum, project) => 
            sum + project.images.filter(img => img.success && img.originalUrl !== img.newUrl).length, 0
        );
        const failedMigrations = allResults.reduce((sum, project) => 
            sum + project.images.filter(img => !img.success).length, 0
        );

        return NextResponse.json({
            success: true,
            message: `Migration completed! ${successfulMigrations} images migrated to Cloudinary, ${failedMigrations} failed`,
            summary: {
                projectsProcessed: projects.length,
                totalImages,
                successfulMigrations,
                failedMigrations
            },
            results: allResults
        });

    } catch (error) {
        console.error("Instagram migration error:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}