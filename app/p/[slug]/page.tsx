// app/p/[slug]/page.tsx
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ImageGridLightbox from "@/components/ImageGridLightbox";
import { siteUrl } from "@/lib/site";

function looksLikeObjectId(s: string) {
    return /^[a-f\d]{24}$/i.test(s);
}

async function isAdmin() {
    const store = await cookies();
    const token = store.get("sb_token")?.value;
    if (!token) return false;
    const payload = await verifyJWT(token);
    return !!payload && (payload as { role: string }).role === "admin";
}

// metadata with canonical
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    await connectDB();

    const query = looksLikeObjectId(slug) ? { _id: slug } : { slug };
    const p = await Project.findOne(query).lean() as Record<string, unknown> | null;
    if (!p || !(p.title as string)) return { title: "Project | SathTheBuilder" };

    const canonicalPath = `/p/${(p.slug as string) || p._id}`;
    const title = p.title as string;
    const description = p.description as string;
    const images = p.images as string[];
    
    return {
        title: `${title} | SathTheBuilder`,
        description: description?.slice(0, 160) || "Custom woodworking project",
        alternates: { canonical: siteUrl(canonicalPath) },
        openGraph: {
            title: title,
            description: description?.slice(0, 160),
            url: siteUrl(canonicalPath),
            images: images?.length ? [images[0]] : undefined,
        },
    };
}

export default async function ProjectPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    await connectDB();

    const admin = await isAdmin();
    const query = looksLikeObjectId(slug) ? { _id: slug } : { slug };
    const project = await Project.findOne(query).lean() as Record<string, unknown> | null;
    if (!project) notFound();

    const p = project as {
        _id: string;
        slug?: string;
        title: string;
        description?: string;
        images?: string[];
        tags?: string[];
        isPublished: boolean;
        createdAt?: string;
    };

    // Redirect to canonical slug if needed
    const canonicalSlug = p.slug || String(p._id);
    if (slug !== canonicalSlug) {
        redirect(`/p/${canonicalSlug}`);
    }

    if (!admin && !p.isPublished) notFound();

    const created = p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "";
    const ogHref = `/p/${canonicalSlug}/opengraph-image`;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/gallery" className="text-sm underline hover:no-underline">
                    ← Back to gallery
                </Link>
                <span className="text-xs px-2 py-1 rounded-full border border-slatey-300 dark:border-slatey-600">
                    {p.isPublished ? "Published" : "Draft"}
                </span>
            </div>

            <header className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="text-3xl font-bold text-wood-600 dark:text-wood-300">{p.title}</h1>

                    {/* NEW: button to open the OG image */}
                    <a
                        href={ogHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl border border-slatey-300 dark:border-slatey-600 hover:bg-white/60 dark:hover:bg-slatey-700/50 text-sm font-medium"
                        title="Open Open Graph preview image in a new tab"
                    >
                        Open OG image
                    </a>
                </div>

                {created && (
                    <div className="text-sm text-slatey-500 dark:text-slatey-400">{created}</div>
                )}

                {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {p.tags.map((t: string) => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-slatey-300 dark:border-slatey-600">
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {p.description && (
                <p className="max-w-3xl text-slatey-700 dark:text-slatey-200">{p.description}</p>
            )}

            <ImageGridLightbox images={(p.images || []) as string[]} />
        </div>
    );
}
