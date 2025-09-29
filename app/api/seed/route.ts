import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { isAdmin } from "@/lib/auth";

const sampleProjects = [
    {
        title: "Walnut Dining Table",
        description: "Custom 8-foot dining table crafted from solid walnut with traditional mortise and tenon joinery. Features a hand-rubbed oil finish that highlights the beautiful grain patterns.",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ["table", "walnut", "dining", "hardwood", "custom"],
        isPublished: true,
        isFeatured: true
    },
    {
        title: "Live Edge Coffee Table",
        description: "Stunning live edge slab coffee table made from locally sourced maple. Steel hairpin legs provide a modern contrast to the natural wood grain.",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ["coffee table", "live edge", "maple", "modern", "steel legs"],
        isPublished: true,
        isFeatured: true
    },
    {
        title: "Built-in Bookshelf",
        description: "Floor-to-ceiling built-in bookshelf with adjustable shelves and integrated LED lighting. Crafted to match existing trim and painted to customer specifications.",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ["bookshelf", "built-in", "storage", "lighting", "custom"],
        isPublished: true,
        isFeatured: false
    },
    {
        title: "Farmhouse Kitchen Island",
        description: "Rustic farmhouse-style kitchen island with butcher block top and distressed painted base. Features deep drawers and open shelving for maximum storage.",
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ["kitchen island", "farmhouse", "butcher block", "storage", "rustic"],
        isPublished: true,
        isFeatured: true
    },
    {
        title: "Cedar Planter Box",
        description: "Solid cedar planter box with clean lines and weather-resistant finish. Perfect for herbs, vegetables, or decorative plants on patios and decks.",
        images: [
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ["planter", "cedar", "outdoor", "gardening", "weather-resistant"],
        isPublished: true,
        isFeatured: true
    },
    {
        title: "Custom Wall Accent",
        description: "Geometric wood wall accent made from reclaimed hardwood. Each piece carefully arranged to create stunning visual patterns and natural texture.",
        images: [
            "https://images.unsplash.com/photo-1615529179832-0f09de7a8d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1614607242094-b1b2cf769ff3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ["wall accent", "geometric", "reclaimed", "texture", "custom"],
        isPublished: true,
        isFeatured: true
    }
];

export async function POST() {
    try {
        if (!(await isAdmin())) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        
        // Clear existing projects
        await Project.deleteMany({});
        
        // Insert new projects with proper Unsplash URLs
        const projects = await Project.insertMany(sampleProjects);
        
        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${projects.length} projects with proper image URLs`,
            projects: projects.map(p => ({
                title: p.title,
                imageCount: p.images.length,
                firstImage: p.images[0]
            }))
        });
        
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}