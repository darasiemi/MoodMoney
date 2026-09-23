import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/mdx";
import { Tag } from "@/components/ui/Tag";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Research updates, perspectives, and accessible explainers from the Mood & Money Lab.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="page-shell">
      <header className="page-intro mb-16">
        <div><h1 className="page-title">Blog <span className="block text-[0.48em] font-medium leading-snug tracking-normal text-[color:var(--muted)]">from the lab.</span></h1></div>
      <p className="page-deck">
        Research updates, accessible explainers, and perspectives from the lab.
      </p>
      </header>

      <div className="grid gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="clickable-surface group grid md:grid-cols-[1fr_auto] gap-5 items-start rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm"
          >
            <div><div className="content-copy flex flex-wrap items-center gap-3 text-sm mb-3">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span>&middot;</span>
              <span>{post.author}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-[color:var(--foreground)] group-hover:text-ucd-navy transition-colors mb-4 leading-snug max-w-3xl">
              {post.title}
            </h2>

              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div></div>
              <ArrowRight
                size={22}
                className="hidden md:block mt-2 text-[color:var(--muted)] group-hover:text-ucd-navy group-hover:translate-x-1 transition-all shrink-0"
              />
          </Link>
        ))}
      </div>
    </div>
  );
}
