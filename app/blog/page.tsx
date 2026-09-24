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
      <header className="page-intro !block mb-16">
        <h1 className="page-title">Blog <span className="block text-[0.48em] font-medium leading-snug tracking-normal text-[color:var(--muted)]">from the lab.</span></h1>
      </header>

      <div className="grid gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="clickable-surface group grid md:grid-cols-[1fr_auto] gap-5 items-start rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm"
          >
            <div>
              <div className="content-copy mb-3 flex flex-wrap items-center gap-3 text-sm">
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

              <h2 className="mb-3 max-w-3xl text-xl font-semibold leading-snug text-[color:var(--foreground)] transition-colors group-hover:text-ucd-navy sm:text-2xl">
                {post.title}
              </h2>

              <p className="content-copy mb-5 max-w-4xl text-sm leading-6 sm:text-base sm:leading-7">
                {post.summary}
              </p>

              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
            <ArrowRight
              size={22}
              className="mt-2 hidden shrink-0 text-[color:var(--muted)] transition-all group-hover:translate-x-1 group-hover:text-ucd-navy md:block"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
