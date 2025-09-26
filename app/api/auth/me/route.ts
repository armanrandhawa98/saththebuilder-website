// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";

export async function GET() {
  const store = await cookies();
  const token = store.get("sb_token")?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

  const payload = await verifyJWT(token);
  if (!payload) return NextResponse.json({ authenticated: false }, { status: 401 });

  const user = payload as { email: string; username: string; role: string };
  return NextResponse.json({
    authenticated: true,
    user: {
      email: user.email,
      username: user.username,
      role: user.role, // "admin"
    },
  });
}
