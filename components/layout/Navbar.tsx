"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchModal } from "@/components/ui/SearchModal";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 backdrop-blur-md">
      <div className="h-1 bg-ucd-gold" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex min-h-20 items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 rounded-md">
            <span className="block">
            <Image
              src="/ucd-logo.svg"
              alt="University College Dublin"
              width={34}
              height={49}
              className="object-contain shrink-0"
              style={{ height: "auto" }}
            /></span>
            <div className="hidden min-[400px]:block leading-tight">
              <span className="block text-base sm:text-lg font-bold text-ucd-navy dark:text-white tracking-tight">
                Mood &amp; Money Lab
              </span>
              <span className="hidden sm:block text-xs text-[color:var(--muted)] font-medium">
                University College Dublin
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-auto mr-4" aria-label="Primary navigation">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-ucd-navy-50 text-ucd-navy dark:bg-[color:var(--surface-subtle)] dark:text-white" : "text-[color:var(--foreground)] hover:bg-[color:var(--surface-subtle)] hover:text-ucd-navy dark:hover:text-white"}`}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side — search, theme, mobile menu */}
          <div className="flex items-center gap-1">
            <SearchModal />
            <ThemeToggle />

            <div className="relative lg:hidden" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-ucd-navy transition-colors hover:bg-[color:var(--surface-subtle)] dark:text-gray-200"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Dropdown menu */}
              {open && (
                <nav aria-label="Mobile navigation" className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2 shadow-lg">
                  {NAV_LINKS.map(({ href, label }) => {
                    const active = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-11 items-center rounded-lg px-4 py-3 text-sm transition-colors ${
                          active
                            ? "bg-ucd-navy-50 text-ucd-navy font-semibold dark:bg-[color:var(--surface-subtle)] dark:text-white"
                            : "text-[color:var(--foreground)] hover:bg-[color:var(--surface-subtle)]"
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
