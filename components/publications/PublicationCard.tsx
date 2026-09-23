import { Tag } from "@/components/ui/Tag";
import { ExternalLink, FileText, Code } from "lucide-react";
import type { Publication } from "@/types";

const TYPE_STYLES: Record<Publication["type"], string> = {
  journal:    "bg-ucd-blue-50 text-ucd-blue dark:bg-ucd-blue/20 dark:text-ucd-navy-200",
  conference: "bg-ucd-gold-100 text-ucd-navy-900",
  preprint:   "bg-ucd-navy-50 text-ucd-navy dark:bg-[color:var(--surface-subtle)] dark:text-ucd-navy-200",
  workshop:   "bg-[color:var(--surface-subtle)] text-[color:var(--muted)]",
};

interface PublicationCardProps {
  pub: Publication;
}

export function PublicationCard({ pub }: PublicationCardProps) {
  const authorsDisplay =
    pub.authors.length > 4
      ? `${pub.authors.slice(0, 3).join(", ")}, et al.`
      : pub.authors.join(", ");

  return (
    <article className="group relative rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">

      <div className="flex flex-col items-start gap-3 mb-3 sm:flex-row sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-[color:var(--foreground)] leading-snug mb-2 group-hover:text-ucd-navy transition-colors">
            {pub.title}
          </h3>
          <p className="content-copy text-sm">{authorsDisplay}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${TYPE_STYLES[pub.type]}`}>
          {pub.type}
        </span>
      </div>

      {/* Venue */}
      <p className="text-sm font-semibold text-ucd-navy dark:text-ucd-navy-200 mb-3">
        {pub.venueShort ?? pub.venue}
      </p>

      {pub.abstract && (
        <p className="content-copy text-sm mb-5 line-clamp-3 leading-6 max-w-4xl">
          {pub.abstract}
        </p>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-[color:var(--border)]">
        <div className="flex flex-wrap gap-1.5">
          {pub.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <div className="flex items-center gap-4">
          {pub.doi && (
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-1 rounded-md px-1 text-sm font-medium text-ucd-navy-700 hover:text-ucd-navy dark:text-ucd-navy-200 transition-colors"
            >
              <ExternalLink size={12} />
              DOI
            </a>
          )}
          {pub.arxiv && (
            <a
              href={`https://arxiv.org/abs/${pub.arxiv}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-1 rounded-md px-1 text-sm font-medium text-ucd-navy-700 hover:text-ucd-navy dark:text-ucd-navy-200 transition-colors"
            >
              <FileText size={12} />
              arXiv
            </a>
          )}
          {pub.pdf && (
            <a
              href={pub.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-1 rounded-md px-1 text-sm font-medium text-ucd-navy-700 hover:text-ucd-navy dark:text-ucd-navy-200 transition-colors"
            >
              <FileText size={12} />
              PDF
            </a>
          )}
          {pub.code && (
            <a
              href={pub.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-1 rounded-md px-1 text-sm font-medium text-ucd-navy-700 hover:text-ucd-navy dark:text-ucd-navy-200 transition-colors"
            >
              <Code size={12} />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
