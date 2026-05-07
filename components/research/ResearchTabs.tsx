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
      <div className="flex gap-1 border-b border-ucd-navy-100 dark:border-[#0e2155] mb-8">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors relative ${
              tab === key
                ? "text-ucd-navy dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-ucd-navy dark:hover:text-white"
            }`}
          >
            {label}
            {tab === key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ucd-green rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Project grid */}
      {projects.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
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
