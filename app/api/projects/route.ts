import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { isAdmin } from "@/lib/auth";
import { projectCreateSchema } from "@/lib/validation";

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const wantAll = url.searchParams.get("all") === "1";
  const admin = await isAdmin();

  const filter = wantAll && admin ? {} : { isPublished: true };
  const items = await Project.find(filter).sort({ createdAt: -1 }).lean();

  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  await connectDB();
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = projectCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

  const doc = await Project.create(parsed.data);
  return NextResponse.json({ ok: true, item: { id: String(doc._id) } }, { status: 201 });
}
