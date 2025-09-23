"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setMsg(data?.error ? "Invalid credentials" : "Login failed");
                return;
            }
            // success: cookie set by the API
            router.push("/admin");
            router.refresh();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-md">
            <div className="rounded-2xl p-6 sm:p-8 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                <h1 className="text-2xl font-semibold text-wood-600 dark:text-wood-300 mb-4">Login</h1>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Email or Username</label>
                        <input
                            className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full rounded-xl border border-slatey-300 dark:border-slatey-600 bg-white/80 dark:bg-slatey-800 px-3 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {msg && <p className="text-sm text-red-600 dark:text-red-400">{msg}</p>}

                    <button
                        disabled={loading}
                        className="w-full rounded-xl bg-wood-500 hover:bg-wood-600 text-white font-medium px-4 py-2 disabled:opacity-60"
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <div className="mt-4 text-sm">
                    <Link href="/" className="underline">← Back home</Link>
                </div>
            </div>
        </div>
    );
}
