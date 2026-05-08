"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, X, FileText, BookOpen, Users, Newspaper } from "lucide-react";
import type { SearchItem } from "@/app/api/search/route";

const TYPE_META: Record<SearchItem["type"], { label: string; icon: React.ReactNode; color: string }> = {
  project:     { label: "Research",    icon: <FileText size={13} />,  color: "text-ucd-green bg-ucd-green-50 dark:bg-ucd-green-100/10" },
  publication: { label: "Publication", icon: <BookOpen size={13} />,  color: "text-ucd-blue bg-ucd-blue-50 dark:bg-ucd-blue-100/10" },
  blog:        { label: "Blog",        icon: <Newspaper size={13} />, color: "text-ucd-gold-dark bg-ucd-gold-50 dark:bg-ucd-gold-100/10" },
  person:      { label: "People",      icon: <Users size={13} />,     color: "text-ucd-navy bg-ucd-navy-50 dark:bg-ucd-navy-900/40" },
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
        className="p-2 rounded-md text-ucd-navy dark:text-gray-300 hover:bg-ucd-navy-50 dark:hover:bg-[#0e2155] transition-colors"
      >
        <Search size={18} />
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden />

          {/* Panel */}
          <div
            className="relative w-full max-w-xl bg-white dark:bg-[#071030] rounded-2xl shadow-2xl border border-ucd-navy-100 dark:border-[#0e2155] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-ucd-navy-100 dark:border-[#0e2155]">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search research, publications, blog, people…"
                className="flex-1 bg-transparent text-sm text-ucd-navy dark:text-white placeholder-gray-400 outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline text-[10px] text-gray-400 border border-gray-200 dark:border-[#0e2155] rounded px-1.5 py-0.5 font-mono">
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
                    className="flex items-start gap-3 px-4 py-3 hover:bg-ucd-navy-50 dark:hover:bg-[#0e2155] transition-colors border-b border-ucd-navy-50 dark:border-[#0e2155]/50 last:border-0"
                  >
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${meta.color}`}>
                      {meta.icon} {meta.label}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ucd-navy dark:text-white truncate">{item.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
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
