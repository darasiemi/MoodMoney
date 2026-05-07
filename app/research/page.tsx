import type { Metadata } from "next";
import { getAllProjects } from "@/lib/mdx";
import { ResearchTabs } from "@/components/research/ResearchTabs";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Explore our active and completed research projects at the intersection of AI, NLP, and digital mental health.",
};

export default function ResearchPage() {
  const projects = getAllProjects();
  const active      = projects.filter((p) => p.status === "active");
  const completed   = projects.filter((p) => p.status === "completed");
  const underReview = projects.filter((p) => p.status === "under review");

  return (
    <div className="py-12">
      <h1 className="text-4xl font-extrabold text-ucd-navy dark:text-white mb-4 tracking-tight">
        Research{" "}
        <span className="font-normal italic text-gray-400 dark:text-gray-500">at the mind–money intersection.</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
        Our research combines machine learning and behavioural science to
        address the mental health crisis — with a particular focus on the
        financial dimensions of psychological wellbeing.
      </p>

      <ResearchTabs active={active} completed={completed} underReview={underReview} />
    </div>
  );
}
