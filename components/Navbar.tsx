"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Me = { authenticated: boolean; user?: { role?: string } };

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [isAdmin, setIsAdmin] = useState(false);
    const [checking, setChecking] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    // Check session whenever route changes (and on mount)
    useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                const res = await fetch("/api/auth/me", { cache: "no-store" });
                const data: Me = await res.json().catch(() => ({ authenticated: false }));
                if (!ignore) {
                    setIsAdmin(!!data.authenticated && data.user?.role === "admin");
                    setChecking(false);
                }
            } catch {
                if (!ignore) {
                    setIsAdmin(false);
                    setChecking(false);
                }
            }
        })();
        return () => { ignore = true; };
    }, [pathname]);

    async function logout() {
        setLoggingOut(true);
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } finally {
            // Immediately hide Logout/Admin, then navigate
            setIsAdmin(false);
            setLoggingOut(false);
            router.push("/");
            router.refresh();
        }
    }

    function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
        const active = pathname === href;
        return (
            <Link
                href={href}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition
          ${active ? "bg-wood-500 text-white" : "hover:bg-white/60 dark:hover:bg-slatey-700/50"}`}
            >
                {children}
            </Link>
        );
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slatey-200 dark:border-slatey-700 bg-white/65 dark:bg-slatey-800/60 backdrop-blur">
            <nav className="mx-auto max-w-7xl px-6 sm:px-8 h-14 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-base font-bold text-wood-600 dark:text-wood-300 no-underline">
                        {process.env.NEXT_PUBLIC_SITE_NAME || "SathTheBuilder"}
                    </Link>
                    <div className="hidden md:flex items-center gap-1">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/services">Services</NavLink>
                        <NavLink href="/gallery">Gallery</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* When not admin (or still checking), show Login; when admin, show Admin + Logout */}
                    {isAdmin ? (
                        <>
                            <NavLink href="/admin">Admin</NavLink>
                            <button
                                onClick={logout}
                                disabled={loggingOut}
                                className="px-3 py-1.5 rounded-xl text-sm font-medium bg-wood-500 text-white hover:bg-wood-600 disabled:opacity-60"
                                aria-label="Logout"
                            >
                                {loggingOut ? "…" : "Logout"}
                            </button>
                        </>
                    ) : (
                        !checking && <NavLink href="/login">Login</NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
}
