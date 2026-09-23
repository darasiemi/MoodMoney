import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";

const STATUS_STYLES: Record<Project["status"], { dot: string; label: string; accent: string }> = {
  active:         { dot: "bg-ucd-green",    label: "text-ucd-green dark:text-ucd-green-100 font-semibold", accent: "border-t-ucd-green" },
  completed:      { dot: "bg-gray-400",     label: "text-gray-500 dark:text-gray-400", accent: "border-t-ucd-navy-200" },
  upcoming:       { dot: "bg-ucd-navy-200", label: "text-ucd-navy-700 dark:text-ucd-navy-200", accent: "border-t-ucd-navy" },
  "under review": { dot: "bg-ucd-gold",     label: "text-ucd-gold-dark dark:text-ucd-gold font-semibold", accent: "border-t-ucd-gold" },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, slug, description, status, startYear, endYear, tags } = project;
  const years = endYear ? `${startYear}–${endYear}` : `${startYear}–present`;
  const s = STATUS_STYLES[status];

  return (
    <Link
      href={`/research/${slug}`}
      className={`clickable-surface group relative flex min-h-0 flex-col overflow-hidden rounded-xl border border-t-4 border-[color:var(--border)] ${s.accent} bg-[color:var(--surface)] p-4 shadow-sm sm:min-h-80 sm:p-7`}
    >

      <div className="flex flex-col items-start gap-2 mb-4 sm:flex-row sm:justify-between sm:gap-4 sm:mb-5">
        <h3 className="text-lg sm:text-2xl font-semibold text-[color:var(--foreground)] group-hover:text-ucd-navy transition-colors leading-snug max-w-[22ch]">
          {title}
        </h3>
        <span className={`shrink-0 flex items-center gap-1.5 text-xs capitalize ${s.label}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {status}
        </span>
      </div>

      <p className="content-copy text-sm sm:text-base mb-6 line-clamp-3 leading-6 sm:leading-7 max-w-xl">
        {description}
      </p>

      <div className="mt-auto flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-gray-400 self-center">+{tags.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 sm:ml-2">
          <span className="text-xs font-medium text-[color:var(--muted)]">{years}</span>
          <ArrowRight
            size={14}
            className="text-ucd-navy-200 group-hover:text-ucd-navy group-hover:translate-x-0.5 transition-all dark:text-ucd-navy-200"
          />
        </div>
      </div>
    </Link>
  );
}
