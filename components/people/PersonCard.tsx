import Image from "next/image";
import { ExternalLink, Mail, BookOpen, Link2 } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { Person } from "@/types";

// PI card gets gold border (UCD brand distinction); others get green
const ROLE_ACCENT: Partial<Record<Person["role"], string>> = {
  pi: "border-ucd-gold",
};

interface PersonCardProps {
  person: Person;
  variant?: "full" | "compact";
}

export function PersonCard({ person, variant = "full" }: PersonCardProps) {
  const accent = ROLE_ACCENT[person.role] ?? "border-ucd-navy-100 dark:border-[#0e2155]";

  const links = [
    person.email && {
      href: `mailto:${person.email}`,
      icon: <Mail size={14} />,
      label: "Email",
    },
    person.website && {
      href: person.website,
      icon: <ExternalLink size={14} />,
      label: "Website",
    },
    person.googleScholar && {
      href: person.googleScholar,
      icon: <BookOpen size={14} />,
      label: "Google Scholar",
    },
    person.linkedin && {
      href: person.linkedin,
      icon: <Link2 size={14} />,
      label: "LinkedIn",
    },
    person.twitter && {
      href: person.twitter,
      icon: <ExternalLink size={14} />,
      label: "Twitter/X",
    },
    person.github && {
      href: person.github,
      icon: <ExternalLink size={14} />,
      label: "GitHub",
    },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[];

  return (
    <div className={`bg-white dark:bg-[#071030] border-2 ${accent} rounded-xl p-6 hover:shadow-md transition-shadow`}>
      <div className="flex gap-4 mb-4">
        {/* Avatar */}
        <div className="shrink-0">
          {person.image ? (
            <Image
              src={person.image}
              alt={person.name}
              width={72}
              height={72}
              className="rounded-full object-cover w-16 h-16 ring-2 ring-ucd-navy-100 dark:ring-[#0e2155]"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-ucd-navy flex items-center justify-center text-white text-xl font-bold select-none ring-2 ring-ucd-green/20">
              {person.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
          )}
        </div>

        {/* Name + role */}
        <div className="min-w-0">
          <h3 className="font-bold text-ucd-navy dark:text-white leading-tight">
            {person.name}
          </h3>
          <p className="text-sm text-ucd-green dark:text-ucd-green-100 font-medium mb-2">
            {person.roleLabel}
          </p>
          {/* Social links */}
          <div className="flex items-center gap-2 flex-wrap">
            {links.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="text-ucd-navy-200 dark:text-[#1e3a6e] hover:text-ucd-green dark:hover:text-ucd-green-100 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {variant === "full" && (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
            {person.bio}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {person.researchInterests.map((interest) => (
              <Tag key={interest} label={interest} variant="outline" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
