// app/gallery/page.tsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export const metadata = {
    title: "Gallery | SathTheBuilder",
    description: "Browse published woodworking projects.",
};

// Build a querystring while preserving other params
function buildHref({
    tag,
    page,
    perPage,
}: {
    tag?: string | null;
    page?: number;
    perPage?: number;
}) {
    const qs = new URLSearchParams();
    if (tag) qs.set("tag", tag);
    if (page && page > 1) qs.set("page", String(page));
    if (perPage && perPage !== 12) qs.set("perPage", String(perPage));
    const s = qs.toString();
    return s ? `/gallery?${s}` : `/gallery`;
}

type SearchParams = {
    tag?: string;
    page?: string;
    perPage?: string;
};

export default async function GalleryPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { tag, page: pageStr, perPage: perPageStr } = await searchParams;

    await connectDB();

    const page = Math.max(1, parseInt(pageStr || "1", 10) || 1);
    const perPage = Math.min(24, Math.max(6, parseInt(perPageStr || "12", 10) || 12));
    const skip = (page - 1) * perPage;

    const filter: Record<string, unknown> = { isPublished: true };
    if (tag) filter.tags = tag;

    const [items, total, tagAgg] = await Promise.all([
        Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(perPage).lean(),
        Project.countDocuments(filter),
        Project.aggregate([
            { $match: { isPublished: true } },
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ]),
    ]);

    const tags = tagAgg
        .map((t: { _id: string; count: number }) => ({ name: t._id as string, count: t.count as number }))
        .filter((t) => t.name && t.name.trim().length > 0);

    const totalPages = Math.max(1, Math.ceil(total / perPage));

    return (
        <div className="min-h-screen bg-gradient-to-br from-wood-50 via-white to-craft-50">
            <div className="container mx-auto px-4 py-12 space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="font-display text-5xl md:text-6xl font-bold text-craft-900 tracking-tight">Gallery</h1>
                    <p className="text-craft-600 text-xl max-w-2xl mx-auto">Browse completed pieces and custom builds. Use tags to filter.</p>
                    <Link href="/" className="inline-flex items-center text-wood-600 hover:text-wood-700 font-medium">← Back home</Link>
                </header>

                {/* Tag chips */}
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        href={buildHref({ tag: null, page: 1, perPage })}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${!tag
                            ? "bg-wood-500 text-white shadow-craft hover:bg-wood-600"
                            : "bg-white border-2 border-wood-200 text-craft-700 hover:bg-wood-50 hover:border-wood-300 shadow-sm"
                            }`}
                    >
                        All
                    </Link>
                    {tags.map((t) => {
                        const active = tag === t.name;
                        return (
                            <Link
                                key={t.name}
                                href={buildHref({ tag: t.name, page: 1, perPage })}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${active
                                    ? "bg-wood-500 text-white shadow-craft hover:bg-wood-600"
                                    : "bg-white border-2 border-wood-200 text-craft-700 hover:bg-wood-50 hover:border-wood-300 shadow-sm"
                                    }`}
                                title={`${t.name} (${t.count})`}
                            >
                                {t.name}
                                <span className="ml-1 opacity-70">({t.count})</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Grid */}
                {items.length === 0 ? (
                    <p className="text-slatey-600 dark:text-slatey-300">No projects found.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((p: Record<string, unknown>) => {
                            const href = `/p/${(p.slug as string) || p._id}`;
                            const img = (p.images as string[])?.[0];
                            const title = p.title as string;
                            const description = p.description as string;
                            const tags = p.tags as string[];

                            return (
                                <Link
                                    key={String(p._id)}
                                    href={href}
                                    className="card card-hover bg-white shadow-wood group"
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                                        {img ? (
                                            <Image
                                                src={img}
                                                alt={title || 'Project image'}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-wood-200/40 to-accent-500/20" />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        {/* Show description preview instead of generic title */}
                                        {description && description.trim() && description !== 'Custom woodworking project crafted with attention to detail and quality materials.' ? (
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-slatey-700 dark:text-slatey-200 leading-relaxed"
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}>
                                                    {description.length > 150 ?
                                                        description.substring(0, 150).replace(/\s+\S*$/, '') + '...' :
                                                        description
                                                    }
                                                </p>
                                            </div>
                                        ) : (
                                            <h3 className="font-semibold text-slatey-800 dark:text-slatey-200">{title}</h3>
                                        )}

                                        {tags?.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {tags.slice(0, 4).map((t: string) => (
                                                    <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-slatey-300 dark:border-slatey-600 text-slatey-600 dark:text-slatey-300">
                                                        {t}
                                                    </span>
                                                ))}
                                                {tags.length > 4 && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full border border-slatey-300 dark:border-slatey-600 text-slatey-500 dark:text-slatey-400">
                                                        +{tags.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-2">
                        <Link
                            aria-disabled={page <= 1}
                            className={`px-3 py-1.5 rounded-xl border text-sm ${page <= 1
                                ? "opacity-40 pointer-events-none border-slatey-300 dark:border-slatey-600"
                                : "border-slatey-300 dark:border-slatey-600 hover:bg-white/60 dark:hover:bg-slatey-700/50"
                                }`}
                            href={buildHref({ tag: tag || null, page: Math.max(1, page - 1), perPage })}
                        >
                            ← Prev
                        </Link>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            const n = i + 1;
                            const active = n === page;
                            return (
                                <Link
                                    key={n}
                                    href={buildHref({ tag: tag || null, page: n, perPage })}
                                    className={`px-3 py-1.5 rounded-xl border text-sm ${active
                                        ? "bg-wood-500 text-white border-wood-500"
                                        : "border-slatey-300 dark:border-slatey-600 hover:bg-white/60 dark:hover:bg-slatey-700/50"
                                        }`}
                                >
                                    {n}
                                </Link>
                            );
                        })}

                        <Link
                            aria-disabled={page >= totalPages}
                            className={`px-3 py-1.5 rounded-xl border text-sm ${page >= totalPages
                                ? "opacity-40 pointer-events-none border-slatey-300 dark:border-slatey-600"
                                : "border-slatey-300 dark:border-slatey-600 hover:bg-white/60 dark:hover:bg-slatey-700/50"
                                }`}
                            href={buildHref({ tag: tag || null, page: Math.min(totalPages, page + 1), perPage })}
                        >
                            Next →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
