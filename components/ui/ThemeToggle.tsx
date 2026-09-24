"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-11 w-11" aria-hidden />;

  const isDark = resolvedTheme === "dark";

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";

    // Apply the class immediately so mobile browsers repaint without waiting
    // for the provider's storage update to complete.
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);
    document.documentElement.style.colorScheme = nextTheme === "light" ? "only light" : "dark";
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg text-ucd-navy-700 transition-colors hover:bg-[color:var(--surface-subtle)] active:bg-[color:var(--surface-subtle)] dark:text-ucd-navy-200"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
