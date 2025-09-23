// models/User.ts
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "viewer"], default: "admin" },
  },
  { timestamps: true }
);

// Ensure indexes exist in dev; in prod you might trigger them on deploy scripts.
UserSchema.set("autoIndex", true);

export default models.User || model("User", UserSchema);
