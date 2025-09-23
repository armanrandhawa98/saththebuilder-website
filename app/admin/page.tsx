"use client";

import { useEffect, useState } from "react";
import AdminProjectEditor from "@/components/AdminProjectEditor";

type Project = {
    _id: string;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    isPublished: boolean;
    isFeatured: boolean;
    createdAt: string;
};

export default function AdminPage() {
    const [items, setItems] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imagesText, setImagesText] = useState(""); // comma-separated URLs
    const [tagsText, setTagsText] = useState("");     // comma-separated tags
    const [isPublished, setIsPublished] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [msg, setMsg] = useState("");
    const [uploading, setUploading] = useState(false);

    // NEW: edit drawer state
    const [editing, setEditing] = useState<Project | null>(null);

    function parseCsv(csv: string) {
        return csv.split(",").map(s => s.trim()).filter(Boolean);
    }

    async function load() {
        setLoading(true);
        const res = await fetch("/api/projects?all=1", { cache: "no-store" });
        const data = await res.json();
        setItems(data.items || []);
        setLoading(false);
    }

    useEffect(() => { load(); }, []);

    async function createProject(e: React.FormEvent) {
        e.preventDefault();
        setMsg("");
        const payload = {
            title,
            description,
            images: parseCsv(imagesText),
            tags: parseCsv(tagsText),
            isPublished,
            isFeatured,
        };
        const res = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const d = await res.json().catch(() => ({}));
            setMsg(d?.error ? "Error: see console" : "Error creating");
            console.error(d);
            return;
        }
        setTitle(""); setDescription(""); setImagesText(""); setTagsText("");
        setIsPublished(false); setIsFeatured(false);
        setMsg("Created!");
        await load();
    }

    async function togglePublish(id: string, next: boolean) {
        await fetch(`/api/projects/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isPublished: next }),
        });
        await load();
    }

    async function toggleFeatured(id: string, next: boolean) {
        await fetch(`/api/projects/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isFeatured: next }),
        });
        await load();
    }

    async function remove(id: string) {
        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        await load();
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f) return;
        const fd = new FormData();
        fd.append("file", f);
        setUploading(true);
        try {
            const res = await fetch("/api/uploads", { method: "POST", body: fd });
            if (!res.ok) {
                console.error(await res.json());
                alert("Upload failed");
                return;
            }
            const data = await res.json();
            const url = data?.url as string | undefined;
            if (url) setImagesText(prev => (prev ? `${prev}, ${url}` : url));
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    }

    const previewUrls = parseCsv(imagesText).slice(0, 6);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-wood-600 dark:text-wood-300">Admin Dashboard</h1>
                <div className="flex items-center gap-3">
                    <a
                        href="/admin/messages"
                        className="px-4 py-2 rounded-xl bg-accent-500 text-white hover:bg-accent-600 font-medium transition"
                    >
                        📧 Customer Messages
                    </a>
                    <a
                        href="/gallery"
                        target="_blank"
                        className="px-4 py-2 rounded-xl border border-slatey-300 dark:border-slatey-600 hover:bg-white/60 dark:hover:bg-slatey-700/50 font-medium transition"
                    >
                        👀 View Site
                    </a>
                </div>
            </div>

            <form onSubmit={createProject} className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft space-y-4">
                <h2 className="font-medium">Create Project</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Title</label>
                        <input
                            className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Images (comma URLs)</label>
                        <div className="flex items-center gap-3">
                            <input
                                className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                                value={imagesText}
                                onChange={e => setImagesText(e.target.value)}
                                placeholder="https://..., https://..."
                            />
                            <label className="text-sm px-3 py-2 rounded-xl border border-slatey-300 dark:border-slatey-600 cursor-pointer">
                                {uploading ? "Uploading..." : "Upload"}
                                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                            </label>
                        </div>
                        {previewUrls.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-3">
                                {previewUrls.map(u => (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img key={u} src={u} alt="preview" className="h-20 w-28 object-cover rounded-lg border border-slatey-300 dark:border-slatey-600" />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-1">Description</label>
                        <textarea
                            className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Tags (comma)</label>
                        <input
                            className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={tagsText}
                            onChange={e => setTagsText(e.target.value)}
                            placeholder="table, walnut"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input id="pub" type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} />
                            <span>Publish now</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input id="feat" type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                            <span>Feature on homepage</span>
                        </label>
                    </div>
                </div>

                <button className="rounded-xl bg-wood-500 hover:bg-wood-600 text-white font-medium px-4 py-2">Create</button>
                {msg && <span className="text-sm ml-3">{msg}</span>}
            </form>

            <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft">
                <h2 className="font-medium mb-3">All Projects</h2>
                {loading ? (
                    <p>Loading…</p>
                ) : (
                    <div className="space-y-3">
                        {items.map(p => (
                            <div key={p._id} className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slatey-200 dark:border-slatey-700 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-16 rounded-lg overflow-hidden bg-slatey-200 dark:bg-slatey-700 flex items-center justify-center">
                                        {p.images?.[0] ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="text-xs text-slatey-500 dark:text-slatey-400">no img</span>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold flex items-center gap-2">
                                            {p.title}
                                            {p.isFeatured && <span title="Featured" className="text-amber-500">★</span>}
                                        </div>
                                        <div className="text-sm text-slatey-500 dark:text-slatey-400">
                                            {p.isPublished ? "Published" : "Draft"} • {new Date(p.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/* NEW: Edit button opens drawer */}
                                    <button
                                        onClick={() => setEditing(p)}
                                        className="px-3 py-1.5 rounded-xl border border-slatey-300 dark:border-slatey-600"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => toggleFeatured(p._id, !p.isFeatured)}
                                        className="px-3 py-1.5 rounded-xl border border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-slatey-700/50"
                                    >
                                        {p.isFeatured ? "Unfeature" : "Feature"}
                                    </button>
                                    <button
                                        onClick={() => togglePublish(p._id, !p.isPublished)}
                                        className="px-3 py-1.5 rounded-xl bg-accent-500 text-white hover:bg-accent-600"
                                    >
                                        {p.isPublished ? "Unpublish" : "Publish"}
                                    </button>
                                    <button
                                        onClick={() => remove(p._id)}
                                        className="px-3 py-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        {items.length === 0 && <p className="text-sm">No projects yet.</p>}
                    </div>
                )}
            </div>

            {/* NEW: Drawer */}
            {editing && (
                <AdminProjectEditor
                    project={editing}
                    onClose={() => setEditing(null)}
                    onSaved={load}
                />
            )}
        </div>
    );
}
