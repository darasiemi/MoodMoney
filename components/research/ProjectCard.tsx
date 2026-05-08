import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";

const STATUS_STYLES: Record<Project["status"], { dot: string; label: string }> = {
  active:         { dot: "bg-ucd-green",    label: "text-ucd-green dark:text-ucd-green-100 font-semibold" },
  completed:      { dot: "bg-gray-400",     label: "text-gray-500 dark:text-gray-400" },
  upcoming:       { dot: "bg-ucd-navy-200", label: "text-ucd-navy-700 dark:text-ucd-navy-200" },
  "under review": { dot: "bg-ucd-gold",     label: "text-ucd-gold-dark dark:text-ucd-gold font-semibold" },
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
      className="group relative block bg-white dark:bg-[#071030] border border-ucd-navy-100 dark:border-[#0e2155] rounded-xl p-6 hover:border-ucd-green dark:hover:border-ucd-green hover:shadow-lg transition-all overflow-hidden"
    >

      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-base font-bold text-ucd-navy dark:text-white group-hover:text-ucd-green dark:group-hover:text-ucd-green-100 transition-colors leading-snug">
          {title}
        </h3>
        <span className={`shrink-0 flex items-center gap-1.5 text-xs ${s.label}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === "active" ? "animate-pulse" : ""}`} />
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-3 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-gray-400 self-center">+{tags.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <span className="text-xs text-gray-400 dark:text-gray-500">{years}</span>
          <ArrowRight
            size={14}
            className="text-ucd-navy-200 dark:text-[#0e2155] group-hover:text-ucd-green group-hover:translate-x-0.5 transition-all"
          />
        </div>
      </div>
    </Link>
  );
}
