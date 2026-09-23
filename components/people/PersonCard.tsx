"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { SiGooglescholar } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import { Tag } from "@/components/ui/Tag";
import type { Person } from "@/types";

const ROLE_ACCENT: Partial<Record<Person["role"], string>> = {
  pi: "border-t-ucd-gold",
  phd: "border-t-ucd-navy",
  postdoc: "border-t-ucd-navy",
  msc: "border-t-ucd-navy",
};

export function PersonCard({ person }: { person: Person }) {
  const [expanded, setExpanded] = useState(false);
  const accent = ROLE_ACCENT[person.role] ?? "border-t-[color:var(--border)]";

  const links = [
    person.email && {
      href: `mailto:${person.email}`,
      icon: <MdEmail size={20} />,
      label: "Email",
      color: "#2F6B3A",
    },
    person.website && {
      href: person.website,
      icon: <TbWorld size={20} />,
      label: "Website",
      color: "#2F6B3A",
    },
    person.googleScholar && {
      href: person.googleScholar,
      icon: <SiGooglescholar size={20} />,
      label: "Google Scholar",
      color: "#4285F4",
    },
    person.linkedin && {
      href: person.linkedin,
      icon: <FaLinkedin size={20} />,
      label: "LinkedIn",
      color: "#0A66C2",
    },
    person.twitter && {
      href: person.twitter,
      icon: <FaXTwitter size={20} />,
      label: "Twitter/X",
      color: "#536471",
    },
    person.github && {
      href: person.github,
      icon: <FaGithub size={20} />,
      label: "GitHub",
      color: "#6e7681",
    },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string; color: string }[];

  return (
    <div
      className={`overflow-hidden rounded-xl border border-t-4 border-[color:var(--border)] bg-[color:var(--surface)] shadow-sm transition-shadow hover:shadow-md ${accent}`}
    >
      {/* Card front — always visible */}
      <div className="px-6 pt-8 pb-6">
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            width={640}
            height={640}
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover w-full aspect-square rounded-lg mb-6"
            style={{ objectPosition: person.imagePosition ?? "center 25%" }}
          />
        ) : (
          <div className="w-full aspect-square rounded-lg bg-ucd-navy flex items-center justify-center text-white text-5xl font-bold select-none mb-6">
            {person.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}

        <h3 className="text-xl font-semibold text-[color:var(--foreground)] leading-tight mb-1">
          {person.name}
        </h3>
        <p className="text-sm text-ucd-navy dark:text-ucd-navy-200 font-medium mb-4">
          {person.roleLabel}
        </p>

        {/* Contact icons */}
        <div className="flex items-center gap-3 flex-wrap mb-5">
          {links.map(({ href, icon, label, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              onClick={(e) => e.stopPropagation()}
              style={{ color }}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg transition-colors hover:bg-[color:var(--surface-subtle)]"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={`profile-${person.id}`}
          className="flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-ucd-navy hover:bg-[color:var(--surface-subtle)] dark:text-ucd-navy-200 transition-colors"
        >
          {expanded ? "Hide profile" : "View profile"}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Expandable bio + interests */}
      <div
        id={`profile-${person.id}`}
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 border-t border-[color:var(--border)] pt-5">
          <p className="content-copy text-base mb-5 leading-7">
            {person.bio}
          </p>
          <div className="flex flex-wrap gap-2">
            {person.researchInterests.map((interest) => (
              <Tag key={interest} label={interest} variant="outline" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
