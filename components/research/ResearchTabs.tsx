"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/research/ProjectCard";
import type { Project } from "@/types";

interface ResearchTabsProps {
  active: Project[];
  completed: Project[];
  underReview: Project[];
}

const TABS = [
  { key: "active",      label: "Active" },
  { key: "underReview", label: "Under Review" },
  { key: "completed",   label: "Completed" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function ResearchTabs({ active = [], completed = [], underReview = [] }: ResearchTabsProps) {
  const [tab, setTab] = useState<TabKey>("active");
  const projects = tab === "active" ? active : tab === "completed" ? completed : underReview;

  return (
    <div>
      {/* Tab bar */}
      <div role="tablist" aria-label="Research project status" className="flex gap-2 border-b border-[color:var(--border)] mb-6 overflow-x-auto">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            role="tab"
            aria-selected={tab === key}
            id={`research-tab-${key}`}
            aria-controls="research-project-panel"
            className={`relative min-h-11 whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors ${
              tab === key
                ? "bg-ucd-navy-50 text-ucd-navy dark:bg-[color:var(--surface-subtle)] dark:text-white"
                : "text-[color:var(--muted)] hover:bg-[color:var(--surface-subtle)] hover:text-ucd-navy dark:hover:text-white"
            }`}
          >
            {label}
            {tab === key && (
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-ucd-navy" />
            )}
          </button>
        ))}
      </div>

      {/* Project grid */}
      {projects.length > 0 ? (
        <div id="research-project-panel" role="tabpanel" aria-labelledby={`research-tab-${tab}`} className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
