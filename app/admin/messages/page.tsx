"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Msg = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    tags: string[];
    read: boolean;
    createdAt: string;
};

export default function MessagesPage() {
    const [items, setItems] = useState<Msg[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
    const [selectedMsg, setSelectedMsg] = useState<Msg | null>(null);

    async function load() {
        setLoading(true);
        const r = await fetch("/api/contact?limit=100", { cache: "no-store" });
        const d = await r.json();
        setItems(d.items || []);
        setLoading(false);
    }
    useEffect(() => { load(); }, []);

    async function markRead(id: string, next: boolean) {
        await fetch(`/api/contact/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ read: next }),
        });
        // Update local state instead of full reload
        setItems(prev => prev.map(m => m._id === id ? { ...m, read: next } : m));
        if (selectedMsg?._id === id) {
            setSelectedMsg(prev => prev ? { ...prev, read: next } : null);
        }
    }

    async function remove(id: string) {
        if (!confirm("Are you sure you want to delete this message?")) return;
        await fetch(`/api/contact/${id}`, { method: "DELETE" });
        setItems(prev => prev.filter(m => m._id !== id));
        if (selectedMsg?._id === id) {
            setSelectedMsg(null);
        }
    }

    const filteredItems = items.filter(msg => {
        if (filter === "unread") return !msg.read;
        if (filter === "read") return msg.read;
        return true;
    });

    const unreadCount = items.filter(m => !m.read).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-wood-600 dark:text-wood-300">
                    Customer Messages {unreadCount > 0 && (
                        <span className="ml-2 px-2 py-1 text-sm bg-wood-500 text-white rounded-full">
                            {unreadCount} new
                        </span>
                    )}
                </h1>
                <Link href="/admin" className="text-sm underline hover:no-underline">
                    ← Back to Admin
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slatey-100 dark:bg-slatey-800 rounded-xl">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === "all"
                            ? "bg-white dark:bg-slatey-700 shadow-sm"
                            : "hover:bg-white/50 dark:hover:bg-slatey-700/50"
                        }`}
                >
                    All ({items.length})
                </button>
                <button
                    onClick={() => setFilter("unread")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === "unread"
                            ? "bg-white dark:bg-slatey-700 shadow-sm"
                            : "hover:bg-white/50 dark:hover:bg-slatey-700/50"
                        }`}
                >
                    Unread ({unreadCount})
                </button>
                <button
                    onClick={() => setFilter("read")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === "read"
                            ? "bg-white dark:bg-slatey-700 shadow-sm"
                            : "hover:bg-white/50 dark:hover:bg-slatey-700/50"
                        }`}
                >
                    Read ({items.length - unreadCount})
                </button>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <p className="text-slatey-500 dark:text-slatey-400">Loading messages...</p>
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-slatey-500 dark:text-slatey-400">
                        {filter === "all" ? "No messages yet." : `No ${filter} messages.`}
                    </p>
                    {filter === "all" && (
                        <p className="text-sm text-slatey-400 mt-2">
                            Customer quote requests will appear here.
                        </p>
                    )}
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Messages List */}
                    <div className="space-y-3">
                        {filteredItems.map((m) => (
                            <div
                                key={m._id}
                                onClick={() => setSelectedMsg(m)}
                                className={`p-4 rounded-xl border cursor-pointer transition hover:shadow-md ${!m.read
                                        ? "border-wood-300 dark:border-wood-600 bg-wood-50/50 dark:bg-wood-900/10"
                                        : "border-slatey-200 dark:border-slatey-700 bg-white/70 dark:bg-slatey-800/60"
                                    } ${selectedMsg?._id === m._id
                                        ? "ring-2 ring-wood-500"
                                        : ""
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">{m.name}</h3>
                                            {!m.read && (
                                                <span className="w-2 h-2 bg-wood-500 rounded-full"></span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slatey-600 dark:text-slatey-300">
                                            {m.email}
                                            {m.phone && ` • ${m.phone}`}
                                        </p>
                                        <p className="text-sm text-slatey-500 dark:text-slatey-400 mt-1 line-clamp-2">
                                            {m.message}
                                        </p>
                                        {m.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {m.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs px-2 py-0.5 rounded-full bg-slatey-200 dark:bg-slatey-700"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {m.tags.length > 3 && (
                                                    <span className="text-xs text-slatey-400">
                                                        +{m.tags.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs text-slatey-400 dark:text-slatey-500">
                                        {new Date(m.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Detail Panel */}
                    {selectedMsg && (
                        <div className="lg:sticky lg:top-6">
                            <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold">{selectedMsg.name}</h2>
                                        <p className="text-slatey-600 dark:text-slatey-300">{selectedMsg.email}</p>
                                        {selectedMsg.phone && (
                                            <p className="text-slatey-600 dark:text-slatey-300">{selectedMsg.phone}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                markRead(selectedMsg._id, !selectedMsg.read);
                                            }}
                                            className={`px-3 py-1.5 rounded-xl text-sm font-medium ${selectedMsg.read
                                                    ? "bg-slatey-200 dark:bg-slatey-700 text-slatey-700 dark:text-slatey-300"
                                                    : "bg-wood-500 text-white hover:bg-wood-600"
                                                }`}
                                        >
                                            {selectedMsg.read ? "Mark Unread" : "Mark Read"}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                remove(selectedMsg._id);
                                            }}
                                            className="px-3 py-1.5 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Project Inquiry:</h3>
                                        <p className="text-slatey-700 dark:text-slatey-200 whitespace-pre-wrap bg-slatey-50 dark:bg-slatey-900/20 p-3 rounded-lg">
                                            {selectedMsg.message}
                                        </p>
                                    </div>

                                    {selectedMsg.tags?.length > 0 && (
                                        <div>
                                            <h3 className="font-medium mb-2">Project Tags:</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedMsg.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 rounded-full bg-wood-100 dark:bg-wood-900/20 text-wood-700 dark:text-wood-300 text-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-sm text-slatey-500 dark:text-slatey-400 pt-4 border-t border-slatey-200 dark:border-slatey-700">
                                        <p>Received: {new Date(selectedMsg.createdAt).toLocaleString()}</p>
                                        <p>Status: <span className={selectedMsg.read ? "text-green-600" : "text-wood-600 font-medium"}>{selectedMsg.read ? "Read" : "New"}</span></p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-4">
                                        <a
                                            href={`mailto:${selectedMsg.email}?subject=Re: Your Woodworking Project Inquiry&body=Hi ${selectedMsg.name},%0D%0A%0D%0AThank you for your interest in my woodworking services!%0D%0A%0D%0A`}
                                            className="px-4 py-2 rounded-xl bg-wood-500 text-white hover:bg-wood-600 font-medium transition"
                                        >
                                            Reply via Email
                                        </a>
                                        {selectedMsg.phone && (
                                            <a
                                                href={`tel:${selectedMsg.phone}`}
                                                className="px-4 py-2 rounded-xl border border-slatey-300 dark:border-slatey-600 hover:bg-white/60 dark:hover:bg-slatey-700/50 font-medium transition"
                                            >
                                                Call Customer
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
