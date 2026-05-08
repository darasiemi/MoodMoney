import { NextResponse } from "next/server";
import { getAllProjects, getAllBlogPosts } from "@/lib/mdx";
import { getPublications, getPeople } from "@/lib/data";

export interface SearchItem {
  type: "project" | "publication" | "blog" | "person";
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

export async function GET() {
  const items: SearchItem[] = [];

  // Projects
  for (const p of getAllProjects()) {
    items.push({
      type: "project",
      title: p.title,
      description: p.description,
      url: `/research/${p.slug}`,
      tags: p.tags,
    });
  }

  // Publications
  for (const p of getPublications()) {
    items.push({
      type: "publication",
      title: p.title,
      description: `${p.authors.join(", ")} · ${p.venue} (${p.year})`,
      url: p.doi ? `https://doi.org/${p.doi}` : p.arxiv ?? "#",
      tags: p.tags,
    });
  }

  // Blog posts
  for (const p of getAllBlogPosts()) {
    items.push({
      type: "blog",
      title: p.title,
      description: p.summary,
      url: `/blog/${p.slug}`,
      tags: p.tags,
    });
  }

  // People
  for (const p of getPeople()) {
    items.push({
      type: "person",
      title: p.name,
      description: `${p.roleLabel} · ${p.researchInterests.join(", ")}`,
      url: "/people",
    });
  }

  return NextResponse.json(items);
}
