import { Schema, model, models } from "mongoose";

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    message: { type: String, required: true },
    tags: { type: [String], default: [] },   // e.g., ["table","walnut"]
    read: { type: Boolean, default: false },
    ip: { type: String, default: "" },
    ua: { type: String, default: "" },
  },
  { timestamps: true }
);

export type IContact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  tags: string[];
  read: boolean;
};

export default models.Contact || model("Contact", ContactSchema);
