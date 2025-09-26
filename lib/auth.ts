import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";

export async function getUser() {
  const store = await cookies();
  const token = store.get("sb_token")?.value;
  if (!token) return null;
  return await verifyJWT(token);
}

export async function isAdmin() {
  const user = await getUser();
  return !!user && (user as { role: string }).role === "admin";
}
