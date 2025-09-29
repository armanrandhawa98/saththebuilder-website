import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { isAdmin } from "@/lib/auth";

export async function GET() {
    try {
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Test Cloudinary configuration
        const config = {
            hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
            hasApiKey: !!process.env.CLOUDINARY_API_KEY,
            hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
            uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME
        };

        // Test a simple upload with a public image
        const testImageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400";
        
        try {
            const result = await cloudinary.uploader.upload(testImageUrl, {
                public_id: "test-upload-" + Date.now(),
                folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "saththebuilder",
                transformation: [
                    { width: 400, height: 300, crop: "fill", quality: "auto" }
                ]
            });

            return NextResponse.json({
                success: true,
                message: "Cloudinary test successful",
                config,
                testResult: {
                    uploadedUrl: result.secure_url,
                    publicId: result.public_id
                }
            });

        } catch (uploadError) {
            return NextResponse.json({
                success: false,
                message: "Cloudinary upload test failed",
                config,
                error: uploadError instanceof Error ? uploadError.message : "Unknown upload error"
            });
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}