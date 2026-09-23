"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, FileText, BookOpen, Users, Newspaper } from "lucide-react";
import type { SearchItem } from "@/app/api/search/route";

const TYPE_META: Record<SearchItem["type"], { label: string; icon: React.ReactNode; color: string }> = {
  project:     { label: "Research",    icon: <FileText size={13} />,  color: "text-ucd-navy bg-ucd-navy-50 dark:bg-ucd-navy-900/40 dark:text-ucd-navy-200" },
  publication: { label: "Publication", icon: <BookOpen size={13} />,  color: "text-ucd-navy bg-ucd-navy-50 dark:bg-ucd-navy-900/40 dark:text-ucd-navy-200" },
  blog:        { label: "Blog",        icon: <Newspaper size={13} />, color: "text-ucd-navy bg-ucd-navy-50 dark:bg-ucd-navy-900/40 dark:text-ucd-navy-200" },
  person:      { label: "People",      icon: <Users size={13} />,     color: "text-ucd-navy bg-ucd-navy-50 dark:bg-ucd-navy-900/40 dark:text-ucd-navy-200" },
};

export function SearchModal() {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const [items, setItems]     = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef              = useRef<HTMLInputElement>(null);

  // Fetch search index once when modal opens
  useEffect(() => {
    if (!open || items.length > 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch("/api/search")
      .then((r) => r.json())
      .then((data) => setItems(data))
      .finally(() => setLoading(false));
  }, [open, items.length]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const close = useCallback(() => { setOpen(false); setQuery(""); }, []);

  const results = query.trim().length < 2 ? [] : items.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }).slice(0, 8);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-ucd-navy transition-colors hover:bg-[color:var(--surface-subtle)] dark:text-gray-200"
      >
        <Search size={18} />
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center px-5 pt-20 sm:pt-24"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ucd-navy/65" aria-hidden />

          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[color:var(--border)]">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                aria-label="Search the site"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search research, publications, blog, people…"
                className="flex-1 bg-transparent text-base text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[color:var(--muted)] hover:bg-[color:var(--surface-subtle)] hover:text-[color:var(--foreground)]">
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline text-xs text-[color:var(--muted)] border border-[color:var(--border)] rounded px-2 py-1 font-mono">
                Esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {loading && (
                <p className="text-sm text-gray-400 text-center py-8">Loading…</p>
              )}
              {!loading && query.length >= 2 && results.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No results for &ldquo;{query}&rdquo;</p>
              )}
              {!loading && query.length < 2 && (
                <p className="text-sm text-gray-400 text-center py-8">Type to search…</p>
              )}
              {results.map((item, i) => {
                const meta = TYPE_META[item.type];
                const isExternal = item.url.startsWith("http");
                return (
                  <Link
                    key={i}
                    href={item.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    onClick={close}
                    className="group flex items-start gap-3 px-5 py-4 hover:bg-ucd-navy-50 dark:hover:bg-[color:var(--surface-subtle)] transition-colors border-b border-[color:var(--border)] last:border-0"
                  >
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md shrink-0 mt-0.5 ${meta.color}`}>
                      {meta.icon} {meta.label}
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-[color:var(--foreground)] truncate">{item.title}</p>
                      <p className="content-copy text-sm line-clamp-1 mt-0.5">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
