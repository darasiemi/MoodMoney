import Link from "next/link";
import { ProjectCard } from "@/components/research/ProjectCard";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="mb-20 rounded-3xl border border-ucd-navy-100 bg-ucd-navy-50/80 px-5 py-8 sm:mb-24 sm:p-8 dark:border-[color:var(--border)] dark:bg-[color:var(--surface-subtle)]">
      <div className="flex items-end justify-between gap-6 mb-7">
        <h2 className="text-3xl sm:text-4xl font-bold text-ucd-navy dark:text-white tracking-tight">
          Featured Research{" "}<span className="font-normal italic text-ucd-navy-700 dark:text-ucd-navy-200">what we&apos;re working on.</span>
        </h2>
        <Link
          href="/research"
          className="hidden sm:block rounded-md text-sm font-semibold text-ucd-navy underline decoration-2 underline-offset-4 hover:text-ucd-navy-700 dark:text-ucd-navy-200"
        >
          All projects <span aria-hidden>&rarr;</span>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
