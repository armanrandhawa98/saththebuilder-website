"use client";

import { useState } from "react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [tagsText, setTagsText] = useState("");
    const [website, setWebsite] = useState(""); // honeypot (hidden)
    const [busy, setBusy] = useState(false);
    const [ok, setOk] = useState<null | boolean>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setBusy(true); setOk(null);
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name, email, phone, message,
                tags: tagsText.split(",").map(s => s.trim()).filter(Boolean),
                website, // honeypot field
            }),
        });
        setBusy(false);
        if (res.ok) {
            setOk(true);
            setName(""); setEmail(""); setPhone(""); setMessage(""); setTagsText(""); setWebsite("");
        } else setOk(false);
    }

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="rounded-2xl p-6 sm:p-8 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                <h1 className="text-2xl font-semibold text-wood-600 dark:text-wood-300">Get a Quote</h1>
                <p className="mt-2 text-slatey-600 dark:text-slatey-300">Tell us about your project and we’ll follow up.</p>

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                                value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input type="email" className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                                value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Phone (optional)</label>
                        <input className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Tags (comma separated)</label>
                        <input className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={tagsText} onChange={e => setTagsText(e.target.value)} placeholder="table, walnut, built-in" />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Message</label>
                        <textarea className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            rows={5} value={message} onChange={e => setMessage(e.target.value)} required />
                    </div>

                    {/* Honeypot field (hidden) */}
                    <input
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                        placeholder="Do not fill"
                    />

                    <button disabled={busy} className="rounded-xl bg-wood-500 hover:bg-wood-600 text-white font-medium px-4 py-2 disabled:opacity-60">
                        {busy ? "Sending…" : "Send request"}
                    </button>

                    {ok === true && <p className="text-sm text-green-600 dark:text-green-400 mt-2">Thanks! We’ll get back to you soon.</p>}
                    {ok === false && <p className="text-sm text-red-600 dark:text-red-400 mt-2">Something went wrong. Please try again.</p>}
                </form>
            </div>
        </div>
    );
}
