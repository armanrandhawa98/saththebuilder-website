import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { contactCreateSchema } from "@/lib/validation";
import { isAdmin } from "@/lib/auth";

// simple in-memory rate limiter (dev-friendly)
// NOTE: resets on server restart; for prod use Redis (Upstash) etc.
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW = 60_000;  // 1 minute
const LIMIT = 5;        // 5 requests/min/ip

function ipFrom(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] || "") || "local";
}

export async function GET(req: Request) {
  await connectDB();
  if (!(await isAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const skip = Number(url.searchParams.get("skip") || 0);
  const limit = Math.min(Number(url.searchParams.get("limit") || 50), 100);

  const items = await Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  const total = await Contact.countDocuments();
  return NextResponse.json({ ok: true, items, total });
}

export async function POST(req: Request) {
  await connectDB();

  // rate limit
  const ip = ipFrom(req);
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW) hits.set(ip, { count: 1, ts: now });
  else if (rec.count >= LIMIT) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  else rec.count++;

  const data = await req.json().catch(() => ({}));
  const parsed = contactCreateSchema.safeParse(data);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

  const { website, ...clean } = parsed.data;
  if (website) return NextResponse.json({ ok: true }); // honeypot triggered, pretend success

  const doc = await Contact.create({
    ...clean,
    ip,
    ua: req.headers.get("user-agent") || "",
  });

  // optional email notify via Resend if configured
  try {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "no-reply@example.com";
    if (key && to) {
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      await resend.emails.send({
        from,
        to,
        subject: `New contact from ${doc.name}`,
        text: `Name: ${doc.name}\nEmail: ${doc.email}\nPhone: ${doc.phone || "-"}\nTags: ${doc.tags?.join(", ") || "-"}\n\n${doc.message}`,
      });
    }
  } catch (e) {
    console.error("Email error:", e);
  }

  return NextResponse.json({ ok: true, id: String(doc._id) }, { status: 201 });
}
