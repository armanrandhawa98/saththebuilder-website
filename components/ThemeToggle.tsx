// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const active = theme ?? resolvedTheme ?? "system";

    return (
        <button
            onClick={() => setTheme(active === "dark" ? "light" : "dark")}
            className="rounded-xl px-3 py-1.5 text-sm font-medium bg-slatey-100 dark:bg-slatey-700 hover:shadow-soft transition"
            aria-label="Toggle theme"
        >
            {active === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
    );
}
