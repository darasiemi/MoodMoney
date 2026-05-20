import type { Publication, Person, NewsItem } from "@/types";

export function getPublications(): Publication[] {
  // Dynamic require so this works in server components without bundling issues
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require("@/content/publications.json") as Publication[];
  return data.sort((a, b) => b.year - a.year);
}

export function getFeaturedPublications(): Publication[] {
  return getPublications().filter((p) => p.featured);
}

export function getPublicationsByTag(tag: string): Publication[] {
  return getPublications().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getPeople(): Person[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/content/people.json") as Person[];
}

export function getActivePeople(): Person[] {
  return getPeople().filter((p) => !p.leaveYear);
}

export function getPeopleByRole(role: Person["role"]): Person[] {
  return getPeople().filter((p) => p.role === role);
}

export function getTickerItems(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("@/content/ticker.json") as string[];
}

export function getNewsItems(): NewsItem[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require("@/content/news.json") as NewsItem[];
  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Role display order for the People page
export const ROLE_ORDER: Person["role"][] = [
  "pi",
  "postdoc",
  "phd",
  "msc",
  "undergrad",
  "collaborator",
  "alumni",
];

export const ROLE_SECTION_LABELS: Record<Person["role"], string> = {
  pi: "Principal Investigator",
  postdoc: "Postdoctoral Researchers",
  phd: "PhD Researchers",
  msc: "MSc Researchers",
  undergrad: "Undergraduate Researchers",
  collaborator: "Collaborators",
  alumni: "Alumni",
};
