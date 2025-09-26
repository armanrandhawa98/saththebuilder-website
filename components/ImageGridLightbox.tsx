"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGridLightbox({ images }: { images: string[] }) {
    const valid = images?.filter(Boolean) || [];
    const [open, setOpen] = useState(false);
    const [idx, setIdx] = useState(0);

    if (!valid.length) {
        return (
            <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft">
                <p className="text-sm text-slatey-500 dark:text-slatey-400">No images yet.</p>
            </div>
        );
    }

    function onThumbClick(i: number) {
        setIdx(i);
        setOpen(true);
    }

    function next() {
        setIdx((i) => (i + 1) % valid.length);
    }
    function prev() {
        setIdx((i) => (i - 1 + valid.length) % valid.length);
    }

    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {valid.map((u, i) => (
                    <div
                        key={u + i}
                        onClick={() => onThumbClick(i)}
                        className="relative aspect-[4/3] w-full rounded-2xl border border-slatey-200 dark:border-slatey-700 cursor-zoom-in hover:opacity-90 overflow-hidden"
                    >
                        <Image
                            src={u}
                            alt={`Project image ${i + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {open && (
                <div
                    className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="relative max-w-5xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full max-h-[80vh] aspect-[4/3] rounded-xl overflow-hidden">
                            <Image
                                src={valid[idx]}
                                alt={`Project image ${idx + 1} - full view`}
                                fill
                                sizes="90vw"
                                className="object-contain"
                            />
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-2 right-2 px-3 py-1.5 rounded-xl bg-slatey-800/80 text-white"
                        >
                            ✕
                        </button>
                        {valid.length > 1 && (
                            <>
                                <button
                                    onClick={prev}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slatey-800/80 text-white"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={next}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slatey-800/80 text-white"
                                >
                                    →
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
