import type { Metadata } from "next";
import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/research/ProjectCard";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Explore our active and completed research projects at the intersection of AI, NLP, and digital mental health.",
};

export default function ResearchPage() {
  const projects = getAllProjects();
  const active = projects.filter((p) => p.status === "active");
  const completed = projects.filter((p) => p.status === "completed");

  return (
    <div className="py-12">
      <h1 className="text-4xl font-extrabold text-ucd-navy dark:text-white mb-4 tracking-tight">
        Research
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
        Our research combines machine learning, NLP, and behavioural science to
        address the mental health crisis — with a particular focus on the
        financial dimensions of psychological wellbeing.
      </p>

      {active.length > 0 && (
        <section className="mb-12">
          <h2 className="section-heading text-xl font-bold text-ucd-navy dark:text-white mb-5">
            Active Projects
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {active.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="section-heading text-xl font-bold text-ucd-navy dark:text-white mb-5">
            Completed Projects
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {completed.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
