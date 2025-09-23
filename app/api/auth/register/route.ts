// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { registerSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const { email, username, password } = parsed.data;

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, username, passwordHash, role: "admin" });

  return NextResponse.json({ ok: true, user: { id: user._id, email, username } });
}
