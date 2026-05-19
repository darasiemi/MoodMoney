export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  venueShort?: string;
  type: "journal" | "conference" | "preprint" | "workshop";
  abstract?: string;
  doi?: string;
  arxiv?: string;
  pdf?: string;
  code?: string;
  tags: string[];
  featured?: boolean;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  status: "active" | "completed" | "upcoming" | "under review";
  startYear: number;
  endYear?: number;
  tags: string[];
  image?: string;
  featured?: boolean;
  collaborators?: string[];
  funding?: string | string[];
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

export interface Person {
  id: string;
  name: string;
  role: "pi" | "postdoc" | "phd" | "msc" | "undergrad" | "alumni" | "collaborator";
  roleLabel: string;
  bio: string;
  image?: string;
  imagePosition?: string;
  email?: string;
  website?: string;
  googleScholar?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  researchInterests: string[];
  joinYear: number;
  leaveYear?: number;
}

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  summary: string;
  tags: string[];
  published: boolean;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
}

export interface NewsItem {
  id: string;
  date: string;
  text: string;
}
