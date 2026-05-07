import type { Metadata } from "next";
import { getPeople, ROLE_ORDER, ROLE_SECTION_LABELS } from "@/lib/data";
import { PersonCard } from "@/components/people/PersonCard";

export const metadata: Metadata = {
  title: "People",
  description:
    "Meet the researchers and collaborators of the Mood & Money Lab.",
};

export default function PeoplePage() {
  const people = getPeople();

  // Group by role in defined order
  const sections = ROLE_ORDER.map((role) => ({
    role,
    label: ROLE_SECTION_LABELS[role],
    members: people.filter((p) => p.role === role),
  })).filter((s) => s.members.length > 0);

  return (
    <div className="py-12">
      <h1 className="text-4xl font-extrabold text-ucd-navy dark:text-white mb-4 tracking-tight">
        People{" "}
        <span className="font-normal italic text-gray-400 dark:text-gray-500">behind the research.</span>
      </h1>
      <div className="mb-10" />

      {sections.map(({ role, label, members }) => (
        <section key={role} className="mb-12">
          <h2 className="section-heading text-xl font-bold text-ucd-navy dark:text-white mb-5">
            {label}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {members.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
