"use client";

import { useEffect, useState } from "react";

type Project = {
    _id: string;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    isPublished: boolean;
    isFeatured: boolean;
};

export default function AdminProjectEditor({
    project,
    onClose,
    onSaved,
}: {
    project: Project;
    onClose: () => void;
    onSaved: () => void;
}) {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description || "");
    const [tagsText, setTagsText] = useState(project.tags?.join(", ") || "");
    const [images, setImages] = useState<string[]>(project.images || []);
    const [isPublished, setIsPublished] = useState(!!project.isPublished);
    const [isFeatured, setIsFeatured] = useState(!!project.isFeatured);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        // keep in sync if parent switches selection quickly
        setTitle(project.title);
        setDescription(project.description || "");
        setTagsText(project.tags?.join(", ") || "");
        setImages(project.images || []);
        setIsPublished(!!project.isPublished);
        setIsFeatured(!!project.isFeatured);
    }, [project]);

    function up(i: number) {
        if (i <= 0) return;
        setImages((arr) => {
            const copy = [...arr];
            [copy[i - 1], copy[i]] = [copy[i], copy[i - 1]];
            return copy;
        });
    }
    function down(i: number) {
        setImages((arr) => {
            if (i >= arr.length - 1) return arr;
            const copy = [...arr];
            [copy[i + 1], copy[i]] = [copy[i], copy[i + 1]];
            return copy;
        });
    }
    function remove(i: number) {
        setImages((arr) => arr.filter((_, idx) => idx !== i));
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
            if (url) setImages((prev) => [...prev, url]);
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    }

    async function save() {
        setSaving(true);
        const payload = {
            title,
            description,
            tags: tagsText.split(",").map((s) => s.trim()).filter(Boolean),
            images,
            isPublished,
            isFeatured,
        };
        const res = await fetch(`/api/projects/${project._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        setSaving(false);
        if (!res.ok) {
            console.error(await res.json().catch(() => ({})));
            alert("Save failed");
            return;
        }
        onSaved();
        onClose();
    }

    return (
        <div className="fixed inset-0 z-[60]">
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            {/* drawer */}
            <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-white dark:bg-slatey-800 shadow-2xl overflow-y-auto">
                <div className="p-5 border-b border-slatey-200 dark:border-slatey-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Edit Project</h2>
                    <button onClick={onClose} className="px-3 py-1.5 rounded-xl border border-slatey-300 dark:border-slatey-600">
                        ✕
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Title</label>
                        <input
                            className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Description</label>
                        <textarea
                            rows={4}
                            className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Tags (comma)</label>
                        <input
                            className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={tagsText}
                            onChange={(e) => setTagsText(e.target.value)}
                            placeholder="table, walnut"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="block text-sm mb-1">Images</label>
                            <label className="text-sm px-3 py-2 rounded-xl border border-slatey-300 dark:border-slatey-600 cursor-pointer">
                                {uploading ? "Uploading..." : "Upload"}
                                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                            </label>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-3">
                            {images.map((u, i) => (
                                <div key={u + i} className="space-y-2">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={u} alt="" className="h-28 w-full object-cover rounded-lg border border-slatey-300 dark:border-slatey-600" />
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => up(i)} className="px-2 py-1 rounded-lg border text-xs">↑</button>
                                        <button onClick={() => down(i)} className="px-2 py-1 rounded-lg border text-xs">↓</button>
                                        <button onClick={() => remove(i)} className="ml-auto px-2 py-1 rounded-lg bg-red-600 text-white text-xs">Remove</button>
                                    </div>
                                </div>
                            ))}
                            {images.length === 0 && <div className="text-sm text-slatey-500">No images yet.</div>}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                            <span>Published</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                            <span>Featured</span>
                        </label>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <button
                            onClick={save}
                            disabled={saving}
                            className="px-4 py-2 rounded-xl bg-wood-500 text-white hover:bg-wood-600 disabled:opacity-60"
                        >
                            {saving ? "Saving…" : "Save changes"}
                        </button>
                        <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slatey-300 dark:border-slatey-600">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
