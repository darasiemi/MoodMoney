import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ProjectFrontmatter, Project, BlogPostFrontmatter, BlogPost } from "@/types";

const contentDir = path.join(process.cwd(), "content");

// ─── Projects ────────────────────────────────────────────────────────────────

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(path.join(contentDir, "projects"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export function getProjectBySlug(slug: string): Project {
  const filePath = path.join(contentDir, "projects", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as ProjectFrontmatter), content, slug };
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map(getProjectBySlug)
    .sort((a, b) => b.startYear - a.startYear);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export function getBlogSlugs(): string[] {
  return fs
    .readdirSync(path.join(contentDir, "blog"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export function getBlogBySlug(slug: string): BlogPost {
  const filePath = path.join(contentDir, "blog", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as BlogPostFrontmatter), content, slug };
}

export function getAllBlogPosts(): BlogPost[] {
  return getBlogSlugs()
    .map(getBlogBySlug)
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
