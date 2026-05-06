"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#030c22]/95 backdrop-blur-sm border-b border-ucd-navy-100 dark:border-[#0e2155] shadow-sm">
      {/* UCD gold brand strip — identity only */}
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
              <span className="hidden sm:block text-[10px] text-ucd-navy-700 dark:text-ucd-navy-200 tracking-wide uppercase font-medium">
                University College Dublin
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                    active
                      ? "text-ucd-navy dark:text-white"
                      : "text-gray-600 hover:text-ucd-navy dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-ucd-green rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-md text-ucd-navy dark:text-gray-300 hover:bg-ucd-navy-50 dark:hover:bg-[#0e2155] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-ucd-navy-100 dark:border-[#0e2155] bg-white dark:bg-[#071030] px-4 pb-4 pt-2">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 py-2.5 text-sm border-b border-ucd-navy-50 dark:border-[#0e2155] last:border-0 transition-colors ${
                  active
                    ? "text-ucd-navy dark:text-white font-semibold"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {active && <span className="w-1 h-4 bg-ucd-green rounded-full" />}
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
