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
    <div className="page-shell">
      <header className="page-intro !block mb-16">
        <h1 className="page-title">People <span className="block text-[0.48em] font-medium leading-snug tracking-normal text-[color:var(--muted)]">behind the research.</span></h1>
      </header>

      {sections.map(({ role, label, members }) => (
        <section key={role} className="mb-20">
          <h2 className="section-heading text-xl font-semibold text-[color:var(--foreground)] mb-6">
            {label}
          </h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
            {members.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
