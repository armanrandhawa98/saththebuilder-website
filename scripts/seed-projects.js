// scripts/seed-projects.js
const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://admin:secret123@cluster0.i7jo7.mongodb.net/saththebuilder?retryWrites=true&w=majority&appName=Cluster0';

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, unique: true, index: true },
        description: { type: String, default: "" },
        images: { type: [String], default: [] },
        tags: { type: [String], default: [] },
        isPublished: { type: Boolean, default: false },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

function slugify(s) {
    return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

ProjectSchema.pre("save", function (next) {
    if (!this.slug || this.isModified("title")) {
        const base = slugify(this.title || "");
        this.slug = base ? `${base}-${Math.random().toString(36).slice(2, 6)}` : Math.random().toString(36).slice(2, 8);
    }
    next();
});

const Project = mongoose.model('Project', ProjectSchema);

const sampleProjects = [
    {
        title: "Walnut Dining Table",
        description: "Custom 8-foot dining table crafted from solid walnut with traditional mortise and tenon joinery. Features a hand-rubbed oil finish that highlights the beautiful grain patterns.",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ["table", "walnut", "dining", "hardwood", "custom"],
        isPublished: true,
        isFeatured: true
    },
    {
        title: "Live Edge Coffee Table",
        description: "Stunning live edge slab coffee table made from locally sourced maple. Steel hairpin legs provide a modern contrast to the natural wood grain.",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
            "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?w=800"
        ],
        tags: ["coffee table", "live edge", "maple", "modern", "steel legs"],
        isPublished: true,
        isFeatured: true
    },
    {
        title: "Built-in Bookshelf",
        description: "Floor-to-ceiling built-in bookshelf with adjustable shelves and integrated LED lighting. Crafted to match existing trim and painted to customer specifications.",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
            "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800"
        ],
        tags: ["bookshelf", "built-in", "storage", "lighting", "custom"],
        isPublished: true,
        isFeatured: false
    },
    {
        title: "Farmhouse Kitchen Island",
        description: "Rustic farmhouse-style kitchen island with butcher block top and distressed painted base. Features deep drawers and open shelving for maximum storage.",
        images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
            "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800"
        ],
        tags: ["kitchen island", "farmhouse", "butcher block", "storage", "rustic"],
        isPublished: true,
        isFeatured: true
    },
    {
        title: "Floating Nightstands",
        description: "Pair of wall-mounted nightstands with hidden drawer slides and wireless charging stations built into the tops. Clean minimalist design in white oak.",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
        ],
        tags: ["nightstand", "floating", "oak", "modern", "wireless charging"],
        isPublished: true,
        isFeatured: false
    },
    {
        title: "Reclaimed Barn Door",
        description: "Sliding barn door created from 100-year-old reclaimed barn wood. Includes custom black iron hardware and soft-close mechanism.",
        images: [
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800"
        ],
        tags: ["barn door", "reclaimed", "sliding", "iron hardware", "rustic"],
        isPublished: true,
        isFeatured: false
    },
    {
        title: "Cherry Wood Jewelry Box",
        description: "Handcrafted jewelry box with felt-lined compartments and soft-close hinges. Features a hidden key lock and hand-carved decorative details.",
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"
        ],
        tags: ["jewelry box", "cherry", "carved", "felt lined", "small project"],
        isPublished: true,
        isFeatured: false
    },
    {
        title: "Work in Progress: Oak Desk",
        description: "Custom executive desk in progress. Solid oak construction with traditional joinery techniques. Will feature leather writing surface and brass hardware.",
        images: [
            "https://images.unsplash.com/photo-1515169067868-5387ec39dd5d?w=800"
        ],
        tags: ["desk", "oak", "executive", "work in progress", "traditional"],
        isPublished: false,
        isFeatured: false
    }
];

async function seedProjects() {
    try {
        console.log('🔗 Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas successfully!');

        // Clear existing projects
        await Project.deleteMany({});
        console.log('🗑️  Cleared existing projects');

        console.log('🌱 Creating sample projects...');
        for (const projectData of sampleProjects) {
            const project = await Project.create(projectData);
            console.log(`✅ Created: ${project.title} (${project.isPublished ? 'Published' : 'Draft'}${project.isFeatured ? ', Featured' : ''})`);
        }

        const publishedCount = await Project.countDocuments({ isPublished: true });
        const featuredCount = await Project.countDocuments({ isFeatured: true });

        console.log('');
        console.log('🎉 Sample projects created successfully!');
        console.log(`📊 Stats: ${sampleProjects.length} total, ${publishedCount} published, ${featuredCount} featured`);
        console.log('');
        console.log('🌐 Visit your gallery: http://localhost:3000/gallery');
        console.log('🏠 Homepage highlights: http://localhost:3000');

    } catch (error) {
        console.error('❌ Error seeding projects:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Database connection closed.');
    }
}

seedProjects();