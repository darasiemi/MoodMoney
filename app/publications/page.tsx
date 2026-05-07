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
    <div className="py-12">
      <h1 className="text-4xl font-extrabold text-ucd-navy dark:text-white mb-4 tracking-tight">
        Publications{" "}
        <span className="font-normal italic text-gray-400 dark:text-gray-500">our peer-reviewed work.</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
        Peer-reviewed journal articles, conference papers, and preprints from
        the lab. See also our{" "}
        <a
          href="https://scholar.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ucd-navy hover:text-ucd-gold dark:text-ucd-navy-200 dark:hover:text-ucd-gold underline underline-offset-2 transition-colors"
        >
          Google Scholar profile
        </a>
        .
      </p>

      <div className="space-y-12">
        {years.map((year) => (
          <section key={year}>
            <h2 className="text-xl font-bold text-ucd-navy dark:text-white mb-4 pb-2 border-b-2 border-ucd-gold flex items-center gap-3">
              <span className="text-ucd-gold text-2xl font-extrabold">{year}</span>
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
