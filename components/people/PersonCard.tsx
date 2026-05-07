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
  pi: "border-ucd-gold",
  phd: "border-ucd-green",
  postdoc: "border-ucd-green",
  msc: "border-ucd-green",
};

export function PersonCard({ person }: { person: Person }) {
  const [expanded, setExpanded] = useState(false);
  const accent = ROLE_ACCENT[person.role] ?? "border-ucd-navy-100 dark:border-[#0e2155]";

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
      className={`bg-white dark:bg-[#071030] border-2 ${accent} rounded-2xl overflow-hidden hover:shadow-lg transition-shadow`}
    >
      {/* Card front — always visible */}
      <div className="flex flex-col items-center text-center px-6 pt-8 pb-5">
        {/* Avatar — large */}
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            width={240}
            height={240}
            className="rounded-full object-cover w-56 h-56 ring-4 ring-ucd-green/20 mb-4"
          />
        ) : (
          <div className="w-56 h-56 rounded-full bg-ucd-navy flex items-center justify-center text-white text-5xl font-bold select-none ring-4 ring-ucd-green/20 mb-4">
            {person.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}

        <h3 className="font-bold text-lg text-ucd-navy dark:text-white leading-tight mb-1">
          {person.name}
        </h3>
        <p className="text-sm text-ucd-green dark:text-ucd-green-100 font-medium mb-4">
          {person.roleLabel}
        </p>

        {/* Contact icons */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-5">
          {links.map(({ href, icon, label, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              onClick={(e) => e.stopPropagation()}
              style={{ color }}
              className="transition-opacity hover:opacity-70 p-1"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex items-center gap-1.5 text-xs font-semibold text-ucd-navy-200 dark:text-[#6b80a8] hover:text-ucd-green dark:hover:text-ucd-green-100 transition-colors"
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
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 border-t border-ucd-navy-100 dark:border-[#0e2155] pt-5">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {person.bio}
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {person.researchInterests.map((interest) => (
              <Tag key={interest} label={interest} variant="outline" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
