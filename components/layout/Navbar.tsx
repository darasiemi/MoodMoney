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
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#030c22]/95 backdrop-blur-sm border-b border-ucd-navy-100 dark:border-[#0e2155] shadow-sm">
      {/* UCD gold brand strip */}
      <div className="h-1 bg-ucd-gold w-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/ucd-logo.svg"
              alt="University College Dublin"
              width={40}
              height={40}
              className="object-contain shrink-0"
            />
            <div className="leading-tight">
              <span className="block text-sm font-bold text-ucd-navy dark:text-white tracking-tight">
                Mood &amp; Money Lab
              </span>
              <span className="hidden sm:block text-[10px] text-ucd-navy-700 dark:text-ucd-navy-200 tracking-wide uppercase font-medium" style={{ fontFamily: "var(--font-montserrat)" }}>
                University College Dublin
              </span>
            </div>
          </Link>

          {/* Right side — search, theme, hamburger */}
          <div className="flex items-center gap-1">
            <SearchModal />
            <ThemeToggle />

            {/* Hamburger — always visible */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="p-2 rounded-md text-ucd-navy dark:text-gray-300 hover:bg-ucd-navy-50 dark:hover:bg-[#0e2155] transition-colors"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Dropdown menu */}
              {open && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#071030] border border-ucd-navy-100 dark:border-[#0e2155] rounded-xl shadow-lg overflow-hidden">
                  {NAV_LINKS.map(({ href, label }) => {
                    const active = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm border-b border-ucd-navy-50 dark:border-[#0e2155] last:border-0 transition-colors ${
                          active
                            ? "text-ucd-navy dark:text-white font-semibold bg-ucd-navy-50 dark:bg-[#0e2155]"
                            : "text-gray-600 dark:text-gray-400 hover:bg-ucd-navy-50 dark:hover:bg-[#0e2155] hover:text-ucd-navy dark:hover:text-white"
                        }`}
                      >
                        {active && <span className="w-1 h-4 bg-ucd-green rounded-full shrink-0" />}
                        {label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
