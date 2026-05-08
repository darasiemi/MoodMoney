import { Tag } from "@/components/ui/Tag";
import { ExternalLink, FileText, Code } from "lucide-react";
import type { Publication } from "@/types";

const TYPE_STYLES: Record<Publication["type"], string> = {
  journal:    "bg-ucd-blue text-white",                                               // blue — sparing
  conference: "bg-ucd-gold text-ucd-navy-900",                                       // gold — UCD brand
  preprint:   "bg-ucd-navy-100 text-ucd-navy dark:bg-[#0e2155] dark:text-ucd-navy-200",
  workshop:   "bg-gray-100 text-gray-600 dark:bg-[#0e2155] dark:text-gray-400",
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
    <div className="relative bg-white dark:bg-[#071030] border border-ucd-navy-100 dark:border-[#0e2155] rounded-xl p-6 hover:border-ucd-green dark:hover:border-ucd-green transition-colors">

      <div className="flex items-start gap-4 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-ucd-navy dark:text-white leading-snug mb-1">
            {pub.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{authorsDisplay}</p>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full ${TYPE_STYLES[pub.type]}`}>
          {pub.type}
        </span>
      </div>

      {/* Venue */}
      <p className="text-sm font-semibold text-ucd-green dark:text-ucd-green-100 mb-3">
        {pub.venueShort ?? pub.venue}
      </p>

      {pub.abstract && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
          {pub.abstract}
        </p>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-ucd-navy-50 dark:border-[#0e2155]">
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
              className="flex items-center gap-1 text-xs font-medium text-ucd-navy-700 dark:text-ucd-navy-200 hover:text-ucd-green dark:hover:text-ucd-green-100 transition-colors"
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
              className="flex items-center gap-1 text-xs font-medium text-ucd-navy-700 dark:text-ucd-navy-200 hover:text-ucd-green dark:hover:text-ucd-green-100 transition-colors"
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
              className="flex items-center gap-1 text-xs font-medium text-ucd-navy-700 dark:text-ucd-navy-200 hover:text-ucd-green dark:hover:text-ucd-green-100 transition-colors"
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
              className="flex items-center gap-1 text-xs font-medium text-ucd-navy-700 dark:text-ucd-navy-200 hover:text-ucd-green dark:hover:text-ucd-green-100 transition-colors"
            >
              <Code size={12} />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
