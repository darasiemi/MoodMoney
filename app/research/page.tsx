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
    <div className="page-shell">
      <header className="page-intro mb-12">
        <div><h1 className="page-title">Research <span className="block text-[0.48em] font-medium leading-snug tracking-normal text-[color:var(--muted)]">at the mind–money intersection.</span></h1></div>
      <p className="page-deck">
        Our research combines machine learning and behavioural science to
        address the mental health crisis — with a particular focus on the
        financial dimensions of psychological wellbeing.
      </p>
      </header>

      <ResearchTabs active={active} completed={completed} underReview={underReview} />
    </div>
  );
}
