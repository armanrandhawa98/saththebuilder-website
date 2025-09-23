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

    const filter: any = { isPublished: true };
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
        .map((t: any) => ({ name: t._id as string, count: t.count as number }))
        .filter((t) => t.name && t.name.trim().length > 0);

    const totalPages = Math.max(1, Math.ceil(total / perPage));

    return (
        <div className="space-y-8">
            <header className="rounded-2xl p-6 sm:p-8 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                <div className="flex items-end justify-between">
                    <h1 className="text-2xl font-semibold text-wood-600 dark:text-wood-300">Gallery</h1>
                    <Link href="/" className="text-sm underline hover:no-underline">← Back home</Link>
                </div>
                <p className="mt-2 text-slatey-600 dark:text-slatey-300">Browse completed pieces and custom builds. Use tags to filter.</p>
            </header>

            {/* Tag chips */}
            <div className="flex flex-wrap gap-2">
                <Link
                    href={buildHref({ tag: null, page: 1, perPage })}
                    className={`px-3 py-1.5 rounded-full border text-sm ${!tag
                            ? "bg-wood-500 text-white border-wood-500"
                            : "border-slatey-300 dark:border-slatey-600 hover:bg-white/60 dark:hover:bg-slatey-700/50"
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
                            className={`px-3 py-1.5 rounded-full border text-sm ${active
                                    ? "bg-wood-500 text-white border-wood-500"
                                    : "border-slatey-300 dark:border-slatey-600 hover:bg-white/60 dark:hover:bg-slatey-700/50"
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((p: any) => {
                        const href = `/p/${p.slug || p._id}`;
                        const img = p.images?.[0];

                        return (
                            <Link
                                key={String(p._id)}
                                href={href}
                                className="group overflow-hidden rounded-2xl border border-slatey-200 dark:border-slatey-700 bg-white/70 dark:bg-slatey-800/60 shadow-soft block transition hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                    {img ? (
                                        <Image
                                            src={img}
                                            alt={p.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-wood-200/40 to-accent-500/20" />
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold">{p.title}</h3>
                                    {p.tags?.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {p.tags.slice(0, 6).map((t: string) => (
                                                <span key={t} className="text-xs px-2 py-0.5 rounded-full border border-slatey-300 dark:border-slatey-600">
                                                    {t}
                                                </span>
                                            ))}
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
    );
}
