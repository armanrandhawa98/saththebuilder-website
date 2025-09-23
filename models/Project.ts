// models/Project.ts
import { Schema, model, models } from "mongoose";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, default: "" },
    images: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false }, // ⭐ NEW
  },
  { timestamps: true }
);

ProjectSchema.pre("save", function (next) {
  if (!this.slug || this.isModified("title")) {
    const base = slugify(this.title || "");
    this.slug = base ? `${base}-${Math.random().toString(36).slice(2, 6)}` : Math.random().toString(36).slice(2, 8);
  }
  next();
});

ProjectSchema.set("autoIndex", true);

export default models.Project || model("Project", ProjectSchema);
