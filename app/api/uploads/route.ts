import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs"; // ensure Node runtime for Buffer/streams

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const url = await new Promise<string>((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "uploads" },
      (err, result) => {
        if (err || !result) return reject(err || new Error("Upload failed"));
        resolve(result.secure_url);
      }
    );
    upload.end(buffer);
  });

  return NextResponse.json({ ok: true, url });
}
