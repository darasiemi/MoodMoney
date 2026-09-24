import type { Metadata } from "next";
import { getPublications } from "@/lib/data";
import { PublicationCard } from "@/components/publications/PublicationCard";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Full list of publications from the Mood & Money Lab, including journal articles, conference papers, and preprints.",
};

export default function PublicationsPage() {
  const publications = getPublications();

  // Group by year
  const byYear = publications.reduce<Record<number, typeof publications>>(
    (acc, pub) => {
      (acc[pub.year] ??= []).push(pub);
      return acc;
    },
    {}
  );

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="page-shell">
      <header className="page-intro !block mb-16">
        <h1 className="page-title">Publications <span className="block text-[0.48em] font-medium leading-snug tracking-normal text-[color:var(--muted)]">our peer-reviewed work.</span></h1>
      </header>

      <div className="space-y-16">
        {years.map((year) => (
          <section key={year}>
            <h2 className="text-3xl font-bold text-[color:var(--foreground)] mb-6 pb-3 border-b border-[color:var(--border)]">
              {year}
            </h2>
            <div className="space-y-4">
              {byYear[year].map((pub) => (
                <PublicationCard key={pub.id} pub={pub} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
