import Link from "next/link";
import { ProjectCard } from "@/components/research/ProjectCard";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-heading text-2xl font-bold text-ucd-navy dark:text-white">
          Featured Research
        </h2>
        <Link
          href="/research"
          className="text-sm font-medium text-ucd-green dark:text-ucd-green-100 hover:text-ucd-green/80 dark:hover:text-ucd-green transition-colors flex items-center gap-1"
        >
          All projects <span aria-hidden>&rarr;</span>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
